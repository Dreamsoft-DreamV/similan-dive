# 斯米兰船潜 - Similan Dive & Liveaboard Website

一个专注于斯米兰群岛（Similan Islands, Thailand）船宿潜水服务的全栈 Web 应用，提供潜水点展示、船宿介绍、在线预订咨询与管理后台功能。

**核心特性：**
- 🚀 **前端**：Vite + TypeScript + Tailwind CSS，单页应用（SPA）
- 🔧 **后端**：Express + TypeScript，提供 RESTful API
- 🤿 **预订系统**：在线咨询表单 + 邮件通知 + 后台管理
- 🔥 **开发模式**：Vite HMR + Express API，单进程启动
- 📦 **生产模式**：Express 静态服务 + API，高性能部署

## 技术栈

**前端：**
- **构建工具**: Vite 7.x
- **语言**: TypeScript 5.x
- **样式**: Tailwind CSS 3.x + 自定义海洋主题 CSS 变量

**后端：**
- **框架**: Express 4.x
- **数据库**: 本地 JSON 文件存储（`data/bookings.json`）
- **邮件通知**: Nodemailer（支持 SMTP 配置）

**工具：**
- **包管理器**: pnpm 9+（禁止使用 npm 或 yarn）
- **运行时**: Node.js 18+
- **开发工具**: tsx（TypeScript 执行器）

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

