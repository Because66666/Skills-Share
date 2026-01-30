# 模糊综合评价法使用示例

## 示例1：学生综合表现评价
### 输入参数
- **权重向量**：[0.4, 0.1, 0.2, 0.3]（成绩占40%，出勤10%，课堂表现20%，作业30%）
- **模糊判断矩阵**：
```
[
    [0.6, 0.3, 0.1, 0.0],  # 成绩：60%优秀，30%良好，10%中等，0%差
    [0.2, 0.5, 0.2, 0.1],  # 出勤：20%优秀，50%良好，20%中等，10%差
    [0.3, 0.4, 0.2, 0.1],  # 课堂表现：30%优秀，40%良好，20%中等，10%差
    [0.4, 0.4, 0.1, 0.1]   # 作业：40%优秀，40%良好，10%中等，10%差
]
```
- **评价集**：["优秀", "良好", "中等", "差"]
- **模糊算子**："M(+,·)"（加权和-乘积算子）

### 调用代码
```python
from scripts.model import fuzzy_comprehensive_evaluation

weight = [0.4, 0.1, 0.2, 0.3]
judgment_matrix = [
    [0.6, 0.3, 0.1, 0.0],
    [0.2, 0.5, 0.2, 0.1],
    [0.3, 0.4, 0.2, 0.1],
    [0.4, 0.4, 0.1, 0.1]
]
evaluation_set = ["优秀", "良好", "中等", "差"]

result = fuzzy_comprehensive_evaluation(weight, judgment_matrix, evaluation_set, operator="M(+,·)")
print(result)
```

### 预期输出
```
{
    "comprehensive_vector": [0.46, 0.37, 0.12, 0.05],
    "evaluation_result": "优秀",
    "used_operator": "M(+,·)"
}
```

## 示例2：不同模糊算子对比
### 输入参数
使用与示例1相同的权重、判断矩阵和评价集，更换算子为"M(∨,∧)"（最大-最小算子）

### 调用代码
```python
result = fuzzy_comprehensive_evaluation(weight, judgment_matrix, evaluation_set, operator="M(∨,∧)")
print(result)
```

### 预期输出
```
{
    "comprehensive_vector": [0.4, 0.3, 0.2, 0.1],
    "evaluation_result": "优秀",
    "used_operator": "M(∨,∧)"
}
```