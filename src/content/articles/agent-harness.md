---
title: 'agent / harness 云里雾里'
date: 2026-10-14
updatedAt: 2026-10-14T18:06:03+08:00
base: '上海'
category: 'AI'
summary: '用“AI 同事与工作系统”的类比，理解 agent、harness 和模型之间的关系，附六篇一手文章的阅读建议。'
featured: true
draft: false
---

AI 领域的新词越来越多。agent 还没完全弄明白，harness 又开始频繁出现：它们分别是什么？有什么区别？为什么一个模型已经很聪明了，还需要围绕它搭这么多东西？

把这两个词放在一起理解，反而容易一些：

**Agent 是围绕一个目标，能自己决定下一步并采取行动的 AI 系统；harness 是让这个系统能够运行、使用工具、保留进度和接受检查的配套机制。**

还有一个容易混淆的地方：它们通常是整体与组成部分的关系。很多文章说的 agent，本身就已经包含了 harness。

以下按截至 2026 年 10 月查阅的一手资料整理。类比是为了帮助理解，具体术语的边界仍要看作者如何定义。

## 1．Agent：能接任务的 AI 同事

假设我需要一份竞品研究报告。

普通问答的方式，是问 AI：

> 竞品分析应该怎么做？

AI 告诉我研究方法、报告结构，然后等我继续提问。

委托 agent 的方式，则可以是：

> 帮我研究这三款产品，比较它们的价格、功能和目标用户，给我一份有来源的报告。

接到目标后，它可能会这样推进：

1. 先查三款产品的官网。
2. 发现其中一家价格不公开，继续查官方帮助中心。
3. 发现某个功能只有企业版提供，修改比较口径。
4. 整理报告，检查每个关键结论有没有证据。
5. 完成交付，或者说明哪些信息仍然无法确认。

关键在于：**我给了目标，AI 根据过程中获得的信息，决定后续怎么做。**

Anthropic 对工作流和 agent 做过一个很有帮助的区分：

| 方式 | 谁决定执行路径？ | 通俗类比 |
| --- | --- | --- |
| 固定工作流 Workflow | 人提前写好主要步骤 | 按既定路线运行的流水线 |
| Agent | 模型根据现场情况动态选择步骤 | 接到任务后自行安排工作的同事 |

这是一个实用的划分方式，不过行业里的产品命名并不总遵守这条边界。[source: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)

Agent 的基本工作方式，可以记成一个循环：

**理解当前情况 → 决定下一步 → 采取行动 → 看结果 → 调整下一步。**

判断一个系统是不是有 agent 特征，除了看它能做什么，更要看：它能否根据行动结果，改变后续行动。

这里的“自己决定”，也不意味着拥有意识、能够无限工作，或者所有事情都不用人介入。它是在给定目标、工具和权限范围内选择行动。

## 2．Harness：让 AI 同事干得成活的工作系统

一个人再聪明，入职后没有电脑、资料、账号、工作记录和验收标准，也很难把工作做好。

模型也类似。模型能够产生判断和工具调用请求，但要把请求变成实际操作，还需要外围软件来执行和协调。

**Harness 可以理解成这套“让 AI 干得成活的工作系统”。** 不必拘泥于它字面上的“马具”翻译。

继续用 AI 同事的类比：

| 工作中需要什么 | Harness 对应负责什么 |
| --- | --- |
| 电脑、浏览器、业务账号 | 接入工具，执行模型提出的操作 |
| 岗位说明、公司规范 | 加载任务指令和相关规则 |
| 工作笔记、项目档案 | 保存状态，供后续继续工作 |
| 从大量资料里找到当前需要的内容 | 管理模型每一步能看到的信息 |
| 操作失败后的处理办法 | 支持重试、恢复或请求人类介入 |
| 预算、权限和审批制度 | 限制花费、访问和操作范围 |
| 验收与工作记录 | 提供检查、反馈和运行记录 |

同一个模型，接入不同的工作系统，实际表现可能差很多。

LangChain 对 harness 采用了较宽的定义：模型之外，围绕它组织起来的代码、配置和执行逻辑，包括工具、状态、执行环境与反馈机制。[source: The Anatomy of an Agent Harness](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness)

不过，harness 的范围还没有完全统一。有人主要指调用模型、执行工具、返回结果的运行循环；有人会把知识组织、验证机制以及工作环境设计也算进去。阅读文章时，要先看作者把边界画在哪里。

## 3．Agent 与 harness：整体和支撑机制

把模型也放进来，三个概念可以这样对应：

| 概念 | 在类比中是什么 | 关注的问题 |
| --- | --- | --- |
| Model，模型 | AI 同事的语言、理解和判断能力 | 能理解什么、能作出什么判断？ |
| Harness | 给这位同事配备的工具、工作机制和约束 | 如何实际执行、继续工作、检查和控制？ |
| Agent | 组合起来、正在承担目标的 AI 工作者 | 能完成什么任务、会如何推进？ |

