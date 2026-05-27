# ResumeMind — 智能简历教练

面向高校实验报告的完整 Web 项目：Angular 前端 + Node 微服务分层 + SQLite 关系库。

## 功能页面

| 路由 | 说明 |
|------|------|
| `/analyze` | 上传 PDF/DOCX，结合 JD 进行 AI 诊断 |
| `/history` | 分析历史列表（数据库持久化） |
| `/history/:id` | 单次分析详情 |
| `/dashboard` | 数据看板（平均分、近 7 日统计） |

## 快速启动

### 后端

```powershell
cd e:\AGI\resume\backend
npm.cmd install
# 配置 .env：DASHSCOPE_API_KEY=你的密钥
npm.cmd run dev
```

**若 nodemon 报 `app crashed` 且提示端口占用：** 说明 3000 端口已有旧进程，先结束再启动：

```powershell
netstat -ano | findstr :3000
taskkill /PID 这里填PID /F
npm.cmd run dev
```

PDF 扫描件需安装 [Poppler](https://poppler.freedesktop.org/)（`pdftoppm` 在 PATH 中）。

### 前端

```powershell
cd e:\AGI\resume\frontend
npm.cmd start
```

**说明：** 命令执行后终端会一直运行（不是卡死）。看到 `Local: http://localhost:4200/` 后，在浏览器打开该地址；已配置 `--open` 会自动弹出浏览器。

若页面空白，等终端出现 `√ Building...` 完成后再刷新。

## 实验报告

详见 [docs/REPORT_GUIDE.md](docs/REPORT_GUIDE.md)

- SQL：`backend/db/schema.sql`、`seed.sql`
- PlantUML：`docs/uml/`
- Git 统计页模板：`stats/`

## 技术难点（报告第 4 章）

- 扫描 PDF → 图片 → 通义千问 VL OCR
- 通义千问文本模型结构化 JSON 输出
- 第三范式数据库 + 关键词关联表
