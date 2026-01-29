# 代码格式转换 Skill 使用指南

## 简介
代码格式转换 Skill 是一个全能的代码美化和格式转换工具，支持 JSON, XML, YAML, SQL 等多种数据交换格式的互转，同时提供 Python, JavaScript, Java 等主流编程语言的语法高亮和代码格式化功能。它基于 Prettier 和 Unibeautify 核心，确保你的代码始终保持最佳可读性。

## 主要功能

*   **多格式互转**：支持 JSON <-> XML <-> YAML 等常见配置格式的无缝转换。
*   **智能格式化**：内置 Prettier 引擎，一键美化混乱的代码排版。
*   **语法校验**：在转换过程中自动检测语法错误，防止无效数据生成。
*   **自定义规则**：支持 `.editorconfig` 和 `.prettierrc` 配置文件，满足团队定制化规范。

## 快速开始

### 1. 安装

```bash
npm install code-format-skill
```

### 2. 基本用法

#### 格式转换 (JSON 转 YAML)

```javascript
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
```

#### 代码美化

```javascript
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
```

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
