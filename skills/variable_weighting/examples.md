# 变量定权方法使用示例

## 示例1：层次分析法(AHP)
### 输入
```python
import numpy as np
judgment_matrix = np.array([
    [1, 2, 3],
    [1/2, 1, 2],
    [1/3, 1/2, 1]
])
```
### 调用
```python
from scripts.model import ahp_weight
result = ahp_weight(judgment_matrix)
```
### 预期输出
```json
{
    "weights": [0.5396, 0.2970, 0.1634],
    "consistency_ratio": 0.0180
}
```
### 说明
一致性比率CR=0.0180 < 0.1，满足一致性要求，权重和为1。

## 示例2：熵权法
### 输入
```python
import pandas as pd
data = pd.DataFrame({
    "变量A": [80, 90, 75, 85],
    "变量B": [70, 85, 65, 90],
    "变量C": [95, 80, 85, 70]
})
```
### 调用
```python
from scripts.model import entropy_weight
result = entropy_weight(data)
```
### 预期输出
```
变量A    0.3282
变量B    0.3421
变量C    0.3297
Name: 权重, dtype: float64
```
### 说明
各变量权重反映了其信息熵差异，权重和为1。

## 示例3：变异系数法
### 输入
```python
import pandas as pd
data = pd.DataFrame({
    "变量X": [10,20,15,25,30],
    "变量Y": [5,10,7,12,15],
    "变量Z": [20,22,19,21,23]
})
```
### 调用
```python
from scripts.model import coefficient_of_variation_weight
result = coefficient_of_variation_weight(data)
```
### 预期输出
```
变量X    0.4464
变量Y    0.4464
变量Z    0.1072
Name: 权重, dtype: float64
```
### 说明
变量X、Y离散程度高权重较大，变量Z离散程度低权重较小，权重和为1。