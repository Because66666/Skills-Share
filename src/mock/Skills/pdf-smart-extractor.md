# PDF 智能提取 Skill 使用指南

## 概述
PDF 智能提取 Skill 是一款基于深度学习的文档解析工具，专注于从非结构化的 PDF 文档中提取结构化数据。它不仅能精准识别文本，还能完美还原表格结构、提取高清图片，甚至能处理带有水印或扫描件的 PDF 文档。核心算法基于 LayoutLMv3 和 PyMuPDF 优化。

## 效果展示

![提取效果](https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2670&auto=format&fit=crop)

## 核心能力

*   **文本提取**：智能识别段落、标题和页眉页脚，保留原有阅读顺序。
*   **表格还原**：将 PDF 中的表格直接转换为 Pandas DataFrame 或 Excel 文件，支持合并单元格识别。
*   **图像抽取**：无损提取文档中的插图、图表，并自动去除背景水印。
*   **OCR 增强**：对于扫描版 PDF，自动调用 Tesseract 引擎进行文字识别。

## 使用方法

### Python SDK 调用

```python
from pdf_extractor import PDFParser

# 初始化解析器
parser = PDFParser(ocr_enabled=True)

# 1. 提取所有文本
text = parser.extract_text("report.pdf")
print(text[:100])

# 2. 提取表格 (返回 DataFrame 列表)
tables = parser.extract_tables("financial_report.pdf", page=5)
for df in tables:
    print(df.head())

# 3. 导出为 Markdown (适合传给 LLM)
md_content = parser.to_markdown("paper.pdf")
with open("paper.md", "w") as f:
    f.write(md_content)
```

## 性能参数

| 指标 | 表现 | 说明 |
| :--- | :--- | :--- |
| **准确率** | 98.5% | 基于标准测试集 (PubLayNet) |
| **处理速度** | 0.5s / 页 | 纯文本 PDF |
| **OCR 速度** | 2.0s / 页 | 扫描件 (1080p) |
| **内存占用** | < 500MB | 处理 100 页文档时 |

## 最佳实践

1.  **预处理**：对于歪斜的扫描件，建议先开启 `auto_rotate=True` 进行纠偏。
2.  **表格区域指定**：如果自动识别表格不准，可以手动指定表格区域坐标 `bbox=[x1, y1, x2, y2]`。
3.  **LLM 增强**：提取后的 Markdown 内容非常适合作为 RAG (检索增强生成) 的知识库输入。
