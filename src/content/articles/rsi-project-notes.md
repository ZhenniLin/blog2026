---
title: '蹭到 RSI 项目的不得不整理'
date: 2026-10-14
updatedAt: 2026-10-23T14:39:33+08:00
base: '上海'
category: 'AI'
summary: '从递归自我改进的宏观讨论，到 RSI-Exam 的研究循环，再用虚构的配送规划示例拆解模型、harness、方法程序、自检与隐藏评测的分工，附案例与一手阅读资料。'
featured: true
draft: false
---

## 1．什么是 RSI：先分清大家在讨论哪一种“自我改进”

RSI 是 **Recursive Self-Improvement，递归自我改进**。

一个便于入门的理解是：**系统参与改进自身或自身的研发过程，而改进的结果又被送回后续改进过程。** 至于需要回流到哪一层、是否必须改变模型权重、是否要求完全自动化，不同作者的定义并不一致。

可以把它想成一家生产机器的工厂。

- 工厂生产出一台更好的水泵，是产品改进。
- 工厂改造了自己的生产线，让下一批机器更容易生产，是生产过程改进。
- 新生产线又能帮助设计和制造下一代生产线，开始出现更直接的递归反馈。
- 如果整个循环还能在资源不持续增加的条件下，越来越快地产出技术进步，那又涉及更强的“自我维持加速”主张。

这几件事相关，但需要分别拿证据说明。

### 1.1 理论讨论：系统能否改写自己的改进机制？

Schmidhuber 的 **Gödel Machine** 是理解这一思路的重要历史入口：系统在找到某次自我改写有益的证明后，修改自己的代码；原则上，寻找改进的机制本身也可以被修改。它是一种理论构造，依赖特定形式化假设，不能直接等同于今天已经部署的编程 agent。<sup><a id="cite-1" href="https://arxiv.org/abs/cs/0309048" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 1（新标签页）">[1]</a></sup>

这一层关心的问题是：

> 一台机器，能不能连“自己怎样变得更好”这套办法也一起改进？

### 1.2 工程讨论：具体改进的是程序、agent，还是模型？

为了读懂现实项目，我更愿意先按“被修改对象”分，而不是把所有案例排成一条统一的能力等级。

| 讨论方向 | 主要改什么 | 通俗理解 | 应该继续追问什么？ |
| --- | --- | --- | --- |
| 方法与算法改进 | 求解程序、计算方法、训练配方、优化策略 | 研究员改造仪器或生产工艺 | 新方法能否在未知情况中更好用？ |
| Agent 系统改进 | 工具、提示、记忆、搜索、验证与执行流程 | 改造研究员的工作台和工作方法 | 改进有没有增强后续研究能力？ |
| 模型学习与更新 | 训练数据、损失函数、模型参数等 | 把新经验写进模型的能力中 | 数据质量怎样验证，收益能否泛化？ |
| AI 研发反馈 | 用 AI 改进算法、训练和基础设施，再培养更强 AI | 工厂制造更强的研发设备，再用于下一代工厂 | 整个反馈循环是否真正闭合，瓶颈在哪里？ |

这些方向可以交叉。例如，AI 发现一个更好的训练算法，它先是“算法成果”，被用于训练下一代模型后，又可能进入 AI 研发反馈循环。

相关工作的侧重点也不同：**ADAS** 自动设计 agent 的程序结构；**STaR** 使用筛选后的自生成推理材料反复微调；**STOP** 让一个利用语言模型改进程序的“改进器”，再去改进它自己。STOP 的作者还明确提醒，底层语言模型没有改变，因此他们不把它称为完整的 RSI。<sup><a id="cite-2" href="https://arxiv.org/abs/2408.08435" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 2（新标签页）">[2]</a></sup><sup><a id="cite-3" href="https://arxiv.org/abs/2203.14465" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 3（新标签页）">[3]</a></sup><sup><a id="cite-4" href="https://arxiv.org/abs/2310.02304" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 4（新标签页）">[4]</a></sup>

所以，“有没有改权重”是一个重要维度，却不能独自回答“系统有没有发生自我改进”。反过来，仅仅改了某个程序，也还不足以证明强意义的递归反馈。

### 1.3 宏观讨论：自动化研发会不会带来持续加速？

经济学视角进一步关心：AI 让研发更快，研发又让 AI 更强，这个循环会不会越转越快？

有关 RSI 的经济学研究把反馈、研发可自动化、自我维持加速与智能爆炸分开讨论。其分析强调反馈强度、收益递减和瓶颈；2026 年 7 月版本中的粗略校准尚未支持“已经形成自我维持加速”，这是一项依赖模型与参数估计的研究结论。<sup><a id="cite-5" href="https://elasticity.institute/rsi-paper.pdf" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 5（新标签页）">[5]</a></sup>

