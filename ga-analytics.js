/**
 * Google Analytics 4 (GA4) 跟踪脚本
 * 用于 Knexio 网站的数据分析和SEO监控
 * 
 * 使用说明：
 * 1. 在Google Analytics创建GA4媒体资源
 * 2. 获取测量ID (G-XXXXXXXXXX)
 * 3. 在网站的所有页面头部添加此脚本
 * 4. 配置事件跟踪和转化跟踪
 */

// 注意：当前页面的真实GA4实现在 knexio-bundle.js（已配置 G-6VMQH2V72L）
// 本文件包含独立的事件跟踪函数定义，如需使用请在各页面加载此脚本
const GA4_MEASUREMENT_ID = 'G-6VMQH2V72L';
const SITE_NAME = 'Knexio';
const SITE_URL = 'https://knexio.xyz';

// 初始化GA4
(function() {
    // 异步加载 gtag.js
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_MEASUREMENT_ID;
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
    
    // 配置 dataLayer 和 gtag 函数
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
        dataLayer.push(arguments);
    };
    
    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, {
        'cookie_flags': 'max-age=7200;secure;samesite=none',
        'send_page_view': true,
        'page_title': document.title,
        'page_location': window.location.href,
        'page_path': window.location.pathname,
        'site_name': SITE_NAME,
        'site_url': SITE_URL
    });
})();

// 工具使用事件跟踪
function trackToolUsage(toolName, toolCategory, actionType) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'tool_usage', {
            'event_category': toolCategory,
            'event_label': toolName,
            'tool_name': toolName,
            'tool_category': toolCategory,
            'action_type': actionType || 'click',
            'page_path': window.location.pathname,
            'page_title': document.title
        });
        console.log('Tool usage tracked:', toolName, toolCategory, actionType);
    }
}

// 页面浏览事件（自定义页面类型跟踪）
function trackPageView(pageType, contentCategory, contentTitle) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_type': pageType,
            'content_category': contentCategory,
            'content_title': contentTitle,
            'page_location': window.location.href,
            'page_path': window.location.pathname,
            'page_title': document.title
        });
    }
}

// 用户互动事件（点击、滚动等）
function trackUserInteraction(interactionType, elementId, elementText) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'user_interaction', {
            'event_category': 'engagement',
            'event_label': elementText || elementId,
            'interaction_type': interactionType,
            'element_id': elementId,
            'element_text': elementText,
            'page_path': window.location.pathname
        });
    }
}

// 表单提交事件
function trackFormSubmission(formId, formType, success) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
            'event_category': 'conversion',
            'event_label': formId,
            'form_type': formType,
            'success': success,
            'page_path': window.location.pathname,
            'form_id': formId
        });
    }
}

// 文件下载/导出事件
function trackFileExport(fileType, fileName, toolName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'file_export', {
            'event_category': 'conversion',
            'event_label': fileName,
            'file_type': fileType,
            'file_name': fileName,
            'tool_name': toolName,
            'page_path': window.location.pathname
        });
    }
}

// 错误跟踪
function trackError(errorType, errorMessage, toolName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'error_occurred', {
            'event_category': 'errors',
            'event_label': errorType,
            'error_type': errorType,
            'error_message': errorMessage,
            'tool_name': toolName,
            'page_path': window.location.pathname
        });
    }
}

// 性能监控
function trackPagePerformance(loadTime, toolName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_performance', {
            'event_category': 'performance',
            'event_label': toolName || 'general',
            'load_time': loadTime,
            'tool_name': toolName,
            'page_path': window.location.pathname
        });
    }
}

// SEO相关事件
function trackSEOClick(elementType, searchQuery, resultPosition) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'seo_click', {
            'event_category': 'seo',
            'event_label': elementType,
            'search_query': searchQuery,
            'result_position': resultPosition,
            'element_type': elementType,
            'page_path': window.location.pathname
        });
    }
}

// 移动端特定事件
function trackMobileInteraction(interactionType, deviceType, screenSize) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'mobile_interaction', {
            'event_category': 'mobile',
            'event_label': interactionType,
            'interaction_type': interactionType,
            'device_type': deviceType,
            'screen_size': screenSize,
            'page_path': window.location.pathname
        });
    }
}

// 用户会话跟踪
let sessionStartTime = Date.now();
function trackSessionMetrics() {
    if (typeof gtag !== 'undefined') {
        const sessionDuration = Date.now() - sessionStartTime;
        const pageCount = parseInt(localStorage.getItem('knexio_page_views') || '0') + 1;
        
        localStorage.setItem('knexio_page_views', pageCount.toString());
        
        gtag('event', 'session_metrics', {
            'event_category': 'engagement',
            'event_label': 'session_data',
            'session_duration': Math.round(sessionDuration / 1000), // 转换为秒
            'page_views': pageCount,
            'page_path': window.location.pathname
        });
    }
}

