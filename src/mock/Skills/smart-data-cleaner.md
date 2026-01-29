# 智能数据清洗 Skill 使用指南

## 简介
智能数据清洗 Skill 是一个强大的数据处理工具，能够自动识别并修复表格中的异常数据。它支持 CSV 和 Excel 格式，内置了多种常见错误处理规则，如日期格式统一、空值填充、重复数据删除等。

## 主要功能

*   **自动识别异常**：通过统计学算法自动发现数据中的离群点。
*   **格式统一**：将各种乱七八糟的日期、电话号码格式统一为标准格式。
*   **智能填充**：基于上下文或默认规则填充缺失值。
*   **去重**：智能识别并删除重复记录。

## 快速开始

### 1. 安装

首先，你需要安装我们的 Python SDK：

```bash
pip install datacleaner-skill
```

### 2. 基本用法

```python
from datacleaner import DataCleaner

# 加载数据
cleaner = DataCleaner("data.csv")

# 自动清洗
report = cleaner.auto_clean()

# 查看报告
print(report.summary())

# 保存结果
cleaner.save("cleaned_data.csv")
```

### 3. 配置规则

你可以自定义清洗规则：

```python
rules = {
    "date_format": "YYYY-MM-DD",
    "fill_na": "mean",  # 使用均值填充空值
    "drop_duplicates": True
}

cleaner.apply_rules(rules)
```

## 常见问题

**Q: 支持多大的文件？**
A: 目前支持最大 1GB 的 CSV 文件。对于更大的文件，建议分块处理。

**Q: 数据安全吗？**
A: 所有处理都在本地进行，不会上传到云端。
