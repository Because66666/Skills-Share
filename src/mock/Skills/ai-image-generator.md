# AI 图像生成器 Skill

## 概述
AI 图像生成器基于最新的 Stable Diffusion 模型优化，专注于生成高质量的商业插画、Logo 和社交媒体配图。通过简单的文本描述，即可生成专业级的设计素材。

## 效果展示

![示例图片](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

## 使用方法

### API 调用

```typescript
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
```

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
2.  **使用负向提示词**：排除不需要的元素，如 `low quality, blurry, bad anatomy`。
3.  **尝试不同的 Seed**：固定 Seed 可以复现结果，随机 Seed 可以探索多样性。
