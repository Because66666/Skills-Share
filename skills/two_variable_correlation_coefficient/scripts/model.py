import numpy as np
from scipy.stats import pearsonr

def calculate_correlation(x, y):
    """
    计算两个变量之间的皮尔逊相关系数和对应的p值
    
    参数:
    x (list或numpy.ndarray): 第一个连续变量的样本数据
    y (list或numpy.ndarray): 第二个连续变量的样本数据
    
    返回:
    dict: 包含以下键值对的字典
        - correlation_coefficient: 皮尔逊相关系数（保留4位小数）
        - p_value: 相关性的统计显著性p值（保留4位小数）
        - sample_size: 参与计算的有效样本量
    
    异常:
    ValueError: 当输入数据包含非数值型元素、缺失值、或两个变量样本量不一致时抛出
    """
    # 转换为numpy数组并处理非数值型元素
    try:
        x_arr = np.array(x, dtype=np.float64)
        y_arr = np.array(y, dtype=np.float64)
    except ValueError as e:
        raise ValueError("输入数据中包含非数值型元素，请确保所有元素为数值") from e
    
    # 检查样本量是否一致
    if len(x_arr) != len(y_arr):
        raise ValueError("两个变量的样本数量必须一致")
    
    # 检查是否存在缺失值
    if np.isnan(x_arr).any() or np.isnan(y_arr).any():
        raise ValueError("输入数据中存在缺失值，请先处理缺失值")
    
    # 计算皮尔逊相关系数和p值
    r, p_value = pearsonr(x_arr, y_arr)
    
    return {
        "correlation_coefficient": round(r, 4),
        "p_value": round(p_value, 4),
        "sample_size": len(x_arr)
    }