import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const smartDataCleanerContent = `# 智能数据清洗 Skill 使用指南

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

\`\`\`bash
pip install datacleaner-skill
\`\`\`

### 2. 基本用法

\`\`\`python
from datacleaner import DataCleaner

# 加载数据
cleaner = DataCleaner("data.csv")

# 自动清洗
report = cleaner.auto_clean()

# 查看报告
print(report.summary())

# 保存结果
cleaner.save("cleaned_data.csv")
\`\`\`

### 3. 配置规则

你可以自定义清洗规则：

\`\`\`python
rules = {
    "date_format": "YYYY-MM-DD",
    "fill_na": "mean",  # 使用均值填充空值
    "drop_duplicates": True
}

cleaner.apply_rules(rules)
\`\`\`

## 常见问题

**Q: 支持多大的文件？**
A: 目前支持最大 1GB 的 CSV 文件。对于更大的文件，建议分块处理。

**Q: 数据安全吗？**
A: 所有处理都在本地进行，不会上传到云端。
`;

const aiImageGeneratorContent = `# AI 图像生成器 Skill

## 概述
AI 图像生成器基于最新的 Stable Diffusion 模型优化，专注于生成高质量的商业插画、Logo 和社交媒体配图。通过简单的文本描述，即可生成专业级的设计素材。

## 效果展示

![示例图片](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

## 使用方法

### API 调用

\`\`\`typescript
import { ImageGenerator } from '@skills/ai-image';

const generator = new ImageGenerator({ apiKey: 'YOUR_API_KEY' });

async function generate() {
  const result = await generator.create({
    prompt: "A futuristic city with flying cars, cyberpunk style",
    width: 1024,
    height: 1024,
    steps: 30
  });
  
  console.log(result.url);
}

generate();
\`\`\`

### 参数说明

| 参数 | 类型 | 必填 | 说明 | 默认值 |
| :--- | :--- | :--- | :--- | :--- |
| prompt | string | 是 | 图像描述提示词 | - |
| width | number | 否 | 图片宽度 | 512 |
| height | number | 否 | 图片高度 | 512 |
| steps | number | 否 | 生成步数 | 20 |
| style | string | 否 | 风格预设 (anime, realistic, 3d) | realistic |

## 最佳实践

1.  **详细描述**：提示词越详细，生成的图片越符合预期。
2.  **使用负向提示词**：排除不需要的元素，如 \`low quality, blurry, bad anatomy\`。
3.  **尝试不同的 Seed**：固定 Seed 可以复现结果，随机 Seed 可以探索多样性。
`;

const codeFormatConverterContent = `# 代码格式转换 Skill 使用指南

## 简介
代码格式转换 Skill 是一个全能的代码美化和格式转换工具，支持 JSON, XML, YAML, SQL 等多种数据交换格式的互转，同时提供 Python, JavaScript, Java 等主流编程语言的语法高亮和代码格式化功能。它基于 Prettier 和 Unibeautify 核心，确保你的代码始终保持最佳可读性。

## 主要功能

*   **多格式互转**：支持 JSON <-> XML <-> YAML 等常见配置格式的无缝转换。
*   **智能格式化**：内置 Prettier 引擎，一键美化混乱的代码排版。
*   **语法校验**：在转换过程中自动检测语法错误，防止无效数据生成。
*   **自定义规则**：支持 \`.editorconfig\` 和 \`.prettierrc\` 配置文件，满足团队定制化规范。

## 快速开始

### 1. 安装

\`\`\`bash
npm install code-format-skill
\`\`\`

### 2. 基本用法

#### 格式转换 (JSON 转 YAML)

\`\`\`javascript
import { CodeConverter } from 'code-format-skill';

const jsonCode = '{"name": "Trae", "type": "AI IDE", "features": ["Fast", "Smart"]}';
const converter = new CodeConverter();

// 将 JSON 转换为 YAML
const yamlResult = converter.transform(jsonCode, {
  from: 'json',
  to: 'yaml'
});

console.log(yamlResult);
/* 输出:
name: Trae
type: AI IDE
features:
  - Fast
  - Smart
*/
\`\`\`

#### 代码美化

\`\`\`javascript
import { CodeFormatter } from 'code-format-skill';

const messyCode = "function add(a,b){return a+b;}";
const formatter = new CodeFormatter();

const prettyCode = formatter.format(messyCode, {
  parser: "babel", // 指定语言解析器
  tabWidth: 2,
  semi: true
});

console.log(prettyCode);
/* 输出:
function add(a, b) {
  return a + b;
}
*/
\`\`\`

## 支持语言列表

| 类别 | 支持语言 |
| :--- | :--- |
| **配置文件** | JSON, YAML, XML, TOML, INI |
| **前端开发** | JavaScript, TypeScript, HTML, CSS, SCSS, Vue, React |
| **后端开发** | Java, Python, Go, Rust, PHP, SQL |
| **文档** | Markdown, LaTeX |

## 常见问题

**Q: 转换大文件时会卡顿吗？**
A: 本 Skill 使用流式处理（Stream Processing），对于超过 10MB 的文件会自动分块处理，保证内存占用稳定。

**Q: 是否支持批量处理？**
A: 支持。你可以传入一个目录路径，Skill 会自动扫描并转换目录下所有符合规则的文件。
`;

