import numpy as np
import pandas as pd
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis as LDA
from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis as QDA
from sklearn.metrics import accuracy_score, confusion_matrix


class DiscriminantAnalysis:
    def __init__(self, model_type='LDA'):
        """
        判别分析模型初始化
        参数:
            model_type: str, 模型类型，可选值为 'LDA' (线性判别分析) 或 'QDA' (二次判别分析)
        """
        if model_type not in ['LDA', 'QDA']:
            raise ValueError("model_type 必须为 'LDA' 或 'QDA'")
        self.model_type = model_type
        self.model = LDA() if model_type == 'LDA' else QDA()
        self.classes_ = None
        self.feature_names = None

    def fit(self, X, y, feature_names=None):
        """
        训练判别分析模型
        参数:
            X: 二维数组或DataFrame, 特征矩阵 (样本数 × 特征数)
            y: 一维数组或Series, 类别标签
            feature_names: list, 特征名称列表（可选，用于结果解释）
        """
        # 处理特征名称
        if isinstance(X, pd.DataFrame):
            self.feature_names = X.columns.tolist()
        elif feature_names is not None:
            self.feature_names = feature_names
        else:
            self.feature_names = [f"feature_{i}" for i in range(X.shape[1])]
        
        # 拟合模型
        self.model.fit(X, y)
        self.classes_ = self.model.classes_

    def predict(self, X):
        """
        对样本进行分类预测
        参数:
            X: 二维数组或DataFrame, 待预测的特征矩阵
        返回:
            list: 预测的类别标签列表
        """
        if not hasattr(self.model, 'classes_'):
            raise RuntimeError("模型尚未训练，请先调用 fit() 方法")
        return self.model.predict(X).tolist()

    def evaluate(self, X_test, y_test):
        """
        评估模型性能
        参数:
            X_test: 二维数组或DataFrame, 测试集特征矩阵
            y_test: 一维数组或Series, 测试集类别标签
        返回:
            dict: 包含准确率和混淆矩阵的评估结果
        """
        y_pred = self.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        conf_matrix = confusion_matrix(y_test, y_pred).tolist()
        return {
            "accuracy": round(accuracy, 4),
            "confusion_matrix": conf_matrix
        }

    def get_discriminant_params(self):
        """
        获取判别函数的关键参数
        返回:
            dict: 模型的关键参数，如LDA的系数、截距，QDA的协方差矩阵等
        """
        if not hasattr(self.model, 'classes_'):
            raise RuntimeError("模型尚未训练，请先调用 fit() 方法")
        
        params = {}
        if self.model_type == 'LDA':
            params["coefficients"] = dict(zip(self.classes_, self.model.coef_.tolist()))
            params["intercepts"] = dict(zip(self.classes_, self.model.intercept_.tolist()))
            params["class_means"] = dict(zip(self.classes_, self.model.means_.tolist()))
        else:  # QDA
            params["class_covariances"] = dict(zip(self.classes_, [cov.tolist() for cov in self.model.covariance_]))
            params["class_means"] = dict(zip(self.classes_, self.model.means_.tolist()))
            params["class_priors"] = dict(zip(self.classes_, self.model.priors_.tolist()))
        return params