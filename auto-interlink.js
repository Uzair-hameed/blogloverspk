// auto-interlink.js - خودکار انٹرلنکنگ (مضمون کے اندر)

(function() {
    'use strict';

    // تمام URLs کی فہرست
    const allUrls = typeof interlinkData !== 'undefined' ? interlinkData : [];

    if (allUrls.length === 0) {
        console.warn('⚠️ کوئی URL نہیں ملا۔ interlink-data.js چیک کریں۔');
        return;
    }

    // موجودہ صفحہ کا URL
    const currentPageUrl = window.location.href.split('#')[0].split('?')[0];

    // URLs سے keywords نکالیں
    function getKeywordFromUrl(url) {
        // URL کا آخری حصہ (slug)
        let slug = url.split('/').pop();
        // hyphens کو spaces میں تبدیل کریں
        let keyword = slug.replace(/-/g, ' ');
        // اردو الفاظ کو صاف کریں
        keyword = keyword.replace(/-/g, ' ');
        return keyword;
    }

    // URLs کو keywords کے ساتھ میپ کریں
    const urlKeywordMap = {};
    allUrls.forEach(url => {
        if (url !== currentPageUrl) {
            const keyword = getKeywordFromUrl(url);
            urlKeywordMap[keyword] = url;
        }
    });

    // مضمون کا مواد تلاش کریں
    function getContentContainer() {
        // ممکنہ کلاسز/آئی ڈیز جو بلاگ پوسٹ کے لیے استعمال ہوتی ہیں
        const selectors = [
            '.post-content',
            '.entry-content',
            '.article-content',
            '.content',
            'article',
            '.blog-post',
            '.post-body',
            '.main-content'
        ];
        
        for (let selector of selectors) {
            const el = document.querySelector(selector);
            if (el) return el;
        }
        
        // اگر کوئی نہ ملے تو پورا body
        return document.body;
    }

    // متن میں لنکس شامل کریں
    function addLinksToContent() {
        const container = getContentContainer();
        if (!container) return;

        // صرف ٹیکسٹ نوڈز پر کام کریں (پہلے سے موجود لنکس کو نظر انداز کریں)
        const textNodes = [];
        const walker = document.createTreeWalker(
            container,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // اگر لنک کے اندر ہے تو نظر انداز کریں
                    if (node.parentElement.closest('a')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    // اگر خالی یا بہت چھوٹا ہے تو نظر انداز کریں
                    if (node.textContent.trim().length < 3) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        let node;
        const nodesToProcess = [];
        while (node = walker.nextNode()) {
            nodesToProcess.push(node);
        }

        let linksAdded = 0;
        const usedKeywords = new Set();

        // ہر ٹیکسٹ نوڈ کو چیک کریں
        nodesToProcess.forEach(node => {
            let text = node.textContent;
            let originalText = text;
            
            // ہر keyword کے لیے چیک کریں
            for (let [keyword, url] of Object.entries(urlKeywordMap)) {
                // اگر keyword پہلے استعمال ہو چکا ہے تو چھوڑیں (ایک بار ہی لنک ہو)
                if (usedKeywords.has(keyword)) continue;
                
                // keyword کو ریگولر ایکسپریشن میں تبدیل کریں
                const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp('\\b' + escapedKeyword + '\\b', 'gi');
                
                if (regex.test(text)) {
                    // keyword کو لنک میں تبدیل کریں
                    const linkedText = `<a href="${url}" class="auto-interlink" target="_blank" rel="noopener noreferrer">${keyword}</a>`;
                    text = text.replace(regex, linkedText);
                    usedKeywords.add(keyword);
                    linksAdded++;
                    
                    // زیادہ لنکس نہ ڈالیں (صرف 5-6 فی پوسٹ)
                    if (linksAdded >= 6) break;
                }
            }
            
            // اگر متن تبدیل ہوا ہے تو نوڈ کو اپڈیٹ کریں
            if (text !== originalText) {
                const span = document.createElement('span');
                span.innerHTML = text;
                node.parentNode.replaceChild(span, node);
            }
        });

        console.log(`✅ ${linksAdded} خودکار انٹرلنکس شامل کیے گئے`);
        return linksAdded;
    }

    // متعلقہ پوسٹس دکھائیں (اختیاری)
    function showRelatedPosts() {
        const container = document.querySelector('#related-posts');
        if (!container) return;

        const currentPath = window.location.pathname;
        const category = currentPath.split('/')[1] || '';

        // اسی کیٹیگری کی پوسٹس
        const related = allUrls.filter(url => {
            return url.includes('/' + category + '/') && url !== currentPageUrl;
        }).slice(0, 6);

        if (related.length > 0) {
            let html = '<h3>📖 متعلقہ مضامین</h3><ul>';
            related.forEach(url => {
                const title = getKeywordFromUrl(url);
                html += `<li><a href="${url}" class="related-link">${title}</a></li>`;
            });
            html += '</ul>';
            container.innerHTML = html;
        }
    }

    // صفحہ لوڈ ہونے پر چلائیں
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            addLinksToContent();
            showRelatedPosts();
        });
    } else {
        addLinksToContent();
        showRelatedPosts();
    }

    console.log('🔗 Auto-Interlink System Started with ' + allUrls.length + ' URLs');

})();
