import pandas as pd
import warnings
from statsmodels.tsa.stattools import adfuller, kpss


def test_stationarity(ts: pd.Series, significance_level: float = 0.05) -> dict:
    """
    对时间序列进行平稳性检验，结合ADF单位根检验和KPSS趋势平稳性检验
    
    参数:
        ts: 输入的单变量时间序列，需为pandas Series类型，建议带有时间戳索引
        significance_level: 显著性水平，用于判断检验结果的显著性，默认0.05
    
    返回:
        dict: 包含两种检验的详细结果及综合结论的字典
    """
    # 数据有效性验证
    if not isinstance(ts, pd.Series):
        raise TypeError("输入数据必须是pandas Series类型的单变量时间序列")
    if ts.isnull().any():
        raise ValueError("时间序列中存在缺失值，请先处理缺失数据后再进行检验")
    if len(ts) < 20:
        warnings.warn("样本量过小（少于20个数据点），检验结果可能不可靠")
    
    # ADF检验：原假设为序列存在单位根（非平稳）
    adf_stat, adf_pval, _, _, adf_crit, _ = adfuller(ts)
    adf_is_stationary = adf_pval < significance_level
    adf_conclusion = f"ADF检验：{'序列平稳' if adf_is_stationary else '序列非平稳'}（p值={adf_pval:.4f}，显著性水平={significance_level}）"
    
    # KPSS检验：原假设为序列是趋势平稳的
    kpss_stat, kpss_pval, _, kpss_crit = kpss(ts, regression='c')
    kpss_is_stationary = False
    if kpss_pval is not None:
        kpss_is_stationary = kpss_pval >= significance_level
        kpss_conclusion = f"KPSS检验：{'序列平稳（趋势平稳）' if kpss_is_stationary else '序列非平稳'}（p值={kpss_pval:.4f}，显著性水平={significance_level}）"
    else:
        # 当p值无法直接计算时，对比统计量与临界值
        crit_value = kpss_crit.get(f"{significance_level:.2f}", kpss_crit.get(list(kpss_crit.keys())[-1]))
        kpss_is_stationary = kpss_stat < crit_value
        kpss_conclusion = f"KPSS检验：{'序列平稳（趋势平稳）' if kpss_is_stationary else '序列非平稳'}（统计量={kpss_stat:.4f}，{significance_level:.2f}水平临界值={crit_value:.4f}）"
    
    # 生成综合结论
    if adf_is_stationary and kpss_is_stationary:
        overall_conclusion = "综合结论：序列是严格平稳的，满足时间序列建模的平稳性要求"
    elif adf_is_stationary and not kpss_is_stationary:
        overall_conclusion = "综合结论：序列无单位根但存在趋势成分，建议考虑去趋势处理"
    elif not adf_is_stationary and kpss_is_stationary:
        overall_conclusion = "综合结论：序列存在单位根但趋势平稳，建议进行差分处理以消除单位根"
    else:
        overall_conclusion = "综合结论：序列非平稳，建议进行差分或其他变换（如对数变换）后重新检验"
    
    return {
        "significance_level": significance_level,
        "adf_test": {
            "statistic": adf_stat,
            "pvalue": adf_pval,
            "critical_values": adf_crit,
            "is_stationary": adf_is_stationary,
            "conclusion": adf_conclusion
        },
        "kpss_test": {
            "statistic": kpss_stat,
            "pvalue": kpss_pval,
            "critical_values": kpss_crit,
            "is_stationary": kpss_is_stationary,
            "conclusion": kpss_conclusion
        },
        "overall_conclusion": overall_conclusion
    }