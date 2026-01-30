import numpy as np
import pandas as pd

class PCA:
    def __init__(self, n_components=None, explained_variance_ratio_threshold=0.85):
        """
        初始化PCA模型
        参数:
            n_components: 保留的主成分数量，若为None则根据累计方差贡献率阈值自动选择
            explained_variance_ratio_threshold: 累计方差贡献率阈值，默认0.85
        """
        self.n_components = n_components
        self.threshold = explained_variance_ratio_threshold
        self.mean_ = None
        self.std_ = None
        self.components_ = None
        self.explained_variance_ = None
        self.explained_variance_ratio_ = None
        self.cumulative_variance_ratio_ = None

    def fit(self, X):
        """
        拟合PCA模型，计算主成分
        参数:
            X: 输入数据，可为numpy数组或pandas DataFrame
        返回:
            拟合后的模型对象
        """
        # 转换为numpy数组
        X = np.asarray(X)
        
        # 数据标准化
        self.mean_ = np.mean(X, axis=0)
        self.std_ = np.std(X, axis=0)
        # 避免除以0的情况
        self.std_[self.std_ == 0] = 1e-8
        X_std = (X - self.mean_) / self.std_
        
        # 计算协方差矩阵
        cov_matrix = np.cov(X_std.T)
        
        # 特征分解
        eigenvalues, eigenvectors = np.linalg.eig(cov_matrix)
        
        # 对特征值和特征向量按降序排序
        sorted_indices = np.argsort(eigenvalues)[::-1]
        sorted_eigenvalues = eigenvalues[sorted_indices]
        sorted_eigenvectors = eigenvectors[:, sorted_indices]
        
        # 计算方差贡献率和累计方差贡献率
        total_variance = np.sum(sorted_eigenvalues)
        self.explained_variance_ratio_ = sorted_eigenvalues / total_variance
        self.cumulative_variance_ratio_ = np.cumsum(self.explained_variance_ratio_)
        
        # 确定主成分数量
        if self.n_components is None:
            # 找到满足累计方差贡献率≥阈值的最小k
            self.n_components = np.argmax(self.cumulative_variance_ratio_ >= self.threshold) + 1
        
        # 选择前n_components个主成分
        self.components_ = sorted_eigenvectors[:, :self.n_components]
        self.explained_variance_ = sorted_eigenvalues[:self.n_components]
        
        return self

    def transform(self, X):
        """
        将输入数据投影到主成分上，得到降维后的数据
        参数:
            X: 输入数据，可为numpy数组或pandas DataFrame
        返回:
            降维后的数据（numpy数组）
        """
        if self.components_ is None:
            raise ValueError("模型尚未拟合，请先调用fit方法")
        
        X = np.asarray(X)
        X_std = (X - self.mean_) / self.std_
        X_pca = np.dot(X_std, self.components_)
        
        return X_pca

    def fit_transform(self, X):
        """
        拟合模型并同时转换数据
        参数:
            X: 输入数据，可为numpy数组或pandas DataFrame
        返回:
            降维后的数据（numpy数组）
        """
        self.fit(X)
        return self.transform(X)