// auto-interlink.js - سمارٹ بینر انٹرلنکس (اپ ڈیٹڈ)

(function() {
    'use strict';

    console.log('🔍 Auto-Interlink Starting...');

    const allUrls = typeof interlinkData !== 'undefined' ? interlinkData : [];
    console.log('📊 Total URLs loaded:', allUrls.length);

    if (allUrls.length === 0) {
        console.warn('⚠️ کوئی URL نہیں ملا!');
        return;
    }

    const currentPageUrl = window.location.href.split('#')[0].split('?')[0];
    console.log('📄 Current Page:', currentPageUrl);

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

    // متعلقہ پوسٹس تلاش کریں
    function getRelatedPosts(count = 4) {
        const currentPath = window.location.pathname;
        const category = currentPath.split('/')[1] || '';
        console.log('📁 Current Category:', category);

        const related = allUrls.filter(url => {
            return url.includes('/' + category + '/') && url !== currentPageUrl;
        });

        console.log('🔗 Related Posts Found:', related.length);
        const shuffled = related.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // سمارٹ بینر بنائیں
    function createSmartBanner(url, index) {
        const title = getTitleFromUrl(url);
        const imageUrl = getImageFromUrl(url);
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

    // مضمون کا کنٹینر تلاش کریں - تمام ممکنہ کلاسز
    function getContentContainer() {
        // تمام ممکنہ سلیکٹرز
        const selectors = [
            '.post-content',
            '.entry-content', 
            '.article-content',
            '.content',
            'article',
            '.blog-post',
            '.post-body',
            '.main-content',
            '.post',
            '.container main',
            'main',
            '.container'
        ];
        
        for (let selector of selectors) {
            const el = document.querySelector(selector);
            if (el) {
                console.log('✅ Container found with selector:', selector);
                return el;
            }
        }
        
        // اگر کوئی نہ ملے تو پورا body
        console.warn('⚠️ کوئی کنٹینر نہیں ملا، body استعمال ہو رہا ہے');
        return document.body;
    }

    // بینرز داخل کریں
    function insertBannersInContent() {
        console.log('🔄 insertBannersInContent() started...');
        
        const container = getContentContainer();
        if (!container) {
            console.warn('⚠️ مواد کا کنٹینر نہیں ملا');
            return;
        }

        // تمام پیراگراف تلاش کریں
        const paragraphs = container.querySelectorAll('p');
        console.log('📝 Total paragraphs found:', paragraphs.length);

        if (paragraphs.length < 3) {
            console.log('ℹ️ بہت کم پیراگراف (کم از کم 3 درکار ہیں)');
            // پھر بھی کوشش کریں
        }

        const relatedPosts = getRelatedPosts(3);
        console.log('📚 Related posts to show:', relatedPosts.length);

        if (relatedPosts.length === 0) {
            console.log('ℹ️ کوئی متعلقہ پوسٹ نہیں ملی');
            return;
        }

        const bannerCount = Math.min(relatedPosts.length, 3);
        const selectedPosts = relatedPosts.slice(0, bannerCount);

        const totalParas = paragraphs.length;
        
        // اگر پیراگراف کم ہیں تو پھر بھی ڈالیں
        let positions = [];
        if (totalParas >= 3) {
            positions = [
                Math.floor(totalParas * 0.25),
                Math.floor(totalParas * 0.55),
                Math.floor(totalParas * 0.82)
            ].slice(0, bannerCount);
        } else {
            // کم پیراگراف ہوں تو پھر بھی ڈالیں
            for (let i = 0; i < bannerCount && i < totalParas; i++) {
                positions.push(i);
            }
        }

        console.log('📌 Banner positions:', positions);

        let bannersAdded = 0;
        for (let i = bannerCount - 1; i >= 0; i--) {
            const pos = positions[i];
            if (pos !== undefined && pos < paragraphs.length) {
                const bannerHtml = createSmartBanner(selectedPosts[i], i);
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = bannerHtml;
                const bannerNode = tempDiv.firstElementChild;
                
                if (bannerNode) {
                    // اگر پیراگراف کے بعد ڈالنا ہے
                    if (paragraphs[pos].nextSibling) {
                        paragraphs[pos].parentNode.insertBefore(bannerNode, paragraphs[pos].nextSibling);
                    } else {
                        paragraphs[pos].parentNode.appendChild(bannerNode);
                    }
                    bannersAdded++;
                    console.log(`✅ Banner ${i+1} added at position ${pos}`);
                }
            }
        }

        console.log(`✅ ${bannersAdded} سمارٹ بینرز شامل کیے گئے`);
        
        if (bannersAdded === 0) {
            console.warn('⚠️ کوئی بینر شامل نہیں ہو سکا۔ پوسٹ کا ڈھانچہ چیک کریں۔');
        }
    }

    // ڈیلی کے ساتھ چلائیں (صفحہ مکمل لوڈ ہونے کے بعد)
    function initBanners() {
        // تھوڑا انتظار کریں تاکہ تمام ڈیٹا لوڈ ہو جائے
        setTimeout(function() {
            insertBannersInContent();
        }, 500);
    }

    // صفحہ لوڈ ہونے پر چلائیں
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBanners);
    } else {
        initBanners();
    }

    // اگر مواد ڈائنامک ہے تو دوبارہ چیک کریں
    window.addEventListener('load', function() {
        // دوبارہ چیک کریں اگر پہلی بار نہیں لگے
        setTimeout(insertBannersInContent, 1000);
    });

    console.log('🔗 Smart Banner System Started with ' + allUrls.length + ' URLs');

})();
