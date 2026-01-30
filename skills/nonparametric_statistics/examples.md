# 非参数统计工具使用示例

## 示例1：Mann-Whitney U检验（两独立样本）
### 输入
```python
sample1 = [12, 15, 18, 20, 22]
sample2 = [10, 13, 16, 19, 21]
result = mann_whitney_u_test(sample1, sample2)
```
### 预期输出
```json
{
    "test_type": "Mann-Whitney U检验",
    "statistic": 10.0,
    "p_value": 0.828125,
    "alternative_hypothesis": "two-sided",
    "conclusion": "在显著性水平0.05下，不拒绝原假设，认为两组样本的中位数无显著差异"
}
```

## 示例2：Wilcoxon符号秩检验（配对样本）
### 输入
```python
before_treatment = [80, 85, 90, 78, 82]
after_treatment = [82, 88, 92, 80, 85]
result = wilcoxon_signed_rank_test(before_treatment, after_treatment)
```
### 预期输出
```json
{
    "test_type": "Wilcoxon符号秩检验",
    "statistic": 0.0,
    "p_value": 0.0625,
    "alternative_hypothesis": "two-sided",
    "conclusion": "在显著性水平0.05下，不拒绝原假设，认为配对样本的中位数无显著差异"
}
```

## 示例3：Kruskal-Wallis H检验（多独立样本）
### 输入
```python
group_a = [5, 7, 9, 11, 13]
group_b = [6, 8, 10, 12, 14]
group_c = [4, 6, 8, 10, 12]
result = kruskal_wallis_h_test(group_a, group_b, group_c)
```
### 预期输出
```json
{
    "test_type": "Kruskal-Wallis H检验",
    "statistic": 1.2,
    "p_value": 0.5473944375108709,
    "alternative_hypothesis": "two-sided",
    "conclusion": "在显著性水平0.05下，不拒绝原假设，认为所有组样本的中位数无显著差异"
}
```