// 自动页面类型检测
function detectPageType() {
    const path = window.location.pathname;
    
    if (path === '/' || path === '/index.html') {
        return 'homepage';
    } else if (path.startsWith('/tools/')) {
        return 'tool_page';
    } else if (path.startsWith('/guides/')) {
        return 'guide_page';
    } else if (path.startsWith('/games/')) {
        return 'game_page';
    } else if (path.startsWith('/finance/')) {
        return 'finance_tool';
    } else if (path.startsWith('/business/')) {
        return 'business_tool';
    } else if (path.startsWith('/ai-tools/')) {
        return 'ai_tool';
    } else if (path.startsWith('/privacy')) {
        return 'legal_page';
    } else {
        return 'other_page';
    }
}

// 初始化页面跟踪
document.addEventListener('DOMContentLoaded', function() {
    // 自动检测页面类型并发送事件
    const pageType = detectPageType();
    const contentCategory = window.location.pathname.split('/')[1] || 'home';
    const contentTitle = document.title.split('–')[0].trim();
    
    // 发送页面浏览事件
    trackPageView(pageType, contentCategory, contentTitle);
    
    // 性能监控
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        trackPagePerformance(Math.round(loadTime));
        
        // 会话跟踪
        setTimeout(trackSessionMetrics, 5000);
    });
    
    // 自动跟踪所有工具使用按钮
    const toolButtons = document.querySelectorAll('.btn, button[class*="btn"], a[class*="btn"]');
    toolButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const toolName = this.getAttribute('data-tool-name') || 
                           this.textContent.trim() || 
                           this.getAttribute('aria-label') || 
                           'unknown_tool';
            const toolCategory = this.getAttribute('data-tool-category') || pageType;
            
            trackToolUsage(toolName, toolCategory, 'click');
        });
    });
    
    // 跟踪FAQ展开
    const faqQuestions = document.querySelectorAll('.faq-item h3, .faq-question');
    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', function() {
            trackUserInteraction('faq_expand', 'faq_' + (index + 1), this.textContent.trim());
        });
    });
    
    // 滚动深度跟踪
    let scrollDepthTracked = [25, 50, 75, 90];
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        scrollDepthTracked.forEach(depth => {
            if (scrollPercent >= depth && scrollPercent < depth + 5) {
                trackUserInteraction('scroll_depth', 'scroll_' + depth + 'pct', 'Scrolled ' + depth + '%');
                // 从数组中移除，避免重复发送
                scrollDepthTracked = scrollDepthTracked.filter(d => d !== depth);
            }
        });
    });
    
    // 错误监控
    window.addEventListener('error', function(e) {
        trackError('javascript_error', e.message, pageType);
    });
});

// 导出所有函数，方便在其他脚本中使用
window.knexioAnalytics = {
    trackToolUsage,
    trackPageView,
    trackUserInteraction,
    trackFormSubmission,
    trackFileExport,
    trackError,
    trackPagePerformance,
    trackSEOClick,
    trackMobileInteraction,
    trackSessionMetrics,
    detectPageType
};

console.log('Knexio Analytics loaded - GA4 Measurement ID:', GA4_MEASUREMENT_ID);

/**
 * 设置说明：
 * 
 * 1. 访问 https://analytics.google.com/
 * 2. 创建新的GA4媒体资源
 * 3. 获取测量ID (格式: G-XXXXXXXXXX)
 * 4. 更新本文件第14行的GA4_MEASUREMENT_ID变量
 * 5. 将此脚本添加到所有HTML页面的<head>部分：
 *    <script src="/ga-analytics.js"></script>
 * 
 * 高级配置：
 * - 在Google Analytics中设置转化事件
 * - 配置自定义维度（页面类型、工具类别等）
 * - 设置受众群体和再营销
 * - 连接Google Search Console数据
 * 
 * 重要事件定义：
 * - page_view: 页面浏览（自动）
 * - tool_usage: 工具使用
 * - form_submission: 表单提交
 * - file_export: 文件导出
 * - user_interaction: 用户交互
 * - session_metrics: 会话指标
 * 
 * SEO优化跟踪：
 * - 监控关键词排名（通过Search Console）
 * - 跟踪页面停留时间
 * - 分析跳出率和退出率
 * - 监控移动端性能
 * - 跟踪用户参与度指标
 */