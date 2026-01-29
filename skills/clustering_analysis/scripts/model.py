import numpy as np
import pandas as pd
from sklearn.cluster import KMeans, DBSCAN
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score, calinski_harabasz_score
import matplotlib.pyplot as plt

class ClusteringAnalyzer:
    def __init__(self, data, algorithm='kmeans', params=None):
        """
        初始化聚类分析器
        :param data: 输入数据，支持pandas DataFrame或numpy array
        :param algorithm: 聚类算法，可选'kmeans'或'dbscan'
        :param params: 算法参数字典，如kmeans的n_clusters，dbscan的eps和min_samples
        """
        self.data = data
        self.algorithm = algorithm.lower()
        self.params = params or {}
        self.scaler = StandardScaler()
        self.model = None
        self.cluster_labels = None
        self.evaluation_metrics = {}
        
    def preprocess(self):
        """数据预处理：标准化"""
        if isinstance(self.data, pd.DataFrame):
            self.processed_data = self.scaler.fit_transform(self.data)
        elif isinstance(self.data, np.ndarray):
            self.processed_data = self.scaler.fit_transform(self.data)
        else:
            raise ValueError("输入数据类型不支持，请使用pandas DataFrame或numpy array")
    
    def fit(self):
        """训练聚类模型"""
        self.preprocess()
        
        if self.algorithm == 'kmeans':
            # 设置默认参数
            n_clusters = self.params.get('n_clusters', 3)
            self.model = KMeans(n_clusters=n_clusters, random_state=42, **self.params)
            self.cluster_labels = self.model.fit_predict(self.processed_data)
            # 计算评估指标
            self.evaluation_metrics['silhouette_score'] = silhouette_score(self.processed_data, self.cluster_labels)
            self.evaluation_metrics['calinski_harabasz_score'] = calinski_harabasz_score(self.processed_data, self.cluster_labels)
            
        elif self.algorithm == 'dbscan':
            eps = self.params.get('eps', 0.5)
            min_samples = self.params.get('min_samples', 5)
            self.model = DBSCAN(eps=eps, min_samples=min_samples, **self.params)
            self.cluster_labels = self.model.fit_predict(self.processed_data)
            # DBSCAN计算轮廓系数（忽略噪声点-1）
            valid_labels = self.cluster_labels != -1
            if np.sum(valid_labels) > 1:
                self.evaluation_metrics['silhouette_score'] = silhouette_score(self.processed_data[valid_labels], self.cluster_labels[valid_labels])
            else:
                self.evaluation_metrics['silhouette_score'] = None
                
        else:
            raise ValueError(f"不支持的算法：{self.algorithm}，可选算法为'kmeans'或'dbscan'")
    
    def get_results(self):
        """返回聚类结果"""
        if self.cluster_labels is None:
            raise ValueError("模型尚未训练，请先调用fit()方法")
        
        return {
            "cluster_labels": self.cluster_labels.tolist(),
            "evaluation_metrics": self.evaluation_metrics,
            "algorithm_used": self.algorithm
        }
    
    def plot_clusters(self, feature_indices=[0,1]):
        """可视化聚类结果（仅支持二维特征）"""
        if self.cluster_labels is None:
            raise ValueError("模型尚未训练，请先调用fit()方法")
        
        if len(feature_indices) !=2:
            raise ValueError("仅支持二维特征可视化，请传入两个特征索引")
        
        plt.figure(figsize=(10,6))
        unique_labels = np.unique(self.cluster_labels)
        
        for label in unique_labels:
            mask = self.cluster_labels == label
            if label == -1:
                plt.scatter(self.processed_data[mask, feature_indices[0]], self.processed_data[mask, feature_indices[1]], c='gray', label='噪声点', alpha=0.5)
            else:
                plt.scatter(self.processed_data[mask, feature_indices[0]], self.processed_data[mask, feature_indices[1]], label=f'簇 {label}')
        
        plt.xlabel(f'特征 {feature_indices[0]}')
        plt.ylabel(f'特征 {feature_indices[1]}')
        plt.title(f'{self.algorithm.upper()} 聚类结果可视化')
        plt.legend()
        plt.show()