/*!
 * Knexio Cookie Consent Banner v2
 * GDPR / CCPA / ePrivacy compliant
 * - 修复隐私政策链接
 * - Decline 使用 Limited Ads
 * - 触发 consent-update 事件通知广告脚本
 */
(function () {
  'use strict';

  var COOKIE_KEY = 'knexio_cookie_consent';
  var COOKIE_DAYS = 365;

  function getCookie(name) {
    var v = document.cookie.match('(^|;)\s*' + name + '\s*=\s*([^;]+)');
    return v ? v.pop() : null;
  }

  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }

  /**
   * 通知广告脚本 consent 状态变化
   */
  function notifyConsentUpdate(consent) {
    try {
      var event = new CustomEvent('knexio-consent-update', { detail: { consent: consent } });
      window.dispatchEvent(event);
    } catch(e) {}
  }

  function injectStyles() {
    var css = [
      '#kx-cookie-banner{',
        'position:fixed;bottom:0;left:0;right:0;z-index:99999;',
        'background:#1a1d27;border-top:1px solid #2d3148;',
        'padding:16px 20px;display:flex;align-items:center;',
        'justify-content:space-between;flex-wrap:wrap;gap:12px;',
        'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;',
        'font-size:14px;color:#94a3b8;',
        'box-shadow:0 -4px 24px rgba(0,0,0,0.4);',
        'animation:kx-slide-up 0.3s ease;',
      '}',
      '@keyframes kx-slide-up{from{transform:translateY(100%)}to{transform:translateY(0)}}',
      '#kx-cookie-banner .kx-text{flex:1;min-width:200px;line-height:1.6;}',
      '#kx-cookie-banner .kx-text a{color:#7c6af7;text-decoration:none;}',
      '#kx-cookie-banner .kx-text a:hover{text-decoration:underline;}',
      '#kx-cookie-banner .kx-btns{display:flex;gap:10px;flex-shrink:0;}',
      '#kx-cookie-banner .kx-btn{',
        'padding:9px 20px;border:none;border-radius:6px;',
        'font-size:13px;font-weight:600;cursor:pointer;',
        'transition:opacity 0.2s;white-space:nowrap;',
      '}',
      '#kx-cookie-banner .kx-btn:hover{opacity:0.85;}',
      '#kx-cookie-banner .kx-accept{background:#7c6af7;color:#fff;}',
      '#kx-cookie-banner .kx-decline{background:transparent;color:#94a3b8;border:1px solid #2d3148;}',
      '#kx-cookie-banner .kx-decline:hover{color:#e2e8f0;border-color:#7c6af7;}'
    ].join('');
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  function showBanner() {
    injectStyles();

    var banner = document.createElement('div');
    banner.id = 'kx-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = [
      '<div class="kx-text">',
        '🍪 We use cookies to improve your experience and show relevant ads.',
        ' By clicking <strong>Accept</strong>, you consent to our use of cookies.',
        ' <a href="/privacy/">Learn more</a>',
        ' | <a href="#" id="kx-ccpa" style="font-size:12px;">Do Not Sell My Info</a>',
      '</div>',
      '<div class="kx-btns">',
        '<button class="kx-btn kx-decline" id="kx-decline">Decline</button>',
        '<button class="kx-btn kx-accept" id="kx-accept">Accept All</button>',
      '</div>'
    ].join('');

    document.body.appendChild(banner);

    document.getElementById('kx-accept').addEventListener('click', function () {
      setCookie(COOKIE_KEY, 'accepted', COOKIE_DAYS);
      hideBanner();
      notifyConsentUpdate('accepted');
    });

    document.getElementById('kx-decline').addEventListener('click', function () {
      setCookie(COOKIE_KEY, 'declined', COOKIE_DAYS);
      hideBanner();
      notifyConsentUpdate('declined');
    });

    // CCPA: Do Not Sell My Personal Information
    var ccpaLink = document.getElementById('kx-ccpa');
    if (ccpaLink) {
      ccpaLink.addEventListener('click', function (e) {
        e.preventDefault();
        setCookie(COOKIE_KEY, 'declined', COOKIE_DAYS);
        hideBanner();
        notifyConsentUpdate('declined');
      });
    }
  }

  function hideBanner() {
    var banner = document.getElementById('kx-cookie-banner');
    if (banner) {
      banner.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
      banner.style.transform = 'translateY(100%)';
      banner.style.opacity = '0';
      setTimeout(function () { banner.remove(); }, 300);
    }
  }

  function init() {
    var consent = getCookie(COOKIE_KEY);
    if (!consent) {
      showBanner();
    } else {
      // 页面刷新时通知广告脚本当前的 consent 状态
      notifyConsentUpdate(consent);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
