---
layout: "../../../layouts/NoteLayout.astro"
title: "HorizonBench 方法调研"
description: "围绕 state-first 数据构造、偏好演化、过期偏好 hard negative 与诊断指标的 HorizonBench 方法笔记。"
lang: "zh"
date: "2026-07-21"
---

如何构造偏好演化数据、如何自动确定旧偏好应被降权、如何判断模型回答时是否使用了当前偏好、如何在数据生成中实现进化更新的 memory。

## 1. 总览

**state-first 数据构造方法**：

先构造一个带有用户状态、偏好、事件、依赖边和状态来源的 mental state graph，再从这个真实状态生成长期对话和测试题。这样每个测试题天然知道：

- 用户原来的偏好是什么；
- 哪个生活事件改变了偏好；
- 当前正确偏好是什么；
- 哪个旧偏好应该作为 hard negative；
- 模型选错时是否是在使用过期偏好。

这使得它可以在不依赖人工逐条标注的情况下，把“没检索到记忆”和“检索到了旧记忆但没更新状态”分开评估。

## 2. 基本信息

| 项目 | 内容 |
| --- | --- |
| Paper | <https://arxiv.org/abs/2604.17283> |
| GitHub | <https://github.com/stellalisy/HorizonBench> |
| Dataset | <https://huggingface.co/datasets/stellalisy/HorizonBench> |
| 任务 | 给定 6 个月用户对话历史，从 5 个候选 assistant response 中选择最符合用户当前偏好的回复 |
| 数据规模 | 4,245 个 benchmark items，360 个模拟用户，平均约 4,300 turns / 163K tokens |
| 核心变量 | evolution status、expression explicitness、context length |
| 核心诊断指标 | accuracy、evolved-vs-static gap、pre-evolution distractor selection rate |

## 3. 测什么

> 用户曾经说过一个偏好，但后来的生活事件已经隐式改变了这个偏好。模型能不能根据后续事件更新用户当前状态，而不是继续使用旧偏好？

| 错误类型 | 含义 | HorizonBench 如何暴露 |
| --- | --- | --- |
| Retrieval failure | 模型没有找到历史中的相关偏好或事件 | 答案不是当前偏好，也不是旧偏好 |
| Belief-update failure | 模型找到了旧偏好，但没有根据后续事件更新 | 模型选择 pre-evolution distractor |
| Surface-cue shortcut | 模型不看历史，只靠候选回复表面质量猜 | 5-LLM history filter 过滤掉这类题 |

## 4. 数据构造流程

| 阶段 | 输入 | 方法 | 输出 | 对我们的参考价值 |
| --- | --- | --- | --- | --- |
| 1. 用户实例化 | 用户 profile 配置、人格/人口统计/社交信息 | 生成模拟用户状态 | user profile、persona、social graph | 先有可控用户状态，再生成对话 |
| 2. Event sampling | 当前用户状态、过去事件、偏好 domain | 条件采样生活事件，避免重复和不合理事件 | 有日期、类别、描述的 life event | 事件不是随机噪声，而是偏好变化的因果触发器 |
| 3. Preference evolution | life event、相关 preference nodes | 通过 typed dependency edges 改变 2-5 个偏好，并记录原因 | 新偏好值、旧偏好值、触发事件 provenance | 自动确定“哪些旧偏好应该降权” |
| 4. Conversation generation | 当前 mental state、事件、表达模式 | 先生成 outline，再逐 turn 生成对话 | 带日期和场景的长期 conversation history | 保持长期历史与隐藏状态一致 |
| 5. Expression tracking | 每个 preference 的表达时间戳 | 记录偏好何时被用户表达，演化不刷新表达时间 | stale preferences 列表 | 区分“偏好变了”和“偏好被重新明说了” |
| 6. Benchmark construction | target turn、当前偏好、旧偏好 | 生成 5 个候选回复，注入旧偏好 hard negative，并用 5-LLM filter 过滤 | MCQ benchmark item | 自动生成带诊断意义的测试题 |

