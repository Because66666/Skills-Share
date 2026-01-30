# 时间序列白噪声检验使用示例

## 示例1：白噪声序列检验
### 输入
```python
import numpy as np
from scripts.model import white_noise_test

# 生成标准正态分布的白噪声序列
np.random.seed(42)
white_noise_data = np.random.normal(0, 1, 100)
result = white_noise_test(white_noise_data)
```
### 预期输出
```json
{
    "is_white_noise": true,
    "ljung_box_stat": [0.063, 0.147, 0.301, 0.302, 0.313, 1.134, 1.134, 1.215, 1.220, 2.267],
    "ljung_box_pvalues": [0.801, 0.929, 0.959, 0.989, 0.998, 0.953, 0.981, 0.986, 0.994, 0.973],
    "acf_values": [1.0, -0.025, 0.030, 0.039, 0.000, 0.004, -0.128, 0.000, 0.020, -0.001, -0.143],
    "pacf_values": [1.0, -0.025, 0.031, 0.040, -0.002, 0.005, -0.131, 0.012, 0.022, -0.015, -0.128],
    "max_lag": 10
}
```

## 示例2：非白噪声序列检验（AR(1)序列）
### 输入
```python
import numpy as np
from scripts.model import white_noise_test

# 生成AR(1)序列：x_t = 0.8*x_{t-1} + ε_t
np.random.seed(42)
epsilon = np.random.normal(0, 1, 100)
ar_data = [0]
for i in range(1, 100):
    ar_data.append(0.8 * ar_data[i-1] + epsilon[i])
ar_data = np.array(ar_data)
result = white_noise_test(ar_data)
```
### 预期输出
```json
{
    "is_white_noise": false,
    "ljung_box_stat": [25.671, 26.118, 26.120, 26.127, 26.215, 26.222, 26.433, 26.504, 26.510, 26.514],
    "ljung_box_pvalues": [3.01e-07, 1.18e-06, 5.83e-06, 2.28e-05, 7.81e-05, 2.38e-04, 6.17e-04, 1.43e-03, 3.02e-03, 5.87e-03],
    "acf_values": [1.0, 0.782, 0.613, 0.489, 0.389, 0.313, 0.253, 0.201, 0.165, 0.133, 0.109],
    "pacf_values": [1.0, 0.820, 0.034, -0.013, 0.021, 0.047, 0.015, -0.020, 0.051, -0.007, 0.020],
    "max_lag": 10
}
```