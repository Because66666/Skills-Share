## 示例1：读取PDF文件全部内容
### 输入代码
```python
from scripts.model import PDFReader

# 初始化PDF读取器
pdf_reader = PDFReader('example.pdf')

# 提取全部文本内容
text_content = pdf_reader.extract_text()
print("PDF文本内容:")
print(text_content)

# 提取元数据
metadata = pdf_reader.extract_metadata()
print("\nPDF元数据:")
print(metadata)

# 获取页数
page_count = pdf_reader.get_page_count()
print(f"\n总页数: {page_count}")
```

### 预期输出
```
PDF文本内容:
这是PDF文件的第一页内容...
这是PDF文件的第二页内容...

PDF元数据:
{'title': '示例PDF文档', 'author': '张三', 'subject': 'PDF读取示例', 'creator': 'Microsoft Word', 'producer': 'Adobe Acrobat Pro', 'creation_date': 'D:20230101000000', 'modification_date': 'D:20230101000000', 'page_count': 2}

总页数: 2
```

---

## 示例2：读取指定页面内容
### 输入代码
```python
from scripts.model import PDFReader

# 初始化PDF读取器
pdf_reader = PDFReader('example.pdf')

# 提取第2页内容
page2_text = pdf_reader.extract_page_text(2)
print("第2页内容:")
print(page2_text)
```

### 预期输出
```
第2页内容:
这是PDF文件的第二页内容...
```