可以把它理解为：生产线设计得再聪明，如果供电、材料或检验能力跟不上，全厂的产出也未必不断加速。

**“AI 帮助 AI 研发”是一种可以观察的活动；“因此必然出现失控式加速”是另一项需要额外证据的判断。**

### 1.4 我会怎样辨认一个 RSI-related 项目？

先问四个问题：

1. **谁提出改动？** 是人、固定搜索程序，还是模型驱动的 agent？
2. **具体改了什么？** 是答案、方法程序、agent 系统，还是模型参数？
3. **改进结果回到哪里？** 只留下一个产品，还是用于下一轮研究与改进？
4. **怎样证明变好了？** 是同一批题分数变高，还是独立测试、真实部署或研究效率也有改善？

让 AI 回看并修正一次回答，可以是有用的反馈过程。但如果没有持久的方法变化，也没有证据说明下一轮改进能力提高，就不宜直接把它当成强 RSI 的实现。

## 2．RSI 为什么会产生：当 AI 开始承担研发中的工作

RSI 的思想并不新。最近的工程实践之所以更密集，我的理解是几个条件开始凑到一起。这是对下列工作的归纳，不是一条经过统一验证的行业发展定律。

### 2.1 AI 的输出开始可以直接成为实验对象

一段研究建议，需要人把它变成实验；一段可运行的代码，则可以直接编译、执行、测量。

当模型能修改训练脚本、计算方法和工具流程时，研究过程中的一部分步骤，就有机会交给软件连续执行：提出候选方案，运行实验，再利用结果调整下一步。

**FunSearch** 是一个清晰的例子：语言模型提出程序，自动评估器检验，较好的程序进入后续搜索。作者报告了 cap set 问题的新构造，以及更有效的装箱启发式。这里最值得留意的是“可检查的程序＋外部检验”的组合。<sup><a id="cite-6" href="https://deepmind.google/blog/funsearch-making-new-discoveries-in-mathematical-sciences-using-large-language-models/" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 6（新标签页）">[6]</a></sup>

### 2.2 某些领域已经具备便宜而明确的反馈

排序是否正确、程序运行多快、模型验证损失有没有下降，都比“这个想法听起来好不好”更容易量化。

在这种条件下，AI 可以更频繁地尝试，再用实验筛选。**AlphaEvolve** 把语言模型、自动评估与程序演化结合起来；DeepMind 报告其成果被用于数据中心调度、芯片设计和 AI 训练优化。它说明局部算法发现可以产生实际价值，但并不因此证明整个 AI 研发已经完全自动化。<sup><a id="cite-7" href="https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 7（新标签页）">[7]</a></sup>

这也解释了为什么很多早期案例集中在代码、数学、优化与机器学习：这些场景更容易把某些研究问题转换成可执行实验。需要长期临床观察或昂贵实体实验的研究，节奏就很不一样。

### 2.3 研究本身包含大量可以组织起来的重复劳动

研究当然有原创判断，但也包含读日志、定位误差、维护脚本、记录版本、重复测试等工作。

如果这些步骤可以连续运行，人就不必每一次都亲自接过结果，再手动安排下一条命令。Karpathy 的 **autoresearch** 把这一思路收得很小：让 agent 修改训练代码，在固定实验预算下运行、检查指标、保留或丢弃改动，再继续尝试。<sup><a id="cite-8" href="https://github.com/karpathy/autoresearch" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 8（新标签页）">[8]</a></sup>

值得注意的是，跑得更久不自动等于研究得更好。**RE-Bench** 把时间预算和研究工程能力放在一起评估；**AIRS-Bench** 则考察从想法到实验分析、迭代完善的研究过程。二者都帮助把“看起来会研究”转换成更具体的测量问题。<sup><a id="cite-9" href="https://arxiv.org/abs/2411.15114" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 9（新标签页）">[9]</a></sup><sup><a id="cite-10" href="https://arxiv.org/abs/2602.06855" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 10（新标签页）">[10]</a></sup>

### 2.4 改善研发工具，可能让收益反复发生

如果 AI 写好一个一次性报告，收益主要在这次报告上。如果它改进了一个后续会反复使用的训练算子、研究工具或实验选择策略，收益就可能在未来多次发生。

这正是 RSI 吸引人的地方：人们期待改进的不只是当前产品，还有生产下一批改进的能力。

截至查阅时，Sakana AI 已公开介绍其 **RSI Lab**，把相关研究目标表述为用 AI 重新设计 AI 开发过程。这可以作为当前研究机构如何组织和定义方向的材料；机构愿景仍需要与具体实验证据分别阅读。<sup><a id="cite-11" href="https://sakana.ai/rsi-lab/" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 11（新标签页）">[11]</a></sup>

## 3．RSI-Exam 在宏观图景里，扮演什么角色？

