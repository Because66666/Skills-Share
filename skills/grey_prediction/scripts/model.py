import numpy as np
import pandas as pd

class GreyPrediction:
    def __init__(self, data):
        """
        初始化灰色预测模型
        :param data: 输入数据序列，可为列表、numpy数组或pandas Series
        """
        if isinstance(data, pd.Series):
            self.data = data.values
        else:
            self.data = np.array(data)
        
        if np.any(self.data < 0):
            raise ValueError("输入数据序列不能包含负数")
        
        self.n = len(self.data)
        if self.n < 3:
            raise ValueError("样本量不能少于3个，否则模型无法有效建立")
        
        self.a = None  # 发展系数
        self.b = None  # 灰作用量
        self.fitted_data = None  # 拟合数据
        self.accuracy_result = None  # 精度检验结果

    def fit(self):
        """
        训练GM(1,1)模型，求解参数并生成拟合数据
        """
        # 一次累加生成序列（1-AGO）
        x1 = np.cumsum(self.data)
        
        # 构造矩阵B和Y
        B = np.zeros((self.n - 1, 2))
        Y = np.zeros((self.n - 1, 1))
        
        for i in range(self.n - 1):
            B[i, 0] = -0.5 * (x1[i] + x1[i+1])
            B[i, 1] = 1
            Y[i, 0] = self.data[i+1]
        
        # 最小二乘法求解参数[a, b]^T
        BT = B.T
        params = np.linalg.inv(BT @ B) @ BT @ Y
        self.a = params[0, 0]
        self.b = params[1, 0]
        
        # 生成拟合的累加序列
        x1_fitted = np.zeros(self.n)
        x1_fitted[0] = self.data[0]
        for i in range(1, self.n):
            x1_fitted[i] = (self.data[0] - self.b / self.a) * np.exp(-self.a * i) + self.b / self.a
        
        # 累减生成拟合的原始序列
        self.fitted_data = np.zeros(self.n)
        self.fitted_data[0] = self.data[0]
        for i in range(1, self.n):
            self.fitted_data[i] = x1_fitted[i] - x1_fitted[i-1]
        
        # 进行精度检验
        self._check_accuracy()
        
        return self

    def predict(self, steps=1):
        """
        预测未来指定步数的数值
        :param steps: 预测步数，默认1步
        :return: 预测结果数组
        """
        if self.a is None or self.b is None:
            raise RuntimeError("模型未训练，请先调用fit()方法")
        
        predicted = []
        for k in range(self.n, self.n + steps):
            # 计算累加序列的预测值
            x1_pred = (self.data[0] - self.b / self.a) * np.exp(-self.a * k) + self.b / self.a
            x1_pred_prev = (self.data[0] - self.b / self.a) * np.exp(-self.a * (k - 1)) + self.b / self.a
            # 累减得到原始序列预测值
            x0_pred = x1_pred - x1_pred_prev
            predicted.append(x0_pred)
        
        return np.array(predicted)

    def _check_accuracy(self):
        """
        后验差检验，评估模型精度
        """
        residual = self.data - self.fitted_data
        mean_original = np.mean(self.data)
        mean_residual = np.mean(residual)
        
        # 计算标准差
        std_original = np.std(self.data, ddof=1)
        std_residual = np.std(residual, ddof=1)
        
        # 后验差比c
        c = std_residual / std_original
        
        # 小误差概率p
        threshold = 0.6745 * std_original
        p = np.sum(np.abs(residual - mean_residual) < threshold) / self.n
        
        # 确定精度等级
        if c < 0.35 and p > 0.95:
            grade = "一级（好）"
        elif c < 0.5 and p > 0.8:
            grade = "二级（合格）"
        elif c < 0.65 and p > 0.7:
            grade = "三级（勉强合格）"
        else:
            grade = "四级（不合格）"
        
        self.accuracy_result = {
            "后验差比c": round(c, 4),
            "小误差概率p": round(p, 4),
            "精度等级": grade
        }

    def get_result(self):
        """
        获取完整的模型结果
        :return: 包含原始数据、拟合数据、精度检验结果的字典
        """
        if self.fitted_data is None:
            raise RuntimeError("模型未训练，请先调用fit()方法")
        
        return {
            "原始数据": self.data.tolist(),
            "拟合数据": self.fitted_data.tolist(),
            "精度检验": self.accuracy_result
        }