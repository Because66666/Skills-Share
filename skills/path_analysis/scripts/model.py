import pandas as pd
import numpy as np
import statsmodels.api as sm
from statsmodels.stats.outliers_influence import variance_inflation_factor


class PathAnalysis:
    """
    通径分析类，用于分析自变量对因变量的直接效应和间接效应
    
    参数:
        data (pd.DataFrame): 包含自变量和因变量的数据集
        independent_vars (list): 自变量列表
        dependent_var (str): 因变量名称
    """
    def __init__(self, data: pd.DataFrame, independent_vars: list, dependent_var: str):
        self.data = data.copy()
        self.independent_vars = independent_vars
        self.dependent_var = dependent_var
        self.correlation_matrix = None
        self.path_coefficients = None
        self.regression_model = None
        self.direct_effects = None
        self.indirect_effects = None
        self.total_effects = None
        self.vif_values = None

    def _check_multicollinearity(self) -> pd.Series:
        """检查自变量的多重共线性（VIF值）"""
        X = sm.add_constant(self.data[self.independent_vars])
        vif = pd.Series([variance_inflation_factor(X.values, i) for i in range(X.shape[1])], 
                        index=X.columns).drop('const')
        self.vif_values = vif.round(2)
        return self.vif_values

    def compute_correlation_matrix(self) -> pd.DataFrame:
        """计算所有变量的Pearson相关系数矩阵"""
        self.correlation_matrix = self.data[[*self.independent_vars, self.dependent_var]].corr().round(4)
        return self.correlation_matrix

    def fit_regression_model(self) -> sm.regression.linear_model.RegressionResultsWrapper:
        """拟合多元线性回归模型，获取通径系数"""
        X = sm.add_constant(self.data[self.independent_vars])
        y = self.data[self.dependent_var]
        self.regression_model = sm.OLS(y, X).fit()
        self.path_coefficients = self.regression_model.params.drop('const').round(4)
        return self.regression_model

    def decompose_effects(self) -> dict:
        """分解直接效应、间接效应和总效应"""
        if self.correlation_matrix is None:
            self.compute_correlation_matrix()
        if self.path_coefficients is None:
            self.fit_regression_model()
        
        # 直接效应即通径系数
        self.direct_effects = self.path_coefficients.to_dict()
        
        # 计算间接效应：每个自变量通过其他自变量对因变量的间接影响
        self.indirect_effects = {}
        for var1 in self.independent_vars:
            self.indirect_effects[var1] = {}
            indirect_sum = 0.0
            for var2 in self.independent_vars:
                if var1 != var2:
                    indirect_eff = self.correlation_matrix.loc[var1, var2] * self.path_coefficients[var2]
                    self.indirect_effects[var1][var2] = round(indirect_eff, 4)
                    indirect_sum += indirect_eff
            self.indirect_effects[var1]['总间接效应'] = round(indirect_sum, 4)
        
        # 总效应 = 直接效应 + 总间接效应
        self.total_effects = {
            var: round(self.direct_effects[var] + self.indirect_effects[var]['总间接效应'], 4)
            for var in self.independent_vars
        }
        
        return {
            '直接效应': self.direct_effects,
            '间接效应': self.indirect_effects,
            '总效应': self.total_effects
        }

    def get_full_results(self) -> dict:
        """获取完整的通径分析结果"""
        # 检查多重共线性
        self._check_multicollinearity()
        # 分解效应
        effect_results = self.decompose_effects()
        
        full_results = {
            '变量信息': {
                '自变量': self.independent_vars,
                '因变量': self.dependent_var
            },
            '多重共线性检查(VIF)': self.vif_values.to_dict(),
            '相关系数矩阵': self.correlation_matrix.to_dict(),
            '通径系数': self.path_coefficients.to_dict(),
            '模型拟合优度': {
                'R²': round(self.regression_model.rsquared, 4),
                '调整R²': round(self.regression_model.rsquared_adj,4),
                'F值': round(self.regression_model.fvalue,4),
                'P值(F检验)': round(self.regression_model.f_pvalue,4)
            }
        }
        full_results.update(effect_results)
        
        return full_results