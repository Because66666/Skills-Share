import pulp as lp

class MathematicalProgrammingModel:
    """
    数学规划建模类，支持构建和求解线性规划、整数规划等各类数学规划问题
    """
    def __init__(self, problem_name="math_programming_model", sense=lp.LpMaximize):
        """
        初始化模型
        :param problem_name: 模型名称
        :param sense: 优化方向，lp.LpMaximize（最大化）或 lp.LpMinimize（最小化）
        """
        self.problem = lp.LpProblem(problem_name, sense)
        self.variables = {}
        self.status = None
        self.optimal_value = None
        self.optimal_solution = {}

    def add_variable(self, name, var_type=lp.LpContinuous, lowBound=0, upBound=None):
        """
        添加决策变量
        :param name: 变量名称
        :param var_type: 变量类型，lp.LpContinuous（连续）、lp.LpInteger（整数）、lp.LpBinary（二进制）
        :param lowBound: 变量下界（默认0）
        :param upBound: 变量上界（默认无限制）
        :return: 创建的变量对象
        """
        var = lp.LpVariable(name, lowBound=lowBound, upBound=upBound, cat=var_type)
        self.variables[name] = var
        return var

    def set_objective(self, expr):
        """
        设置目标函数
        :param expr: 目标函数表达式（使用已添加的变量构建）
        """
        self.problem += expr

    def add_constraint(self, expr, name=None):
        """
        添加约束条件
        :param expr: 约束条件表达式（使用已添加的变量构建）
        :param name: 约束名称（可选）
        """
        self.problem += expr, name

    def solve(self, solver=None):
        """
        求解模型
        :param solver: 指定求解器（默认使用CBC求解器）
        :return: 求解状态、最优值、最优解
        """
        self.status = self.problem.solve(solver=solver)
        self.optimal_value = lp.value(self.problem.objective)
        self.optimal_solution = {name: lp.value(var) for name, var in self.variables.items()}
        return self.status, self.optimal_value, self.optimal_solution

    def get_results(self):
        """
        获取结构化的求解结果
        :return: 包含模型信息和求解结果的字典
        """
        # 推断模型类型
        var_types = set(var.cat for var in self.variables.values())
        if lp.LpInteger in var_types or lp.LpBinary in var_types:
            model_type = "整数规划"
        else:
            model_type = "线性规划"

        return {
            "model_type": model_type,
            "objective_function": str(self.problem.objective),
            "constraints": [str(constraint) for constraint in self.problem.constraints.values()],
            "optimal_solution": self.optimal_solution,
            "optimal_value": self.optimal_value,
            "status": lp.LpStatus[self.status]
        }