import numpy as np
import pandas as pd
from scipy import stats
import matplotlib.pyplot as plt

def time_series_normality_test(ts_data, plot_qq=True, significance_level=0.05):
    """
    时间序列数据的正态性检验函数
    
    参数:
        ts_data: pandas Series 或 numpy array，待检验的时间序列数据
        plot_qq: bool，是否生成Q-Q图，默认为True
        significance_level: float，显著性水平，默认为0.05
    
    返回:
        dict: 包含各检验结果、Q-Q图状态及综合结论的字典
    """
    # 转换为numpy数组并扁平化
    data = np.asarray(ts_data).flatten()
    
    # 检查缺失值
    if np.isnan(data).any():
        raise ValueError("输入数据包含缺失值，请先处理缺失数据。")
    
    n = len(data)
    results = {}
    
    # Shapiro-Wilk检验（适用于小样本，n≤5000）
    if n <= 5000:
        shapiro_stat, shapiro_p = stats.shapiro(data)
        results["shapiro_wilk"] = {
            "statistic": round(shapiro_stat, 4),
            "p_value": round(shapiro_p, 4),
            "conclusion": "数据服从正态分布" if shapiro_p > significance_level else "数据不服从正态分布"
        }
    else:
        results["shapiro_wilk"] = "样本量超过5000，Shapiro-Wilk检验结果可靠性下降，已跳过该检验"
    
    # Kolmogorov-Smirnov检验（使用样本均值和标准差作为参数估计）
    ks_stat, ks_p = stats.kstest(data, 'norm', args=(np.mean(data), np.std(data, ddof=1)))
    results["kolmogorov_smirnov"] = {
        "statistic": round(ks_stat, 4),
        "p_value": round(ks_p, 4),
        "conclusion": "数据服从正态分布" if ks_p > significance_level else "数据不服从正态分布"
    }
    
    # Jarque-Bera检验
    jb_stat, jb_p = stats.jarque_bera(data)
    results["jarque_bera"] = {
        "statistic": round(jb_stat, 4),
        "p_value": round(jb_p, 4),
        "conclusion": "数据服从正态分布" if jb_p > significance_level else "数据不服从正态分布"
    }
    
    # 生成Q-Q图
    if plot_qq:
        plt.figure(figsize=(8, 6))
        stats.probplot(data, plot=plt)
        plt.title("Q-Q 图：时间序列数据正态性检验")
        plt.savefig("qq_plot.png")
        plt.close()
        results["qq_plot"] = "已生成Q-Q图，保存为qq_plot.png"
    
    # 生成综合结论
    reject_count = 0
    valid_tests = 0
    for test_name in ["shapiro_wilk", "kolmogorov_smirnov", "jarque_bera"]:
        test_result = results[test_name]
        if isinstance(test_result, dict):
            valid_tests += 1
            if test_result["conclusion"] == "数据不服从正态分布":
                reject_count += 1
    
    if valid_tests == 0:
        overall = "无法生成综合结论：无有效检验结果"
    else:
        if reject_count > valid_tests / 2:
            overall = "综合检验结果，数据不服从正态分布"
        else:
            overall = "综合检验结果，数据服从正态分布"
    
    results["overall_conclusion"] = overall
    results["significance_level"] = significance_level
    
    return results