我把 RSI-Exam 理解成：**用可执行研究任务，测量 agent 能否持续改进一种方法，并让改进在未知情况中成立。**

官方介绍把可改进对象分为直接求解任务的方法，以及驱动冻结模型的 harness；强调持续实验、提交可执行产物、隐藏集重跑与可检查的研究轨迹，研究范围不要求修改研究模型的权重。<sup><a id="cite-12" href="https://rsi-exam.ai/blog.html" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 12（新标签页）">[12]</a></sup><sup><a id="cite-13" href="https://rsi-exam.ai/" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 13（新标签页）">[13]</a></sup><sup><a id="cite-14" href="https://huggingface.co/datasets/RSI-Exam/RSI-Exam/tree/main" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 14（新标签页）">[14]</a></sup>

### 3.1 它更像研究能力考场，而不是某一种自我改进算法

继续用实验室的类比：

| 组成 | 在类比中是什么 |
| --- | --- |
| 研究模型和它的 harness | 来参加考核的研究员及其工作系统 |
| 初始方法 | 一台能用、但还值得改造的仪器 |
| 公开数据和开发反馈 | 资料、实验材料与练习反馈 |
| 时间与计算预算 | 实验室资源 |
| 最终方法 | 研究员改造后交付的仪器 |
| 隐藏评测 | 把仪器放到新的条件下验收 |
| Traces | 操作记录和实验过程档案 |

它提供的是考核安排。参加者具体怎样诊断问题、设计实验和修改方法，则由研究模型在给定工作系统中推进。

### 3.2 它测的是通往 RSI 的重要能力，不等于证明完整 RSI 已经发生

在宏观反馈链上，可以把它放在这个位置：

**研究能力 → 可执行的方法改进 → 独立验证 → 被真实研发采用 → 帮助下一轮 AI 研究。**

对一个具体任务，RSI-Exam 可以直接提供前面若干环节的证据。最后是否被真实研发采用，以及有没有增强下一轮研究能力，需要再观察。

例如，一个 agent 改进了配送规划算法，可以先说明它产生了更好的求解方法。如果成果没有进一步用于增强研究系统，就还不足以说明宏观递归反馈已经闭合。

### 3.3 为什么用最终程序表现，来观察研究模型？

这里有三个对象：

- **被评价的研究者：**承担分析、实验和代码改进工作的模型及其运行配置。
- **被改造的研究对象：**算法程序、训练方案，或服务目标模型的 harness。
- **测量媒介：**最终产物在规定测试中的表现，以及过程与资源记录。

像评价工程师，可以检查他改造的机器。机器是研究成果，工程师是被评价的人。二者没有矛盾。

不过，最终产物的成绩只反映特定任务和条件下的成果，不能单独揭示所有研究能力，更不能自动排除 harness、预算与随机性的影响。

## 4．RSI-Exam 的抽象机制：交付一种能继续工作的办法

把细节暂时拿掉，一次运行可以理解成下面五步。这里是依据公开协议整理的说明流程，不是统一的 API 定义。

### 4.1 给出任务、起点与规则

研究 agent 获得一个目标、一份能运行的初始方法、允许使用的材料，以及接口、预算和评分规则。

有了初始方法，它需要回答的就更像“为什么现在做得不够好，以及如何改进”，而不是只从空白开始写一个东西。

### 4.2 根据问题提出改动

研究者观察代码与数据，形成假设：当前瓶颈是在建模、搜索、工具调用、数据处理，还是某个实现细节？

假设必须落实成可以执行的改动，才有机会接受实验检验。

### 4.3 在开发反馈下反复实验

**观察 → 假设 → 改动 → 测量 → 判断 → 保留或回退 → 下一轮。**

同一轮反馈可能支持继续，也可能说明该换方向。一个研究 agent 的能力，既表现在提出好主意，也表现在识别失败、避免重复走死路。

### 4.4 保存过程，选定交付版本

代码版本说明“实际上改了什么”；实验笔记说明“研究者怎样解释”；工具轨迹说明“实际做过什么操作”。三个视角合起来，才比较容易还原研究过程。

最终需要选定一个符合提交接口的产物。版本号最大、练习分最高、研究者认为最可能泛化，这三种选择可能并不相同。

### 4.5 在独立条件下重跑

最终评测接收选定产物，在规定的隐藏输入和资源下执行，并计算成绩。研究 agent 不应利用隐藏成绩继续选择版本，否则隐藏集就会逐渐变成新的开发集。

可以把 Visible 理解成反复用于练习和选方案的材料，把 Hidden 理解成最终检验。并不是 Visible 一定没有用，而是反复适应它之后，需要另一份证据检验推广能力。

## 5．代码层：用一个教学示例，把各个角色放回位置

