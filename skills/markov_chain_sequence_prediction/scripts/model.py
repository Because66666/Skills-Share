import numpy as np
import pandas as pd

class MarkovChainPredictor:
    """
    马尔可夫链序列预测器，用于对离散状态随机序列进行下一状态预测
    """
    def __init__(self):
        self.states = None  # 所有可能的离散状态列表
        self.state_index = {}  # 状态到索引的映射字典
        self.transition_matrix = None  # 状态转移概率矩阵

    def fit(self, sequence):
        """
        根据历史序列训练模型，构建状态转移概率矩阵
        
        参数:
            sequence: list，离散状态组成的历史序列
        """
        if not isinstance(sequence, list) or len(sequence) < 2:
            raise ValueError("输入序列必须是长度至少为2的列表")
        
        # 获取所有唯一状态并排序
        self.states = sorted(list(set(sequence)))
        self.state_index = {state: idx for idx, state in enumerate(self.states)}
        num_states = len(self.states)
        
        # 初始化转移矩阵
        self.transition_matrix = np.zeros((num_states, num_states), dtype=np.float64)
        
        # 统计状态转移次数
        for i in range(len(sequence) - 1):
            current_state = sequence[i]
            next_state = sequence[i + 1]
            current_idx = self.state_index[current_state]
            next_idx = self.state_index[next_state]
            self.transition_matrix[current_idx][next_idx] += 1
        
        # 归一化得到转移概率（处理零行避免除以零）
        row_sums = self.transition_matrix.sum(axis=1, keepdims=True)
        self.transition_matrix = np.divide(self.transition_matrix, row_sums, where=row_sums != 0)

    def predict_next_state(self, current_state):
        """
        根据当前状态预测下一时刻的状态及概率分布
        
        参数:
            current_state: 当前状态，必须在训练的状态空间中
        
        返回:
            dict，包含预测状态、概率分布、转移矩阵和状态空间
        """
        if self.transition_matrix is None:
            raise ValueError("模型尚未训练，请先调用fit方法输入历史序列")
        
        if current_state not in self.state_index:
            raise ValueError(f"当前状态{current_state}不在训练的状态空间中")
        
        current_idx = self.state_index[current_state]
        prob_dist = self.transition_matrix[current_idx]
        
        # 找到概率最高的状态
        max_prob_idx = np.argmax(prob_dist)
        predicted_state = self.states[max_prob_idx]
        
        # 构建概率分布字典
        prob_dict = {state: float(prob_dist[self.state_index[state]]) for state in self.states}
        
        return {
            "predicted_next_state": predicted_state,
            "state_probabilities": prob_dict,
            "transition_matrix": self.transition_matrix.tolist(),
            "states": self.states
        }
