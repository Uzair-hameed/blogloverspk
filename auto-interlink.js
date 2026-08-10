// auto-interlink.js - سمارٹ بینر انٹرلنکس

(function() {
    'use strict';

    const allUrls = typeof interlinkData !== 'undefined' ? interlinkData : [];

    if (allUrls.length === 0) {
        console.warn('⚠️ کوئی URL نہیں ملا');
        return;
    }

    const currentPageUrl = window.location.href.split('#')[0].split('?')[0];

    // URL سے ٹائٹل نکالیں
    function getTitleFromUrl(url) {
        let slug = url.split('/').pop();
        let title = slug.replace(/-/g, ' ');
        title = title.charAt(0).toUpperCase() + title.slice(1);
        return title;
    }

    // URL سے امیج یوآرایل بنائیں
    function getImageFromUrl(url) {
        let path = url.replace('https://bloglovers.pk/', '');
        return `https://bloglovers.pk/images/${path}.png`;
    }

    // متعلقہ پوسٹس تلاش کریں (اسی کیٹیگری سے)
    function getRelatedPosts(count = 4) {
        const currentPath = window.location.pathname;
        const category = currentPath.split('/')[1] || '';

        const related = allUrls.filter(url => {
            return url.includes('/' + category + '/') && url !== currentPageUrl;
        });

        // Randomly shuffle
        const shuffled = related.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // سمارٹ بینر بنائیں (چھوٹا، خوبصورت، غیر مداخلتی)
    function createSmartBanner(url, index) {
        const title = getTitleFromUrl(url);
        const imageUrl = getImageFromUrl(url);
        
        // مختلف قسم کے بینرز
        const styles = ['style-1', 'style-2', 'style-3'];
        const style = styles[index % styles.length];
        
        return `
            <div class="smart-banner ${style}" data-index="${index}">
                <a href="${url}" class="banner-link">
                    <div class="banner-inner">
                        <div class="banner-icon">
                            <img src="${imageUrl}" alt="${title}" loading="lazy" onerror="this.style.display='none'">
                        </div>
                        <div class="banner-content">
                            <span class="banner-label">📖 تجویز کردہ</span>
                            <span class="banner-title">${title}</span>
                        </div>
                        <div class="banner-arrow">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    // مضمون کا کنٹینر تلاش کریں
    function getContentContainer() {
        const selectors = [
            '.post-content',
            '.entry-content', 
            '.article-content',
            '.content',
            'article',
            '.blog-post',
            '.post-body',
            '.main-content',
            '.post'
        ];
        
        for (let selector of selectors) {
            const el = document.querySelector(selector);
            if (el) return el;
        }
        return document.body;
    }

    // بینرز داخل کریں
    function insertBannersInContent() {
        const container = getContentContainer();
        if (!container) {
            console.warn('⚠️ مواد کا کنٹینر نہیں ملا');
            return;
        }

        const paragraphs = container.querySelectorAll('p');
        if (paragraphs.length < 4) {
            console.log('ℹ️ بہت کم پیراگراف');
            return;
        }

        const relatedPosts = getRelatedPosts(3);
        if (relatedPosts.length === 0) {
            console.log('ℹ️ کوئی متعلقہ پوسٹ نہیں ملی');
            return;
        }

        // صرف 3 بینرز (پوری پوسٹ میں)
        const bannerCount = Math.min(relatedPosts.length, 3);
        const selectedPosts = relatedPosts.slice(0, bannerCount);

        // پوزیشنز: پہلا 30% کے بعد، دوسرا 60% کے بعد، تیسرا 85% کے بعد
        const totalParas = paragraphs.length;
        const positions = [
            Math.floor(totalParas * 0.3),
            Math.floor(totalParas * 0.6),
            Math.floor(totalParas * 0.85)
        ].slice(0, bannerCount);

        // بینرز ڈالیں (الٹ ترتیب میں)
        for (let i = bannerCount - 1; i >= 0; i--) {
            const pos = positions[i];
            if (pos < paragraphs.length) {
                const bannerHtml = createSmartBanner(selectedPosts[i], i);
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = bannerHtml;
                const bannerNode = tempDiv.firstElementChild;
                
                // پیراگراف کے بعد بینر داخل کریں
                paragraphs[pos].parentNode.insertBefore(bannerNode, paragraphs[pos].nextSibling);
            }
        }

        console.log(`✅ ${bannerCount} سمارٹ بینرز شامل کیے گئے`);
    }

    // صفحہ لوڈ ہونے پر چلائیں
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertBannersInContent);
    } else {
        insertBannersInContent();
    }

    console.log('🔗 Smart Banner System Started with ' + allUrls.length + ' URLs');

})();