**本节用虚构的配送任务解释分工。5.2 的文件层级引用公开的 RSI-Exam 任务与 Harbor 文档；其余业务函数、示意文件名和实验过程为教学设计，不是具体运行实录，也不是 RSI-Exam 的统一接口。**

假设任务是优化配送路线：给定订单、路段成本和车辆限制，程序需要安排配送顺序，在满足约束的前提下减少总成本。

我们沿着这个例子，看看谁在研究、谁在求解，以及评测如何发生。

### 5.1 先分清两条路线：有些任务没有目标大模型

**路线 A：直接改进求解算法。**

```text
研究 agent → 修改路线规划程序
规划程序 ＋ 允许的数据 ＋ 新订单 → 配送方案
```

这个示例采用路线 A。最终求解者是普通程序，运行时可以不调用大模型。

**路线 B：改进调用目标模型的办法。**

```text
研究 agent → 修改方法程序／目标模型的 harness
方法程序 → 组织输入、工具、搜索与验证 → 调用冻结的目标模型
目标模型的输出 → 方法程序继续处理 → 最终解答
```

后一类才需要进一步区分研究模型与目标模型：前者设计和修改方法，后者在方法的组织下参与求解。

“目标模型不一定看到方法程序源码”，说的也是这种分工：程序可以生成提示、调用模型、检查回答，但没有把自身完整源码发送给模型。**程序是协调者，被调用的目标模型是参与求解的组件。**

所以，理解一个任务时，应该先看实际调用关系，再判断是否存在目标大模型。

### 5.2 文件怎样组织：真实的 RSI-Exam / Harbor 层级

Harbor 用任务目录组织说明、配置、运行环境与验证入口。`instruction.md` 说明任务，`task.toml` 配置运行参数，`environment/` 定义环境，`tests/test.sh` 是验证入口。<sup><a id="cite-15" href="https://docs.harborframework.com/tasks/overview" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 15（新标签页）">[15]</a></sup>

下面以 RSI-Exam 已公开的 `game2048_policy_search` 为例，列出其实际文件层级；省略 `.dockerignore`。这是公开的 2048 策略优化任务，不是下文虚构的配送任务。<sup><a id="cite-16" href="https://huggingface.co/datasets/RSI-Exam/RSI-Exam/tree/main/game2048_policy_search" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 16（新标签页）">[16]</a></sup>

```text
game2048_policy_search/
├── instruction.md              任务说明
├── task.toml                   资源、运行与评测配置
├── environment/
│   ├── Dockerfile              开发环境构建
│   ├── docker-compose.yaml     容器运行配置
│   ├── game2048.py             游戏逻辑
│   ├── evaluate.py             评估辅助程序
│   ├── selfcheck.py            开发自检
│   ├── visible_seeds.json      开发场景种子
│   └── methods/
│       └── main/
│           └── policy.py       初始策略代码
└── tests/
    ├── Dockerfile              评测环境构建
    ├── test.sh                 Harbor 验证入口
    ├── grade.py                评分逻辑
    ├── evaluate.py             评测辅助程序
    ├── game2048.py             评测使用的游戏逻辑
    ├── heldout_seeds.json      独立评测场景种子
    └── policy_sandbox.py       策略隔离执行逻辑
```

读这个结构时，可以沿着三条关系理解：

- **任务说明与配置：**先确认目标、接口、资源和提交约定。
- **开发环境与方法：**研究 agent 在准备好的环境里改进策略，并使用开发自检获得反馈。
- **验证入口与评分：**外层框架调用验证入口，具体执行和评分由任务自己的评测代码组织。

任务目录、容器内的工作目录与一次运行生成的日志，是不同层次。`Dockerfile` 决定文件怎样放进运行环境；代码快照、实验笔记与轨迹如何保存，则取决于任务和运行系统，不能把虚构的 `records/` 当成 Harbor 规定的任务层级。

这份公开任务的顶层没有列出 `solution/`；Harbor 通用格式文档还展示了 `solution/solve.sh` 这一层。阅读时应以实际发布目录为准，不要把通用格式图里的附加内容直接当成每份公开任务都具有的文件。

**这里引用真实公开结构，后面的配送示例继续只解释算法与角色分工，不复述该任务的策略实现、评测数据或运行成绩。**

### 5.3 研究模型与 harness：研究员和工作系统

在这个例子里，把负责研究的大模型叫作 **R**，把它使用的代码工作台叫作 **H**。

| 部分 | 职责 | 类比 |
| --- | --- | --- |
| 研究模型 R | 提出假设、生成代码修改、解释实验结果、决定下一步 | 研究员 |
| Harness H | 组织上下文、执行工具操作、返回结果、维护运行状态 | 研究员的工作系统 |
| 路线规划程序 | 根据既定算法生成配送方案 | 正在被改造的仪器 |

