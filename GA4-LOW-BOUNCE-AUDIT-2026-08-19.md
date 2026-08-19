# GA4 低跳出率访问核查记录

检查时间：2026-08-19（GA 页面显示当前数据约覆盖 2026-08-12 至 2026-08-18；本轮尚未进入最近 28 天页面报告）

## 关键发现

当前登录的 GA4 资源不是以 `knexio.xyz` 命名的网站资源，而是：

- Analytics 账号名称：`Chrome Web Store developer properties`
- Analytics 账号 ID：`393500430`，另有同名账号 ID `394037213`
- 当前媒体资源 ID：`536392448`
- 当前媒体资源标识：`ipghpkfjcmoemddebopeojliipicngnh`
- 当前首页页面标题：`Knexio 阅读伴侣 - Chrome Web Store`

## 当前资源近期数据（首页摘要，过去 7 天）

- 活跃用户：1
- 事件数：3
- 关键事件数：0
- 新用户数：1
- 国家/地区：Singapore 1；United States 0（地图摘要）
- 页面标题：`Knexio 阅读伴侣 - Chrome Web Store`，浏览次数 1
- 默认渠道组：Direct，会话 1
- 首次用户来源/媒介：`(direct) / (none)`，活跃用户 1
- 城市摘要：Singapore 1；Ashburn 0
- 实时报告：过去 30 分钟无可用数据

## 解释边界

上述数据看起来对应 Chrome Web Store 的“Knexio 阅读伴侣”页面或相关扩展资源，而不是可以直接证明 `knexio.xyz` 旧站页面有真实用户访问的数据。当前尚未确认用户看到的“最近 28 天低跳出率页面”是否来自另一个 GA4 媒体资源，也尚未读取用户所说的具体页面、国家和跳出率数值。

因此，当前不能把这 1 个 Singapore Direct 用户判定为真实外部用户，也不能判定为站主调试；需要继续找到正确的 GA4 网站资源并查看 page path、session/user 数、engagement、source/medium、country、city、device、browser、date/hour 以及事件时间线。

## 第二个同名账号核查

通过资源选择器打开了第二个账号 `394037213` 的唯一媒体资源：

- 媒体资源 ID：`537272831`
- 媒体资源标识：`aiknacboiebiikclimlgidipefmccfjj`
- 页面标题示例：`knexio WebNote 网页摘要笔记 - Chrome Web Store`
- 过去 7 天活跃用户、事件数、新用户数、页面浏览和会话均为 0
- 国家/地区摘要为 Singapore 0、United States 0

该资源也明显对应 Chrome Web Store/扩展产品，而非 `knexio.xyz` 的 Workflow Library 网站。当前两个可访问的 GA4 资源都不能用于回答用户所说的 knexio.xyz 最近 28 天低跳出率页面问题；下一步需要从公开站点源码核对实际 Measurement ID，或在 GA4 账号中找到尚未显示的 knexio.xyz 网站资源。

## knexio.xyz 生产站源码核查

首页 `https://knexio.xyz/` 的可见页面和 HTML 中没有发现 `googletagmanager.com`、`google-analytics.com`、`gtag.js`、`gtag()` 或 GA4 `G-XXXXXXXXXX` Measurement ID。

项目代码 `client/src/components/CookieConsent.tsx` 显示，站点可选分析脚本只在访客同意后动态加载：脚本地址来自 `VITE_ANALYTICS_ENDPOINT`，加载路径为 `${endpoint}/umami`，并使用 `VITE_ANALYTICS_WEBSITE_ID`。这不是 Google Analytics 4 的 gtag 实现。开发/预览日志中可见的请求为 `https://manus-analytics.com/api/send`，且 hostname 是本地预览地址或 Manus 预览域名，不能当作 knexio.xyz 生产用户数据。

## 阶段性结论

用户提到的“GA 最近 28 天低跳出率页面”当前无法与 `knexio.xyz` 生产站建立可靠对应关系。两个可访问的 Google Analytics 资源都显示 Chrome Web Store 扩展相关页面；生产站源码也没有 GA4 Measurement ID。因此，现有低跳出率不能证明旧站页面有真实外部用户，更不能仅凭该指标判断国家或用户质量。

可信度：高。证据包括 GA4 资源名称和页面标题、资源 ID 切换结果、生产首页脚本扫描、项目 CookieConsent 实现和预览网络请求记录。

## 2026-08-19 工具页导航与新功能验证补充

在本地预览中直接访问 `/guides/` 返回 Workflow Library 指南库页面，包含 17 个 guides、专题筛选和搜索控件。页面右上角 `Browse guides` 的 href 为 `/guides/`，点击后仍停留在该指南库页面，说明按钮目标已可访问；此前无效更可能是 `/guides` 与尾斜杠路由不一致或旧预览状态导致。当前页面的 Cookie consent 浮层会遮挡移动端部分内容，但不影响顶部导航链接。

本轮还完成了 Markdown Preview 全屏入口、Token 模型扩展和上下文警告的本地代码与构建验证：17 项测试通过，TypeScript、sitemap 和生产构建通过。


Markdown Preview 浏览器回归：页面可见 `Full-screen mode` 按钮；点击后按钮文本变为 `Exit full screen`，编辑区和预览区进入固定双栏沉浸式布局，顶部工具栏和同步滚动开关仍可访问。


AI Prompt Word Counter 浏览器回归：模型下拉框实际显示 `GPT-4 style estimate`、`Claude 3.5 estimate` 和 `Gemini 1.5 estimate`；Token 统计、复制和导出控件均正常呈现。上下文警告在安全阈值时隐藏，达到近阈值或超过阈值时通过 `tool-context-warning` 显示。
