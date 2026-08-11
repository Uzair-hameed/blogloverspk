// ============================================================
// auto-interlink.js - سمارٹ بینر انٹرلنکس (تمام پوسٹس کے لیے)
// ورژن: 4.1 - فیچر 2026
// ============================================================

(function() {
    'use strict';

    console.log('🔍 Auto-Interlink System Starting...');

    // ============================================================
    // 1. ڈیٹا چیک کریں
    // ============================================================
    var allUrls = typeof interlinkData !== 'undefined' ? interlinkData : [];
    console.log('📊 Total URLs loaded:', allUrls.length);

    if (allUrls.length === 0) {
        console.warn('⚠️ کوئی URL نہیں ملا! براہ کرم interlink-data.js چیک کریں۔');
        return;
    }

    var currentPageUrl = window.location.href.split('#')[0].split('?')[0];
    console.log('📄 Current Page:', currentPageUrl);

    // ============================================================
    // 2. صرف پوسٹ پیج چیک کریں
    // ============================================================
    var isPostPage = false;
    var path = window.location.pathname;

    if (path === '/' || path === '/index.html' || path === '') {
        console.log('ℹ️ ہوم پیج ہے، بینرز نظر انداز کیے گئے');
        return;
    }

    if (path.indexOf('/category-pages/') !== -1) {
        console.log('ℹ️ کیٹگری پیج ہے، بینرز نظر انداز کیے گئے');
        return;
    }

    var postPatterns = [
        '/alamaat-sughra/', '/alamaat-kubra/', '/islami-taleemat/',
        '/azkar/', '/taleem/', '/mazameen/', '/english-adab/',
        '/technology/', '/kids/', '/aqwal/', '/islami-sawalat/',
        '/motivation/', '/tareekh/', '/shakhsiyat/'
    ];

    for (var p = 0; p < postPatterns.length; p++) {
        if (path.indexOf(postPatterns[p]) !== -1) {
            isPostPage = true;
            break;
        }
    }

    if (!isPostPage) {
        console.log('ℹ️ یہ پوسٹ پیج نہیں ہے، بینرز نظر انداز کیے گئے');
        return;
    }

    console.log('✅ یہ پوسٹ پیج ہے، بینرز شامل کیے جا رہے ہیں');

    // ============================================================
    // 3. ہیلپر فنکشنز
    // ============================================================

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

    function getImageFromUrl(url) {
        try {
            var path = url.replace('https://bloglovers.pk/', '');
            return 'https://bloglovers.pk/images/' + path + '.png';
        } catch(e) {
            return '';
        }
    }

    function getPostData(url) {
        for (var i = 0; i < allUrls.length; i++) {
            if (allUrls[i].url === url) {
                return allUrls[i];
            }
        }
        return null;
    }

    // ============================================================
    // 4. متعلقہ پوسٹس
    // ============================================================
    function getRelatedPosts(count) {
        count = count || 3;
        var currentPath = window.location.pathname;
        var parts = currentPath.split('/');
        var category = parts.length > 1 ? parts[1] : '';
        console.log('📁 Current Category:', category);

        var related = [];
        for (var i = 0; i < allUrls.length; i++) {
            var item = allUrls[i];
            var url = item.url || item;
            if (url.indexOf('/' + category + '/') !== -1 && url !== currentPageUrl && url !== currentPath) {
                related.push(url);
            }
        }

        console.log('🔗 Related Posts Found:', related.length);
        
        for (var j = related.length - 1; j > 0; j--) {
            var k = Math.floor(Math.random() * (j + 1));
            var temp = related[j];
            related[j] = related[k];
            related[k] = temp;
        }
        
        return related.slice(0, count);
    }

    // ============================================================
    // 5. کلرز
    // ============================================================
    var colors = [
        '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#17a2b8', 
        '#6f42c1', '#e83e8c', '#20c997', '#6610f2', '#d63384',
        '#ff6b6b', '#ffa94d', '#ffd93d', '#6bcb77', '#4d96ff',
        '#9b59b6', '#fd79a8', '#00b894', '#6c5ce7', '#e17055'
    ];

    // ============================================================
    // 6. سمارٹ بینر
    // ============================================================
    function createSmartBanner(url, index) {
        var postData = getPostData(url);
        var title = postData ? postData.title : getTitleFromUrl(url);
        var teaser = postData ? postData.teaser : '📖 مزید پڑھیں';
        var imageUrl = getImageFromUrl(url);
        
        var colorIndex = index % colors.length;
        var borderColor = colors[colorIndex];
        var nextColor = colors[(colorIndex + 1) % colors.length];
        
        return '<div class="smart-banner" data-index="' + index + '" style="--banner-color: ' + borderColor + '; --banner-color2: ' + nextColor + ';">' +
            '<a href="' + url + '" class="banner-link">' +
                '<div class="banner-inner">' +
                    '<div class="banner-icon">' +
                        '<img src="' + imageUrl + '" alt="' + title + '" loading="lazy" onerror="this.style.display=\'none\'">' +
                    '</div>' +
                    '<div class="banner-content">' +
                        '<span class="banner-label" style="color: ' + borderColor + ';">📖 تجویز کردہ</span>' +
                        '<span class="banner-title">' + title + '</span>' +
                        '<span class="banner-teaser" style="color: ' + borderColor + ';">' + teaser + '</span>' +
                    '</div>' +
                    '<div class="banner-arrow" style="color: ' + borderColor + ';">' +
                        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                            '<path d="M5 12h14M12 5l7 7-7 7"/>' +
                        '</svg>' +
                    '</div>' +
                '</div>' +
            '</a>' +
        '</div>';
    }

    // ============================================================
    // 7. ✅ کونٹینر تلاش کریں - آپ کی پوسٹ کے مطابق
    // ============================================================
    function getContentContainer() {
        // ✅ آپ کی پوسٹ میں .post-content کلاس ہے
        var container = document.querySelector('.post-content');
        if (container) {
            console.log('✅ Container found: .post-content');
            return container;
        }

        // دوسرے آپشنز
        var selectors = [
            '.entry-content', '.article-content', '.blog-post', 
            'article', '.content', '.post-body', '.main-content',
            '#mainPostContent'
        ];
        
        for (var i = 0; i < selectors.length; i++) {
            var el = document.querySelector(selectors[i]);
            if (el) {
                console.log('✅ Container found with selector:', selectors[i]);
                return el;
            }
        }
        
        console.warn('⚠️ کوئی خاص کنٹینر نہیں ملا، body استعمال ہو رہا ہے');
        return document.body;
    }

    // ============================================================
    // 8. ٹیکسٹ بلاکس
    // ============================================================
    function getTextBlocks(container) {
        var blocks = [];
        var elements = container.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
        
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var text = el.textContent.trim();
            if (text.length > 15 && !el.querySelector('.smart-banner')) {
                blocks.push(el);
            }
        }
        
        if (blocks.length === 0) {
            var children = container.children;
            for (var j = 0; j < children.length; j++) {
                var child = children[j];
                var text = child.textContent.trim();
                if (text.length > 20 && !child.querySelector('.smart-banner')) {
                    blocks.push(child);
                }
            }
        }
        
        console.log('📝 Total text blocks found:', blocks.length);
        return blocks;
    }

    // ============================================================
    // 9. بینرز داخل کریں
    // ============================================================
    function insertBannersInContent() {
        console.log('🔄 insertBannersInContent() started...');
        
        var container = getContentContainer();
        if (!container) {
            console.warn('⚠️ مواد کا کنٹینر نہیں ملا');
            return;
        }

        var blocks = getTextBlocks(container);
        console.log('📝 Total text blocks found:', blocks.length);

        if (blocks.length < 2) {
            console.log('ℹ️ بہت کم ٹیکسٹ بلاکس (کم از کم 2 درکار ہیں)');
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
        var positions = [];
        
        if (totalBlocks >= 3) {
            positions = [
                Math.floor(totalBlocks * 0.15),
                Math.floor(totalBlocks * 0.5),
                Math.floor(totalBlocks * 0.8)
            ];
        } else if (totalBlocks === 2) {
            positions = [0, 1];
        } else {
            positions = [0];
        }
        
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
            console.warn('⚠️ کوئی بینر شامل نہیں ہو سکا۔');
        }
    }

    // ============================================================
    // 10. انیشیلائزیشن
    // ============================================================
    function initBanners() {
        if (typeof interlinkData === 'undefined') {
            console.log('⏳ interlinkData لوڈ ہو رہا ہے، انتظار کریں...');
            setTimeout(function() {
                if (typeof interlinkData !== 'undefined') {
                    console.log('✅ interlinkData اب دستیاب ہے');
                    allUrls = interlinkData;
                    setTimeout(insertBannersInContent, 1000);
                } else {
                    console.error('❌ interlinkData لوڈ نہیں ہو سکی');
                }
            }, 3000);
            return;
        }
        
        console.log('✅ interlinkData موجود ہے، بینرز شامل کیے جا رہے ہیں');
        setTimeout(insertBannersInContent, 1500);
    }

    // ============================================================
    // 11. شروع کریں
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBanners);
    } else {
        initBanners();
    }

    window.addEventListener('load', function() {
        setTimeout(function() {
            var existingBanners = document.querySelectorAll('.smart-banner');
            if (existingBanners.length === 0) {
                console.log('🔄 کوئی بینر نہیں ملا، دوبارہ کوشش کر رہے ہیں...');
                insertBannersInContent();
            }
        }, 4000);
    });

    console.log('🔗 Smart Banner System Started with ' + allUrls.length + ' URLs');

})();
