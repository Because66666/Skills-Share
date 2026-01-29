import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from statsmodels.multivariate.cancorr import CanCorr

class CanonicalCorrelationAnalysis:
    def __init__(self, X, Y):
        """
        初始化典型相关分析类
        参数:
            X: 第一组变量数据，支持Pandas DataFrame或NumPy数组
            Y: 第二组变量数据，支持Pandas DataFrame或NumPy数组
        """
        self.X = self._convert_to_dataframe(X, prefix='X')
        self.Y = self._convert_to_dataframe(Y, prefix='Y')
        self.scaler_X = StandardScaler()
        self.scaler_Y = StandardScaler()
        self.X_scaled = self.scaler_X.fit_transform(self.X)
        self.Y_scaled = self.scaler_Y.fit_transform(self.Y)
        self.model = None
        self.results = None

    def _convert_to_dataframe(self, data, prefix):
        """将输入数据转换为Pandas DataFrame格式"""
        if not isinstance(data, pd.DataFrame):
            if isinstance(data, np.ndarray):
                if len(data.shape) != 2:
                    raise ValueError("输入数组必须为二维结构（样本数×变量数）")
                cols = [f"{prefix}_{i+1}" for i in range(data.shape[1])]
                data = pd.DataFrame(data, columns=cols)
            else:
                raise ValueError("输入数据必须是Pandas DataFrame或NumPy数组")
        return data

    def fit(self):
        """拟合典型相关分析模型并提取结果"""
        self.model = CanCorr(self.X_scaled, self.Y_scaled)
        self.model.fit()
        self.results = self._extract_results()

    def _extract_results(self):
        """从拟合好的模型中提取结构化结果"""
        n_corr = len(self.model.corr)
        canonical_vars = [f"典型变量_{i+1}" for i in range(n_corr)]
        
        results = {
            # 典型相关系数
            "典型相关系数": self.model.corr,
            # X组典型载荷
            "X组典型载荷": pd.DataFrame(
                self.model.x_loadings,
                index=self.X.columns,
                columns=canonical_vars
            ),
            # Y组典型载荷
            "Y组典型载荷": pd.DataFrame(
                self.model.y_loadings,
                index=self.Y.columns,
                columns=canonical_vars
            ),
            # X组典型权重
            "X组典型权重": pd.DataFrame(
                self.model.x_weights,
                index=self.X.columns,
                columns=canonical_vars
            ),
            # Y组典型权重
            "Y组典型权重": pd.DataFrame(
                self.model.y_weights,
                index=self.Y.columns,
                columns=canonical_vars
            ),
            # X组典型变量得分
            "X组典型变量得分": pd.DataFrame(
                self.model.x_scores,
                columns=[f"X_典型得分_{i+1}" for i in range(n_corr)]
            ),
            # Y组典型变量得分
            "Y组典型变量得分": pd.DataFrame(
                self.model.y_scores,
                columns=[f"Y_典型得分_{i+1}" for i in range(n_corr)]
            ),
            # 显著性检验结果
            "显著性检验": self.model.test()
        }
        return results

    def get_results_summary(self):
        """获取结构化的结果摘要文本"""
        if not self.results:
            raise ValueError("模型尚未拟合，请先调用fit()方法")
        
        summary_parts = []
        summary_parts.append("=== 典型相关分析结果摘要 ===\n")
        
        # 添加典型相关系数
        summary_parts.append("1. 典型相关系数：")
        for i, corr in enumerate(self.results["典型相关系数"], 1):
            summary_parts.append(f"   第{i}对典型变量相关系数：{corr:.4f}")
        summary_parts.append("\n")
        
        # 添加X组典型载荷
        summary_parts.append("2. X组变量典型载荷：")
        summary_parts.append(self.results["X组典型载荷"].to_string())
        summary_parts.append("\n")
        
        # 添加Y组典型载荷
        summary_parts.append("3. Y组变量典型载荷：")
        summary_parts.append(self.results["Y组典型载荷"].to_string())
        summary_parts.append("\n")
        
        # 添加显著性检验
        summary_parts.append("4. 显著性检验结果：")
        summary_parts.append(self.results["显著性检验"].summary().as_text())
        
        return "\n".join(summary_parts)