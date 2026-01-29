# 网站安全扫描 Skill 使用指南

## 概述
网站安全扫描 Skill 是一款轻量级但在黑盒测试中表现卓越的 Web 漏洞扫描工具。它基于 Wapiti 和 OWASP ZAP 的核心检测逻辑，能够自动化地发现 Web 应用程序中的安全隐患，包括 SQL 注入、XSS 跨站脚本攻击、敏感文件泄露等 Top 10 Web 漏洞。

## ⚠️ 免责声明
> 本工具仅供授权的安全测试和教育目的使用。在未获得明确授权的目标上使用此工具是非法的。使用者需自行承担所有法律责任。

## 主要检测能力

*   **SQL 注入 (SQLi)**：检测基于错误、布尔盲注和时间盲注的注入点。
*   **跨站脚本 (XSS)**：识别反射型和存储型 XSS 漏洞。
*   **文件包含 (LFI/RFI)**：检测本地/远程文件包含漏洞。
*   **命令执行 (RCE)**：检测操作系统命令注入风险。
*   **敏感信息泄露**：扫描 `.git`, `.env`, `backup.sql` 等意外暴露的敏感文件。

## 使用指南

### 命令行模式

```bash
# 基础全量扫描
security-scan --target https://example.com --report report.html

# 仅扫描 SQL 注入，设置高强度
security-scan -u https://example.com --module sql_injection --level 3
```

### Python API 集成

```python
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
```

## 报告示例

扫描完成后，会生成一份详细的 HTML 报告，包含：
1.  **漏洞摘要**：按风险等级（高/中/低）分类的统计图表。
2.  **复现步骤**：每个漏洞的完整 HTTP 请求/响应包，方便开发人员复现。
3.  **修复建议**：针对每个漏洞的具体修复代码示例（如使用预编译语句防御 SQL 注入）。

## 最佳实践

*   **CI/CD 集成**：将扫描加入 Jenkins 或 GitHub Actions 流程，在每次发布前自动进行安全体检。
*   **定期巡检**：设置 Cron Job 每周对线上环境进行非破坏性扫描。
