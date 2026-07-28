export const routeSlugs = {
  home: "",
  research: "research",
  projects: "projects",
  notes: "notes",
  cv: "cv",
  contact: "contact",
};

export const profile = {
  email: "shaoqihao24@mails.ucas.ac.cn",
  githubLabel: "github.com/No17Seventeen",
  githubUrl: "https://github.com/No17Seventeen",
};

export const nav = {
  en: {
    home: "Home",
    research: "Research",
    projects: "Engineering",
    notes: "Notes",
    cv: "CV",
    contact: "Contact",
    language: "中文",
    theme: "Theme",
    menu: "Menu",
  },
  zh: {
    home: "首页",
    research: "研究",
    projects: "工程",
    notes: "笔记",
    cv: "简历",
    contact: "联系",
    language: "EN",
    theme: "主题",
    menu: "菜单",
  },
};

export const home = {
  en: {
    eyebrow: "Undergraduate · Cybersecurity · UCAS",
    name: "Qihao Shao",
    subtitle:
      "Undergraduate working on agent memory benchmarks and engineering-oriented LLM-agent evaluation.",
    intro:
      "I am an undergraduate in Cybersecurity at the University of Chinese Academy of Sciences. My current work centers on agent memory benchmarks, with a focus on preference evolution, stale memory interference, uncertainty estimation, and evaluation systems that move beyond static QA/MCQ toward decision-oriented agent tasks.",
    primaryAction: "Curriculum Vitae",
    secondaryAction: "View Research",
    profileTitle: "Research Profile",
    facts: [
      ["Affiliation", "University of Chinese Academy of Sciences"],
      ["Program", "Cybersecurity, Undergraduate"],
      ["Main Thread", "Agent Memory Benchmark"],
    ],
    snapshots: [
      ["Research Focus", "Agent Memory"],
      ["Evaluation Lens", "Reliable Agent Decisions"],
      ["Systems Thread", "Qwen-vLLM Optimization"],
      ["Public Status", "Building a long-term academic homepage"],
    ],
  },
  zh: {
    eyebrow: "本科 · 网络空间安全 · 中国科学院大学",
    name: "邵启豪",
    subtitle:
      "本科阶段研究方向为 Agent Memory Benchmark 与工程化 LLM Agent 评估。",
    intro:
      "我目前就读于中国科学院大学网络空间安全专业，本科二年级。当前研究主线围绕 Agent Memory Benchmark，重点关注偏好演化、过期记忆干扰、不确定性估计，以及如何将 agent 评估从静态 QA/MCQ 推进到更接近真实工程场景的决策任务。",
    primaryAction: "个人简历",
    secondaryAction: "查看研究",
    profileTitle: "研究档案",
    facts: [
      ["所属机构", "中国科学院大学"],
      ["专业", "网络空间安全，本科"],
      ["研究主线", "Agent Memory Benchmark"],
    ],
    snapshots: [
      ["研究重点", "Agent Memory"],
      ["评估视角", "工程化 Agent 评估"],
      ["工程线索", "Qwen-vLLM 推理优化"],
      ["公开状态", "建设长期维护的学术主页"],
    ],
  },
};

export const research = {
  en: {
    title: "Agent Memory Benchmark",
    kicker: "Research in Progress",
    summary:
      "This research thread asks how LLM agents should be evaluated when memory is not static: user preferences evolve, old evidence may become misleading, and tool outputs may be incomplete or conflicting.",
    questions: [
      "How should benchmark data encode evolving user states rather than isolated facts?",
      "When stale memory conflicts with newer observations, can an agent suppress outdated evidence?",
      "How can uncertainty-aware behavior be measured in memory-grounded decision making?",
    ],
    surveyedTitle: "Surveyed Benchmarks ...",
    surveyed: [
      "HorizonBench",
      "STALE",
      "PersonaMem-v2",
      "LongMemEval",
    ],
    methodsTitle: "Method Ideas",
    methods: [
      ["State-first generation", "Generate latent user states first, then derive observations and tasks from state transitions."],
      ["Old/new observation pair", "Create controlled conflicts between outdated and updated memories."],
      ["Pre-evolution hard negative", "Use plausible but stale information to test resistance to memory interference."],
      ["Scenario taxonomy", "Organize tasks around preference evolution, stale-memory suppression, and over-personalization."],
    ],
    metricsTitle: "Evaluation Signals",
    metrics: [
      "evolved-static gap",
      "old-preference distractor rate",
      "memory-use accuracy",
      "stale-memory suppression",
      "scenario applicability judgment",
    ],
  },
  zh: {
    title: "Agent Memory Benchmark",
    kicker: "进行中的研究",
    summary:
      "这条研究主线关注：当 agent 的记忆不是静态事实，而是会随用户状态、时间和环境变化而演化时，应该如何构造 benchmark 并评估其在工程场景中的决策能力。",
    questions: [
      "如何让 benchmark 数据表达用户状态演化，而不是只记录孤立事实？",
      "当过期记忆与新观察冲突时，agent 是否能抑制旧证据的干扰？",
      "如何在 memory-grounded decision making 中评估不确定性感知行为？",
    ],
    surveyedTitle: "调研的 Benchmark ...",
    surveyed: [
      "HorizonBench",
      "STALE",
      "PersonaMem-v2",
      "LongMemEval",
    ],
    methodsTitle: "方法构想",
    methods: [
      ["State-first generation", "先生成用户隐状态，再由状态转移派生观察与任务。"],
      ["Old/new observation pair", "构造旧观察与新观察的可控冲突，测试 agent 的更新能力。"],
      ["Pre-evolution hard negative", "使用合理但过期的信息测试 agent 抵抗旧记忆干扰的能力。"],
      ["Scenario taxonomy", "围绕偏好演化、过期记忆抑制和过度个性化组织任务场景。"],
    ],
    metricsTitle: "评估信号",
    metrics: [
      "evolved-static gap",
      "old-preference distractor rate",
      "memory-use accuracy",
      "stale-memory suppression",
      "scenario applicability judgment",
    ],
  },
};

