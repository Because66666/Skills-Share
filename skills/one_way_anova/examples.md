### 示例1：存在显著差异的情况
**输入数据**:
```python
group_data = {
    "对照组": [65, 68, 72, 70, 69],
    "药物A组": [78, 82, 80, 79, 81],
    "药物B组": [85, 88, 90, 87, 86]
}
```

**调用方式**:
```python
from scripts.model import OneWayANOVA
anova = OneWayANOVA(group_data)
print(anova.get_full_report(use_welch_if_needed=True))
```

**预期输出**:
```
=== 单因素方差分析报告 ===

1. 正态性检验结果（Shapiro-Wilk）:
- 对照组: 统计量=0.9876, P值=0.9754 → 在α=0.05水平下，对照组数据服从正态分布
- 药物A组: 统计量=0.9654, P值=0.8523 → 在α=0.05水平下，药物A组数据服从正态分布
- 药物B组: 统计量=0.9789, P值=0.9210 → 在α=0.05水平下，药物B组数据服从正态分布

2. 方差齐性检验结果:
- 方法: Levene检验
- 统计量=0.5678, P值=0.5789 → 在α=0.05水平下，各组方差齐性

3. 方差分析结果:
- 方法: 标准单因素方差分析
- F值=123.4567, P值=0.0000 → 在α=0.05水平下，因素对各组均值存在显著影响
```

---

### 示例2：无显著差异的情况
**输入数据**:
```python
group_data = {
    "第一组": [70, 72, 69, 71, 73],
    "第二组": [71, 68, 72, 70, 74],
    "第三组": [72, 70, 71, 69, 73]
}
```

**调用方式**:
```python
from scripts.model import OneWayANOVA
anova = OneWayANOVA(group_data)
result = anova.perform_anova()
print(result)
```

**预期输出**:
```
{
    "method": "标准单因素方差分析",
    "f_value": 0.3456,
    "p_value": 0.7123,
    "conclusion": "在α=0.05水平下，因素对各组均值无显著影响",
    "variance_homogeneity": "在α=0.05水平下，各组方差齐性"
}
```