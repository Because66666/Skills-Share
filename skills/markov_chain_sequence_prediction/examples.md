# 使用示例

## 示例1：天气状态预测
### 输入代码
```python
from scripts.model import MarkovChainPredictor

# 历史天气状态序列（晴/阴/雨）
weather_sequence = ['晴', '晴', '阴', '雨', '阴', '晴', '晴', '阴', '阴', '雨']
current_weather = '阴'

# 初始化并训练模型
predictor = MarkovChainPredictor()
predictor.fit(weather_sequence)
result = predictor.predict_next_state(current_weather)
```

### 预期输出
```json
{
    "predicted_next_state": "雨",
    "state_probabilities": {
        "晴": 0.25,
        "阴": 0.25,
        "雨": 0.5
    },
    "transition_matrix": [
        [0.5, 0.5, 0.0],
        [0.25, 0.25, 0.5],
        [0.0, 1.0, 0.0]
    ],
    "states": ["晴", "阴", "雨"]
}
```

## 示例2：股票走势预测
### 输入代码
```python
from scripts.model import MarkovChainPredictor

# 历史股票走势序列（涨/平/跌）
stock_sequence = ['涨', '涨', '平', '跌', '涨', '平', '平', '跌', '涨', '涨']
current_trend = '涨'

# 初始化并训练模型
predictor = MarkovChainPredictor()
predictor.fit(stock_sequence)
result = predictor.predict_next_state(current_trend)
```

### 预期输出
```json
{
    "predicted_next_state": "涨",
    "state_probabilities": {
        "涨": 0.5,
        "平": 0.5,
        "跌": 0.0
    },
    "transition_matrix": [
        [0.5, 0.5, 0.0],
        [0.0, 0.3333333333333333, 0.6666666666666666],
        [1.0, 0.0, 0.0]
    ],
    "states": ["涨", "平", "跌"]
}
```