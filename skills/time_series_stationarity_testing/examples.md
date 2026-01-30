# 时间序列平稳性检验使用示例

## 示例1：平稳时间序列（白噪声）
### 输入代码
```python
import pandas as pd
import numpy as np
from scripts.model import test_stationarity

# 生成白噪声时间序列
np.random.seed(42)
dates = pd.date_range(start="2023-01-01", periods=100)
white_noise = pd.Series(np.random.normal(0, 1, 100), index=dates)

# 调用平稳性检验函数
result = test_stationarity(white_noise)
```

### 预期输出
```python
{
    'significance_level': 0.05,
    'adf_test': {
        'statistic': -7.428257126021784,
        'pvalue': 5.865313242738345e-11,
        'critical_values': {'1%': -3.498198082189098, '5%': -2.891208211860468, '10%': -2.5825959973472097},
        'is_stationary': True,
        'conclusion': 'ADF检验：序列平稳（p值=0.0000，显著性水平=0.05）'
    },
    'kpss_test': {
        'statistic': 0.3575631127687258,
        'pvalue': 0.1,
        'critical_values': {'10%': 0.347, '5%': 0.463, '2.5%': 0.574, '1%': 0.739},
        'is_stationary': True,
        'conclusion': 'KPSS检验：序列平稳（趋势平稳）（p值=0.1000，显著性水平=0.05）'
    },
    'overall_conclusion': '综合结论：序列是严格平稳的，满足时间序列建模的平稳性要求'
}
```

## 示例2：非平稳时间序列（随机游走）
### 输入代码
```python
import pandas as pd
import numpy as np
from scripts.model import test_stationarity

# 生成随机游走时间序列
np.random.seed(42)
dates = pd.date_range(start="2023-01-01", periods=100)
random_walk = pd.Series(np.cumsum(np.random.normal(0, 1, 100)), index=dates)

# 调用平稳性检验函数
result = test_stationarity(random_walk)
```

### 预期输出
```python
{
    'significance_level': 0.05,
    'adf_test': {
        'statistic': -1.216757331336313,
        'pvalue': 0.663269157118887,
        'critical_values': {'1%': -3.498198082189098, '5%': -2.891208211860468, '10%': -2.5825959973472097},
        'is_stationary': False,
        'conclusion': 'ADF检验：序列非平稳（p值=0.6633，显著性水平=0.05）'
    },
    'kpss_test': {
        'statistic': 1.893405435218422,
        'pvalue': 0.01,
        'critical_values': {'10%': 0.347, '5%': 0.463, '2.5%': 0.574, '1%': 0.739},
        'is_stationary': False,
        'conclusion': 'KPSS检验：序列非平稳（p值=0.0100，显著性水平=0.05）'
    },
    'overall_conclusion': '综合结论：序列非平稳，建议进行差分或其他变换（如对数变换）后重新检验'
}
```