## 5. mental state graph

维护：

- 用户 persona；
- 社交关系；
- life events；
- typed preferences；
- preference 之间的 dependency edges；
- 每次 preference change 的 triggering event 和 provenance；
- 每个 preference 最近一次在对话中被表达的时间戳。

关键在于：**对话由状态生成，而不是从对话反推状态**。

如果只观察用户对话，很难确定用户为什么改变了偏好，也很难知道某个偏好是否真的已经变化。HorizonBench 反过来，先设定隐藏状态和偏好演化，再生成对话，所以构造时自然产生标准答案。

### 5.1 偏好不是孤立更新，而是通过依赖边传播 (“记忆涟漪” or “偏好更新传播”)

论文设定 preference 不会孤立变化。例如一次健康事件可能改变饮食偏好，也会影响餐厅选择、社交聚餐偏好。一次职业变化可能影响沟通风格、时间安排、财务优先级。

因此，life event 会通过 typed dependency edges 影响多个 preference nodes。论文里每次 life event 可以同时改变 2-5 个偏好，每个变化都记录触发事件作为 provenance。

### 5.2 演化不刷新表达时间戳

用户可能在第 10 天明确表达了旧偏好，在第 45 天经历生活事件导致偏好改变，但用户没有重新明确说出新偏好。HorizonBench 设定：第 45 天的 preference evolution 不会刷新这个偏好的表达时间戳。

- 对模型来说，最近一次“明确表达”的仍然是旧偏好；
- 但当前状态已经变成新偏好；
- 因此旧偏好可以作为 pre-evolution hard negative；
- 正确回答必须把后续 life event 和旧偏好联系起来。

## 6. 偏好降权问题

HorizonBench 的降权不是删除，也不是让模型完全不知道旧偏好。旧偏好仍然可以作为历史事实存在。它真正评估的是：**在当前回答中，旧偏好是否应该被降权，不再作为当前偏好使用**。

它的自动判定逻辑为：

```text
for each user:
  maintain preference state graph over 6 months
  for each preference:
    record original value, current value, expression timestamp, evolution provenance

  if preference was expressed before
     and last expression is older than staleness threshold
     and preference is selected for temporal recall:

      if preference has evolved:
        correct answer = response aligned with current value
        hard negative = response aligned with pre-evolution value
      else:
        correct answer = response aligned with static current value
```

关键机制有三个。

### 6.1 staleness threshold

每个 preference 维护最近一次被表达的时间戳。超过阈值后，这个 preference 变成 temporal recall candidate。论文默认 staleness threshold 是 30 天。

挑已经有一段时间没有被表达、需要长期追踪的偏好来问记忆问题。

### 6.2 preference evolution provenance

如果某个 stale preference 在这段时间里被 life event 改变了，mental state graph 会记录：

- 原始偏好值；
- 当前偏好值；
- 变化的属性；
- 触发变化的事件；
- 变化理由。

只要 `current_value != pre_evolution_value`，旧值就应当在当前决策中被降权，并可作为 hard negative。

### 6.3 temporal recall

要确保被测试的偏好曾经在历史对话中出现过，触发其变化的 life event 也在同一历史中出现。也就是说，模型答对所需的信息都在 conversation history 里。

如果模型答错，不能简单归因于“信息根本没给”。它要么没有检索到相关信息，要么检索到了但没有完成状态更新。

## 7. 偏好使用问题

采用 5-option multiple choice，把“使用哪种偏好”预先编码进候选回复。

每个 item 的构造方式是：

1. 找到一个 target assistant turn；
2. 确定这个 turn 应该体现的 target preference attribute；
3. 生成一个符合当前偏好的正确 response；
4. 从同一 preference dimension 生成多个 alternative values；
5. 为每个 alternative value 生成一个 counterfactual assistant response；
6. 如果该 preference evolved，则把 pre-evolution value 注入为 hard negative；
7. 让模型从 5 个候选回复中选择最符合用户当前偏好的一个。

