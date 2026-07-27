---
layout: "../../../layouts/NoteLayout.astro"
title: "Qwen-vLLM Profiling 笔记"
description: "Qwen-vLLM 推理优化项目的工程记录。"
lang: "zh"
date: "2026-07-27"
---

这篇笔记用于记录 Qwen-vLLM 推理服务优化项目中的 profiling 观察。

## 分析目标

主要信号包括 TTFT、TPOT、output throughput 和 attention 执行路径。目标是把运行 artifact 和具体优化决策连接起来，而不是只记录最终指标。

## 工程主线

- 长上下文 prefill 行为。
- Decode 热路径。
- KV cache 影响。
- 采样开销。
- 自定义算子在关键路径上的成本。

## 结果摘要

在官方 benchmark 中，优化分支实现 16-32K 吞吐提升 143%，8-16K 吞吐提升 75%，4-8K 吞吐提升 49%，最终排名 57/346。
