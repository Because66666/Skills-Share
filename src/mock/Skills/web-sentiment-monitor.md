# 全网舆情监控 Skill 使用指南

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

```yaml
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
```

### 启动监控

```python
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
```

## 情感分析模型对比

| 模型 | 速度 | 准确率 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **TextBlob** | 极快 | 一般 | 简单英文文本，粗略统计 |
| **VADER** | 快 | 较好 | 社交媒体短文本 (含 Emoji) |
| **BERT** | 慢 | 极高 | 长文本，复杂语义理解 |

## 隐私与合规
本 Skill 仅采集公开数据，严格遵守各平台 `robots.txt` 协议与 API 使用规范。不收集用户隐私信息。
