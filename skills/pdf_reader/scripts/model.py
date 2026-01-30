import PyPDF2
import os
from typing import Dict, List, Optional

class PDFReader:
    def __init__(self, file_path: str):
        """
        初始化PDF读取器
        :param file_path: PDF文件的绝对路径
        """
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"文件不存在: {file_path}")
        if not file_path.lower().endswith('.pdf'):
            raise ValueError("输入文件必须是PDF格式")
        
        self.file_path = file_path
        self.pdf_reader = None
        self._open_pdf()

    def _open_pdf(self):
        """
        内部方法：打开PDF文件
        """
        try:
            with open(self.file_path, 'rb') as file:
                self.pdf_reader = PyPDF2.PdfReader(file)
        except Exception as e:
            raise RuntimeError(f"无法打开PDF文件: {str(e)}")

    def extract_text(self) -> str:
        """
        提取PDF文件的全部文本内容
        :return: 包含所有页面文本的字符串
        """
        if not self.pdf_reader:
            self._open_pdf()
        
        text = ""
        for page in self.pdf_reader.pages:
            text += page.extract_text() or ""
        
        return text

    def extract_metadata(self) -> Dict:
        """
        提取PDF文件的元数据信息
        :return: 包含元数据的字典
        """
        if not self.pdf_reader:
            self._open_pdf()
        
        metadata = {}
        if hasattr(self.pdf_reader, 'metadata'):
            metadata = {
                'title': self.pdf_reader.metadata.get('/Title', '').strip(),
                'author': self.pdf_reader.metadata.get('/Author', '').strip(),
                'subject': self.pdf_reader.metadata.get('/Subject', '').strip(),
                'creator': self.pdf_reader.metadata.get('/Creator', '').strip(),
                'producer': self.pdf_reader.metadata.get('/Producer', '').strip(),
                'creation_date': self.pdf_reader.metadata.get('/CreationDate', '').strip(),
                'modification_date': self.pdf_reader.metadata.get('/ModDate', '').strip()
            }
        
        metadata['page_count'] = self.get_page_count()
        return metadata

    def get_page_count(self) -> int:
        """
        获取PDF文件的总页数
        :return: 总页数
        """
        if not self.pdf_reader:
            self._open_pdf()
        
        return len(self.pdf_reader.pages)

    def extract_page_text(self, page_number: int) -> str:
        """
        提取指定页面的文本内容
        :param page_number: 页面编号（从1开始）
        :return: 指定页面的文本内容
        """
        if not self.pdf_reader:
            self._open_pdf()
        
        if page_number < 1 or page_number > len(self.pdf_reader.pages):
            raise ValueError(f"页面编号无效，有效范围是1到{len(self.pdf_reader.pages)}")
        
        page = self.pdf_reader.pages[page_number - 1]
        return page.extract_text() or ""