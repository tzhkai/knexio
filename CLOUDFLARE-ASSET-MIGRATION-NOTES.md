# Cloudflare 图片资产迁移记录

当前站点使用的 `/manus-storage/` 相对资源路径仅在 Manus 预览/托管环境中可用。将站点部署至 Cloudflare Pages 前，必须把每张实际使用的图片导出为仓库内可发布资源，并把前端引用改为 `/images/<filename>`。

已导出：

- `/home/ubuntu/webdev-static-assets/workflow-library-mark.webp`，对应品牌图标。
- `/home/ubuntu/webdev-static-assets/workflow-library-hero.webp`，对应主页主视觉。
- `/home/ubuntu/webdev-static-assets/research-brief-workflow.webp`，对应研究工作流配图。
- `/home/ubuntu/webdev-static-assets/meeting-to-action-workflow.webp`，对应会议工作流配图。
- `/home/ubuntu/webdev-static-assets/ai-content-plan-workflow.webp`，对应内容计划工作流配图。

已复制到 `client/public/images/` 并将前端引用切换为 `/images/<filename>.webp`，由 Cloudflare Pages 随 `dist/public` 一起发布。
