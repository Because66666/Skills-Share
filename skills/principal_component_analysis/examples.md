# 主成分分析（PCA）使用示例

## 示例1：指定主成分数量
### 输入数据
```python
import pandas as pd

data = pd.DataFrame({
    '特征1': [1, 2, 3, 4, 5],
    '特征2': [2, 4, 6, 8, 10],
    '特征3': [3, 6, 9, 12, 15]
})
```

### 调用方式
```python
from scripts.model import PCA

pca = PCA(n_components=1)
reduced_data = pca.fit_transform(data)
```

### 预期输出
- 降维后的数据（numpy数组）：
```
array([-2.44948974, -0.81649658,  0.81649658,  2.44948974,  4.0824829 ])
```
- 主成分方差贡献率：`[1.0]`
- 累计方差贡献率：`[1.0]`
（说明：由于输入数据的三个特征完全线性相关，第一个主成分即可解释100%的方差）

## 示例2：基于累计方差贡献率阈值自动选择主成分
### 输入数据
```python
import numpy as np

np.random.seed(42)
# 生成100个样本，5个特征的随机数据
data = np.random.randn(100, 5)
```

### 调用方式
```python
from scripts.model import PCA

pca = PCA(explained_variance_ratio_threshold=0.85)
reduced_data = pca.fit_transform(data)
```

### 预期输出
- 降维后的数据形状：`(100, 4)`（实际取决于随机数据，通常前4个主成分累计方差贡献率接近或超过85%）
- 主成分方差贡献率示例：`[0.223, 0.212, 0.201, 0.189, 0.175]`
- 累计方差贡献率示例：`[0.223, 0.435, 0.636, 0.825, 1.0]`

## 示例3：获取模型关键参数
### 调用方式
```python
pca = PCA(n_components=2)
pca.fit(data)

# 获取主成分矩阵
components = pca.components_
# 获取方差贡献率
variance_ratios = pca.explained_variance_ratio_
# 获取累计方差贡献率
cumulative_ratios = pca.cumulative_variance_ratio_
```

### 预期输出
- `components`：形状为`(5, 2)`的numpy数组，每列代表一个主成分
- `variance_ratios`：长度为2的数组，包含两个主成分的方差贡献率
- `cumulative_ratios`：长度为2的数组，包含累计方差贡献率