这样，模型选择的选项就可以解释为它使用了哪类偏好：

| 模型选择 | 解释 |
| --- | --- |
| correct option | 使用了当前偏好，或至少选中了当前偏好对应回复 |
| pre-evolution distractor | 使用了旧偏好，属于 belief-update failure |
| other distractor | 没有正确定位该 preference，或被其他表面因素干扰 |

## 8. 人工标注

HorizonBench 的 gold label 不是人工逐条标注出来的，而是由 mental state graph 自动给出的。

人工标注主要用于：

- 验证 benchmark 是否真的需要 belief update；
- 检查候选回复是否存在歧义；
- 找出生成 pipeline 的问题；
- 改进 distractor generation 和 preference attribute design。

论文中人工标注暴露了几类问题：

| 问题 | 含义 | 后续改进 |
| --- | --- | --- |
| counterfactual 选项不够区分 | 多个选项其实表达了相近 preference value | 强化 distractor 生成，要求不同选项对应更明确的不同属性值 |
| target attribute 没体现在回复里 | gold response 没有清楚体现目标偏好，反而其他选项更明显 | 改进 counterfactual generation prompt |
| 主观 preference 维度歧义 | 如积极程度、协作风格等多个选项都可解释为合理 | 把 disagreement 视作任务难度，而非纯噪声 |
| 数值属性泄露 | 回复直接说出数值偏好，任务变成数字匹配 | prompt 中禁止直接暴露底层属性值 |

## 9. 实验设计

### 9.1 主实验

评估 25 个前沿模型。每个模型拿到完整 6 个月对话历史，然后从 5 个候选回复里选一个。

基础指标：

- overall accuracy；
- evolved items accuracy；
- static items accuracy；
- evolved-vs-static gap；
- pre-evolution distractor selection rate；
- 按 generator 分组的结果；
- bootstrap confidence interval。

### 9.2 belief-update failure 指标

HorizonBench 用两个指标证明模型存在 belief-update failure。

> 模型是完全没找到偏好，还是找到了旧偏好但没更新？

| 指标 | 定义 | 解释 |
| --- | --- | --- |
| evolved-vs-static gap | evolved preference accuracy - static preference accuracy | 如果 evolved 明显更差，说明偏好变化带来额外困难 |
| pre-evolution distractor selection rate | 在 evolved items 的错误答案中，选择旧偏好 hard negative 的比例 | 如果高于随机错误基线，说明模型被旧偏好锚定 |

在 5 选 1 任务里，答错后有 4 个错误选项。如果随机选错，pre-evolution distractor 在错误答案里大约应占 25%。论文发现所有 25 个模型都高于这个基线，说明模型错误并非完全随机，而是系统性地偏向旧偏好，反映一个问题：模型往往能够捕捉到历史中的旧偏好，但没有充分根据后续事件更新为当前偏好。

### 9.3 控制实验

论文做了三类控制实验，用来排除替代解释。

| 控制变量 | 做法 | 想排除的解释 |
| --- | --- | --- |
| context length | 构造 short-horizon variant | 错误是否只是长上下文检索失败 |
| expression explicitness | 生成 explicit / neutral / implicit variants | 错误是否只是偏好表达太隐式 |
| counterfactual subtlety | 调整 5-LLM filter threshold | 错误是否只是候选项太细微 |

结果上，belief-update failure 在不同控制条件下仍然存在。这说明它不是单纯由长上下文长度、隐式表达或选项微妙程度造成的。

## 10. 数据结构

HuggingFace released dataset 有三个 config：

| config | 内容 |
| --- | --- |
| `benchmark` | 4,245 个 MCQ items |
| `sample` | 10 个快速测试样例 |
| `mental_state_graphs` | 360 个用户的结构化状态图 |

`benchmark` 里最重要的字段：

