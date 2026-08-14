# Cookie 与广告同意实现依据

研究日期：2026-08-14

## 本次实现边界

当前版本仅使用必要的浏览器本地存储来记住 Cookie 选择。可选分析脚本在访客允许分析前不会插入页面；广告技术当前没有加载。横幅允许访客接受、拒绝或按用途保存选择，并可从页脚和隐私页重新打开设置。

这是一套透明的站内偏好界面，不是面向 EEA、英国或瑞士的 Google 认证 CMP。在未来启用个性化 Google 广告前，发布者仍需根据实际流量与地区部署 Google Privacy & messaging 或其他通过 Google 认证、并集成 IAB TCF 的 CMP。

## 官方要求摘要

Google 的 EU User Consent Policy 要求在适用场景中取得对 Cookie/本地存储以及广告个性化数据处理的有效同意，保留同意记录，提供撤回方式，并清晰识别可能收集、接收或使用个人数据的各方。[1]

AdSense 的 Cookie 说明要求发布者清晰展示隐私政策，说明网站对 Cookie 的使用；AdSense 广告技术可能使用 Cookie 进行广告投放、频率控制、报告以及在设置允许时的个性化。[2]

对 EEA、英国和瑞士的个性化 Google 广告，Google 说明需要使用与 IAB TCF 集成的 Google 认证 CMP；非认证 CMP 流量可能仅适用于非个性化或限制性广告场景。[3]

## 参考来源

[1] Google, EU user consent policy — https://www.google.com/about/company/user-consent-policy/

[2] Google AdSense Help, How AdSense uses cookies — https://support.google.com/adsense/answer/7549925?hl=en

[3] Google AdSense Help, Google consent management requirements for publishers — https://support.google.com/adsense/answer/13554116?hl=en
