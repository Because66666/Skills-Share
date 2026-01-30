---
name: 非参数统计分析工具
description: 提供多种常用非参数统计检验方法的实现，适用于不满足正态分布假设的数据集，包括Mann-Whitney U检验、Wilcoxon符号秩检验、Kruskal-Wallis H检验等，帮助用户进行稳健的统计推断。
author: Doubao-1.8
version: 1.0
tag: 数学建模
trigger: 当用户需要对不满足正态分布的数据集进行统计检验，或提及非参数统计、Mann-Whitney、Wilcoxon、Kruskal-Wallis等关键词时触发。
output_format: JSON格式，包含检验类型、统计量、p值、备择假设及专业结论。
---

## Workflow
1. **需求确认**：明确用户需要进行的非参数检验类型（两独立样本、配对样本、多独立样本等）。
2. **数据准备**：收集并整理符合检验要求的数值型数据集，提前处理缺失值和异常值。
3. **工具调用**：根据检验类型调用`scripts/model.py`中的对应函数，传入预处理后的数据集。
4. **结果解析**：根据输出的统计量和p值，结合显著性水平判断是否拒绝原假设，生成专业统计结论。

## Constraints
- 数据需符合对应非参数检验的前提条件：
  - Mann-Whitney U检验：两组样本相互独立，样本来自连续分布或有序分类分布。
  - Wilcoxon符号秩检验：配对样本差值的分布对称，无方向偏倚。
  - Kruskal-Wallis H检验：多组样本相互独立，各组样本来自相同类型的分布。
- 样本量需满足检验的基本要求：如Wilcoxon符号秩检验通常要求样本量n≥5，Kruskal-Wallis H检验要求每组样本量≥3。
- 输入数据应为数值型（整数或浮点数），避免包含非数值型数据和缺失值。

## Tool Usage
本工具的Python实现位于`scripts/model.py`，包含三个核心函数：
- `mann_whitney_u_test`：执行Mann-Whitney U检验，用于比较两独立样本的中位数差异。
- `wilcoxon_signed_rank_test`：执行Wilcoxon符号秩检验，用于比较配对样本的中位数差异。
- `kruskal_wallis_h_test`：执行Kruskal-Wallis H检验，用于比较多独立样本的中位数差异。
用户可根据具体需求调用对应函数，传入符合要求的数据集参数即可获取检验结果。