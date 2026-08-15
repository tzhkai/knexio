# Workflow Library：AdSense 基础代码接入评估

**评估日期：** 2026-08-15  
**提供的发布商 ID：** `ca-pub-2596567349043393`  
**结论：** 若 AdSense 后台已将 `knexio.xyz` 添加到 **Sites** 并要求连接网站/验证所有权，**现在应添加所提供的基础脚本作为验证步骤的一部分**；但不应在未完成 CMP 与隐私披露更新前启用广告展示或手动广告位。

## 官方要求与本项目的对应关系

| 事项 | AdSense 官方要求 | 当前网站状态 | 结论 |
|---|---|---|---|
| 网站验证 | AdSense 可使用位于 `<head>` 的代码片段验证站点；验证后才能请求审核。[1] | 尚未检测到所提供的 AdSense 代码。 | 当后台处于“Requires review / 连接网站”时，应加入基础代码。 |
| 审核与展示 | 提交审核后，AdSense 会核验所有权和政策合规；完成后才标记为可展示广告，通常需数日、某些情况可达 2–4 周。[1] | 当前尚未说明 AdSense 后台的站点状态。 | 基础代码可用于连接/验证；不把它视为审核通过或开始展示广告。 |
| Cookie 同意 | EEA、英国、瑞士流量在投放个性化广告时要求使用 Google 认证且集成 IAB TCF 的 CMP。[2] | 站点有自定义 Cookie 横幅，能记录 advertising 选择，但不是 Google 认证 CMP，且不会加载广告脚本。 | 当前横幅可继续管理本地偏好，但不能单独承担该地区广告同意方案。 |
| 透明披露与撤回 | 需要清晰说明 Google/其他方的数据使用，并让撤回同意与给予同意一样容易。[3] | 现有 Privacy 页和横幅明确说明“广告技术尚未启用”，设置入口可再次打开。 | 在实际启用 AdSense 前，必须改为真实数据处理和广告披露，并加入 Google 数据使用链接。 |

## 推荐接入顺序

1. 在 AdSense 的 **Sites** 中确认 `https://knexio.xyz` 已添加，且后台要求“连接网站”或代码验证。
2. 将发布商提供的基础脚本放入全站 `<head>`，且只添加一次；这一步用于站点验证，不等于添加广告展示位。
3. 发布代码后，用 AdSense 的 **Verify / Request review** 操作发起审核。
4. 在审核等待期，完成真实发布者、联系、隐私和广告披露信息；不要为提高获批概率添加诱导点击、占位广告位或广告密集布局。
5. 在实际展示广告前，选择并配置 Google Privacy & messaging 的认证 CMP，或一款 Google 认证第三方 CMP；据此替换/集成当前自定义广告同意流程。
6. 仅在站点状态为可展示广告且 CMP、隐私披露和广告位置均完成后，启用自动广告或逐个手动广告位。

## 当前不应做的事项

- 不要仅因已有发布商 ID 就在文章中插入 `<ins class="adsbygoogle">` 广告位。
- 不要把基础脚本无条件地绑定到现有 `advertising` 开关，然后误认为这等同于 EEA/英国/瑞士的认证 CMP 同意信号。
- 不要继续在 Privacy 页写“广告技术尚未启用”，如果 AdSense 广告开始实际加载。

## 下一步判断

如果 AdSense 后台明确显示“添加代码以验证/连接网站”，建议下一次改动只实施**基础验证脚本**，并同时将 Cookie 文案改为“广告尚未展示，CMP 将在广告启用前配置”。若后台并未要求验证代码，或你暂不提交审核，则可以暂缓脚本，先完成真实运营信息与 CMP 决策。

## References

[1] [Google AdSense Help — Add a new site to your AdSense sites list](https://support.google.com/adsense/answer/12169212?hl=en)

[2] [Google AdSense Help — Consent management requirements for serving ads in the EEA, UK, and Switzerland](https://support.google.com/adsense/answer/13554116?hl=en)

[3] [Google — Help with the EU user consent policy](https://www.google.com/intl/en_uk/about/company/user-consent-policy-help/)
