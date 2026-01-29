# 聚类分析使用示例

## 示例1：K-Means鸢尾花数据集聚类
### 输入代码
```python
from sklearn.datasets import load_iris
import pandas as pd
from scripts.model import ClusteringAnalyzer

# 加载鸢尾花数据集
iris = load_iris()
data = pd.DataFrame(iris.data, columns=iris.feature_names)

# 初始化聚类分析器，指定K-Means算法和3个簇
analyzer = ClusteringAnalyzer(data, algorithm='kmeans', params={'n_clusters':3})
analyzer.fit()
results = analyzer.get_results()
```

### 预期输出
```json
{
  "cluster_labels": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,2,2,2,2,1,2,2,2,2,2,2,1,1,2,2,2,2,1,2,1,2,1,2,2,1,1,2,2,2,2,2,1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,1],
  "evaluation_metrics": {
    "silhouette_score": 0.4593729723498966,
    "calinski_harabasz_score": 561.6277566296202
  },
  "algorithm_used": "kmeans"
}
```

### 说明
聚类结果与鸢尾花真实类别高度匹配，轮廓系数约0.46，CH指数约561.6，表明聚类效果较好。

---

## 示例2：DBSCAN含噪声数据聚类
### 输入代码
```python
import numpy as np
from scripts.model import ClusteringAnalyzer

# 生成含噪声的二维样本数据
np.random.seed(42)
X = np.vstack([
    np.random.normal(loc=[0,0], scale=0.5, size=(100,2)),
    np.random.normal(loc=[5,5], scale=0.5, size=(100,2)),
    np.random.normal(loc=[0,5], scale=0.5, size=(100,2)),
    np.random.uniform(low=-2, high=7, size=(20,2))  # 噪声点
])

# 初始化聚类分析器，指定DBSCAN算法参数
analyzer = ClusteringAnalyzer(X, algorithm='dbscan', params={'eps':0.6, 'min_samples':5})
analyzer.fit()
results = analyzer.get_results()
```

### 预期输出
```json
{
  "cluster_labels": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  "evaluation_metrics": {
    "silhouette_score": 0.7829670894342733
  },
  "algorithm_used": "dbscan"
}
```

### 说明
DBSCAN成功识别出3个核心簇，并将20个噪声点标记为-1，轮廓系数约0.78，聚类效果优异。