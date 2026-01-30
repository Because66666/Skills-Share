## 示例1：读取DOCX文件全部内容
### 输入代码
```python
from scripts.model import DOCXReader

# 初始化DOCX读取器
docx_reader = DOCXReader('example.docx')

# 提取全部文本内容
text_content = docx_reader.extract_text()
print("DOCX文本内容:")
print(text_content)

# 提取元数据
metadata = docx_reader.extract_metadata()
print("\nDOCX元数据:")
print(metadata)

# 获取字数
word_count = docx_reader.get_word_count()
print(f"\n总字数: {word_count}")
```

### 预期输出
```
DOCX文本内容:
这是DOCX文件的第一段内容...
这是DOCX文件的第二段内容...

DOCX元数据:
{'title': '示例DOCX文档', 'author': '李四', 'subject': 'DOCX读取示例', 'keywords': 'Python, DOCX, 读取', 'comments': '', 'created': '2023-01-01 00:00:00', 'modified': '2023-01-01 00:00:00', 'last_modified_by': '李四', 'revision': 1, 'category': '', 'word_count': 100, 'paragraph_count': 2}

总字数: 100
```

---

## 示例2：获取DOCX文件段落信息
### 输入代码
```python
from scripts.model import DOCXReader

# 初始化DOCX读取器
docx_reader = DOCXReader('example.docx')

# 获取所有段落
paragraphs = docx_reader.get_paragraphs()
print("文档段落:")
for i, paragraph in enumerate(paragraphs, 1):
    print(f"段落{i}: {paragraph}")

# 获取使用的样式
styles = docx_reader.extract_styles()
print(f"\n使用的样式: {styles}")
```

### 预期输出
```
文档段落:
段落1: 这是DOCX文件的第一段内容...
段落2: 这是DOCX文件的第二段内容...

使用的样式: ['Heading 1', 'Normal']
```