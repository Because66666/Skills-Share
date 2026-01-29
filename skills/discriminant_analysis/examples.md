# 判别分析技能使用示例

## 示例1：基于LDA的鸢尾花数据集分类
### 输入代码
```python
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from scripts.model import DiscriminantAnalysis

# 加载鸢尾花数据集
iris = load_iris()
X = pd.DataFrame(iris.data, columns=iris.feature_names)
y = iris.target

# 划分训练集与测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 初始化并训练LDA模型
lda_model = DiscriminantAnalysis(model_type='LDA')
lda_model.fit(X_train, y_train)

# 执行预测
predicted_labels = lda_model.predict(X_test)

# 评估模型性能
evaluation_result = lda_model.evaluate(X_test, y_test)

# 获取判别函数参数
disc_params = lda_model.get_discriminant_params()
```

### 预期输出
- **predicted_labels**：`[1, 0, 2, 1, 1, 0, 1, 2, 1, 1, 2, 0, 0, 0, 0, 1, 2, 1, 1, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 2, 1, 0, 0, 0, 2, 1, 1, 0, 0]`
- **evaluation_result**：
  ```json
  {"accuracy": 1.0, "confusion_matrix": [[19, 0, 0], [0, 13, 0], [0, 0, 13]]}
  ```
- **disc_params**：包含LDA系数、截距和类别均值的字典，例如：
  ```json
  {
    "coefficients": {
      "0": [0.82937753, 1.53447321, -2.20121178, -2.81046099],
      "1": [-0.17980912, -1.33129883, 2.03455732, 2.01480113]
    },
    "intercepts": {"0": 0.26560618, "1": 1.73168348},
    "class_means": {"0": [5.03478261, 3.47826087, 1.49565217, 0.26086957], ...}
  }
  ```

## 示例2：基于QDA的合成数据集分类
### 输入代码
```python
import numpy as np
from sklearn.model_selection import train_test_split
from scripts.model import DiscriminantAnalysis

# 生成合成二分类数据
np.random.seed(42)
class0 = np.random.multivariate_normal(mean=[0,0], cov=[[1,0],[0,2]], size=100)
class1 = np.random.multivariate_normal(mean=[3,3], cov=[[2,1],[1,2]], size=100)
X = np.vstack((class0, class1))
y = np.hstack((np.zeros(100), np.ones(100)))

# 划分训练集与测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 初始化并训练QDA模型
qda_model = DiscriminantAnalysis(model_type='QDA')
qda_model.fit(X_train, y_train, feature_names=["特征A", "特征B"])

# 执行预测
predicted_labels = qda_model.predict(X_test)

# 评估模型性能
evaluation_result = qda_model.evaluate(X_test, y_test)
```

### 预期输出
- **predicted_labels**：`[0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0]`
- **evaluation_result**：
  ```json
  {"accuracy": 0.975, "confusion_matrix": [[20, 0], [1, 19]]}
  ```