例如，R 决定修改访问顺序的搜索方式，生成代码和写文件请求；H 通过工具执行操作，再把运行结果交回 R。

工具执行了写文件，不代表另一个隐藏的模型替研究员完成了方案设计。**判断研究者是谁，要看实际负责生成与决策的模型，而不是仅看工作台的产品名称。**

同时，H 也不是毫无影响的容器。工具接口、上下文组织和失败恢复方式，都会影响 R 能完成哪些工作。因此“方案由 R 提出”与“结果只受 R 影响”，是两个不同的判断。

### 5.4 输入和输出：提交的是规划办法

把方法接口简化成一个函数，可以写成：

```python
# 教学接口示意，不是实际任务的函数签名。
def plan_routes(orders, travel_costs, vehicle_limits):
    """返回每辆车负责的订单与访问顺序。"""
    ...
```

其中：

- `orders` 是待配送订单与相关要求。
- `travel_costs` 是题目直接给定的路段距离、时间或其他成本，程序直接使用。
- `vehicle_limits` 表示容量、工时等限制。
- 返回值是一份可检查的配送安排。

为了运行实验，也可以给它提供一个命令行入口：

```bash
python route_solver.py --scenario sample_orders.json --result plan.json
```

这些文件名和参数都只是示意。关键在于：研究者交付的是生成方案的程序；某批订单的配送安排，是这份程序运行之后的结果。

**优化方法与优化某一道题的答案，需要分开理解。** 一份只记住开发订单的安排，不能自动解决后来出现的新订单。

### 5.5 研究 AI 到底改什么？

假设初始程序用一个简单规则：每次优先安排附近的下一个订单，车辆装满后再安排下一辆。

它可以生成方案，却可能出现绕路、车辆之间分配不均，或者局部看起来很近、整体成本却很高的情况。

研究 AI 可以提出不同方向的改进：

| 改进方向 | 示意函数 | 通俗解释 |
| --- | --- | --- |
| 改善初始分配 | `make_initial_routes` | 先把合适的订单分到同一辆车上 |
| 调整单条路线的访问顺序 | `reorder_stops` | 看能不能减少来回绕路 |
| 在不同车辆间交换订单 | `rebalance_routes` | 避免一辆车很忙、另一辆车还有空间 |
| 搜索多个候选方案 | `search_candidates` | 多尝试几种安排，再比较合法方案的成本 |
| 在搜索中及时检查约束 | `check_constraints` | 避免把更便宜但无法执行的方案当成进步 |

这些方向不要求同时实现，也不保证每一种都有效。它们展示的是研究空间：可以改订单分配、搜索策略、候选生成方式和约束处理。

最终生成配送方案时，规划程序直接使用题目给定的路段成本与车辆限制，按照当前算法安排路线。大模型的贡献，体现在它设计和修改了怎样的规划过程。

### 5.6 一轮研究怎样推进：从假设到保留或回退

可以设计这样一段假想研究过程，帮助理解每一步在做什么：

| 候选方案 | 假设与改动 | 用来解释的判断逻辑 |
| --- | --- | --- |
| 起点方案 | 按就近规则逐步安排订单 | 先确认原方法能运行，建立参照 |
| 候选甲 | 对每辆车的访问顺序进行局部重排 | 检查是否减少绕路，并维持约束合法 |
| 候选乙 | 加入车辆之间的订单交换 | 检查收益是否适用于不同订单分布 |
| 候选丙 | 大幅增加搜索范围 | 即使某些样本更好，也可能因资源开销不合适而放弃 |

这张表没有实际实验成绩，也不代表某条真实轨迹的顺序。它想说明：**提出更复杂的方案，和得到更合适的研究成果，不是同一件事。**

研究 AI 还可以在开发材料中自行构造额外检查，例如订单集中、分散或资源紧张的场景。它需要解释某次收益是否稳健，而不只是反复追逐同一批样本的分数。

这些检查仍属于开发过程。最终隐藏评测应留作独立验收，不能再拿来指导这一轮的版本选择。

### 5.7 谁做 self-check，谁记录版本？

“研究模型调用工具”和“被调用程序执行计算”，是两层职责。

| 动作 | 谁发起或决定？ | 谁实际执行？ |
| --- | --- | --- |
| 修改规划算法 | 研究模型 R | Harness 的文件工具 |
| 发起开发检查 | 研究模型 R | 运行工具启动检查程序 |
| 生成路线 | 按当前算法计算 | 路线规划程序 |
| 检查合法性、计算成本 | 按固定评估规则 | 开发检查程序 |
| 保留或回退候选 | 研究模型 R | 文件或版本管理工具 |
| 保存快照与实验笔记 | 研究模型 R 安排 | 文件或版本管理工具 |
| 记录消息和工具结果 | 运行系统 | 自动记录机制 |
| 最终独立验收 | 外层评测流程 | 受保护的评测程序 |

