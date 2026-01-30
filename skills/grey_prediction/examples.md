## 示例1：基础预测
### 输入
```python
from scripts.model import GreyPrediction

# 历史数据：连续5年的销售额
data = [100, 120, 150, 180, 220]
gp = GreyPrediction(data)
gp.fit()

# 获取模型结果
print("模型精度检验：", gp.accuracy_result)
# 预测未来2年的销售额
predicted = gp.predict(steps=2)
print("未来2年预测销售额：", predicted.round(1))
```

### 预期输出
```
模型精度检验： {'后验差比c': 0.0819, '小误差概率p': 1.0, '精度等级': '一级（好）'}
未来2年预测销售额： [264.5 317.8]
```

## 示例2：小样本预测
### 输入
```python
# 历史数据：连续4个月的用户增长数
data = [5, 7, 9, 12]
gp = GreyPrediction(data)
gp.fit()

print("模型精度检验：", gp.accuracy_result)
# 预测下个月的用户增长数
predicted = gp.predict(steps=1)
print("下个月预测用户增长数：", predicted.round(1))
```

### 预期输出
```
模型精度检验： {'后验差比c': 0.1497, '小误差概率p': 1.0, '精度等级': '一级（好）'}
下个月预测用户增长数： [15.6]
```

## 示例3：精度不合格情况
### 输入
```python
# 波动较大的数据序列
data = [10, 20, 15, 30, 25]
gp = GreyPrediction(data)
gp.fit()

print("模型精度检验：", gp.accuracy_result)
```

### 预期输出
```
模型精度检验： {'后验差比c': 0.6821, '小误差概率p': 0.8, '精度等级': '四级（不合格）'}
```