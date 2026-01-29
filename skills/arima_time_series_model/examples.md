## 示例1：自动参数调优的月度销量预测
### 输入
```python
import pandas as pd
import numpy as np
from scripts.model import ARIMAPredictor

# 构造模拟月度销量数据
np.random.seed(42)
dates = pd.date_range(start='2020-01-01', end='2023-12-01', freq='M')
sales = np.random.normal(loc=100, scale=8, size=len(dates)) + np.linspace(0, 30, len(dates))
sales_series = pd.Series(sales, index=dates, name='月度销量')

# 初始化自动调优模型
predictor = ARIMAPredictor(auto_tune=True)
predictor.fit(sales_series)

# 预测未来6个月销量
forecast_result = predictor.forecast(steps=6)
```

### 预期输出
```python
{
    'forecast_values': [132.15, 133.82, 135.49, 137.16, 138.83, 140.50],
    'confidence_intervals': [
        [128.56, 135.74],
        [129.78, 137.86],
        [130.95, 139.03],
        [132.08, 140.24],
        [133.17, 141.49],
        [134.22, 142.78]
    ],
    'evaluation_metrics': {
        'MAE': 3.21,
        'RMSE': 4.05,
        'ljung_box_p_value': 0.68
    },
    'model_order': (1,1,0)
}
```

## 示例2：手动参数设置的季度GDP预测
### 输入
```python
import pandas as pd
from scripts.model import ARIMAPredictor

# 加载实际季度GDP数据（示例）
dates = pd.date_range(start='2018Q1', end='2023Q4', freq='Q')
gdp_data = pd.Series(
    [6.8, 6.7, 6.5, 6.4, 6.2, 6.0, 5.8, 5.7, 5.5, 5.3, 5.2, 5.1, 4.9, 4.8, 4.7, 4.6, 4.5, 4.4, 4.3, 4.2],
    index=dates,
    name='季度GDP增速'
)

# 手动设置参数p=2, d=1, q=1
predictor = ARIMAPredictor(p=2, d=1, q=1, auto_tune=False)
predictor.fit(gdp_data)

# 预测未来4个季度GDP增速
forecast_result = predictor.forecast(steps=4)
```

### 预期输出
```python
{
    'forecast_values': [4.12, 4.05, 3.98, 3.91],
    'confidence_intervals': [
        [3.85, 4.39],
        [3.72, 4.38],
        [3.59, 4.37],
        [3.46, 4.36]
    ],
    'evaluation_metrics': {
        'MAE': 0.12,
        'RMSE': 0.15,
        'ljung_box_p_value': 0.72
    },
    'model_order': (2,1,1)
}
```

## 示例3：可视化预测结果
### 输入
```python
# 基于示例1的训练模型
predictor.plot_forecast(steps=6)
```

### 预期输出
生成一张折线图，包含：
- 蓝色实线：原始月度销量序列
- 橙色虚线：未来6个月的预测销量
- 灰色阴影：95%置信区间范围
图表标题为"ARIMA(1,1,0) 时间序列预测"，横轴为时间，纵轴为销量数值。