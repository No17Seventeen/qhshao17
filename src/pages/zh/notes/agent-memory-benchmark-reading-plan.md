---
layout: "../../../layouts/NoteLayout.astro"
title: "Agent Memory Benchmark 阅读计划"
description: "Agent Memory Benchmark 研究主线的持续阅读地图。"
lang: "zh"
date: "2026-07-27"
---

这篇笔记用于维护 Agent Memory Benchmark 研究主线的阅读地图。

## 核心问题

当 agent 的记忆不是静态事实，而是会随着用户偏好、时间和环境变化而演化时，应该如何构造评测任务？我尤其关注过期记忆、冲突证据和信息不完整对 agent 决策质量的影响。

## Benchmark 版图

第一批重点阅读对象包括 HorizonBench、STALE、PersonaMem-v2 和 LongMemEval。我会从任务定义、数据构造和评测盲区三个角度整理这些工作。

## 设计方向

- 用 state-first generation 构造连贯的用户状态演化。
- 用 old/new observation pair 构造可控记忆冲突。
- 用 pre-evolution hard negative 测试过期记忆干扰。
- 用场景 taxonomy 组织偏好演化、premise resistance 和 over-personalization。

## 后续维护

当前页面先作为轻量占位。后续会逐步扩展为论文笔记、对比表格和 benchmark 设计决策记录。
