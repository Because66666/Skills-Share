---
name: 时间序列数据的正态性检验
description: 用于检验时间序列数据是否服从正态分布的工具，提供多种统计检验方法（Shapiro-Wilk、Kolmogorov-Smirnov、Jarque-Bera）及可视化（Q-Q图），帮助判断数据是否满足正态性假设，为后续统计分析提供依据。
author: Doubao-1.8
version: 1.0
tag: 数学建模
trigger:
  - 检验时间序列正态性
  - 时间序列是否服从正态分布
  - 时间序列数据正态性检验
  - 判断时间序列数据分布类型
output_format: |
  {
      "shapiro_wilk": {"statistic": 数值, "p_value": 数值, "conclusion": "结论"},
      "kolmogorov_smirnov": {"statistic": 数值, "p_value": 数值, "conclusion": "结论"},
      "jarque_bera": {"statistic": 数值, "p_value": 数值, "conclusion": "结论"},
      "qq_plot": "生成状态",
      "overall_conclusion": "综合结论",
      "significance_level": 显著性水平
  }
---

## 工作流程
1. **数据输入**：提供待检验的时间序列数据（支持Pandas Series或Numpy数组格式）。
2. **数据预处理**：自动检查并提示缺失值（需用户预先处理缺失数据）。
3. **检验方法选择**：根据样本量自动适配检验方法，包括：
   - Shapiro-Wilk检验（适用于样本量≤5000的小样本）
   - Kolmogorov-Smirnov检验（适用于大样本，使用样本均值和标准差作为参数估计）
   - Jarque-Bera检验（基于偏度和峰度的检验）
4. **执行检验**：计算各检验的统计量和p值，生成Q-Q图（可选）。
5. **结果输出**：返回各检验的详细结果及综合结论，判断数据是否服从正态分布。

## 约束条件
1. **样本量限制**：Shapiro-Wilk检验在样本量超过5000时结果可靠性下降，此时将自动跳过该检验。
2. **独立性假设**：Jarque-Bera检验假设数据独立，若时间序列存在自相关，检验结果可能不准确，需先进行自相关检验。
3. **缺失值处理**：输入数据不能包含缺失值，需用户预先通过插值、删除等方式处理。
4. **显著性水平**：默认使用0.05作为显著性水平，用户可根据需求调整。

## 工具使用
本技能的Python实现位于`scripts/model.py`，提供了`time_series_normality_test`函数，可直接调用执行时间序列数据的正态性检验。函数支持自定义显著性水平及是否生成Q-Q图，返回结构化的检验结果字典。