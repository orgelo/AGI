# ResumeMind 实验报告撰写指南

本项目已按课程实验报告模板完成架构对齐，可直接在各章节引用仓库内文件。

## 1 项目计划

| 小节 | 建议内容 | 仓库参考 |
|------|----------|----------|
| 1.2 项目简介 | 智能简历诊断 App，行业：人力资源/求职服务 | `README.md` |
| 1.3.1 痛点 | 简历与 JD 匹配难、扫描 PDF 无法复制文字 | 产品说明 |
| 1.3.2 产品结构图 | 分析 / 历史 / 看板 三大模块 | 前端路由 `app.routes.ts` |
| 1.3.3 业务流程 | 上传→OCR→AI 分析→入库→看板 | `docs/uml/sequence-analyze.puml` |
| 1.3.4 信息结构图 | 用户、岗位、简历、分析、关键词 | `docs/uml/class-diagram.puml` |

## 2 前端设计与开发

- **模块**：`features/analyze`、`features/history`、`features/dashboard`
- **组件**：`ScoreRingComponent`、`ResultPanelComponent`
- **服务**：`ResumeApiService`（`core/services/resume-api.service.ts`）
- **管道**：`ScoreColorPipe`、`TruncatePipe`、`KeywordCountPipe`
- **SCSS 特效**：渐变背景、毛玻璃卡片、圆环动画、看板入场动画

## 3 微服务设计与开发

逻辑拆分为三层（可在报告中称为微服务）：

1. **OCR 服务** `services/ocr.service.js` — PDF/DOCX 文本提取
2. **Analysis 服务** `services/analysis.service.js` — 通义千问诊断与匹配
3. **Data 服务** `db/database.js` — SQLite 持久化与看板统计

- **UML 类图**：`docs/uml/class-diagram.puml`
- **数据库表**：`backend/db/schema.sql`
- **INSERT 样例**：`backend/db/seed.sql`
- **看板导入**：启动后端后访问前端 `/dashboard`，或使用 DB Browser for SQLite 打开 `backend/db/resumemind.db` 截图（若课程要求 Parse Dashboard，可将同一套表结构导入 Parse 后截图）

## 4 难点功能设计（建议重点写）

1. **扫描版 PDF + 多模态 OCR**（pdf2pic + Qwen-VL）
2. **结构化 JSON 提示词**与解析容错（`safeJsonParse`）
3. **第三范式表设计**与关键词拆表存储

## 5 项目代码分析

将 Git 仓库托管到课程平台后，访问：

- `/activity.html` — 开发周期
- `/authors.html` — 成员贡献
- `/files.html`、`/lines.html` — 代码量

静态页模板位于 `stats/` 目录，部署到站点根目录即可截图。

## 6 成品展示

录制 ≥30 秒 MP4：演示「分析 → 查看历史 → 看板」完整流程。
