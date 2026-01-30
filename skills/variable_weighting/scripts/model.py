import numpy as np
import pandas as pd
from scipy.linalg import eig

def ahp_weight(judgment_matrix):
    """
    层次分析法计算变量权重
    参数:
        judgment_matrix: np.ndarray - 正互反判断矩阵，形状为(n, n)，n为变量个数
    返回:
        dict - 包含"weights"（权重列表）和"consistency_ratio"（一致性比率）的字典
    异常:
        ValueError - 若判断矩阵非方阵、非正矩阵或一致性不满足要求
    """
    n = judgment_matrix.shape[0]
    if judgment_matrix.shape[1] != n:
        raise ValueError("判断矩阵必须为方阵")
    if np.any(judgment_matrix <= 0):
        raise ValueError("判断矩阵元素必须为正数")
    
    eigenvalues, eigenvectors = eig(judgment_matrix)
    max_eigen_idx = np.argmax(eigenvalues.real)
    max_eigenvalue = eigenvalues[max_eigen_idx].real
    eigenvector = eigenvectors[:, max_eigen_idx].real
    
    weights = eigenvector / np.sum(eigenvector)
    ci = (max_eigenvalue - n) / (n - 1)
    
    ri_values = {1:0,2:0,3:0.58,4:0.90,5:1.12,6:1.24,7:1.32,8:1.41,9:1.45,10:1.49}
    if n not in ri_values:
        raise ValueError("变量个数需在1-10之间")
    ri = ri_values[n]
    cr = ci / ri if ri != 0 else 0.0
    
    if cr > 0.1 and n >=3:
        raise ValueError(f"一致性比率CR={cr:.4f} > 0.1，判断矩阵一致性不满足要求，请调整矩阵")
    
    return {"weights": [round(w,4) for w in weights.tolist()], "consistency_ratio": round(cr,4)}


def entropy_weight(data_df):
    """
    熵权法计算变量的客观权重
    参数:
        data_df: pd.DataFrame - 样本数据，行表示样本，列表示变量，数值需为非负
    返回:
        pd.Series - 各变量的权重，索引为变量名称
    异常:
        ValueError - 若数据包含负值、某变量取值全相同
    """
    if (data_df < 0).any().any():
        raise ValueError("数据中存在负值，无法进行熵权法计算")
    
    data = data_df.values
    data = data + 1e-10  # 避免0值导致对数错误
    p = data / np.sum(data, axis=0)
    
    n_samples = data.shape[0]
    k = 1 / np.log(n_samples) if n_samples >1 else 1.0
    entropy = -k * np.sum(p * np.log(p), axis=0)
    diversity = 1 - entropy
    weights = diversity / np.sum(diversity)
    
    return pd.Series(weights, index=data_df.columns, name="权重").round(4)


def coefficient_of_variation_weight(data_df):
    """
    变异系数法计算变量权重
    参数:
        data_df: pd.DataFrame - 样本数据，行表示样本，列表示变量，数值需为非负且均值不为0
    返回:
        pd.Series - 各变量的权重，索引为变量名称
    异常:
        ValueError - 若数据包含负值、某变量均值为0
    """
    if (data_df <0).any().any():
        raise ValueError("数据中存在负值，无法进行变异系数法计算")
    
    mean_vals = data_df.mean(axis=0)
    if (mean_vals ==0).any():
        raise ValueError("存在变量均值为0，无法计算变异系数")
    
    std_vals = data_df.std(axis=0, ddof=0)
    cv = std_vals / mean_vals
    weights = cv / np.sum(cv)
    
    return pd.Series(weights, index=data_df.columns, name="权重").round(4)