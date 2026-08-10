// auto-interlink.js - سمارٹ بینر انٹرلنکس (ورژن 3)

(function() {
    'use strict';

    console.log('🔍 Auto-Interlink Starting...');

    var allUrls = typeof interlinkData !== 'undefined' ? interlinkData : [];
    console.log('📊 Total URLs loaded:', allUrls.length);

    if (allUrls.length === 0) {
        console.warn('⚠️ کوئی URL نہیں ملا!');
        return;
    }

    var currentPageUrl = window.location.href.split('#')[0].split('?')[0];
    console.log('📄 Current Page:', currentPageUrl);

    // URL سے ٹائٹل نکالیں
    function getTitleFromUrl(url) {
        try {
            var slug = url.split('/').pop();
            var title = slug.split('-').join(' ');
            title = title.charAt(0).toUpperCase() + title.slice(1);
            return title;
        } catch(e) {
            return url;
        }
    }

    // URL سے امیج یوآرایل بنائیں
    function getImageFromUrl(url) {
        try {
            var path = url.replace('https://bloglovers.pk/', '');
            return 'https://bloglovers.pk/images/' + path + '.png';
        } catch(e) {
            return '';
        }
    }

    // متعلقہ پوسٹس تلاش کریں
    function getRelatedPosts(count) {
        count = count || 3;
        var currentPath = window.location.pathname;
        var parts = currentPath.split('/');
        var category = parts.length > 1 ? parts[1] : '';
        console.log('📁 Current Category:', category);

        var related = [];
        for (var i = 0; i < allUrls.length; i++) {
            var url = allUrls[i];
            if (url.indexOf('/' + category + '/') !== -1 && url !== currentPageUrl) {
                related.push(url);
            }
        }

        console.log('🔗 Related Posts Found:', related.length);
        
        // Shuffle
        for (var j = related.length - 1; j > 0; j--) {
            var k = Math.floor(Math.random() * (j + 1));
            var temp = related[j];
            related[j] = related[k];
            related[k] = temp;
        }
        
        return related.slice(0, count);
    }

    // سمارٹ بینر بنائیں
    function createSmartBanner(url, index) {
        var title = getTitleFromUrl(url);
        var imageUrl = getImageFromUrl(url);
        var styles = ['style-1', 'style-2', 'style-3'];
        var style = styles[index % styles.length];
        
        return '<div class="smart-banner ' + style + '" data-index="' + index + '">' +
            '<a href="' + url + '" class="banner-link">' +
                '<div class="banner-inner">' +
                    '<div class="banner-icon">' +
                        '<img src="' + imageUrl + '" alt="' + title + '" loading="lazy" onerror="this.style.display=\'none\'">' +
                    '</div>' +
                    '<div class="banner-content">' +
                        '<span class="banner-label">📖 تجویز کردہ</span>' +
                        '<span class="banner-title">' + title + '</span>' +
                    '</div>' +
                    '<div class="banner-arrow">' +
                        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                            '<path d="M5 12h14M12 5l7 7-7 7"/>' +
                        '</svg>' +
                    '</div>' +
                '</div>' +
            '</a>' +
        '</div>';
    }

    // مضمون کا کنٹینر تلاش کریں
    function getContentContainer() {
        var selectors = [
            '.post-content', '.entry-content', '.article-content', 
            '.content', 'article', '.blog-post', '.post-body', 
            '.main-content', '.post', 'main', '.container',
            '.post-content p', '.entry-content p', 'article p'
        ];
        
        for (var i = 0; i < selectors.length; i++) {
            var el = document.querySelector(selectors[i]);
            if (el) {
                console.log('✅ Container found with selector:', selectors[i]);
                return el;
            }
        }
        
        console.warn('⚠️ کوئی کنٹینر نہیں ملا، body استعمال ہو رہا ہے');
        return document.body;
    }

    // تمام ٹیکسٹ بلاکس تلاش کریں (نہ صرف <p>)
    function getTextBlocks(container) {
        var blocks = [];
        
        // تمام بلاک عناصر تلاش کریں
        var elements = container.querySelectorAll('p, div, section, article, .post-content, .entry-content');
        
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            // اگر عنصر میں ٹیکسٹ ہے اور وہ خالی نہیں
            var text = el.textContent.trim();
            if (text.length > 50 && !el.querySelector('.smart-banner')) {
                blocks.push(el);
            }
        }
        
        // اگر کوئی بلاک نہ ملا تو تمام چائلڈ نوڈز چیک کریں
        if (blocks.length === 0) {
            var children = container.children;
            for (var j = 0; j < children.length; j++) {
                var child = children[j];
                var text = child.textContent.trim();
                if (text.length > 50 && !child.querySelector('.smart-banner')) {
                    blocks.push(child);
                }
            }
        }
        
        return blocks;
    }

    // بینرز داخل کریں
    function insertBannersInContent() {
        console.log('🔄 insertBannersInContent() started...');
        
        var container = getContentContainer();
        if (!container) {
            console.warn('⚠️ مواد کا کنٹینر نہیں ملا');
            return;
        }

        // تمام ممکنہ ٹیکسٹ بلاکس تلاش کریں
        var blocks = getTextBlocks(container);
        console.log('📝 Total text blocks found:', blocks.length);

        if (blocks.length < 3) {
            console.log('ℹ️ بہت کم ٹیکسٹ بلاکس (کم از کم 3 درکار ہیں)');
            return;
        }

        var relatedPosts = getRelatedPosts(3);
        console.log('📚 Related posts to show:', relatedPosts.length);

        if (relatedPosts.length === 0) {
            console.log('ℹ️ کوئی متعلقہ پوسٹ نہیں ملی');
            return;
        }

        var bannerCount = Math.min(relatedPosts.length, 3);
        var selectedPosts = relatedPosts.slice(0, bannerCount);

        var totalBlocks = blocks.length;
        var positions = [
            Math.floor(totalBlocks * 0.2),
            Math.floor(totalBlocks * 0.5),
            Math.floor(totalBlocks * 0.8)
        ];
        
        positions = positions.slice(0, bannerCount);
        console.log('📌 Banner positions:', positions);

        var bannersAdded = 0;
        for (var i = bannerCount - 1; i >= 0; i--) {
            var pos = positions[i];
            if (pos !== undefined && pos < blocks.length) {
                var block = blocks[pos];
                var bannerHtml = createSmartBanner(selectedPosts[i], i);
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = bannerHtml;
                var bannerNode = tempDiv.firstElementChild;
                
                if (bannerNode) {
                    var parent = block.parentNode;
                    var nextSibling = block.nextSibling;
                    if (nextSibling) {
                        parent.insertBefore(bannerNode, nextSibling);
                    } else {
                        parent.appendChild(bannerNode);
                    }
                    bannersAdded++;
                    console.log('✅ Banner ' + (i+1) + ' added at position ' + pos);
                }
            }
        }

        console.log('✅ ' + bannersAdded + ' سمارٹ بینرز شامل کیے گئے');
        
        if (bannersAdded === 0) {
            console.warn('⚠️ کوئی بینر شامل نہیں ہو سکا۔ پوسٹ کا ڈھانچہ چیک کریں۔');
        }
    }

    // بینرز ڈالنے کا فنکشن
    function initBanners() {
        setTimeout(function() {
            insertBannersInContent();
        }, 1000);
    }

    // صفحہ لوڈ ہونے پر چلائیں
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBanners);
    } else {
        initBanners();
    }

    // مکمل لوڈ ہونے کے بعد دوبارہ چیک کریں
    window.addEventListener('load', function() {
        setTimeout(insertBannersInContent, 2000);
    });

    console.log('🔗 Smart Banner System Started with ' + allUrls.length + ' URLs');

})();
