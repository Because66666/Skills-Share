# 分类变量独立性检验使用示例

## 示例1：性别与饮品偏好的独立性检验
### 输入数据
列联表（行：性别，列：饮品偏好）：
| 性别   | 茶 | 咖啡 |
|--------|----|------|
| 男性   | 20 | 30   |
| 女性   | 30 | 20   |

### 调用方式
```python
from scripts.model import categorical_independence_test

contingency_table = [
    [20, 30],
    [30, 20]
]
result = categorical_independence_test(contingency_table)
print(result)
```

### 预期输出
```python
{
    'chi2_statistic': 4.0,
    'p_value': 0.0455,
    'degrees_of_freedom': 1,
    'expected_frequencies': [[25.0, 25.0], [25.0, 25.0]],
    'conclusion': '在显著性水平0.05下，拒绝原假设，认为两个分类变量不独立（存在关联）。'
}
```

## 示例2：地区与产品购买意愿的独立性检验
### 输入数据
列联表（行：地区，列：购买意愿）：
| 地区 | 愿意 | 不愿意 |
|------|------|--------|
| 东部 | 25  | 25     |
| 西部 | 25  | 25     |

### 调用方式
```python
contingency_table = [
    [25, 25],
    [25, 25]
]
result = categorical_independence_test(contingency_table)
print(result)
```

### 预期输出
```python
{
    'chi2_statistic': 0.0,
    'p_value': 1.0,
    'degrees_of_freedom': 1,
    'expected_frequencies': [[25.0, 25.0], [25.0, 25.0]],
    'conclusion': '在显著性水平0.05下，不拒绝原假设，认为两个分类变量相互独立。'
}
```

## 示例3：使用Pandas DataFrame作为输入
### 输入数据
```python
import pandas as pd

df = pd.DataFrame({
    '喜欢运动': [15, 25],
    '不喜欢运动': [25, 15]
}, index=['男性', '女性'])
```

### 调用方式
```python
result = categorical_independence_test(df)
print(result)
```

### 预期输出
```python
{
    'chi2_statistic': 4.0,
    'p_value': 0.0455,
    'degrees_of_freedom': 1,
    'expected_frequencies': [[20.0, 20.0], [20.0, 20.0]],
    'conclusion': '在显著性水平0.05下，拒绝原假设，认为两个分类变量不独立（存在关联）。'
}
```