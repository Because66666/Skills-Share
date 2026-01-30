import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, Ridge, Lasso, LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import r2_score, mean_squared_error, accuracy_score, classification_report

class RegressionModel:
    def __init__(self, model_type='linear', **kwargs):
        """
        初始化回归模型
        :param model_type: 模型类型，可选值为'linear', 'ridge', 'lasso', 'logistic'
        :param kwargs: 模型的超参数，传递给对应sklearn模型
        """
        self.model_type = model_type
        self.scaler = StandardScaler()
        self.model = self._initialize_model(**kwargs)
        self.is_trained = False

    def _initialize_model(self, **kwargs):
        """内部方法：根据模型类型初始化对应sklearn模型"""
        if self.model_type == 'linear':
            return LinearRegression(**kwargs)
        elif self.model_type == 'ridge':
            return Ridge(**kwargs)
        elif self.model_type == 'lasso':
            return Lasso(**kwargs)
        elif self.model_type == 'logistic':
            return LogisticRegression(**kwargs)
        else:
            raise ValueError("不支持的模型类型，可选类型为：linear, ridge, lasso, logistic")

    def preprocess_data(self, X, y=None, fit_scaler=True):
        """
        数据预处理：标准化特征数据
        :param X: 输入特征数据
        :param y: 目标变量（可选）
        :param fit_scaler: 是否拟合标准化器（训练阶段为True，预测阶段为False）
        :return: 预处理后的特征数据及目标变量（如果提供）
        """
        if not isinstance(X, (pd.DataFrame, np.ndarray)):
            raise TypeError("输入特征数据需为pandas DataFrame或numpy数组格式")
        
        if fit_scaler:
            X_scaled = self.scaler.fit_transform(X)
        else:
            X_scaled = self.scaler.transform(X)
        
        if y is not None:
            return X_scaled, y
        return X_scaled

    def train(self, X, y, test_size=0.2, random_state=42):
        """
        训练回归模型
        :param X: 输入特征数据
        :param y: 目标变量
        :param test_size: 测试集比例，默认0.2
        :param random_state: 随机种子，保证结果可复现
        :return: 包含模型参数、训练/测试评估指标的字典
        """
        # 划分训练集和测试集
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state
        )
        
        # 数据预处理
        X_train_scaled, y_train = self.preprocess_data(X_train, y_train, fit_scaler=True)
        X_test_scaled, y_test = self.preprocess_data(X_test, y_test, fit_scaler=False)
        
        # 训练模型
        self.model.fit(X_train_scaled, y_train)
        self.is_trained = True
        
        # 生成预测结果
        train_pred = self.model.predict(X_train_scaled)
        test_pred = self.model.predict(X_test_scaled)
        
        # 计算评估指标
        metrics = self._calculate_metrics(y_train, train_pred, y_test, test_pred)
        
        # 整理返回结果
        result = {
            'model_type': self.model_type,
            'training_metrics': metrics['train'],
            'testing_metrics': metrics['test'],
            'model_coefficients': self.model.coef_.tolist() if hasattr(self.model, 'coef_') else None,
            'model_intercept': self.model.intercept_.tolist() if hasattr(self.model, 'intercept_') else None
        }
        
        return result

    def _calculate_metrics(self, y_train, train_pred, y_test, test_pred):
        """内部方法：计算模型评估指标"""
        metrics = {'train': {}, 'test': {}}
        
        if self.model_type == 'logistic':
            # 分类任务指标
            metrics['train']['accuracy'] = accuracy_score(y_train, train_pred.round())
            metrics['train']['classification_report'] = classification_report(y_train, train_pred.round(), output_dict=True)
            metrics['test']['accuracy'] = accuracy_score(y_test, test_pred.round())
            metrics['test']['classification_report'] = classification_report(y_test, test_pred.round(), output_dict=True)
        else:
            # 连续预测任务指标
            metrics['train']['r2_score'] = r2_score(y_train, train_pred)
            metrics['train']['mse'] = mean_squared_error(y_train, train_pred)
            metrics['train']['rmse'] = np.sqrt(metrics['train']['mse'])
            metrics['test']['r2_score'] = r2_score(y_test, test_pred)
            metrics['test']['mse'] = mean_squared_error(y_test, test_pred)
            metrics['test']['rmse'] = np.sqrt(metrics['test']['mse'])
        
        return metrics

    def predict(self, X):
        """
        使用训练好的模型进行预测
        :param X: 新输入特征数据
        :return: 预测结果数组
        """
        if not self.is_trained:
            raise ValueError("模型尚未训练，请先调用train方法完成模型训练")
        
        X_scaled = self.preprocess_data(X, fit_scaler=False)
        predictions = self.model.predict(X_scaled)
        
        # 逻辑回归返回离散标签
        if self.model_type == 'logistic':
            return predictions.round().astype(int)
        return predictions