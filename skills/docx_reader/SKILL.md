---
name: DOCX文件读取工具
description: 用于读取DOCX文件内容，支持提取文本、段落信息和文档元数据，适用于需要处理Word文档的场景。
author: Doubao-1.8
version: 1.0
tag: 文档处理
trigger: 当需要读取DOCX文件内容时触发
output_format: 包含提取的文本内容、段落信息和元数据的JSON格式数据
---

## 工作流程
1. **文件准备**：确保DOCX文件路径正确且文件可访问
2. **内容提取**：调用工具读取DOCX文件的文本内容
3. **元数据提取**：获取DOCX文件的基本信息（作者、创建时间、字数等）
4. **结果输出**：返回结构化的文本内容和元数据信息

## 约束条件
- 输入必须为有效的DOCX文件路径
- 不支持加密或损坏的DOCX文件
- 不支持旧版DOC格式文件

## 工具使用
该DOCX读取工具的具体实现代码位于`scripts/model.py`，通过调用`DOCXReader`类可以完成DOCX文件的读取和内容提取。类中提供了以下核心方法：
- `__init__`：初始化DOCX读取器
- `extract_text`：提取DOCX文件的全部文本内容
- `extract_metadata`：提取DOCX文件的元数据信息
- `get_paragraphs`：获取DOCX文件的所有段落
- `get_word_count`：获取DOCX文件的总字数
- `extract_styles`：提取文档中使用的样式信息