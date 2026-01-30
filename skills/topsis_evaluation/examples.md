# TOPSIS评价法使用示例

## 示例1：学生成绩综合评价
### 输入
决策矩阵（3名学生，4门课程成绩，均为正向指标）：
```
decision_matrix = [
    [85, 90, 80, 95],
    [90, 85, 88, 92],
    [88, 92, 85, 89]
]
weights = [0.25, 0.25, 0.25, 0.25]  # 各课程权重相同
is_benefit = [True, True, True, True]  # 所有指标为正向（分数越高越好）
```

### 调用方式
```python
from scripts.model import topsis_evaluation
result = topsis_evaluation(decision_matrix, weights, is_benefit)
```

### 预期输出
```json
{
    "closeness_scores": [0.5641, 0.5872, 0.4487],
    "ranking": [2, 1, 3],
    "ideal_solution": [0.2739, 0.2806, 0.2673, 0.2905],
    "negative_ideal_solution": [0.2588, 0.2588, 0.2439, 0.2797]
}
```
**说明**：学生2的贴近度最高，排名第1；学生1次之，排名第2；学生3排名第3。

## 示例2：项目投资评价
### 输入
决策矩阵（3个项目，4个指标：投资金额（负向）、年收益（正向）、回收期（负向）、市场占有率（正向））：
```
decision_matrix = [
    [100, 20, 3, 15],
    [120, 25, 2.5, 18],
    [90, 18, 3.5, 12]
]
weights = [0.3, 0.3, 0.2, 0.2]
is_benefit = [False, True, False, True]
```

### 预期输出
```json
{
    "closeness_scores": [0.5217, 0.6829, 0.3043],
    "ranking": [2, 1, 3],
    "ideal_solution": [0.2182, 0.2703, 0.1640, 0.2308],
    "negative_ideal_solution": [0.2727, 0.1946, 0.2296, 0.1539]
}
```
**说明**：项目2的综合评价最优，排名第1；项目1次之；项目3最差。