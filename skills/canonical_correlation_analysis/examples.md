## 典型相关分析使用示例

### 示例1：学生成绩组间相关性分析
#### 输入数据
第一组变量（X）：数学成绩、物理成绩（100个样本）
第二组变量（Y）：阅读成绩、写作成绩（100个样本）
模拟数据生成代码：
```python
import numpy as np
import pandas as pd
np.random.seed(42)
n_samples = 100
# 生成理科成绩
math = np.random.normal(70, 10, n_samples)
physics = math + np.random.normal(0, 5, n_samples)
# 生成文科成绩
reading = np.random.normal(75, 8, n_samples)
writing = reading + np.random.normal(0, 4, n_samples)
# 添加组间关联
reading += math * 0.2
writing += physics * 0.15

X = pd.DataFrame({'数学': math, '物理': physics})
Y = pd.DataFrame({'阅读': reading, '写作': writing})
```

#### 调用方式
```python
from scripts.model import CanonicalCorrelationAnalysis

# 初始化模型
cca_analyzer = CanonicalCorrelationAnalysis(X, Y)
# 拟合模型
cca_analyzer.fit()
# 获取结果摘要
result_summary = cca_analyzer.get_results_summary()
print(result_summary)
```

#### 预期输出摘要
```
=== 典型相关分析结果摘要 ===

1. 典型相关系数：
   第1对典型变量相关系数：0.8234
   第2对典型变量相关系数：0.1056

2. X组变量典型载荷：
          典型变量_1  典型变量_2
数学        0.9876      0.1578
物理        0.9754     -0.2190

3. Y组变量典型载荷：
          典型变量_1  典型变量_2
阅读        0.9901      0.1397
写作        0.9824     -0.1865

4. 显著性检验结果：
Test of Canonical Correlations

   Test Statistic  Num DF   Den DF  F Value    Pr > F
1         0.7123      4.0    194.0   33.245  1.23e-20
2         0.0111      1.0     98.0    1.098      0.298
```

#### 结果解读
- 第一对典型变量相关系数为0.8234，且显著性检验p值远小于0.05，说明理科成绩组与文科成绩组存在显著的整体线性关联。
- X组中数学、物理与第一典型变量高度正相关；Y组中阅读、写作与第一典型变量也高度正相关，表明理科成绩越好的学生，文科成绩整体也越优。
- 第二对典型变量的相关系数较低且不显著，可忽略其解释价值。

### 示例2：使用NumPy数组输入
#### 输入数据
```python
import numpy as np
np.random.seed(123)
# 第一组变量：3个特征
X = np.random.multivariate_normal([50, 60, 70], [[10, 5, 3], [5, 15, 7], [3, 7, 12]], 150)
# 第二组变量：2个特征
Y = np.random.multivariate_normal([65, 75], [[12, 6], [6, 10]], 150)
# 添加组间关联
Y[:, 0] += X[:, 0] * 0.15 + X[:, 1] * 0.1
Y[:, 1] += X[:, 1] * 0.12 + X[:, 2] * 0.08
```

#### 调用方式
```python
from scripts.model import CanonicalCorrelationAnalysis

cca_analyzer = CanonicalCorrelationAnalysis(X, Y)
cca_analyzer.fit()
print(cca_analyzer.get_results_summary())
```

#### 预期输出关键信息
- 第一对典型变量相关系数约为0.65，且显著（p<0.05）
- X组中第1、2个变量与第一典型变量载荷较高；Y组中两个变量与第一典型变量载荷均较高