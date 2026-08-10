// auto-interlink.js - پیراگراف کے بعد خوبصورت کارڈ لنکس

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
        // پہلے حرف کو بڑا کریں
        title = title.charAt(0).toUpperCase() + title.slice(1);
        return title;
    }

    // URL سے امیج یوآرایل بنائیں
    function getImageFromUrl(url) {
        // example: https://bloglovers.pk/alamaat-sughra/aap-ka-is-dnya-main-tshryf-lana
        // -> https://bloglovers.pk/images/alamaat-sughra/aap-ka-is-dnya-main-tshryf-lana.png
        let path = url.replace('https://bloglovers.pk/', '');
        let imageUrl = `https://bloglovers.pk/images/${path}.png`;
        return imageUrl;
    }

    // متعلقہ پوسٹس تلاش کریں (اسی کیٹیگری سے)
    function getRelatedPosts(count = 6) {
        const currentPath = window.location.pathname;
        const category = currentPath.split('/')[1] || '';

        const related = allUrls.filter(url => {
            return url.includes('/' + category + '/') && url !== currentPageUrl;
        });

        // Randomly shuffle and pick
        const shuffled = related.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // خوبصورت کارڈ بنائیں
    function createCard(url, index) {
        const title = getTitleFromUrl(url);
        const imageUrl = getImageFromUrl(url);
        
        // مختلف ڈیزائن کے لیے کلاس
        const cardClass = index % 2 === 0 ? 'card-left' : 'card-right';
        
        return `
            <div class="interlink-card ${cardClass}">
                <a href="${url}" class="card-link">
                    <div class="card-content">
                        <div class="card-image">
                            <img src="${imageUrl}" alt="${title}" loading="lazy" onerror="this.style.display='none'">
                        </div>
                        <div class="card-text">
                            <span class="card-badge">✨ مزید پڑھیں</span>
                            <h4 class="card-title">${title}</h4>
                            <span class="card-arrow">👉 کلک کریں</span>
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

    // پیراگراف کے بعد کارڈ داخل کریں
    function insertCardsInContent() {
        const container = getContentContainer();
        if (!container) {
            console.warn('⚠️ مواد کا کنٹینر نہیں ملا');
            return;
        }

        // صرف پیراگراف تلاش کریں
        const paragraphs = container.querySelectorAll('p');
        if (paragraphs.length < 3) {
            console.log('ℹ️ بہت کم پیراگراف، کارڈ نہیں ڈالے');
            return;
        }

        // متعلقہ پوسٹس حاصل کریں
        const relatedPosts = getRelatedPosts(4);
        if (relatedPosts.length === 0) {
            console.log('ℹ️ کوئی متعلقہ پوسٹ نہیں ملی');
            return;
        }

        // کارڈز کی تعداد (زیادہ سے زیادہ 4)
        const cardCount = Math.min(relatedPosts.length, 4);
        const selectedPosts = relatedPosts.slice(0, cardCount);

        // پیراگراف کے درمیان پوزیشنز
        const positions = [];
        const totalParas = paragraphs.length;
        
        // ہر 3-4 پیراگراف کے بعد کارڈ
        let interval = Math.floor(totalParas / (cardCount + 1));
        if (interval < 2) interval = 2;
        
        for (let i = 1; i <= cardCount; i++) {
            let pos = i * interval;
            if (pos >= totalParas) pos = totalParas - 1;
            positions.push(pos);
        }

        // کارڈز ڈالیں (الٹ ترتیب میں تاکہ انڈیکس متاثر نہ ہوں)
        for (let i = cardCount - 1; i >= 0; i--) {
            const pos = positions[i];
            if (pos < paragraphs.length) {
                const cardHtml = createCard(selectedPosts[i], i);
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = cardHtml;
                const cardNode = tempDiv.firstElementChild;
                
                // پیراگراف کے بعد کارڈ داخل کریں
                paragraphs[pos].parentNode.insertBefore(cardNode, paragraphs[pos].nextSibling);
            }
        }

        console.log(`✅ ${cardCount} انٹرلنک کارڈز شامل کیے گئے`);
    }

    // صفحہ لوڈ ہونے پر چلائیں
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertCardsInContent);
    } else {
        insertCardsInContent();
    }

    console.log('🔗 Auto-Interlink Cards System Started with ' + allUrls.length + ' URLs');

})();
