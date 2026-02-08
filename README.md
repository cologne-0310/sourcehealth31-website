# sourcehealth31-website

源點身&心靈工作坊 - 全端網站 (Next.js + PayUni)

## 專案簡介

這是源點身&心靈工作坊的官方網站，提供線上預約服務、課程資訊及金流整合功能。

### 功能特色

- 🎨 **響應式設計**: 使用 Tailwind CSS 打造現代化介面
- 📅 **線上預約系統**: 支援三種服務類型（預約制/公益體驗/課程期數）
- 💳 **金流整合**: 整合 PayUni 金流服務
- 📱 **Line Notify**: 即時預約通知
- 🚀 **快速部署**: 支援 Netlify 一鍵部署

## 技術架構

- **前端框架**: Next.js 12+
- **UI 框架**: Tailwind CSS
- **金流服務**: PayUni
- **通知服務**: Line Notify
- **部署平台**: Netlify
- **域名**: source31.com (GoDaddy)

## 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 環境變數設定

複製 `.env.local` 並填入以下資訊：

```env
# PayUni 金流設定
NEXT_PUBLIC_PAYUNI_MERCHANT_ID=your_merchant_id
PAYUNI_HASH_KEY=your_hash_key
PAYUNI_HASH_IV=your_hash_iv

# Line Notify 設定
LINE_NOTIFY_TOKEN=your_line_notify_token

# 網站基本設定
NEXT_PUBLIC_SITE_URL=https://source31.com
```

### 3. 本地開發

```bash
npm run dev
```

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

### 4. 建置專案

```bash
npm run build
```

### 5. 啟動生產環境

```bash
npm start
```

## 專案結構

```
sourcehealth31-website/
├── pages/              # Next.js 頁面
│   ├── api/           # API 路由
│   │   └── booking.js # 預約 API
│   ├── _app.js        # App 組件
│   └── index.js       # 首頁
├── styles/            # 樣式文件
│   └── globals.css    # 全局樣式
├── .env.local         # 環境變數（請勿提交）
├── next.config.js     # Next.js 配置
├── tailwind.config.js # Tailwind CSS 配置
├── postcss.config.js  # PostCSS 配置
└── package.json       # 專案依賴
```

## 部署到 Netlify

### 方法一：透過 Netlify CLI

1. 安裝 Netlify CLI：
```bash
npm install -g netlify-cli
```

2. 登入 Netlify：
```bash
netlify login
```

3. 初始化專案：
```bash
netlify init
```

4. 部署：
```bash
netlify deploy --prod
```

### 方法二：透過 Git

1. 將程式碼推送到 GitHub
2. 在 Netlify 控制台連接 GitHub repository
3. 設定建置命令：`npm run build`
4. 設定發布目錄：`.next`
5. 添加環境變數
6. 點擊部署

## 域名設定 (GoDaddy)

在 GoDaddy DNS 管理介面添加以下記錄：

```
類型: CNAME
名稱: @
值: [your-netlify-site].netlify.app
TTL: 600

類型: CNAME  
名稱: www
值: [your-netlify-site].netlify.app
TTL: 600
```

## API 端點

### POST /api/booking

預約服務

**請求體：**
```json
{
  "name": "姓名",
  "phone": "電話",
  "email": "email@example.com",
  "date": "2024-01-01",
  "time": "14:00",
  "service": "服務名稱",
  "type": "預約制" // 預約制 | 公益體驗 | 課程期數
}
```

**回應：**
```json
{
  "success": true,
  "requirePayment": true,
  "paymentUrl": "...",
  "tradeNo": "SH31..."
}
```

## 服務類型與費用

| 類型 | 費用 | 說明 |
|------|------|------|
| 預約制 | NT$ 2,000 | 一對一個人服務 |
| 公益體驗 | 免費 | 公益性質體驗課程 |
| 課程期數 | NT$ 3,000 | 定期課程 |

## 授權

Copyright © 2024 源點身&心靈工作坊
