import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.stats.diagnostic import acorr_ljungbox
from pmdarima import auto_arima
from sklearn.metrics import mean_absolute_error, mean_squared_error

class ARIMAPredictor:
    def __init__(self, p=None, d=None, q=None, auto_tune=False):
        """
        初始化ARIMA预测器
        
        参数:
            p (int, optional): AR阶数，默认None（自动调优时忽略）
            d (int, optional): 差分阶数，默认None（自动调优时忽略）
            q (int, optional): MA阶数，默认None（自动调优时忽略）
            auto_tune (bool): 是否启用自动参数调优，默认False
        """
        self.p = p
        self.d = d
        self.q = q
        self.auto_tune = auto_tune
        self.model = None
        self.best_params = None
        self.train_data = None
        self.evaluation_metrics = {}

    def _validate_data(self, data):
        """校验输入数据格式"""
        if not isinstance(data, pd.Series):
            raise ValueError("输入数据必须为Pandas Series类型，并包含datetime索引")
        if not isinstance(data.index, pd.DatetimeIndex):
            raise ValueError("数据索引必须为datetime类型，请使用pd.to_datetime转换")
        if data.isnull().sum() > 0:
            raise ValueError("输入数据存在缺失值，请先处理缺失值后再训练模型")
        return True

    def fit(self, data):
        """
        训练ARIMA模型
        
        参数:
            data (pd.Series): 带datetime索引的单变量时间序列数据
        """
        # 数据校验
        self._validate_data(data)
        self.train_data = data

        if self.auto_tune:
            # 自动调优参数
            self.model = auto_arima(
                data,
                start_p=0, start_q=0,
                max_p=5, max_q=5,
                d=None,  # 自动确定差分阶数
                seasonal=False,
                trace=False,
                error_action='ignore',
                suppress_warnings=True,
                stepwise=True
            )
            self.best_params = self.model.get_params()['order']
            self.p, self.d, self.q = self.best_params
        else:
            # 手动参数模式
            if self.p is None or self.d is None or self.q is None:
                raise ValueError("手动模式下必须指定p、d、q三个参数")
            # 训练ARIMA模型
            self.model = ARIMA(data, order=(self.p, self.d, self.q)).fit()

        # 计算训练集评估指标
        in_sample_pred = self.model.predict(start=0, end=len(data)-1)
        self.evaluation_metrics['MAE'] = mean_absolute_error(data, in_sample_pred)
        self.evaluation_metrics['RMSE'] = np.sqrt(mean_squared_error(data, in_sample_pred))

        # 残差白噪声检验
        ljung_box_result = acorr_ljungbox(self.model.resid, lags=[10], return_df=True)
        self.evaluation_metrics['ljung_box_p_value'] = ljung_box_result['lb_pvalue'][10]

        return self

    def forecast(self, steps=10, alpha=0.05):
        """
        生成未来步数的预测结果
        
        参数:
            steps (int): 预测步数，默认10
            alpha (float): 置信区间显著性水平，默认0.05（对应95%置信区间）
        
        返回:
            dict: 包含预测值、置信区间、评估指标的结果字典
        """
        if self.model is None:
            raise ValueError("请先调用fit方法训练模型")

        # 生成预测
        forecast_result = self.model.get_forecast(steps=steps, alpha=alpha)
        pred_values = forecast_result.predicted_mean
        conf_int = forecast_result.conf_int()

        return {
            'forecast_values': pred_values.tolist(),
            'confidence_intervals': conf_int.values.tolist(),
            'evaluation_metrics': self.evaluation_metrics,
            'model_order': (self.p, self.d, self.q)
        }

    def plot_forecast(self, steps=10, alpha=0.05):
        """
        可视化原始序列与预测结果
        
        参数:
            steps (int): 预测步数，默认10
            alpha (float): 置信区间显著性水平，默认0.05
        """
        if self.model is None:
            raise ValueError("请先调用fit方法训练模型")

        # 获取预测结果
        forecast_result = self.model.get_forecast(steps=steps, alpha=alpha)
        pred_values = forecast_result.predicted_mean
        conf_int = forecast_result.conf_int()

        # 绘图
        plt.figure(figsize=(12, 6))
        self.train_data.plot(label='原始数据')
        pred_values.plot(label='预测值', style='--')
        plt.fill_between(conf_int.index, conf_int.iloc[:,0], conf_int.iloc[:,1], color='gray', alpha=0.2, label='95%置信区间')
        plt.title(f'ARIMA({self.p},{self.d},{self.q}) 时间序列预测')
        plt.xlabel('时间')
        plt.ylabel('数值')
        plt.legend()
        plt.grid(True)
        plt.show()