例如，R 调用 `quick_check.py` 后，检查程序可以读取开发场景，运行当前规划方法，验证输出，再返回成本、违规情况和耗时。

**Self-check 是自动实验与检查。如何解释反馈、下一步改哪里，仍由研究模型判断。**

三类记录也应该分开：实验笔记记录研究者的解释；代码快照记录候选方法；运行轨迹记录消息与工具操作。要核对最终交付内容，应检查实际文件或版本标识，而不只相信笔记中的总结。

### 5.8 最后选定什么？评测环境怎样运行？

这里就是最终考试：**研究阶段结束后，把迭代后选定的方法程序放进独立评测环境，在 Hidden 题目上运行并评分。** Hidden 指未用于开发与选方案的测试场景；独立评测环境则是运行这场考试的地方。

在配送示例中，提交的是选定的路线规划程序，评测时再由它为新的订单生成配送方案。开发阶段可以根据 Visible 反馈继续改方法；到了这一步，就只运行并验收选定版本，不再由研究模型临场修改，也不使用 Hidden 成绩继续挑版本。

评测流程可以表示为：

```text
评测入口准备 Hidden 订单场景
        ↓
输入适配层只传递规则允许的材料
        ↓
在独立运行环境中执行选定方法
        ↓
规划程序输出配送方案
        ↓
评测程序检查约束、计算成本并记录成绩
```

隔离执行是为了把候选程序与受保护的评测材料、评分控制分开。具体权限、进程与数据传递方式，可以有多种实现。

这里考官不必拿着每个场景的“最优答案”：配送方案可以直接根据约束与成本规则检验。这也提醒我，**评测既可能对照真实测量值，也可能计算目标函数或检查约束，不能给所有领域套用同一种阅卷方式。**

最终指标如何映射成分数，需要另行规定。某个归一化分数不能自动当成准确率，也不等于已经找到理论最优方法。

## 6．相关案例与阅读路线：每份材料解决一个问题

“行业 top”很难有客观统一的榜单。我更愿意选能看见原始主张、实验与实现的一手材料，再说明它值得读在哪里。以下案例取得的是各自论文或项目范围内的成果，不代表它们已经实现完整、持续加速的 RSI。

### 6.1 先用几个案例建立对照

| 案例 | 主要改进对象与成果 | 对理解 RSI 的帮助 | 需要保留的边界 |
| --- | --- | --- | --- |
| FunSearch<sup><a id="cite-6-2" href="https://deepmind.google/blog/funsearch-making-new-discoveries-in-mathematical-sciences-using-large-language-models/" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 6（新标签页）">[6]</a></sup> | 通过程序搜索取得数学构造与装箱算法成果 | 看懂候选程序、评估器和保留机制怎样合作 | 程序搜索成功，尚不等于改进了搜索者本身 |
| AlphaEvolve<sup><a id="cite-7-2" href="https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 7（新标签页）">[7]</a></sup> | 算法发现与计算基础设施优化 | 连接可执行成果与 AI 研发基础设施 | 局部收益需要和完整研发反馈区分 |
| autoresearch<sup><a id="cite-8-2" href="https://github.com/karpathy/autoresearch" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 8（新标签页）">[8]</a></sup> | Agent 修改训练程序，按实验指标保留或丢弃 | 用小项目看懂自动实验循环 | 研究模型与脚本训练出的模型是两种角色 |
| Darwin Gödel Machine<sup><a id="cite-17" href="https://sakana.ai/dgm/" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 17（新标签页）">[17]</a></sup> | 修改编程 agent 自身的代码，报告了编程基准上的提升 | 更直接地观察改进 agent、再继续产生改进 | 实证改进受任务、预算和评估范围限制 |
| ADAS<sup><a id="cite-2-2" href="https://arxiv.org/abs/2408.08435" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 2（新标签页）">[2]</a></sup> | Meta agent 搜索并编写新的 agent 设计 | 看懂工作流程和工具组织也能成为搜索对象 | 自动设计 agent 不必然意味着自主更新模型权重 |
| STaR<sup><a id="cite-3-2" href="https://arxiv.org/abs/2203.14465" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 3（新标签页）">[3]</a></sup> | 用筛选后的自生成推理反复微调 | 补上模型参数学习这一条路线 | 数据验证与泛化仍需独立检查 |
| STOP<sup><a id="cite-4-2" href="https://arxiv.org/abs/2310.02304" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 4（新标签页）">[4]</a></sup> | 让利用语言模型的程序改进器改进自己 | 直接追问“改进者有没有被改进” | 作者明确没有宣称底层 LM 也被更新 |

