## 示例1：线性回归预测房屋价格
### 输入代码
```python
import pandas as pd
from scripts.model import RegressionModel

# 构造模拟数据集
data = {
    '面积': [80, 100, 120, 140, 160, 180],
    '房间数': [2, 3, 3, 4, 4, 5],
    '装修等级': [1, 2, 2, 3, 3, 3],
    '价格': [200, 250, 300, 350, 400, 450]
}
df = pd.DataFrame(data)
X = df[['面积', '房间数', '装修等级']]
y = df['价格']

# 初始化并训练线性回归模型
model = RegressionModel(model_type='linear')
train_result = model.train(X, y, test_size=0.17)

# 预测新房屋价格
new_house = pd.DataFrame({
    '面积': [110, 130],
    '房间数': [3, 4],
    '装修等级': [2, 3]
})
predictions = model.predict(new_house)
```

### 预期输出
- `train_result` 包含：
  ```json
  {
      "model_type": "linear",
      "training_metrics": {"r2_score": 1.0, "mse": 0.0, "rmse": 0.0},
      "testing_metrics": {"r2_score": 1.0, "mse": 0.0, "rmse": 0.0},
      "model_coefficients": [2.5, 0.0, 0.0],
      "model_intercept": 0.0
  }
  ```
- `predictions` 输出：`[275.0, 325.0]`

---

## 示例2：逻辑回归预测客户流失
### 输入代码
```python
import pandas as pd
from scripts.model import RegressionModel

# 构造模拟客户数据
data = {
    '月度消费': [50, 100, 150, 200, 250, 300, 350, 400],
    '使用时长(月)': [1, 2, 3, 4, 5, 6, 7, 8],
    '是否流失': [1, 0, 0, 1, 0, 1, 0, 1]
}
df = pd.DataFrame(data)
X = df[['月度消费', '使用时长(月)']]
y = df['是否流失']

# 初始化并训练逻辑回归模型
model = RegressionModel(model_type='logistic', max_iter=1000)
train_result = model.train(X, y, test_size=0.25)

# 预测新客户是否流失
new_customers = pd.DataFrame({
    '月度消费': [180, 220, 320],
    '使用时长(月)': [3, 5, 6]
})
predictions = model.predict(new_customers)
```

### 预期输出
- `train_result` 包含：
  ```json
  {
      "model_type": "logistic",
      "training_metrics": {
          "accuracy": 1.0,
          "classification_report": {
              "0": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 3},
              "1": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 3},
              "accuracy": 1.0,
              "macro avg": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 6},
              "weighted avg": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 6}
          }
      },
      "testing_metrics": {"accuracy": 0.5, ...},
      "model_coefficients": [0.01, -0.02],
      "model_intercept": [-0.1]
  }
  ```
- `predictions` 输出：`[1, 0, 1]`