export const projects = {
  en: {
    title: "Selected Engineering Work",
    intro:
      "My engineering work is centered on evaluation infrastructure and inference systems. Public links are added conservatively when the corresponding repositories are ready to be shared.",
    featured: {
      name: "Qwen-vLLM Inference Service Optimization",
      context:
        "2026 National College Student Computer System Capability Competition · Pilot Cup · Team Lead",
      status: "Public repository",
      repoLabel: "No17Seventeen/Qwen_vllm_cscc",
      repoUrl: "https://github.com/No17Seventeen/Qwen_vllm_cscc",
      summary:
        "Built a Qwen inference optimization branch on top of vLLM under competition constraints, focusing on long-context prefill, decode, KV cache behavior, sampling hot paths, and custom operator overhead.",
      highlights: [
        "Used Hipprof and runtime artifacts to analyze attention paths, TTFT, TPOT, and throughput bottlenecks.",
        "Optimized key inference paths for long-context scenarios while preserving benchmark constraints.",
        "Ranked 57/346 in the official benchmark.",
      ],
      metrics: [
        ["143%", "16-32K throughput improvement"],
        ["75%", "8-16K throughput improvement"],
        ["49%", "4-8K throughput improvement"],
        ["57/346", "Final official rank"],
      ],
    },
  },
  zh: {
    title: "工程实践",
    intro:
      "我的工程项目主要围绕评估基础设施和推理系统展开。对于暂未整理好的仓库，页面会先保留占位，避免公开不稳定链接。",
    featured: {
      name: "Qwen-vLLM 推理服务优化",
      context:
        "2026 全国大学生计算机系统能力大赛 - 先导杯 · 队长",
      status: "公开仓库",
      repoLabel: "No17Seventeen/Qwen_vllm_cscc",
      repoUrl: "https://github.com/No17Seventeen/Qwen_vllm_cscc",
      summary:
        "在比赛约束下基于 vLLM 构建 Qwen 推理优化分支，聚焦长上下文 prefill、decode、KV cache、采样热路径和自定义算子开销。",
      highlights: [
        "使用 Hipprof 与运行 artifact 分析 attention 路径、TTFT、TPOT 和 throughput 瓶颈。",
        "在保持 benchmark 约束的前提下优化长上下文推理关键路径。",
        "官方 benchmark 最终排名 57/346。",
      ],
      metrics: [
        ["143%", "16-32K 吞吐提升"],
        ["75%", "8-16K 吞吐提升"],
        ["49%", "4-8K 吞吐提升"],
        ["57/346", "官方最终排名"],
      ],
    },
  },
};

export const cv = {
  en: {
    title: "Curriculum Vitae",
    intro:
      "A public CV is provided for academic browsing in both English and Chinese.",
    downloadEn: "Download English CV",
    downloadZh: "Download Chinese CV",
    sections: [
      ["Research Interests", ["LLM Agents, Agent Memory, Tool-use Agents", "Uncertainty estimation, model calibration, reliable decision evaluation", "Benchmark design, long-horizon task evaluation, engineering evaluation systems"]],
      ["Education", ["University of Chinese Academy of Sciences, Cybersecurity, Undergraduate, 2024.09 - present", "Dalian No. 24 High School, 2021.09 - 2024.06"]],
      ["Honors", ["Outstanding Communist Youth League Member, UCAS, 2025", "Third-class Undergraduate Scholarship, UCAS, 2025"]],
    ],
  },
  zh: {
    title: "个人简历",
    intro:
      "这里提供中英文两版公开简历，便于网页浏览与下载。",
    downloadEn: "下载英文简历",
    downloadZh: "下载中文简历",
    sections: [
      ["研究兴趣", ["大语言模型智能体，Agent Memory，Tool-use Agent", "不确定性估计，模型校准，可靠决策评估", "Benchmark 设计，长程任务评估，工程化实验系统"]],
      ["教育背景", ["中国科学院大学，网络空间安全专业，本科，2024.09 - 至今", "大连市第二十四中，2021.09 - 2024.06"]],
      ["奖项荣誉", ["中国科学院大学优秀共青团员，校级，2025", "本科生三等奖学金，校级，2025"]],
    ],
  },
};

export const notes = {
  en: [
    {
      title: "Agent Memory Benchmark Reading Plan",
      href: "agent-memory-benchmark-reading-plan",
      date: "2026-07-27",
      summary:
        "A living reading map for memory evolution, stale evidence, and agent decision benchmarks.",
    },
    {
      title: "Qwen-vLLM Profiling Notes",
      href: "qwen-vllm-profiling-notes",
      date: "2026-07-27",
      summary:
        "A placeholder for profiling observations around TTFT, TPOT, throughput, and attention paths.",
    },
  ],
  zh: [
    {
      title: "Agent Memory Benchmark 阅读计划",
      href: "agent-memory-benchmark-reading-plan",
      date: "2026-07-27",
      summary:
        "围绕记忆演化、过期证据和 agent 决策评估维护的阅读地图。",
    },
    {
      title: "Qwen-vLLM Profiling 笔记",
      href: "qwen-vllm-profiling-notes",
      date: "2026-07-27",
      summary:
        "用于整理 TTFT、TPOT、throughput 和 attention 路径分析的工程笔记占位。",
    },
  ],
};
