import numpy as np
import pandas as pd
import statsmodels.api as sm
from statsmodels.stats.diagnostic import acorr_ljungbox

def white_noise_test(ts_data, max_lag=None):
    """
    时间序列白噪声检验函数
    参数:
        ts_data: 一维时间序列数据，支持numpy数组或pandas Series
        max_lag: 最大滞后阶数，默认取min(20, len(ts_data)//10)
    返回:
        dict: 包含检验结果的字典，键包括：
            - is_white_noise: bool，是否为白噪声（基于p值>0.05判断）
            - ljung_box_stat: 各滞后阶数的Ljung-Box统计量列表
            - ljung_box_pvalues: 各滞后阶数的p值列表
            - acf_values: 自相关系数列表（包含lag0）
            - pacf_values: 偏自相关系数列表（包含lag0）
            - max_lag: 实际使用的最大滞后阶数
    """
    # 数据格式转换与验证
    if isinstance(ts_data, pd.Series):
        ts = ts_data.values
    elif isinstance(ts_data, np.ndarray):
        if ts_data.ndim != 1:
            raise ValueError("输入数据必须为一维数组或Series")
        ts = ts_data
    else:
        raise TypeError("输入数据类型不支持，请传入numpy数组或pandas Series")
    
    # 检查缺失值
    if np.isnan(ts).any():
        raise ValueError("输入数据包含缺失值，请处理后再进行检验")
    
    n = len(ts)
    # 设置默认最大滞后阶数
    if max_lag is None:
        max_lag = min(20, n // 10)
    if max_lag < 1:
        max_lag = 1
    
    # 计算自相关系数和偏自相关系数
    acf_values = sm.tsa.acf(ts, nlags=max_lag, fft=False)
    pacf_values = sm.tsa.pacf(ts, nlags=max_lag)
    
    # 执行Ljung-Box检验
    lb_result = acorr_ljungbox(ts, lags=max_lag, return_df=True)
    
    # 判断是否为白噪声：所有滞后阶数的p值均大于0.05则认为是白噪声
    is_white_noise = all(lb_result['lb_pvalue'] > 0.05)
    
    return {
        "is_white_noise": is_white_noise,
        "ljung_box_stat": lb_result['lb_stat'].tolist(),
        "ljung_box_pvalues": lb_result['lb_pvalue'].tolist(),
        "acf_values": acf_values.tolist(),
        "pacf_values": pacf_values.tolist(),
        "max_lag": max_lag
    }