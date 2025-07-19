import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MessageItem from '../chat/MessageItem';
import { Message } from '../../types';

const MarkdownDemo: React.FC = () => {
  const demoMessages: Message[] = [
    {
      id: 1,
      role: 'user',
      content: '请展示一些 Markdown 功能',
      createTime: new Date().toISOString(),
    },
    {
      id: 2,
      role: 'assistant',
      content: `感谢您再次提供关于Sentinel中各个Slot功能的描述。以下是对您列出的内容进行简要总结和梳理，以便更清晰地呈现每个Slot的作用：

**NodeSelectorSlot** - 职责：收集资源的调用路径，并构建状态结构存储。
用途：基于调用路径实现限流和降级，方便追踪资源调用关系。

**ClusterBuilderSlot** - 职责：存储资源的统计信息及调用者信息（如RT、QPS、线程数等）。
用途：为多维度限流和降级提供数据支持。

**StatisticSlot** - 职责：记录和统计不同维度的运行时指标监控信息。
用途：提供系统性能监控数据，支持限流和降级决策。

**FlowSlot** - 职责：根据预设限流规则及前面Slot统计的状态，进行流量控制。
用途：限制流量，防止系统过载。

**AuthoritySlot** - 职责：根据黑白名单配置及调用来源信息，进行访问控制。
用途：通过黑白名单机制保障系统安全。

**DegradeSlot** - 职责：基于统计信息和预设规则，进行熔断降级。
用途：在系统异常时触发降级，保护系统稳定性。

**SystemSlot** - 职责：根据系统状态（如load等指标）控制总入口流量。
用途：从系统整体负载角度控制流量，避免资源耗尽。

这些Slot是Sentinel责任链模式的重要组成部分，按特定顺序执行，形成一个完整的流量控制和系统保护机制。每个Slot专注于特定功能，协同工作以确保系统的高可用性。

如果您有关于某个Slot的具体问题（如配置方式、代码实现或使用场景），或者需要更深入的讨论，请随时告知，我很乐意提供进一步帮助！😊`,
      createTime: new Date().toISOString(),
    },
    {
      id: 2,
      role: 'assistant',
      content: `感谢您再次提供关于Sentinel中各个Slot功能的描述。以下是对您列出的内容进行简要总结和梳理，以便更清晰地呈现每个Slot的作用：

## Sentinel Slot 功能总结

### NodeSelectorSlot
**职责**：收集资源的调用路径，并构建状态结构存储。
**用途**：基于调用路径实现限流和降级，方便追踪资源调用关系。

### ClusterBuilderSlot
**职责**：存储资源的统计信息及调用者信息（如RT、QPS、线程数等）。
**用途**：为多维度限流和降级提供数据支持。

### StatisticSlot
**职责**：记录和统计不同维度的运行时指标监控信息。
**用途**：提供系统性能监控数据，支持限流和降级决策。

### FlowSlot
**职责**：根据预设限流规则及前面Slot统计的状态，进行流量控制。
**用途**：限制流量，防止系统过载。

### AuthoritySlot
**职责**：根据黑白名单配置及调用来源信息，进行访问控制。
**用途**：通过黑白名单机制保障系统安全。

### DegradeSlot
**职责**：基于统计信息和预设规则，进行熔断降级。
**用途**：在系统异常时触发降级，保护系统稳定性。

### SystemSlot
**职责**：根据系统状态（如load等指标）控制总入口流量。
**用途**：从系统整体负载角度控制流量，避免资源耗尽。

## 总结

这些Slot是Sentinel责任链模式的重要组成部分，按特定顺序执行，形成一个完整的流量控制和系统保护机制。每个Slot专注于特定功能，协同工作以确保系统的高可用性。

如果您有关于某个Slot的具体问题（如配置方式、代码实现或使用场景），或者需要更深入的讨论，请随时告知，我很乐意提供进一步帮助！😊`,
      createTime: new Date().toISOString(),
    },
    {
      id: 3,
      role: 'user',
      content: '测试换行符处理',
    },
    {
      id: 4,
      role: 'assistant',
      content: `当然！以下是一段使用 Markdown 格式编写的示例内容：

## 标题示例

这是一个 **粗体文字** 和 *斜体文字* 的示例。

### 代码示例

\`\`\`javascript
function greetUser(name) {
    console.log("Hello, " + name + "!");
    return "Welcome!";
}

// 调用函数
greetUser("World");
\`\`\`

### 列表示例

#### 无序列表：
- 第一项内容
- 第二项内容
- 第三项内容

#### 有序列表：
1. 首先做这个
2. 然后做那个
3. 最后完成这个

### 引用示例

> 这是一个引用块的示例。
>
> 它可以包含多行内容，
> 并且支持 **格式化文字**。

### 链接示例

访问 [GitHub](https://github.com) 了解更多信息。

---

这样的格式化内容应该能够正确显示换行和各种 Markdown 元素！`,
      createTime: new Date().toISOString(),
    },
    {
      id: 4,
      role: 'assistant',
      content: `当然可以！以下是一些数学公式的例子：

## 内联公式
这是一个著名的公式：$E = mc^2$

## 块级公式

### 积分公式
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

### 正态分布
$$f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$$

### 求和公式
$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$`,
      createTime: new Date().toISOString(),
    },
    {
      id: 5,
      role: 'user',
      content: '请展示一个表格示例',
      createTime: new Date().toISOString(),
    },
    {
      id: 6,
      role: 'assistant',
      content: `当然！以下是一个Markdown表格的示例：

## 技术栈对比表

| 技术栈 | 语言 | 框架 | 数据库 | 适用场景 | 学习难度 |
|--------|------|------|--------|----------|----------|
| LAMP | PHP | Laravel | MySQL | Web开发 | ⭐⭐⭐ |
| MEAN | JavaScript | Angular | MongoDB | 全栈开发 | ⭐⭐⭐⭐ |
| Django | Python | Django | PostgreSQL | 快速开发 | ⭐⭐⭐ |
| Spring | Java | Spring Boot | MySQL | 企业级应用 | ⭐⭐⭐⭐⭐ |
| Rails | Ruby | Ruby on Rails | PostgreSQL | 敏捷开发 | ⭐⭐⭐⭐ |

## 性能对比表

| 指标 | Spring Boot | Express.js | Django | Laravel |
|------|-------------|------------|---------|---------|
| **响应时间 (ms)** | 45 | 12 | 35 | 55 |
| **并发处理** | 10,000+ | 15,000+ | 8,000+ | 6,000+ |
| **内存占用 (MB)** | 150 | 50 | 80 | 70 |
| **开发效率** | 高 | 很高 | 高 | 很高 |

## 简单数据表

| 项目 | 状态 | 进度 |
|------|------|------|
| 前端开发 | ✅ 完成 | 100% |
| 后端API | 🔄 进行中 | 80% |
| 数据库设计 | ✅ 完成 | 100% |
| 测试部署 | ⏳ 待开始 | 0% |

这些表格应该能够正确显示，包括对齐、边框和样式！`,
      createTime: new Date().toISOString(),
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Markdown 渲染演示</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            以下展示了聊天消息中 Markdown
            的渲染效果，包括代码高亮、数学公式、表格等功能。
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {demoMessages.map((message) => (
          <Card key={message.id}>
            <CardContent className="p-0">
              <MessageItem message={message} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarkdownDemo;
