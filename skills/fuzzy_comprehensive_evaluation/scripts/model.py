import numpy as np

def fuzzy_comprehensive_evaluation(weight_vector, judgment_matrix, evaluation_set, operator="M(+,·)"):
    """
    模糊综合评价法实现
    参数:
        weight_vector: list/np.array, 因素权重向量（需归一化，和为1）
        judgment_matrix: list/np.array, n×m的模糊判断矩阵，n为因素数，m为评价等级数
        evaluation_set: list, 评价等级集合，如["优秀", "良好", "中等", "差"]
        operator: str, 模糊算子类型，可选值："M(∨,∧)", "M(+,∧)", "M(∨,·)", "M(+,·)"
    返回:
        dict: 包含综合评价向量、评价结果的字典
    """
    # 转换为numpy数组
    A = np.array(weight_vector, dtype=np.float64)
    R = np.array(judgment_matrix, dtype=np.float64)
    
    # 输入验证
    if not np.isclose(np.sum(A), 1.0, atol=1e-6):
        raise ValueError("权重向量的和必须为1，请先归一化处理")
    if A.shape[0] != R.shape[0]:
        raise ValueError("权重向量的维度必须与判断矩阵的行数（因素数）一致")
    if R.shape[1] != len(evaluation_set):
        raise ValueError("判断矩阵的列数必须与评价集的元素个数一致")
    
    # 选择模糊算子计算综合向量B
    if operator == "M(∨,∧)":
        # 最大-最小算子
        B = np.max(np.minimum(A.reshape(-1, 1), R), axis=0)
    elif operator == "M(+,∧)":
        # 加权和-最小算子
        B = np.sum(np.minimum(A.reshape(-1, 1), R), axis=0)
    elif operator == "M(∨,·)":
        # 最大-乘积算子
        B = np.max(A.reshape(-1, 1) * R, axis=0)
    elif operator == "M(+,·)":
        # 加权和-乘积算子（常用）
        B = A @ R
    else:
        raise ValueError(f"不支持的模糊算子类型：{operator}，可选类型为'M(∨,∧)'、'M(+,∧)'、'M(∨,·)'、'M(+,·)'")
    
    # 归一化处理
    sum_B = np.sum(B)
    B_normalized = B / sum_B if sum_B != 0 else B
    
    # 最大隶属度原则确定评价结果
    max_idx = np.argmax(B_normalized)
    evaluation_result = evaluation_set[max_idx]
    
    return {
        "comprehensive_vector": np.round(B_normalized, 4).tolist(),
        "evaluation_result": evaluation_result,
        "used_operator": operator
    }