一个方便记忆的简化表达是：

**Agent ≈ 模型 ＋ Harness，并以“决策—行动—反馈”的方式工作。**

这里的“≈”很重要：给模型套一个聊天界面，也属于某种外围软件，但这并不自动让它成为能自主推进任务的 agent。

再把它落实到一个具体动作：

> AI 正在写竞品报告，发现某项价格信息已经过期。

- **模型作出判断：**这个来源太旧，需要重新查。
- **Harness 执行操作：**接收搜索请求，调用搜索工具，把结果交回模型。
- **Agent 继续完成任务：**根据新结果修改报告，直到满足交付要求。

“该做什么”的判断主要来自模型；“如何把判断变成实际操作，并把结果带回来”主要依赖 harness。整个协作过程构成了 agent 的行为。

## 4．为什么现在越来越重视 harness？

读完这些资料，我的理解是：任务一长，难点就从“这一句答得好不好”，扩展成了“几十步之后还能不能把事情做对”。

Anthropic 在长期运行任务中观察到几类问题：AI 可能一次尝试做太多，在上下文耗尽后留下半成品；也可能看到已有进展，就过早宣布任务完成。

他们通过任务清单、进度记录、逐项推进和实际测试来改善这些问题。[source: Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)

用人的工作经验理解，很像一个聪明同事能否稳定交付，还取决于他有没有清楚的任务、可用的资料、连续的工作记录和可靠的验收方式。

**让 AI 一直运行，与让 AI 持续取得有效进展，是两种工程能力。**

这也能帮助理解经常一起出现的三个词：

- **Prompt engineering，提示词工程：**这件事怎么交代，AI 更容易理解？
- **Context engineering，上下文工程：**AI 此刻需要看到哪些信息？
- **Harness engineering：**怎样组织执行、信息、工具和反馈，让 AI 持续把事情做完？

后两者高度相关，具体范围随作者定义而变。Anthropic 对 context engineering 的重点，是管理模型运行时可见的整套信息，而不只是措辞。[source: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

## 5．值得优先阅读的六篇一手文章

这些文章来自直接构建相关系统的团队，能建立互相补充的认知。它们是一份阅读建议，并非公认的行业排名。下面的中文标题为意译。

### ① 先建立 agent 的基本概念

[Building effective agents｜构建有效的 Agent](https://www.anthropic.com/engineering/building-effective-agents)  
Anthropic · 2024-12-19

重点看它如何区分工作流与 agent，以及什么时候需要动态决策。它能帮助判断一个产品究竟用了什么结构。原文已提醒，部分工具介绍发生了变化，适合优先读架构思想。

### ② 直接理解 harness 的组成

[The Anatomy of an Agent Harness｜Agent Harness 的组成](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness)  
LangChain · 2026-03-10

它从“希望 agent 具备什么行为”倒推所需的系统能力，把文件、工具、上下文管理和长期执行串起来。读它时要记住，这是作者采用的一种宽口径定义。

### ③ 理解为什么聪明的模型还会做不完任务

[Effective harnesses for long-running agents｜长期运行 Agent 的有效 Harness](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)  
Anthropic · 2025-11-26

用具体失败案例解释进度保存、任务拆分、交接和验证的作用。读完会更容易理解：让模型持续运行，还需要机制来帮助它持续取得进展。

### ④ 看 harness engineering 怎样改变团队工作

[Harness engineering: leveraging Codex in an agent-first world｜以 Agent 为核心的软件工程实践](https://openai.com/index/harness-engineering/)  
OpenAI · 2026-02-11

它讨论怎样组织知识、让系统状态可被 agent 读取，以及怎样通过约束和反馈支持交付。这里的视角已经扩展到整个工程环境。文中的效率数字属于该团队实验的自述，阅读时更值得关注其方法和条件。

### ⑤ 理解为什么把资料全塞给 AI，效果未必好

[Effective context engineering for AI agents｜有效的 Agent 上下文工程](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)  
Anthropic · 2025-09-29

模型每一步看到什么、哪些信息应该保留或按需读取，会直接影响它后续怎么做。这篇适合在理解 harness 之后读。

### ⑥ 学会判断一个 agent 到底好不好

[Demystifying evals for AI agents｜讲清 Agent 评估](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)  
Anthropic · 2026-01-09

看懂演示之后，接下来要问的是：它能否反复成功？实际结果是否正确？这篇解释如何评估多轮行动的系统，帮助把“看起来厉害”转化为可以验证的能力。

如果只读三篇，可以按 **① → ② → ③** 的顺序。再看一个 agent 产品时，可以带着三个问题：**谁决定下一步？靠什么执行？凭什么认定做完了？**
