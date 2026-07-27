---
layout: "../../../layouts/NoteLayout.astro"
title: "Agent Memory Benchmark Reading Plan"
description: "A living reading map for agent memory benchmark research."
lang: "en"
date: "2026-07-27"
---

This note is a working reading map for my Agent Memory Benchmark research thread.

## Core Question

How should LLM agents be evaluated when memory is dynamic rather than static? In particular, I care about cases where user preferences evolve, stale evidence becomes misleading, and the agent must make decisions from incomplete or conflicting context.

## Benchmark Landscape

The first reading cluster includes HorizonBench, STALE, PersonaMem-v2, and LongMemEval. I use these benchmarks as reference points for task formulation, data construction, and evaluation blind spots.

## Design Directions

- State-first generation for creating coherent user evolution.
- Old/new observation pairs for controlled memory conflict.
- Pre-evolution hard negatives for stale-memory interference.
- Scenario taxonomies for preference evolution, premise resistance, and over-personalization.

## Open Notes

This page is intentionally lightweight for now. I will expand it into paper notes, comparison tables, and design decisions as the research progresses.
