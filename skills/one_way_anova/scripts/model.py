import numpy as np
from scipy.stats import f_oneway, shapiro, levene, bartlett
from statsmodels.stats.oneway import anova_oneway

class OneWayANOVA:
    def __init__(self, group_data):
        """
        初始化单因素方差分析类
        :param group_data: 字典，键为组别名称，值为该组的样本数据列表
        """
        self.group_data = group_data
        self.groups = list(group_data.keys())
        self.data = [np.array(g) for g in group_data.values()]
        
        # 检查组别数量
        if len(self.groups) < 3:
            raise ValueError('至少需要3个及以上的组别进行单因素方差分析')
        
        # 检查每组样本量
        for name, data in group_data.items():
            if len(data) < 1:
                raise ValueError(f'组别 {name} 的样本量不能为空')
    
    def check_normality(self, alpha=0.05):
        """
        正态性检验（Shapiro-Wilk检验）
        :param alpha: 显著性水平，默认0.05
        :return: 包含每组检验结果的字典
        """
        normality_results = {}
        for name, data in zip(self.groups, self.data):
            stat, p = shapiro(data)
            conclusion = f'在α={alpha}水平下，{name}组数据服从正态分布' if p > alpha else f'在α={alpha}水平下，{name}组数据不服从正态分布'
            normality_results[name] = {
                'shapiro_statistic': round(stat, 4),
                'p_value': round(p, 4),
                'conclusion': conclusion
            }
        return normality_results
    
    def check_homogeneity(self, method='levene', alpha=0.05):
        """
        方差齐性检验
        :param method: 检验方法，可选'levene'（默认）或'bartlett'
        :param alpha: 显著性水平，默认0.05
        :return: 检验结果字典
        """
        if method == 'levene':
            stat, p = levene(*self.data)
            method_name = 'Levene检验'
        elif method == 'bartlett':
            stat, p = bartlett(*self.data)
            method_name = 'Bartlett检验'
        else:
            raise ValueError('仅支持"levene"或"bartlett"方法')
        
        conclusion = f'在α={alpha}水平下，各组方差齐性' if p > alpha else f'在α={alpha}水平下，各组方差不齐'
        return {
            'method': method_name,
            'statistic': round(stat, 4),
            'p_value': round(p, 4),
            'conclusion': conclusion
        }
    
    def perform_anova(self, alpha=0.05, use_welch_if_needed=False):
        """
        执行单因素方差分析
        :param alpha: 显著性水平，默认0.05
        :param use_welch_if_needed: 当方差不齐时是否自动使用Welch ANOVA，默认False
        :return: 方差分析结果字典
        """
        # 检查方差齐性
        homo_result = self.check_homogeneity(alpha=alpha)
        variances_homogeneous = homo_result['p_value'] > alpha
        
        if variances_homogeneous or not use_welch_if_needed:
            # 使用标准ANOVA
            f_stat, p_val = f_oneway(*self.data)
            method = '标准单因素方差分析'
        else:
            # 使用Welch ANOVA
            result = anova_oneway(self.data, welch=True)
            f_stat = result.statistic
            p_val = result.pvalue
            method = 'Welch单因素方差分析'
        
        conclusion = f'在α={alpha}水平下，因素对各组均值存在显著影响' if p_val < alpha else f'在α={alpha}水平下，因素对各组均值无显著影响'
        return {
            'method': method,
            'f_value': round(f_stat, 4),
            'p_value': round(p_val, 4),
            'conclusion': conclusion,
            'variance_homogeneity': homo_result['conclusion']
        }
    
    def get_full_report(self, alpha=0.05, use_welch_if_needed=False):
        """
        生成完整的分析报告
        :param alpha: 显著性水平，默认0.05
        :param use_welch_if_needed: 当方差不齐时是否自动使用Welch ANOVA，默认False
        :return: 字符串形式的完整报告
        """
        report = '=== 单因素方差分析报告 ===\n\n'
        
        # 正态性检验结果
        report += '1. 正态性检验结果（Shapiro-Wilk）:\n'
        norm_results = self.check_normality(alpha=alpha)
        for group, res in norm_results.items():
            report += f'- {group}: 统计量={res["shapiro_statistic"]}, P值={res["p_value"]} → {res["conclusion"]}\n'
        report += '\n'
        
        # 方差齐性检验结果
        report += '2. 方差齐性检验结果:\n'
        homo_result = self.check_homogeneity(alpha=alpha)
        report += f'- 方法: {homo_result["method"]}\n'
        report += f'- 统计量={homo_result["statistic"]}, P值={homo_result["p_value"]} → {homo_result["conclusion"]}\n'
        report += '\n'
        
        # 方差分析结果
        report += '3. 方差分析结果:\n'
        anova_result = self.perform_anova(alpha=alpha, use_welch_if_needed=use_welch_if_needed)
        report += f'- 方法: {anova_result["method"]}\n'
        report += f'- F值={anova_result["f_value"]}, P值={anova_result["p_value"]} → {anova_result["conclusion"]}\n'
        
        return report