const pdfSmartExtractorContent = `# PDF 智能提取 Skill 使用指南

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

\`\`\`python
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
\`\`\`

## 性能参数

| 指标 | 表现 | 说明 |
| :--- | :--- | :--- |
| **准确率** | 98.5% | 基于标准测试集 (PubLayNet) |
| **处理速度** | 0.5s / 页 | 纯文本 PDF |
| **OCR 速度** | 2.0s / 页 | 扫描件 (1080p) |
| **内存占用** | < 500MB | 处理 100 页文档时 |

## 最佳实践

1.  **预处理**：对于歪斜的扫描件，建议先开启 \`auto_rotate=True\` 进行纠偏。
2.  **表格区域指定**：如果自动识别表格不准，可以手动指定表格区域坐标 \`bbox=[x1, y1, x2, y2]\`。
3.  **LLM 增强**：提取后的 Markdown 内容非常适合作为 RAG (检索增强生成) 的知识库输入。
`;

const webSentimentMonitorContent = `# 全网舆情监控 Skill 使用指南

## 简介
全网舆情监控 Skill 是一套基于 NLP（自然语言处理）的情感分析与舆情追踪系统。它能够实时监控各大社交媒体平台（Twitter, Reddit, 微博, 知乎等）的特定关键词，利用 TextBlob 和 BERT 模型自动分析用户情感倾向，生成可视化的舆情报告。

## 应用场景

*   **品牌声誉管理**：实时发现负面评价，及时危机公关。
*   **市场趋势分析**：了解用户对竞品或新功能的真实反馈。
*   **公关效果评估**：量化营销活动的传播效果和情感反馈。

## 功能特性

1.  **多源采集**：支持配置多个数据源 API (Twitter API, Reddit API, RSS Feeds)。
2.  **情感打分**：对每条内容进行 -1.0 (极负面) 到 +1.0 (极正面) 的情感打分。
3.  **热词云图**：自动提取高频关键词，生成动态词云。
4.  **实时告警**：当负面情绪飙升时，通过 Webhook 发送报警通知。

## 快速集成

### 配置监控任务

\`\`\`yaml
# monitor_config.yaml
task_name: "Trae IDE Launch"
keywords:
  - "Trae IDE"
  - "Trae Editor"
  - "Trae AI"
sources:
  - "twitter"
  - "hacker_news"
alert_threshold: -0.5 # 当情感分低于 -0.5 时报警
\`\`\`

### 启动监控

\`\`\`python
from sentiment_monitor import Monitor, Analyzer

# 加载配置
monitor = Monitor(config_path="monitor_config.yaml")
analyzer = Analyzer(model="bert-base-multilingual")

def on_new_post(post):
    # 分析情感
    sentiment = analyzer.predict(post.content)
    print(f"[{post.source}] {sentiment.score}: {post.content[:50]}...")
    
    # 触发告警
    if sentiment.score < monitor.threshold:
        monitor.alert(f"Negative sentiment detected: {post.url}")

# 开始流式监听
monitor.start_stream(callback=on_new_post)
\`\`\`

## 情感分析模型对比

| 模型 | 速度 | 准确率 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **TextBlob** | 极快 | 一般 | 简单英文文本，粗略统计 |
| **VADER** | 快 | 较好 | 社交媒体短文本 (含 Emoji) |
| **BERT** | 慢 | 极高 | 长文本，复杂语义理解 |

## 隐私与合规
本 Skill 仅采集公开数据，严格遵守各平台 \`robots.txt\` 协议与 API 使用规范。不收集用户隐私信息。
`;

