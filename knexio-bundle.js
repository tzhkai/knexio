/**
 * Knexio All-in-One Optimization Script v3.0
 * Combined: AdSense + Performance + Mobile Optimization
 * - GA4 & AdSense with lazy loading
 * - Cookie consent awareness
 * - Performance: preconnect, image lazy load
 * - Mobile: touch optimization, responsive ads
 */

(function() {
  'use strict';

  // ==================== Configuration ====================
  var AD_CLIENT = 'ca-pub-2596567349043393';
  var GA4_ID = 'G-6VMQH2V72L';
  var ADSENSE_LOADED = false;
  var GA_LOADED = false;

  // Detect device
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  var isTablet = /iPad|Android(?!.*Mobile)|Tablet/i.test(navigator.userAgent);
  var screenWidth = window.innerWidth;

  // ==================== Preconnect ====================
  function setupPreconnect() {
    var domains = [
      'https://pagead2.googlesyndication.com',
      'https://www.google.com',
      'https://www.gstatic.com',
      'https://www.googletagmanager.com'
    ];
    
    domains.forEach(function(url) {
      var link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  // ==================== Google Analytics 4 ====================
  function loadGA4() {
    if (GA_LOADED) return;
    GA_LOADED = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { dataLayer.push(arguments); };
    gtag('js', new Date());

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(s);

    s.onload = function() {
      gtag('config', GA4_ID, { send_page_view: true });
    };
  }

  // ==================== AdSense ====================
  function loadAdSenseScript() {
    if (ADSENSE_LOADED) return;
    ADSENSE_LOADED = true;

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + AD_CLIENT;
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
  }

  function pushAd(ad) {
    try {
      if (!ad.getAttribute('data-adsbygoogle-status')) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {}
  }

  function pushVisibleAds() {
    var ads = document.querySelectorAll('ins.adsbygoogle');
    ads.forEach(function(ad) {
      var rect = ad.getBoundingClientRect();
      if (rect.top < window.innerHeight + 200) {
        pushAd(ad);
      }
    });
  }

  function pushAllAds() {
    var ads = document.querySelectorAll('ins.adsbygoogle');
    ads.forEach(pushAd);
  }

  function setupLazyLoad() {
    var pending = true;

    function onScroll() {
      if (!pending) return;
      pushVisibleAds();
      var remaining = document.querySelectorAll('ins.adsbygoogle:not([data-adsbygoogle-status])');
      if (remaining.length === 0) {
        pending = false;
        window.removeEventListener('scroll', onScroll, { passive: true });
        window.removeEventListener('resize', onScroll, { passive: true });
      }
    }

    pushVisibleAds();

    setTimeout(function() {
      pushAllAds();
      pending = false;
      window.removeEventListener('scroll', onScroll, { passive: true });
      window.removeEventListener('resize', onScroll, { passive: true });
    }, 1500);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  function hasConsent() {
    var v = document.cookie.match(/(?:^|;\s*)knexio_cookie_consent\s*=\s*([^;]+)/);
    return v ? v.pop() : null;
  }

  // ==================== Image Lazy Load ====================
  function setupImageLazyLoad() {
    if (!('IntersectionObserver' in window)) return;
    
    var imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });
    
    document.querySelectorAll('img[data-src]').forEach(function(img) {
      imageObserver.observe(img);
    });

    // Add loading="lazy" to images without it
    document.querySelectorAll('img:not([loading])').forEach(function(img) {
      img.setAttribute('loading', 'lazy');
    });
  }

  // ==================== Mobile Optimization ====================
  function optimizeMobile() {
    if (!isMobile && !isTablet) return;

    // Add body classes
    if (isMobile) document.body.classList.add('is-mobile');
    if (isTablet) document.body.classList.add('is-tablet');

    // Prevent zoom on input focus (iOS)
    if (isMobile && screenWidth <= 480) {
      var inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach(function(input) {
        input.style.fontSize = '16px';
      });
    }

    // Touch feedback for buttons
    document.addEventListener('touchstart', function(e) {
      var btn = e.target.closest('.btn, button, .card, a[href]');
      if (btn) {
        btn.style.opacity = '0.9';
        setTimeout(function() { btn.style.opacity = ''; }, 150);
      }
    }, { passive: true });
  }

  // ==================== Ad Container CLS Fix ====================
  function fixAdContainerCLS() {
    var adBanners = document.querySelectorAll('.ad-banner, .ad-container');
    adBanners.forEach(function(container) {
      if (!container.style.minHeight) {
        container.style.minHeight = '100px';
      }
    });
  }

  // ==================== Init ====================
  function init() {
    setupPreconnect();
    loadGA4();

    var consent = hasConsent();

    if (consent === 'accepted') {
      loadAdSenseScript();
      waitForAdsThenPush();
    } else if (consent === 'declined') {
      loadAdSenseScript();
      try {
        (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = true;
      } catch(e) {}
      waitForAdsThenPush();
    } else {
      loadAdSenseScript();
    }

    // Run after DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        setupImageLazyLoad();
        fixAdContainerCLS();
        optimizeMobile();
      });
    } else {
      setupImageLazyLoad();
      fixAdContainerCLS();
      optimizeMobile();
    }
  }

  function waitForAdsThenPush() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupLazyLoad);
    } else {
      setupLazyLoad();
    }
  }

  // Listen for cookie consent update
  window.addEventListener('knexio-consent-update', function(e) {
    if (e.detail && e.detail.consent) {
      waitForAdsThenPush();
    }
  });

  // Export for external use
  window.Knexio = {
    isMobile: isMobile,
    isTablet: isTablet,
    screenWidth: screenWidth,
    pushAds: pushAllAds
  };

  init();
})();
