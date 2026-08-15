# Workflow Library：AdSense 基础代码与 CMP 状态

**更新日期：** 2026-08-15  
**发布商 ID：** `ca-pub-2596567349043393`  
**站点：** `https://knexio.xyz`

## 当前结论

AdSense 基础脚本现已部署在全站 `<head>`，并已验证其会保留在首页、隐私页及指南页的静态 HTML 中。根目录 `ads.txt` 也已发布。用户已确认在 AdSense 后台发布 **Privacy & messaging European regulations message**。网站自己的 Cookie 控制现仅管理可选站点分析，不会记录或覆盖 Google 广告同意。

基础脚本用于连接、验证和让 AdSense 识别站点；它本身不等于审核通过，也不应被理解为保证广告已经开始展示。尚未在文章中预置手动广告位，以避免在审核前损害阅读体验。

## 已完成项目

| 项目 | 实施状态 | 核对方式 |
|---|---|---|
| AdSense 基础脚本 | 已在 `client/index.html` 的 `<head>` 加入一次。 | 构建后的首页、隐私页和代表指南页均已检查脚本存在。 |
| `ads.txt` | 已在根路径 `/ads.txt` 发布 `google.com, pub-2596567349043393, DIRECT, f08c47fec0942fa0`。 | 生产构建输出已检查。 |
| European regulations message | 用户确认已在本机 AdSense 后台发布。 | 应在 AdSense 的 Privacy & messaging 中保持为 Published，并仅应用于 `knexio.xyz`。 |
| 自定义 Cookie 横幅 | 只管理必要存储和可选站点分析。 | 无 advertising 类别，不会把普通本地偏好误作 Google CMP 同意。 |
| 隐私披露 | Privacy 页面提供 Google 数据使用链接、Google CMP 前置条件与 Cookie 设置入口。 | 仍需在真正开始直接收集信息或展示广告前补充真实发布者与隐私联系信息。 |

## 上线后在 AdSense 后台核对

1. 在 **Sites** 中确认 `knexio.xyz` 的状态已从“需要代码”更新为可验证、准备审核或已在审核中。
2. 在 **Privacy & messaging → European regulations** 中确认消息状态为 **Published**，选择的网站仅为 `knexio.xyz`，并包含拒绝、同意和管理选项的路径。
3. 打开 `https://knexio.xyz/ads.txt`，确认它精确返回一行发布商声明，且没有跳转、验证码或访问限制。
4. 使用 AdSense 的预览或符合条件的 EEA、UK 或 Swiss 测试流量检查 European regulations message；不要用站点自己的分析 Cookie 横幅替代该测试。
5. 将实际运营者名称与受监控的隐私邮箱填入 Privacy 页面后，再发起或继续 AdSense 审核。

## 仍不应做的事项

- 不要在审核未完成时插入伪装为内容的 `<ins class="adsbygoogle">` 广告位。
- 不要将广告脚本加载与站点分析 Cookie 的“允许”动作绑定；广告同意由已发布的 Google CMP 流程处理。
- 不要在未提供真实发布者身份和可用隐私联系渠道的情况下，将站点描述为已完成全部广告运营披露。

## References

[1] [Google AdSense Help — Add a new site to your AdSense sites list](https://support.google.com/adsense/answer/12169212?hl=en)

[2] [Google AdSense Help — Create a European regulations message](https://support.google.com/adsense/answer/10960768?hl=en)

[3] [Google AdSense Help — Consent management requirements for publishers](https://support.google.com/adsense/answer/13554116?hl=en)

[4] [Google — Help with the EU user consent policy](https://www.google.com/intl/en_uk/about/company/user-consent-policy-help/)