DGM 特别值得与前面的配送规划示例对照：配送示例改的是求解算法；DGM 让编程 agent 改自己的工具和工作代码，并以编程任务验证。它还保留多种 agent 作为后续探索的起点，而不是只沿一条版本线不断替换。<sup><a id="cite-17-2" href="https://sakana.ai/dgm/" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 17（新标签页）">[17]</a></sup>

这些案例中，可执行反馈、保留机制和研究对象的选择，比笼统说“让 AI 自己变聪明”更能解释实际发生了什么。

### 6.2 如果只先读四份

**第一份：先了解 RSI-Exam 的评估协议。**<sup><a id="cite-12-2" href="https://rsi-exam.ai/blog.html" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 12（新标签页）">[12]</a></sup>

先建立任务、产物、实验、隐藏验证与轨迹之间的关系。阅读时特别注意它给自己设定的测量范围。

**第二份：看一个最小化的自动实验流程。**<sup><a id="cite-18" href="https://github.com/karpathy/autoresearch/blob/master/program.md" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 18（新标签页）">[18]</a></sup>

对照 README 看哪些代码允许修改、指标怎样计算、每次实验怎样记录。它将单次训练实验设为五分钟，主要修改 `train.py`，而数据与评估相关的 `prepare.py` 保持固定，适合观察改进对象与评估边界怎样分开。

**第三份：看 agent 怎样改进自己的工具与工作流程。**<sup><a id="cite-17-3" href="https://sakana.ai/dgm/" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 17（新标签页）">[17]</a></sup>

带着一个问题读：新 agent 的哪些改变，能够帮助它继续制造更好的 agent？不要只看最终分数。

**第四份：理解宏观反馈与加速条件。**<sup><a id="cite-5-2" href="https://elasticity.institute/rsi-paper.pdf" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 5（新标签页）">[5]</a></sup>

用于把局部算法与 agent 的成果，放回反馈、资源和瓶颈的宏观讨论，避免从局部成功直接跳到无限加速。

### 6.3 按问题继续深入

| 想理解的问题 | 引用 | 阅读重点 |
| --- | --- | --- |
| 自我改写的理论起点 | <sup><a id="cite-1-2" href="https://arxiv.org/abs/cs/0309048" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 1（新标签页）">[1]</a></sup> | 哪些保证依赖形式化证明与假设 |
| 怎样改进“改进器” | <sup><a id="cite-4-3" href="https://arxiv.org/abs/2310.02304" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 4（新标签页）">[4]</a></sup> | 输入程序、效用函数与递归应用的关系 |
| 怎样自动发现 agent 的结构 | <sup><a id="cite-2-3" href="https://arxiv.org/abs/2408.08435" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 2（新标签页）">[2]</a></sup> | Meta agent、代码表达与历史档案 |
| 怎样用生成经验更新模型 | <sup><a id="cite-3-3" href="https://arxiv.org/abs/2203.14465" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 3（新标签页）">[3]</a></sup> | 正确性筛选与微调循环 |
| 怎样组合模型提案与程序评估 | <sup><a id="cite-6-3" href="https://deepmind.google/blog/funsearch-making-new-discoveries-in-mathematical-sciences-using-large-language-models/" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 6（新标签页）">[6]</a></sup> | 候选程序池和外部检验 |
| 算法发现怎样进入实际计算系统 | <sup><a id="cite-7-3" href="https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 7（新标签页）">[7]</a></sup> | 可验证的改动与落地证据 |
| 怎样测量 AI 研发工程能力 | <sup><a id="cite-9-2" href="https://arxiv.org/abs/2411.15114" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 9（新标签页）">[9]</a></sup> | 时间预算、人类参照和 agent 配置 |
| 怎样测试更完整的科学研究过程 | <sup><a id="cite-10-2" href="https://arxiv.org/abs/2602.06855" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 10（新标签页）">[10]</a></sup> | 不提供初始基线代码时如何开展研究 |
| 当前机构怎样组织 RSI 研究 | <sup><a id="cite-11-2" href="https://sakana.ai/rsi-lab/" target="_blank" rel="noopener noreferrer" aria-label="打开参考资料 11（新标签页）">[11]</a></sup> | 区分研究路线、现有结果与未来愿景 |

## Reference

按正文首次引用顺序编号；正文中的数字引用直接在新标签页打开原始资料，条目后的 ↩ 返回正文首次引用处。