| 字段 | 作用 |
| --- | --- |
| `conversation` | 完整对话历史 |
| `correct_letter` | gold answer |
| `options` | 5 个候选回复，包含 letter、value、response text |
| `has_evolved` | 目标偏好是否经历 life event 演化 |
| `preference_domain` | 被测试的偏好类别 |
| `distractor_letter` | pre-evolution distractor 的选项字母 |
| `preference_evolution` | evolved items 的旧/新属性、变化属性、触发事件 |

`mental_state_graphs` 里最重要的字段：

| 字段 | 作用 |
| --- | --- |
| `user_profile` | 用户画像 |
| `timeline_metadata` | 时间范围、事件数、对话数、偏好变化数 |
| `preference_record` | 6 个月内 preference state snapshots |
| `event_record` | 所有 life events |
| `conversations` | 所有 conversation episodes |

`preference_evolution` 和 `distractor_letter`让评测结果可以直接做错误归因。

## 11. memory

### 11.1 数据生成器中的 memory

HorizonBench 的 memory 是显式结构化的：

- preference 以结构化属性保存；
- life event 改变 preference value；
- dependency edges 传播影响；
- provenance 记录变化原因；
- expression timestamp 记录偏好何时被表面表达；
- conversation generation 每次都依赖当前 state。

这相当于一个 oracle memory(上帝视角)，用于生成数据和 gold label。

### 11.2 被评测模型中的 memory

默认评测里，被测模型没有外部 memory module。它直接接收完整 conversation history，然后选择答案。

GitHub 的 `evaluate.py` 支持两种使用方式：

- full-context：直接把完整 `conversation` 和 MCQ question 拼成 prompt；
- custom pipeline：可以用 `parse_conversations()` 把历史切成 session，自行做 RAG、summary 或 memory retrieval，再拼接问题。

### 11.3 论文提到的改进方向

论文结论中提到，未来可尝试：

- 显式 preference state representation；
- 遇到 life event 时更新 preference state；
- retrieval 不只检索“被明说的偏好”，还要检索“可能改变偏好的事件”。

## 12. 可复用?

### 12.1 state-first generation

不从自由对话里事后标注偏好变化。先构造用户状态、偏好图、事件图，再生成对话。

复用方式：

```text
user_state = {
  profile,
  preferences,
  events,
  preference_dependencies,
  preference_change_provenance,
  expression_timestamps
}
conversation = generate_from(user_state)
benchmark_item = derive_from(user_state, conversation)
```

### 12.2 旧值作为 hard negative

错误选项优先使用曾经正确但现在过期的旧偏好。这样可以判断模型是不是被旧记忆锚定。

### 12.3 表达时间和状态更新时间分离

偏好发生变化不等于用户重新表达偏好。必须区分：

- `last_expressed_at`
- `last_updated_at`
- `current_value`
- `previous_value`

如果不做这个区分，测试会退化成“找最近一句明说的新偏好”。

### 12.4 staleness-based candidate selection

用 staleness threshold 自动挑出“适合考长期记忆”的偏好，而不是人工挑题。

### 12.5 5-LLM history filter

用多个验证模型在缺失完整历史的情况下答题，过滤掉不用长期历史也能猜对的 item。

### 12.6 diagnostic metrics

不只报 accuracy。至少需要：

- static accuracy；
- evolved accuracy；
- evolved-static gap；
- old-preference distractor rate；
- by-domain breakdown；
- by-expression-type breakdown；
- by-context-length breakdown。

## 13. 局限

| 局限 | 说明 | 改进? |
| --- | --- | --- |
| 合成数据 | 用户、事件、对话均由 LLM 生成 | 需要考虑真实用户数据或真实任务轨迹的外部验证 |
| 多选题格式 | 评估 recognition，不是自己生成回复的能力 | 开放生成，需要额外的 judge |
| 偏好变化由 generator 决定 | 事件是否真的会导致某偏好变化依赖 LLM 合理性 | 需要 schema 约束和人工抽检 |
| 主观偏好维度有歧义 | 有些偏好本身较为主观，多个候选回复都可能合理 | 需要报告 human agreement，而不是只追求单一 gold |
