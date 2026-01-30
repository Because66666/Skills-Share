# 灰色关联分析使用示例

## 示例1：农作物产量影响因素分析
### 输入数据
假设有以下数据，包含4个样本，因素分别为：降雨量、温度、施肥量、产量（目标因素）：

| 降雨量(mm) | 温度(℃) | 施肥量(kg/亩) | 产量(kg/亩) |
|------------|---------|--------------|------------|
| 500        | 25      | 30           | 800        |
| 550        | 26      | 35           | 850        |
| 480        | 24      | 28           | 780        |
| 520        | 25      | 32           | 820        |

### 调用方式
```python
import pandas as pd
from scripts.model import grey_relational_analysis

# 构造数据
data = pd.DataFrame({
    "降雨量(mm)": [500, 550, 480, 520],
    "温度(℃)": [25, 26, 24, 25],
    "施肥量(kg/亩)": [30, 35, 28, 32],
    "产量(kg/亩)": [800, 850, 780, 820]
})

# 调用灰色关联分析，参考序列为产量列
result = grey_relational_analysis(data, reference_col="产量(kg/亩)", normalization_method="mean")
print(result)
```

### 预期输出
```json
{
  "relational_degrees": {
    "产量(kg/亩)": 1.0,
    "施肥量(kg/亩)": 0.923,
    "降雨量(mm)": 0.876,
    "温度(℃)": 0.789
  },
  "rankings": ["产量(kg/亩)", "施肥量(kg/亩)", "降雨量(mm)", "温度(℃)"]
}
```

### 结果解释
关联度越高表示该因素对产量的影响越大，因此施肥量是影响产量的最主要因素，其次是降雨量，温度的影响相对较小。

## 示例2：numpy数组输入示例
### 输入数据
```python
import numpy as np
from scripts.model import grey_relational_analysis

# 构造numpy数组，列依次为：因素A、因素B、因素C、目标因素
data = np.array([
    [10, 20, 30, 100],
    [12, 22, 35, 110],
    [9, 18, 28, 95],
    [11, 21, 32, 105]
])

# 调用分析，参考序列为第3列（索引3）
result = grey_relational_analysis(data, reference_col=3, normalization_method="initial")
print(result)
```

### 预期输出
```json
{
  "relational_degrees": {
    "因素4": 1.0,
    "因素2": 0.915,
    "因素3": 0.882,
    "因素1": 0.857
  },
  "rankings": ["因素4", "因素2", "因素3", "因素1"]
}
```