1. <span id="ref-1"></span>[Gödel Machines: Self-Referential Universal Problem Solvers Making Provably Optimal Self-Improvements](https://arxiv.org/abs/cs/0309048) — 自我改写的理论背景，阅读时注意形式化假设与证明条件。 <a href="#cite-1" aria-label="返回正文引用 1">↩</a>

2. <span id="ref-2"></span>[Automated Design of Agentic Systems](https://arxiv.org/abs/2408.08435) — 自动搜索并编写 agent 的程序结构。 <a href="#cite-2" aria-label="返回正文引用 2">↩</a>

3. <span id="ref-3"></span>[STaR: Bootstrapping Reasoning With Reasoning](https://arxiv.org/abs/2203.14465) — 利用筛选后的自生成推理材料进行迭代微调。 <a href="#cite-3" aria-label="返回正文引用 3">↩</a>

4. <span id="ref-4"></span>[Self-Taught Optimizer (STOP): Recursively Self-Improving Code Generation](https://arxiv.org/abs/2310.02304) — 让利用语言模型的程序改进器改进自身。 <a href="#cite-4" aria-label="返回正文引用 4">↩</a>

5. <span id="ref-5"></span>[The Economics of Recursive Self-Improvement](https://elasticity.institute/rsi-paper.pdf) — PDF；从反馈、收益递减、资源与瓶颈分析宏观加速。 <a href="#cite-5" aria-label="返回正文引用 5">↩</a>

6. <span id="ref-6"></span>[FunSearch: Making new discoveries in mathematical sciences using Large Language Models](https://deepmind.google/blog/funsearch-making-new-discoveries-in-mathematical-sciences-using-large-language-models/) — Google DeepMind 官方介绍，展示程序搜索与自动评估的结合。 <a href="#cite-6" aria-label="返回正文引用 6">↩</a>

7. <span id="ref-7"></span>[AlphaEvolve: A Gemini-powered coding agent for designing advanced algorithms](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/) — Google DeepMind 官方介绍，涵盖算法发现与计算基础设施应用。 <a href="#cite-7" aria-label="返回正文引用 7">↩</a>

8. <span id="ref-8"></span>[Karpathy / autoresearch：项目 README 与代码](https://github.com/karpathy/autoresearch) — 自动训练实验项目的整体说明与实现。 <a href="#cite-8" aria-label="返回正文引用 8">↩</a>

9. <span id="ref-9"></span>[RE-Bench: Evaluating frontier AI R&D capabilities of language model agents against human experts](https://arxiv.org/abs/2411.15114) — 结合时间预算、人类参照和 agent 配置评价研究工程能力。 <a href="#cite-9" aria-label="返回正文引用 9">↩</a>

10. <span id="ref-10"></span>[AIRS-Bench: a Suite of Tasks for Frontier AI Research Science Agents](https://arxiv.org/abs/2602.06855) — 考察不提供初始基线代码时的研究过程。 <a href="#cite-10" aria-label="返回正文引用 10">↩</a>

11. <span id="ref-11"></span>[Introducing Sakana AI’s Recursive Self-Improvement (RSI) Lab](https://sakana.ai/rsi-lab/) — 机构对 RSI 研究路线、已有工作与愿景的介绍。 <a href="#cite-11" aria-label="返回正文引用 11">↩</a>

12. <span id="ref-12"></span>[RSI-Exam: Benchmarking Recursive Self-Improvement through Executable Research](https://rsi-exam.ai/blog.html) — 官方博客，说明任务协议、实验安排、结果与轨迹分析。 <a href="#cite-12" aria-label="返回正文引用 12">↩</a>

13. <span id="ref-13"></span>[RSI-Exam 官网](https://rsi-exam.ai/) — 项目入口。 <a href="#cite-13" aria-label="返回正文引用 13">↩</a>

14. <span id="ref-14"></span>[RSI-Exam：Hugging Face 公开文件目录](https://huggingface.co/datasets/RSI-Exam/RSI-Exam/tree/main) — 查看当前公开任务与文件；具体实现以下载版本为准。 <a href="#cite-14" aria-label="返回正文引用 14">↩</a>

15. <span id="ref-15"></span>[Harbor — Task overview](https://docs.harborframework.com/tasks/overview) — 官方任务格式文档，说明任务目录与验证入口。 <a href="#cite-15" aria-label="返回正文引用 15">↩</a>

16. <span id="ref-16"></span>[RSI-Exam — game2048_policy_search 公开任务](https://huggingface.co/datasets/RSI-Exam/RSI-Exam/tree/main/game2048_policy_search) — 本文 5.2 目录层级的公开来源，可逐层查看环境、策略与评测文件。 <a href="#cite-16" aria-label="返回正文引用 16">↩</a>

17. <span id="ref-17"></span>[The Darwin Gödel Machine: AI that improves itself by rewriting its own code](https://sakana.ai/dgm/) — Sakana AI 官方介绍，展示 agent 自我修改与开放式探索。 <a href="#cite-17" aria-label="返回正文引用 17">↩</a>

18. <span id="ref-18"></span>[autoresearch / program.md](https://github.com/karpathy/autoresearch/blob/master/program.md) — 研究指令，规定可修改文件、实验预算、评价指标与结果记录。 <a href="#cite-18" aria-label="返回正文引用 18">↩</a>
