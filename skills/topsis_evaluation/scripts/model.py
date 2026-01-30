import numpy as np

def topsis_evaluation(decision_matrix, weights, is_benefit):
    """
    TOPSIS多指标综合评价函数
    参数:
        decision_matrix (list or np.ndarray): 决策矩阵，行代表评价对象，列代表评价指标
        weights (list): 各指标权重，权重之和应为1
        is_benefit (list): 布尔值列表，指示每个指标是否为正向指标（True为正向，False为负向）
    返回:
        dict: 包含以下键的结果字典
            - closeness_scores: 各评价对象的贴近度得分
            - ranking: 各评价对象的排名（从高到低，1为最优）
            - ideal_solution: 正理想解
            - negative_ideal_solution: 负理想解
    """
    # 转换为numpy数组
    dm = np.array(decision_matrix, dtype=np.float64)
    weights = np.array(weights, dtype=np.float64)
    is_benefit = np.array(is_benefit, dtype=bool)
    
    # 1. 标准化决策矩阵（向量归一化）
    norm_matrix = dm / np.sqrt(np.sum(dm**2, axis=0))
    
    # 2. 加权标准化矩阵
    weighted_norm = norm_matrix * weights
    
    # 3. 确定正负理想解
    ideal_solution = np.where(is_benefit, np.max(weighted_norm, axis=0), np.min(weighted_norm, axis=0))
    negative_ideal_solution = np.where(is_benefit, np.min(weighted_norm, axis=0), np.max(weighted_norm, axis=0))
    
    # 4. 计算距离
    d_plus = np.sqrt(np.sum((weighted_norm - ideal_solution)**2, axis=1))
    d_minus = np.sqrt(np.sum((weighted_norm - negative_ideal_solution)**2, axis=1))
    
    # 5. 计算贴近度
    closeness = d_minus / (d_plus + d_minus)
    
    # 6. 排名（从高到低）
    ranking = np.argsort(-closeness) + 1  # argsort是升序，取负变成降序，加1是排名从1开始
    
    return {
        "closeness_scores": closeness.tolist(),
        "ranking": ranking.tolist(),
        "ideal_solution": ideal_solution.tolist(),
        "negative_ideal_solution": negative_ideal_solution.tolist()
    }