const websiteSecurityScanContent = `# 网站安全扫描 Skill 使用指南

## 概述
网站安全扫描 Skill 是一款轻量级但在黑盒测试中表现卓越的 Web 漏洞扫描工具。它基于 Wapiti 和 OWASP ZAP 的核心检测逻辑，能够自动化地发现 Web 应用程序中的安全隐患，包括 SQL 注入、XSS 跨站脚本攻击、敏感文件泄露等 Top 10 Web 漏洞。

## ⚠️ 免责声明
> 本工具仅供授权的安全测试和教育目的使用。在未获得明确授权的目标上使用此工具是非法的。使用者需自行承担所有法律责任。

## 主要检测能力

*   **SQL 注入 (SQLi)**：检测基于错误、布尔盲注和时间盲注的注入点。
*   **跨站脚本 (XSS)**：识别反射型和存储型 XSS 漏洞。
*   **文件包含 (LFI/RFI)**：检测本地/远程文件包含漏洞。
*   **命令执行 (RCE)**：检测操作系统命令注入风险。
*   **敏感信息泄露**：扫描 \`.git\`, \`.env\`, \`backup.sql\` 等意外暴露的敏感文件。

## 使用指南

### 命令行模式

\`\`\`bash
# 基础全量扫描
security-scan --target https://example.com --report report.html

# 仅扫描 SQL 注入，设置高强度
security-scan -u https://example.com --module sql_injection --level 3
\`\`\`

### Python API 集成

\`\`\`python
from security_scanner import Scanner, AttackModule

target_url = "http://localhost:8080"

# 初始化扫描器
scanner = Scanner(target_url)

# 配置扫描模块
scanner.enable_module(AttackModule.XSS)
scanner.enable_module(AttackModule.SQL_INJECTION)

# 设置登录 Cookie (用于扫描后台)
scanner.set_cookies({"session_id": "xyz123"})

# 开始扫描
print("Scanning started...")
vulnerabilities = scanner.run()

# 输出结果
for vuln in vulnerabilities:
    print(f"[CRITICAL] {vuln.type} found at {vuln.path}")
    print(f"  Payload: {vuln.payload}")
\`\`\`

## 报告示例

扫描完成后，会生成一份详细的 HTML 报告，包含：
1.  **漏洞摘要**：按风险等级（高/中/低）分类的统计图表。
2.  **复现步骤**：每个漏洞的完整 HTTP 请求/响应包，方便开发人员复现。
3.  **修复建议**：针对每个漏洞的具体修复代码示例（如使用预编译语句防御 SQL 注入）。

## 最佳实践

*   **CI/CD 集成**：将扫描加入 Jenkins 或 GitHub Actions 流程，在每次发布前自动进行安全体检。
*   **定期巡检**：设置 Cron Job 每周对线上环境进行非破坏性扫描。
`;

