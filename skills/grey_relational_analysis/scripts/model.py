import numpy as np
import pandas as pd

def grey_relational_analysis(data, reference_col=0, normalization_method='mean', resolution_coeff=0.5):
    """
    灰色关联分析函数
    参数:
        data: 输入数据，可为pandas DataFrame或numpy数组，每行代表一个样本，每列代表一个因素
        reference_col: 参考序列的列索引或列名，默认第0列
        normalization_method: 归一化方法，可选'mean'（均值化）、'initial'（初值化）、'range'（区间化）
        resolution_coeff: 分辨系数，取值范围0-1，默认0.5
    返回:
        result: 包含关联度和排序的字典
    """
    # 转换为numpy数组并处理列名
    if isinstance(data, pd.DataFrame):
        data_arr = data.values
        col_names = data.columns.tolist()
    else:
        data_arr = np.array(data)
        col_names = [f'因素{i+1}' for i in range(data_arr.shape[1])]
    
    # 数据归一化处理
    def normalize(arr, method):
        if method == 'mean':
            return arr / np.mean(arr, axis=0)
        elif method == 'initial':
            return arr / arr[0, :]
        elif method == 'range':
            return (arr - np.min(arr, axis=0)) / (np.max(arr, axis=0) - np.min(arr, axis=0))
        else:
            raise ValueError("不支持的归一化方法，可选'mean'、'initial'、'range'")
    
    normalized_data = normalize(data_arr, normalization_method)
    
    # 获取参考序列
    if isinstance(reference_col, str):
        ref_idx = col_names.index(reference_col)
    else:
        ref_idx = reference_col
    reference_seq = normalized_data[:, ref_idx]
    
    # 计算差序列
    diffs = np.abs(normalized_data - reference_seq[:, np.newaxis])
    
    # 计算最大差和最小差
    max_diff = np.max(diffs)
    min_diff = np.min(diffs)
    
    # 计算关联系数
    coefficients = (min_diff + resolution_coeff * max_diff) / (diffs + resolution_coeff * max_diff)
    
    # 计算关联度
    relational_degrees = np.mean(coefficients, axis=0)
    
    # 排序（从高到低）
    sorted_indices = np.argsort(relational_degrees)[::-1]
    sorted_degrees = {col_names[i]: float(round(relational_degrees[i], 3)) for i in sorted_indices}
    rankings = [col_names[i] for i in sorted_indices]
    
    return {
        "relational_degrees": sorted_degrees,
        "rankings": rankings
    }