启动后，在浏览器中打开 [http://localhost:5000](http://localhost:5000) 查看应用。

开发服务器支持热更新（HMR），修改代码后页面会自动刷新。

### 构建生产版本

```bash
pnpm build
```

构建产物位于 `dist/`（前端）和 `dist-server/`（后端）目录。

### 预览生产版本

```bash
pnpm start
```

在本地启动生产服务器，Express 服务静态文件 + API 路由，单一 Node.js 进程。

## 项目结构

```
├── data/                   # 数据存储目录
│   └── bookings.json      # 预订数据（JSON 文件数据库）
├── scripts/                # 构建与启动脚本
│   ├── build.sh           # 构建脚本
│   ├── dev.sh             # 开发环境启动脚本
│   ├── prepare.sh         # 预处理脚本
│   └── start.sh           # 生产环境启动脚本
├── server/                 # 后端服务器
│   ├── routes/
│   │   └── index.ts       # API 路由定义
│   ├── services/
│   │   └── email.ts       # 邮件通知服务（Nodemailer）
│   ├── server.ts          # Express 服务器入口
│   └── vite.ts            # Vite 集成逻辑（开发/生产）
├── src/                    # 前端源码
│   ├── storage/
│   │   ├── local-db.ts    # 本地 JSON 文件数据库操作
│   │   └── database/
│   │       ├── shared/    # 共享数据库类型
│   │       └── supabase-client.ts  # Supabase 客户端（备用）
│   ├── index.css          # 全局样式（Tailwind + 自定义）
│   ├── index.ts           # 前端应用入口
│   └── main.ts            # 主逻辑（页面渲染、路由、表单处理、后台管理）
├── index.html             # HTML 入口
├── vite.config.ts         # Vite 配置
├── tailwind.config.js     # Tailwind CSS 配置
├── tsconfig.json          # TypeScript 配置
├── eslint.config.mjs      # ESLint 配置
└── package.json           # 项目依赖管理
```

## 页面功能

### 首页（SPA）
- **Hero 区域** — 全屏大图背景 + 召唤行动按钮
- **关于斯米兰** — 群岛介绍 + 关键数据统计
- **潜水点展示** — 4 个精选潜水点（达差岛、苏林岛、象头岩、Richelieu Rock）
- **船宿体验** — 豪华船宿 + 每日潜水行程介绍
- **海洋生物** — 8 种代表性海洋生物展示（鲸鲨、海龟、蝠鲼等）
- **预订咨询表单** — 收集用户信息（姓名、电话、经验、日期、备注）

### 管理后台
- **登录页面**（`#/login`）— 管理员认证（默认账号/密码：admin/admin）
- **预订管理**（`#/admin`）— 查看、更新状态（待处理/已联系/已确认/已取消）、删除预订

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/hello` | 测试接口 |
| POST | `/api/data` | 通用数据提交 |
| GET | `/api/health` | 健康检查 |
| GET | `/api/bookings` | 获取预订列表 |
| POST | `/api/bookings` | 提交预订咨询 |
| PATCH | `/api/bookings/:id` | 更新预订状态 |
| DELETE | `/api/bookings/:id` | 删除预订 |

## 邮件通知

预订提交后，系统将通过 SMTP 发送通知邮件至管理员。邮件配置通过环境变量设置：

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
ADMIN_EMAIL=admin@example.com
SMTP_FROM_NAME=斯米兰船潜
SMTP_FROM_EMAIL=noreply@similandive.com
```

未配置 SMTP 时，系统会跳过邮件发送（控制台有日志提示）。

## 数据存储

当前使用本地 JSON 文件（`data/bookings.json`）存储预订数据。项目目录中已包含 Supabase 客户端引用，未来可切换为 PostgreSQL 数据库。

## 导航说明

- 首页：`http://localhost:5000/#/`
- 管理员登录：`http://localhost:5000/#/login`
- 管理后台：`http://localhost:5000/#/admin`

## 核心开发规范

### 1. 依赖管理

**必须使用 pnpm** 管理依赖：

```bash
pnpm install       # 安装依赖
pnpm add pkg       # 添加依赖
pnpm add -D pkg    # 添加开发依赖
pnpm remove pkg    # 移除依赖
```

项目已配置 `preinstall` 脚本，使用 npm 或 yarn 会报错。

### 2. 样式开发

使用 Tailwind CSS + 自定义 CSS 变量：

```css
:root {
  --ocean-deep: #0f172a;
  --ocean-blue: #0369a1;
  --ocean-light: #38bdf8;
  --coral: #f97316;
  --sand: #fef3c7;
}
```

自定义工具类：
- `.gradient-ocean` — 海洋蓝渐变
- `.gradient-coral` — 珊瑚橙渐变
- `.card-hover` — 卡片悬浮效果
- `.float-animation` — 浮动动画

### 3. TypeScript 开发

全程使用 TypeScript 确保类型安全，避免使用 `any` 类型。前后端共享类型定义。

### 4. 后端 API 开发

所有 API 路由以 `/api` 开头，统一响应格式：

```typescript
// 成功
{ success: true, data: { ... }, message: "..." }

// 失败
{ error: "错误信息" }
```

### 5. 前端路由

使用 URL hash 进行前端路由：
- `#/` — 首页
- `#/login` — 管理员登录
- `#/admin` — 管理后台

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `PORT` | 服务器端口 | `5000` |
| `HOSTNAME` | 服务器主机名 | `localhost` |
| `SMTP_HOST` | SMTP 服务器 | `smtp.coze.cn` |
| `SMTP_PORT` | SMTP 端口 | `465` |
| `SMTP_SECURE` | SMTP SSL | `true` |
| `SMTP_USER` | SMTP 用户名 | - |
| `SMTP_PASS` | SMTP 密码 | - |
| `ADMIN_EMAIL` | 管理员邮箱 | `ava@coze.email` |
| `SMTP_FROM_NAME` | 发件人名称 | `斯米兰船潜` |
| `SMTP_FROM_EMAIL` | 发件人邮箱 | `noreply@similandive.com` |

## 常见问题

**Q: 如何修改管理员账号密码？**

目前为硬编码，修改 `src/main.ts` 中的登录验证逻辑：

```typescript
if (username === 'admin' && password === 'admin') {
```

**Q: 如何切换为数据库存储？**

`src/storage/database/` 目录下已有 Supabase 客户端模板，替换 `local-db.ts` 中的实现即可。

**Q: 如何部署？**

1. 运行 `pnpm build` 构建前后端
2. 将项目上传到服务器
3. 运行 `pnpm install --prod`
4. 配置环境变量
5. 运行 `pnpm start`