const skillsData = [
  {
    title: '智能数据清洗',
    description: '自动识别并修复表格中的异常数据，支持 CSV/Excel 格式，内置多种常见错误处理规则。',
    author: 'DataMaster',
    tags: ['数据处理', '自动化', 'Excel'],
    downloadCount: 1250,
    rating: 4.8,
    publishDate: new Date('2023-10-15'),
    icon: 'Database',
    color: 'bg-blue-100 text-blue-600',
    content: smartDataCleanerContent
  },
  {
    title: 'AI 图像生成器',
    description: '基于最新扩散模型，一键生成高质量商业插画、Logo 和社交媒体配图。',
    author: 'CreativeAI',
    tags: ['AI', '图像处理', '设计'],
    downloadCount: 3400,
    rating: 4.9,
    publishDate: new Date('2023-11-20'),
    icon: 'ImageIcon',
    color: 'bg-purple-100 text-purple-600',
    content: aiImageGeneratorContent
  },
  {
    title: '代码格式转换',
    description: '支持 JSON, XML, YAML 等多种格式互转，并提供语法高亮和错误校验功能。',
    author: 'DevTools',
    tags: ['开发工具', '格式转换'],
    downloadCount: 890,
    rating: 4.5,
    publishDate: new Date('2023-09-05'),
    icon: 'Code',
    color: 'bg-green-100 text-green-600',
    content: codeFormatConverterContent
  },
  {
    title: 'PDF 智能提取',
    description: '从复杂的 PDF 文档中提取文本、表格和图片，保持原有排版结构。',
    author: 'DocWizard',
    tags: ['文档处理', 'PDF', 'OCR'],
    downloadCount: 2100,
    rating: 4.7,
    publishDate: new Date('2023-12-01'),
    icon: 'FileText',
    color: 'bg-red-100 text-red-600',
    content: pdfSmartExtractorContent
  },
  {
    title: '全网舆情监控',
    description: '实时监控社交媒体关键词，自动生成情感分析报告，助您把握市场风向。',
    author: 'MarketSense',
    tags: ['营销', '数据分析', '舆情'],
    downloadCount: 560,
    rating: 4.2,
    publishDate: new Date('2023-08-10'),
    icon: 'Search',
    color: 'bg-orange-100 text-orange-600',
    content: webSentimentMonitorContent
  },
  {
    title: '网站安全扫描',
    description: '提供多种炫酷图表模板，一键将枯燥的销售数据转化为直观的仪表盘。',
    author: 'ChartPro',
    tags: ['数据可视化', '图表', '商业智能'],
    downloadCount: 1800,
    rating: 4.6,
    publishDate: new Date('2023-10-30'),
    icon: 'BarChart2',
    color: 'bg-indigo-100 text-indigo-600',
    content: websiteSecurityScanContent
  }
];

async function main() {
  // 1. Create Default Tenant
  const tenant = await prisma.tenant.upsert({
    where: { code: 'default_org' },
    update: {},
    create: {
      name: 'Default Organization',
      code: 'default_org',
      description: 'System default tenant',
    },
  });

  console.log('Created Tenant:', tenant.name);

  // 2. Create Roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'System Administrator',
      permissions: JSON.stringify(['*']),
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
      description: 'Standard User',
      permissions: JSON.stringify(['read:claims', 'write:claims']),
    },
  });

  console.log('Created Roles:', adminRole.name, userRole.name);

  // 3. Create Admin User
  const hashedPassword = await bcrypt.hash('password123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      tenantId: tenant.id,
      roleId: adminRole.id,
    },
  });

  console.log('Created Admin User:', adminUser.email);

  // 4. Create Skills and Tags
  for (const skill of skillsData) {
    const tagConnect = [];
    for (const tagName of skill.tags) {
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });
      tagConnect.push({ id: tag.id });
    }

    const existingSkill = await prisma.skill.findFirst({
      where: { title: skill.title },
    });

    if (existingSkill) {
      await prisma.skill.update({
        where: { id: existingSkill.id },
        data: {
          description: skill.description,
          content: skill.content,
          author: skill.author,
          downloadCount: skill.downloadCount,
          rating: skill.rating,
          publishDate: skill.publishDate,
          icon: skill.icon,
          color: skill.color,
          status: 'approved',
          tags: {
            set: tagConnect,
          },
        },
      });
      console.log(`Updated Skill: ${skill.title}`);
    } else {
      await prisma.skill.create({
        data: {
          title: skill.title,
          description: skill.description,
          content: skill.content,
          author: skill.author,
          downloadCount: skill.downloadCount,
          rating: skill.rating,
          publishDate: skill.publishDate,
          icon: skill.icon,
          color: skill.color,
          status: 'approved',
          tags: {
            connect: tagConnect,
          },
        },
      });
      console.log(`Created Skill: ${skill.title}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
