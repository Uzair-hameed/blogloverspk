// auto-interlink.js - سمارٹ بینر انٹرلنکس (h1,h2,h3 ورژن)

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
            '.main-content', '.post', 'main', '.container'
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

    // h1, h2, h3 ہیڈنگز تلاش کریں
    function getHeadings(container) {
        var headings = [];
        
        // تمام h1, h2, h3, h4, h5, h6 تلاش کریں
        var elements = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var text = el.textContent.trim();
            // اگر ہیڈنگ خالی نہیں اور اس میں پہلے سے بینر نہیں ہے
            if (text.length > 0 && !el.querySelector('.smart-banner')) {
                headings.push(el);
            }
        }
        
        // اگر کوئی ہیڈنگ نہ ملا تو تمام بلاک عناصر چیک کریں
        if (headings.length === 0) {
            var blocks = container.querySelectorAll('p, div, section, article');
            for (var j = 0; j < blocks.length; j++) {
                var block = blocks[j];
                var text = block.textContent.trim();
                if (text.length > 30 && !block.querySelector('.smart-banner')) {
                    headings.push(block);
                }
            }
        }
        
        return headings;
    }

    // بینرز داخل کریں
    function insertBannersInContent() {
        console.log('🔄 insertBannersInContent() started...');
        
        var container = getContentContainer();
        if (!container) {
            console.warn('⚠️ مواد کا کنٹینر نہیں ملا');
            return;
        }

        // ہیڈنگز تلاش کریں
        var headings = getHeadings(container);
        console.log('📝 Total headings/blocks found:', headings.length);

        if (headings.length < 2) {
            console.log('ℹ️ بہت کم ہیڈنگز (کم از کم 2 درکار ہیں)');
            // اگر کوئی ہیڈنگ نہیں تو پھر بھی کوشش کریں
            if (headings.length === 0) {
                // تمام بچوں کو چیک کریں
                var children = container.children;
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    var text = child.textContent.trim();
                    if (text.length > 30) {
                        headings.push(child);
                    }
                }
                console.log('📝 After fallback, total blocks:', headings.length);
            }
            
            if (headings.length < 2) {
                return;
            }
        }

        var relatedPosts = getRelatedPosts(3);
        console.log('📚 Related posts to show:', relatedPosts.length);

        if (relatedPosts.length === 0) {
            console.log('ℹ️ کوئی متعلقہ پوسٹ نہیں ملی');
            return;
        }

        var bannerCount = Math.min(relatedPosts.length, 3);
        var selectedPosts = relatedPosts.slice(0, bannerCount);

        var totalHeadings = headings.length;
        
        // پوزیشنز: پہلی ہیڈنگ کے بعد، درمیان میں، آخری کے قریب
        var positions = [];
        if (totalHeadings >= 3) {
            positions = [
                Math.floor(totalHeadings * 0.2),
                Math.floor(totalHeadings * 0.5),
                Math.floor(totalHeadings * 0.8)
            ];
        } else if (totalHeadings === 2) {
            positions = [0, 1];
        } else {
            positions = [0];
        }
        
        positions = positions.slice(0, bannerCount);
        console.log('📌 Banner positions (heading indexes):', positions);

        var bannersAdded = 0;
        for (var i = bannerCount - 1; i >= 0; i--) {
            var pos = positions[i];
            if (pos !== undefined && pos < headings.length) {
                var heading = headings[pos];
                var bannerHtml = createSmartBanner(selectedPosts[i], i);
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = bannerHtml;
                var bannerNode = tempDiv.firstElementChild;
                
                if (bannerNode) {
                    var parent = heading.parentNode;
                    var nextSibling = heading.nextSibling;
                    if (nextSibling) {
                        parent.insertBefore(bannerNode, nextSibling);
                    } else {
                        parent.appendChild(bannerNode);
                    }
                    bannersAdded++;
                    console.log('✅ Banner ' + (i+1) + ' added after heading #' + (pos+1));
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
