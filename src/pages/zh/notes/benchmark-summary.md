---
layout: "../../../layouts/NoteLayout.astro"
title: "HorizonBench 相关 Benchmark 整理"
description: "围绕 HorizonBench、STALE、PersonaMem-v2 与 LongMemEval 等长期记忆和个性化 benchmark 的调研整理。"
lang: "zh"
date: "2026-07-09"
---

## 1. 总览

| Benchmark | 内容 |
| --- | --- |
| HorizonBench | 长期个性化中的偏好演化、状态更新、旧记忆干扰问题 |
| STALE | 判断记忆何时失效、隐式冲突、过期记忆抗拒 |
| PersonaMem / PersonaMem-v2 | 动态用户画像、隐式用户偏好，可作为 HorizonBench 的对照组 |
| LongMemEval | 知识更新、时间推理、abstention，可作为长期对话记忆基线 |
| RealPref / BenchPreS | 静态及上下文选择性偏好，可补足偏好表达、隐式偏好和过度应用问题 |
| LoCoMo / LoCoMo-Plus | 长期对话记忆基线 |
| Mem-Gallery | 多模态 (视觉 + 文本信息) |
| MemoryAgentBench / MemBench / LifeBench | 检索、TTL、选择性遗忘、程序性/习惯记忆 |
| AMA-Bench / LongMemEval-V2 / EvoMemBench / MemGym | agent 在执行真实任务过程中累积经验、工具记忆，并复用，适合评估“经验是否被压缩、更新、复用” |

## 2. Benchmark

### HorizonBench

| 项目 | 内容 |
| --- | --- |
| 链接 | Paper: <https://arxiv.org/pdf/2604.17283><br>GitHub: <https://github.com/stellalisy/HorizonBench><br>Dataset: <https://huggingface.co/datasets/stellalisy/HorizonBench> |
| 主要内容 | 面向长期个性化。用状态图生成对话历史；用户偏好会被生活事件隐式改变，但新偏好不一定被重新明说。每个题目要求模型从几个候选回复中选出最符合用户当前偏好的回复 |
| 侧重点 | 模型是否会被早期明说的旧偏好锚定；是否能根据后续事件更新内部用户状态；是否能“忘掉/降权”过期偏好 |
| 价值 | 可以诊断模型到底是没检索到信息，还是检索到了旧信息却没更新 |
| 局限 | 合成数据，主要是个性化偏好，不覆盖工具执行、外部环境状态、真实用户隐私 |

### STALE

| 项目 | 内容 |
| --- | --- |
| 链接 | <https://arxiv.org/pdf/2605.06527> |
| 主要内容 | 评估 agent 是否知道记忆何时不再有效 |
| 侧重点 | agent 能否根据最新信息确定对象的当前状态；能否抵抗由过期记忆或错误前提带来的误导；当规则或策略发生变化，但没有明确说明“旧状态作废”时，能否自动适应新的规则 |
| 价值 | 互补。HorizonBench 测“偏好被事件更新后是否仍选旧偏好”；STALE 测“后续观察使早期记忆失效后，模型是否识别并拒绝用户问题中的过期前提” |
| 局限 | 不覆盖长期个性化 |

### PersonaMem

| 项目 | 内容 |
| --- | --- |
| 链接 | <https://arxiv.org/pdf/2504.14225> |
| 主要内容 | 构造模拟用户和多会话历史，测试模型能否识别用户画像，并选择符合用户偏好的个性化回应 |
| 价值 | 可作为 HorizonBench 的对照组，区分“能不能记住用户画像”和“能不能处理画像变化” |

### PersonaMem-v2

| 项目 | 内容 |
| --- | --- |
| 链接 | <https://arxiv.org/pdf/2512.06688> |
| 主要内容 | 面向隐式 persona 和 agentic memory 的长期个性化 benchmark，包含大量交互、用户偏好和长上下文历史 |
| 价值 | 能补足“隐式偏好抽取”和“记忆如何被压缩成可读用户画像”部分 |

### LongMemEval

| 项目 | 内容 |
| --- | --- |
| 链接 | <https://arxiv.org/pdf/2410.10813> |
| 主要内容 | 面向长期交互记忆，问题覆盖信息抽取、多会话推理、时间推理、知识更新和记忆降权 |
| 侧重点 | 长对话历史中的事实检索、跨 session 推理、旧知识与新知识的冲突处理 |
| 价值 | 可作为长期对话记忆基线，适合测试模型是否能处理时间顺序和知识更新 |
| 局限 | 偏QA |

### RealPref

