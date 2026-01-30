import pandas as pd
import numpy as np
from factor_analyzer import FactorAnalyzer, calculate_kmo, calculate_bartlett_sphericity
from sklearn.preprocessing import StandardScaler

def factor_analysis_comprehensive_evaluation(data, n_factors=None, rotation='varimax'):
    """
    因子分析综合评价法实现
    参数:
        data (pd.DataFrame): 输入数据集，每行代表一个评价对象，每列代表一个评价指标
        n_factors (int, optional): 提取的公共因子个数，若为None则根据特征值大于1自动确定
        rotation (str, optional): 因子旋转方法，默认'varimax'（方差最大化旋转）
    返回:
        dict: 包含以下键的结果字典：
            'kmo_test': KMO检验结果（统计量）
            'bartlett_test': 巴特利特球形检验结果（卡方值、p值）
            'factor_loadings': 因子载荷矩阵（DataFrame）
            'factor_variance': 因子方差解释信息（方差贡献、累积方差贡献，DataFrame）
            'factor_scores': 各样本的因子得分（DataFrame）
            'comprehensive_scores': 各样本的综合得分（Series）
            'ranking': 各样本的综合排名（从高到低，Series）
    """
    # 1. 数据标准化
    scaler = StandardScaler()
    scaled_data = scaler.fit_transform(data)
    scaled_df = pd.DataFrame(scaled_data, index=data.index, columns=data.columns)
    
    # 2. 适用性检验
    kmo_all, kmo_model = calculate_kmo(scaled_df)
    bartlett_chisq, bartlett_p = calculate_bartlett_sphericity(scaled_df)
    
    # 3. 自动确定因子个数（若未指定）
    if n_factors is None:
        fa_temp = FactorAnalyzer(rotation=None)
        fa_temp.fit(scaled_df)
        eigenvalues, _ = fa_temp.get_eigenvalues()
        n_factors = sum(eigenvalues > 1)
        if n_factors < 1:
            raise ValueError("所有特征值均小于1，无法提取有效公共因子")
    
    # 4. 构建因子分析模型
    fa = FactorAnalyzer(n_factors=n_factors, rotation=rotation, method='principal')
    fa.fit(scaled_df)
    
    # 5. 获取因子载荷矩阵
    factor_loadings = pd.DataFrame(
        fa.loadings_,
        index=data.columns,
        columns=[f'因子{i+1}' for i in range(n_factors)]
    )
    
    # 6. 因子方差解释信息
    variance, variance_cumulative = fa.get_factor_variance()
    factor_variance = pd.DataFrame({
        '方差贡献率': variance,
        '累积方差贡献率': variance_cumulative
    }, index=[f'因子{i+1}' for i in range(n_factors)])
    
    # 7. 计算因子得分
    factor_scores = pd.DataFrame(
        fa.transform(scaled_df),
        index=data.index,
        columns=[f'因子{i+1}得分' for i in range(n_factors)]
    )
    
    # 8. 计算综合得分（以方差贡献率为权重）
    weights = variance / variance.sum()
    comprehensive_scores = factor_scores @ weights
    comprehensive_scores = pd.Series(comprehensive_scores, name='综合得分', index=data.index)
    
    # 9. 生成排名（从高到低）
    ranking = comprehensive_scores.rank(ascending=False, method='min').astype(int)
    ranking = pd.Series(ranking, name='排名', index=data.index)
    
    # 整理结果
    results = {
        'kmo_test': {'kmo_statistic': kmo_model, 'kmo_per_variable': kmo_all},
        'bartlett_test': {'chi_square': bartlett_chisq, 'p_value': bartlett_p},
        'factor_loadings': factor_loadings,
        'factor_variance': factor_variance,
        'factor_scores': factor_scores,
        'comprehensive_scores': comprehensive_scores,
        'ranking': ranking
    }
    
    return results