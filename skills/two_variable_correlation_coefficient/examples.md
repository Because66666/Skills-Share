## 示例1：完美正相关场景
### 输入
```python
x = [1, 2, 3, 4, 5, 6, 7]
y = [2, 4, 6, 8, 10, 12, 14]
```
### 调用方式
```python
from scripts.model import calculate_correlation
result = calculate_correlation(x, y)
```
### 预期输出
```json
{
    "correlation_coefficient": 1.0,
    "p_value": 0.0,
    "sample_size": 7
}
```
### 说明
相关系数为1.0，p值接近0，表明两个变量存在完美的强正线性相关关系。

## 示例2：强负相关场景
### 输入
```python
x = [10, 8, 6, 4, 2, 1]
y = [1, 3, 5, 7, 9, 10]
```
### 调用方式
```python
result = calculate_correlation(x, y)
```
### 预期输出
```json
{
    "correlation_coefficient": -0.9978,
    "p_value": 0.0001,
    "sample_size": 6
}
```
### 说明
相关系数接近-1，p值远小于0.05，表明两个变量存在显著的强负线性相关关系。

## 示例3：无显著相关场景
### 输入
```python
x = [1, 2, 3, 4, 5]
y = [5, 3, 1, 4, 2]
```
### 调用方式
```python
result = calculate_correlation(x, y)
```
### 预期输出
```json
{
    "correlation_coefficient": -0.1,
    "p_value": 0.8239,
    "sample_size": 5
}
```
### 说明
相关系数接近0，p值大于0.05，表明两个变量不存在显著的线性相关关系。

## 示例4：含缺失值的错误场景
### 输入
```python
x = [1, 2, None, 4, 5]
y = [2, 4, 6, 8, 10]
```
### 调用方式
```python
result = calculate_correlation(x, y)
```
### 预期结果
抛出`ValueError`异常，提示信息："输入数据中存在缺失值，请先处理缺失值"
