# 恋爱日志页面计划书

更新时间：2026-05-05

## 目标

这个仓库作为 `shuixianwang.github.io` 的 GitHub Pages 静态站点，承载李富悦和王水先的恋爱日志。第一阶段目标是在 2026.05.26 生日展示前，先完成一个可公网发布、可持续填充文字和照片的页面骨架。

## 首版设计方向

- 首屏参考 HUPR：大号标题、强对比背景图、漂浮照片、半透明信息面板和技术感细线，用来建立“生日展示”的第一眼冲击。
- HUPR 的关键动效是底部超大标题条横向循环滚动，文本中嵌入小图片，首版已改成 `hero-marquee`。
- 第二屏参考 Bridget Baker：白底、底部固定控制条、Threshold 阈值、编号计数，以及鼠标移动超过阈值后在 cursor 位置依次留下照片的 trail 展示。
- 整体文案保持克制，先用少量中文占位，方便后续替换成真实故事。
- 当前技术栈改为 Vite + TypeScript，不引入 React/Vue。HTML 保留结构，照片和文案资产进入 typed data，动效按模块拆分。

## 已整理资产

照片已输出到 `public/assets/photos/`，文件名按页面用途重新命名，并通过 Pillow 重新保存为网页副本，去除了相机型号、软件、拍摄时间等 EXIF 元数据。

- `01-room-selfie.jpg`
- `02-sun-hats.jpg`
- `03-night-market.jpg`
- `04-neon-closeup.jpg`
- `05-hotpot-peace.jpg`
- `06-day-001-scoreboard.jpg`
- `07-school-market.jpg`
- `08-night-walk.jpg`
- `09-spring-branches.jpg`

## 页面结构

1. Hero：生日展示入口，主视觉图使用 `06-day-001-scoreboard.jpg`，辅以三张漂浮照片。
2. Archive：cursor trail 照片画布，当前放入 9 张照片，鼠标移动时按顺序显示并更新编号。
3. Moments：三段故事占位，后续替换为真实时间线。
4. Letter：生日信占位，后续可以扩成完整长文。

## 代码结构

- `index.html`：页面语义结构和静态文案入口。
- `src/photos.ts`：照片 typed data，后续补充日期、地点、正文时优先改这里。
- `src/render.ts`：根据 typed data 渲染 hero、marquee 和 gallery。
- `src/gallery.ts`：Bridget Baker 式 cursor trail 和 Threshold 交互。
- `src/main.ts`：应用入口。
- `src/styles/site.css`：页面样式。
- `.github/workflows/pages.yml`：push 到 `main` 后构建 `dist` 并部署 GitHub Pages。

## 后续填充计划

- 替换 `index.html` 中 Moments 和 Letter 的占位文字。
- 为每张照片补充真实日期、地点、事件标题。
- 如果需要 AI 图片资产，再使用 `imagegen` 生成项目内 bitmap，例如生日信背景、手写风贴纸、票根拼贴或专属封面图。
- 生日展示前检查移动端首屏、照片加载速度和公网 Pages 链接。
