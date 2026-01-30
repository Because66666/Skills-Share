import numpy as np
from scipy import stats

def mann_whitney_u_test(sample1, sample2, alternative='two-sided'):
    """
    Mann-Whitney U检验：用于比较两个独立样本的中位数是否存在显著差异
    参数:
        sample1: 第一组样本数据（列表或数组）
        sample2: 第二组样本数据（列表或数组）
        alternative: 备择假设类型，可选'less', 'greater', 'two-sided'，默认'two-sided'
    返回:
        dict: 包含检验结果的字典
    """
    sample1 = np.array(sample1)
    sample2 = np.array(sample2)
    
    # 数据类型检查
    if not np.issubdtype(sample1.dtype, np.number) or not np.issubdtype(sample2.dtype, np.number):
        raise ValueError("输入数据必须为数值型")
    
    # 执行检验
    u_stat, p_val = stats.mannwhitneyu(sample1, sample2, alternative=alternative)
    
    # 生成结论
    alpha = 0.05
    if p_val < alpha:
        conclusion = f"在显著性水平{alpha}下，拒绝原假设，认为两组样本的中位数存在显著差异"
    else:
        conclusion = f"在显著性水平{alpha}下，不拒绝原假设，认为两组样本的中位数无显著差异"
    
    return {
        'test_type': 'Mann-Whitney U检验',
        'statistic': float(u_stat),
        'p_value': float(p_val),
        'alternative_hypothesis': alternative,
        'conclusion': conclusion
    }

def wilcoxon_signed_rank_test(sample1, sample2=None, alternative='two-sided'):
    """
    Wilcoxon符号秩检验：用于比较配对样本的中位数是否存在显著差异
    参数:
        sample1: 第一组样本数据或配对样本的差值（列表或数组）
        sample2: 第二组样本数据（若传入则计算与sample1的差值），可选
        alternative: 备择假设类型，可选'less', 'greater', 'two-sided'，默认'two-sided'
    返回:
        dict: 包含检验结果的字典
    """
    if sample2 is not None:
        sample1 = np.array(sample1)
        sample2 = np.array(sample2)
        diff = sample1 - sample2
    else:
        diff = np.array(sample1)
    
    # 数据类型检查
    if not np.issubdtype(diff.dtype, np.number):
        raise ValueError("输入数据必须为数值型")
    
    # 移除差值为0的样本
    diff = diff[diff != 0]
    if len(diff) == 0:
        raise ValueError("所有配对样本的差值均为0，无法进行检验")
    
    # 执行检验
    w_stat, p_val = stats.wilcoxon(diff, alternative=alternative)
    
    # 生成结论
    alpha = 0.05
    if p_val < alpha:
        conclusion = f"在显著性水平{alpha}下，拒绝原假设，认为配对样本的中位数存在显著差异"
    else:
        conclusion = f"在显著性水平{alpha}下，不拒绝原假设，认为配对样本的中位数无显著差异"
    
    return {
        'test_type': 'Wilcoxon符号秩检验',
        'statistic': float(w_stat),
        'p_value': float(p_val),
        'alternative_hypothesis': alternative,
        'conclusion': conclusion
    }

def kruskal_wallis_h_test(*samples, alternative='two-sided'):
    """
    Kruskal-Wallis H检验：用于比较多个独立样本的中位数是否存在显著差异
    参数:
        *samples: 多个独立样本数据（每个为列表或数组）
        alternative: 备择假设类型，当前仅支持'two-sided'，默认'two-sided'
    返回:
        dict: 包含检验结果的字典
    """
    # 转换为数组并检查数据类型
    sample_arrays = [np.array(sample) for sample in samples]
    for idx, sample in enumerate(sample_arrays):
        if not np.issubdtype(sample.dtype, np.number):
            raise ValueError(f"第{idx+1}组样本数据必须为数值型")
    
    # 执行检验
    h_stat, p_val = stats.kruskal(*sample_arrays, alternative=alternative)
    
    # 生成结论
    alpha = 0.05
    if p_val < alpha:
        conclusion = f"在显著性水平{alpha}下，拒绝原假设，认为至少有一组样本的中位数与其他组存在显著差异"
    else:
        conclusion = f"在显著性水平{alpha}下，不拒绝原假设，认为所有组样本的中位数无显著差异"
    
    return {
        'test_type': 'Kruskal-Wallis H检验',
        'statistic': float(h_stat),
        'p_value': float(p_val),
        'alternative_hypothesis': alternative,
        'conclusion': conclusion
    }