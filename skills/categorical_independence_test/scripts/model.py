import numpy as np
import pandas as pd
from scipy.stats import chi2_contingency

def categorical_independence_test(contingency_table, alpha=0.05):
    """
    分类变量独立性检验（卡方检验）
    
    参数:
        contingency_table (list of lists 或 pandas.DataFrame): 列联表数据，每行代表一个分类水平的观测频数
        alpha (float): 显著性水平，默认0.05
    
    返回:
        dict: 包含检验结果的字典，键包括：
            'chi2_statistic': 卡方统计量
            'p_value': p值
            'degrees_of_freedom': 自由度
            'expected_frequencies': 期望频数矩阵
            'conclusion': 检验结论（中文）
    """
    # 转换为numpy数组
    if isinstance(contingency_table, pd.DataFrame):
        obs = contingency_table.values
    else:
        obs = np.array(contingency_table)
    
    # 执行卡方检验
    chi2, p, dof, expected = chi2_contingency(obs)
    
    # 生成结论
    if p < alpha:
        conclusion = f"在显著性水平{alpha}下，拒绝原假设，认为两个分类变量不独立（存在关联）。"
    else:
        conclusion = f"在显著性水平{alpha}下，不拒绝原假设，认为两个分类变量相互独立。"
    
    # 整理结果
    result = {
        'chi2_statistic': round(chi2, 4),
        'p_value': round(p, 4),
        'degrees_of_freedom': dof,
        'expected_frequencies': expected.round(4).tolist(),
        'conclusion': conclusion
    }
    
    return result