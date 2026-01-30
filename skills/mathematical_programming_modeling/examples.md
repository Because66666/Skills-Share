# 数学规划建模使用示例

## 示例1：线性规划 - 生产计划优化
### 问题描述
某工厂生产A、B两种产品，生产每件A产品获利3元，B产品获利2元。生产A产品需要1单位原料和2单位工时，B产品需要1单位原料和1单位工时。现有原料4单位，工时5单位。求如何安排生产使利润最大化。

### 调用代码
```python
from scripts.model import MathematicalProgrammingModel
import pulp as lp

# 初始化最大化模型
model = MathematicalProgrammingModel("生产计划优化", sense=lp.LpMaximize)

# 添加连续决策变量x（A产品数量）、y（B产品数量）
x = model.add_variable("x")
y = model.add_variable("y")

# 设置目标函数：max 3x + 2y
model.set_objective(3 * x + 2 * y)

# 添加约束条件
model.add_constraint(x + y <= 4, "原料总量约束")
model.add_constraint(2 * x + y <= 5, "工时总量约束")

# 求解模型
model.solve()

# 获取结果
results = model.get_results()
print(results)
```

### 预期输出
```json
{
  "model_type": "线性规划",
  "objective_function": "3*x + 2*y",
  "constraints": ["x + y <= 4", "2*x + y <= 5"],
  "optimal_solution": {"x": 1.0, "y": 3.0},
  "optimal_value": 9.0,
  "status": "Optimal"
}
```

## 示例2：整数规划 - 设备采购优化
### 问题描述
某公司需要采购设备，设备A单价10万，每年产生5万利润；设备B单价15万，每年产生7万利润。预算为40万，求采购多少台A和B设备使年利润最大化（设备数量为整数）。

### 调用代码
```python
from scripts.model import MathematicalProgrammingModel
import pulp as lp

# 初始化最大化模型
model = MathematicalProgrammingModel("设备采购优化", sense=lp.LpMaximize)

# 添加整数决策变量a（A设备数量）、b（B设备数量）
a = model.add_variable("a", var_type=lp.LpInteger)
b = model.add_variable("b", var_type=lp.LpInteger)

# 设置目标函数：max 5a +7b
model.set_objective(5 * a +7 * b)

# 添加预算约束
model.add_constraint(10 * a +15 * b <=40, "预算约束")

# 求解模型
model.solve()

# 获取结果
results = model.get_results()
print(results)
```

### 预期输出
```json
{
  "model_type": "整数规划",
  "objective_function": "5*a +7*b",
  "constraints": ["10*a +15*b <=40"],
  "optimal_solution": {"a": 1, "b": 2},
  "optimal_value": 19.0,
  "status": "Optimal"
}
```