| 项目 | 内容 |
| --- | --- |
| 链接 | <https://arxiv.org/pdf/2603.04191> |
| 主要内容 | 真实长期个性化交互，包含用户画像、个性化偏好、多类偏好表达和长程交互历史 |
| 侧重点 | 真实用户偏好表达、显式到隐式偏好的梯度、选择题/判断题/开放题多种评估方式 |
| 价值 | 可补足真实偏好表达和开放式回答评估 |

### BenchPreS

| 项目 | 内容 |
| --- | --- |
| 链接 | <https://arxiv.org/pdf/2603.16557> |
| 主要内容 | 评估模型是否能在第三方沟通场景中选择性应用或抑制用户偏好 |
| 侧重点 | 偏好何时应该应用、何时应该被抑制；避免把用户个人偏好错误迁移到不合适的场景 |
| 价值 | 补足 memory policy ：记住偏好不是总是使用偏好 |
| 局限 | 主要关注偏好应用边界，不关注偏好随生活事件演化 |

### LoCoMo

| 项目 | 内容 |
| --- | --- |
| 链接 | <https://arxiv.org/pdf/2402.17753> |
| 主要内容 | VERY long-term conversational memory |
| 价值 | 是长期对话记忆的重要基线 |

### LoCoMo-Plus

| 项目 | 内容 |
| --- | --- |
| 链接 | <https://arxiv.org/pdf/2602.10715>|
| 主要内容 | 在 LoCoMo 基础上强调 beyond-factual cognitive memory |
| 价值 | 可补足普通事实召回 benchmark 的不足 |
| 局限 | 仍以长期对话认知记忆为主，对偏好变化的因果机制控制有限 |

### Mem-Gallery

| 项目 | 内容 |
| --- | --- |
| 链接 | <https://arxiv.org/pdf/2601.03515> |
| 主要内容 | 多模态长期对话记忆，多会话对话同时基于视觉和文本信息 |
| 价值 | 如果涉及图片等视觉生活日志，可补足纯文本的偏好演化 |

### MemoryAgentBench

| 项目 | 内容 |
| --- | --- |
| 链接 | <https://arxiv.org/pdf/2507.05257> |
| 主要内容 | 通过增量多轮交互评估 memory agent，覆盖记忆写入、检索、更新、跨轮理解和选择性遗忘 |
| 价值 | 选择性遗忘维度和记忆系统的删除/降权策略 |

### MemBench

| 项目 | 内容 |
| --- | --- |
| 链接 | <https://arxiv.org/pdf/2506.21605> |
| 主要内容 | 评估 LLM-based agents 的记忆能力，区分 factual memory 和 reflective memory、 participation 与 observation |
| 价值 | 帮助衡量 memory 的基础能力 |

### LifeBench

| 项目 | 内容 |
| --- | --- |
| 链接 | <https://arxiv.org/pdf/2603.03781> |
| 主要内容 | 长程多源记忆，强调非陈述性记忆，包括程序性记忆与习惯记忆 |
| 价值 | 可把“偏好变化”扩展到“生活习惯/流程/程序性行为变化” |

### AMA-Bench

| 项目 | 内容 |
| --- | --- |
| 链接 | <https://arxiv.org/pdf/2602.22769> |
| 主要内容 | 结合真实任务轨迹和可扩展的合成轨迹，构建覆盖不同长度、不同复杂度的 agent 执行历史，评估 agent 的长期记忆能力 |
| 价值 | 从用户状态转向任务状态和工具执行历史，更贴近真实 agent 应用，可评估经验是否被压缩、检索并用于后续任务 |

### LongMemEval-V2

| 项目 | 内容 |
| --- | --- |
| 链接 | <https://arxiv.org/pdf/2605.12493> |
| 主要内容 | 面向 web agent 的长期环境经验记忆，覆盖网页环境状态、动态变化、工作流、踩坑经验、前提识别 |
| 价值 | 从用户偏好状态转向环境状态和工作流经验，适合评估 agent 是否能复用长期经验 |

### EvoMemBench

| 项目 | 内容 |
| --- | --- |
| 链接 | <https://arxiv.org/pdf/2605.18421> |
| 主要内容 | 从 self-evolving memory 角度评估 agent memory，包含记忆如何随任务执行自我演化、跨任务经验复用、知识型与执行型记忆 |
| 价值 | 可补足涉及任务执行经验的问题 |

### MemGym

| 项目 | 内容 |
| --- | --- |
| 链接 | <https://arxiv.org/pdf/2605.20833> |
| 主要内容 | 长程 agent memory 环境，覆盖工具调用、深度研究、编码、GUI，把 memory strategy 和推理、检索、工具使用能力拆开评估 |
| 价值 | 偏任务型 agent 环境，对于任务型诊断，其拆分思路可参考 |
