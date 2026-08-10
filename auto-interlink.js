// auto-interlink.js - خودکار انٹرلنک سسٹم

(function() {
    'use strict';

    // تمام URLs کو گلوبل آبجیکٹ سے لوڈ کریں
    const allUrls = typeof interlinkData !== 'undefined' ? interlinkData : [];

    // URLs کو سیٹ میں تبدیل کریں (جلدی تلاش کے لیے)
    const urlSet = new Set(allUrls);

    // موجودہ صفحہ کا URL حاصل کریں
    const currentPageUrl = window.location.href.split('#')[0].split('?')[0];

    // صفحہ کے تمام لنکس تلاش کریں
    function findAndUpdateLinks() {
        const links = document.querySelectorAll('a[href]');
        let updatedCount = 0;

        links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;

            // مکمل URL بنائیں
            let fullUrl = href;
            try {
                // اگر نسبتی لنک ہے تو مکمل کریں
                if (!href.startsWith('http://') && !href.startsWith('https://')) {
                    fullUrl = new URL(href, window.location.origin).href;
                }
                // URL کے آخر سے slash ہٹائیں
                fullUrl = fullUrl.replace(/\/$/, '');
            } catch (e) {
                return; // اگر URL درست نہیں تو چھوڑیں
            }

            // اگر یہ ہمارے ڈیٹا میں موجود ہے اور موجودہ صفحہ نہیں ہے
            if (urlSet.has(fullUrl) && fullUrl !== currentPageUrl) {
                // لنک کو نمایاں کریں یا تبدیل کریں (اختیاری)
                // link.style.borderBottom = '2px solid #4CAF50'; // شناخت کے لیے
                updatedCount++;
            }
        });

        console.log(`✅ ${updatedCount} interlinks found on this page`);
        return updatedCount;
    }

    // متعلقہ پوسٹس دکھانے کے لیے (اختیاری فیچر)
    function showRelatedPosts() {
        const container = document.querySelector('.related-posts') || document.getElementById('related-posts');
        if (!container) return;

        // موجودہ صفحہ کے URL کی بنیاد پر متعلقہ پوسٹس تلاش کریں
        const currentPath = window.location.pathname;
        const category = currentPath.split('/')[1] || '';

        // اسی کیٹیگری کی پوسٹس فلٹر کریں
        const related = allUrls.filter(url => {
            return url.includes('/' + category + '/') && url !== currentPageUrl;
        }).slice(0, 6); // صرف 6 پوسٹس

        if (related.length > 0) {
            let html = '<h3>متعلقہ مضامین</h3><ul>';
            related.forEach(url => {
                const title = url.split('/').pop().replace(/-/g, ' ');
                html += `<li><a href="${url}">${title}</a></li>`;
            });
            html += '</ul>';
            container.innerHTML = html;
        }
    }

    // صفحہ لوڈ ہونے پر چلائیں
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            findAndUpdateLinks();
            showRelatedPosts();
        });
    } else {
        findAndUpdateLinks();
        showRelatedPosts();
    }

    // ڈائنامک مواد کے لیے (اگر SP ہے)
    if (window.MutationObserver) {
        const observer = new MutationObserver(function() {
            findAndUpdateLinks();
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    console.log('🔗 Auto-Interlink System initialized with ' + allUrls.length + ' URLs');
})();
