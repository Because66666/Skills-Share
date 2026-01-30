## 示例1：服从正态分布的时间序列数据
### 输入
```python
import numpy as np
import pandas as pd
from scripts.model import time_series_normality_test

# 生成服从标准正态分布的时间序列数据
np.random.seed(42)
ts_data = pd.Series(np.random.normal(loc=0, scale=1, size=100))
result = time_series_normality_test(ts_data)
```

### 预期输出
```json
{
    "shapiro_wilk": {
        "statistic": 0.9897,
        "p_value": 0.7284,
        "conclusion": "数据服从正态分布"
    },
    "kolmogorov_smirnov": {
        "statistic": 0.0694,
        "p_value": 0.7453,
        "conclusion": "数据服从正态分布"
    },
    "jarque_bera": {
        "statistic": 0.5342,
        "p_value": 0.7657,
        "conclusion": "数据服从正态分布"
    },
    "qq_plot": "已生成Q-Q图，保存为qq_plot.png",
    "overall_conclusion": "综合检验结果，数据服从正态分布",
    "significance_level": 0.05
}
```

## 示例2：不服从正态分布的时间序列数据
### 输入
```python
import numpy as np
import pandas as pd
from scripts.model import time_series_normality_test

# 生成服从指数分布的时间序列数据
np.random.seed(42)
ts_data = pd.Series(np.random.exponential(scale=1, size=100))
result = time_series_normality_test(ts_data)
```

### 预期输出
```json
{
    "shapiro_wilk": {
        "statistic": 0.8593,
        "p_value": 0.0,
        "conclusion": "数据不服从正态分布"
    },
    "kolmogorov_smirnov": {
        "statistic": 0.2345,
        "p_value": 0.0,
        "conclusion": "数据不服从正态分布"
    },
    "jarque_bera": {
        "statistic": 45.6789,
        "p_value": 0.0,
        "conclusion": "数据不服从正态分布"
    },
    "qq_plot": "已生成Q-Q图，保存为qq_plot.png",
    "overall_conclusion": "综合检验结果，数据不服从正态分布",
    "significance_level": 0.05
}
```

## 示例3：大样本时间序列数据
### 输入
```python
import numpy as np
import pandas as pd
from scripts.model import time_series_normality_test

# 生成大样本正态分布数据
np.random.seed(42)
ts_data = pd.Series(np.random.normal(loc=5, scale=2, size=6000))
result = time_series_normality_test(ts_data, plot_qq=False)
```

### 预期输出
```json
{
    "shapiro_wilk": "样本量超过5000，Shapiro-Wilk检验结果可靠性下降，已跳过该检验",
    "kolmogorov_smirnov": {
        "statistic": 0.0123,
        "p_value": 0.9876,
        "conclusion": "数据服从正态分布"
    },
    "jarque_bera": {
        "statistic": 1.2345,
        "p_value": 0.5397,
        "conclusion": "数据服从正态分布"
    },
    "overall_conclusion": "综合检验结果，数据服从正态分布",
    "significance_level": 0.05
}
```