// ============================================================
// auto-interlink.js - انتہائی آسان ورژن
// ============================================================

(function() {
    'use strict';

    console.log('🔍 Auto-Interlink (Simple) Starting...');

    // ============================================================
    // 1. ڈیٹا چیک
    // ============================================================
    if (typeof interlinkData === 'undefined') {
        console.error('❌ interlinkData not found!');
        return;
    }

    console.log('📊 Total URLs:', interlinkData.length);

    // ============================================================
    // 2. صرف پوسٹ پیج چیک
    // ============================================================
    var path = window.location.pathname;
    
    // ہوم پیج چھوڑیں
    if (path === '/' || path === '/index.html' || path === '') {
        console.log('ℹ️ ہوم پیج ہے، بینرز نظر انداز');
        return;
    }

    // کیٹگری پیج چھوڑیں
    if (path.indexOf('/category-pages/') !== -1) {
        console.log('ℹ️ کیٹگری پیج ہے، بینرز نظر انداز');
        return;
    }

    // پوسٹ چیک کریں
    var categories = [
        '/alamaat-sughra/', '/alamaat-kubra/', '/islami-taleemat/',
        '/azkar/', '/taleem/', '/mazameen/', '/english-adab/',
        '/technology/', '/kids/', '/aqwal/', '/islami-sawalat/',
        '/motivation/', '/tareekh/', '/shakhsiyat/'
    ];
    
    var isPost = false;
    for (var i = 0; i < categories.length; i++) {
        if (path.indexOf(categories[i]) !== -1) {
            isPost = true;
            break;
        }
    }

    if (!isPost) {
        console.log('ℹ️ پوسٹ پیج نہیں ہے');
        return;
    }

    console.log('✅ پوسٹ پیج ہے - بینرز شامل کیے جا رہے ہیں');

    // ============================================================
    // 3. متعلقہ پوسٹس
    // ============================================================
    function getRelatedPosts() {
        var category = path.split('/')[1] || '';
        var currentUrl = window.location.href.split('#')[0].split('?')[0];
        var related = [];

        for (var i = 0; i < interlinkData.length; i++) {
            var item = interlinkData[i];
            var url = item.url || item;
            if (url.indexOf('/' + category + '/') !== -1 && url !== currentUrl) {
                related.push(item);
            }
        }

        // تصادفی ترتیب
        for (var j = related.length - 1; j > 0; j--) {
            var k = Math.floor(Math.random() * (j + 1));
            var temp = related[j];
            related[j] = related[k];
            related[k] = temp;
        }

        return related.slice(0, 3);
    }

    // ============================================================
    // 4. بینر بنائیں
    // ============================================================
    function createBanner(post, index) {
        var colors = ['#dc3545', '#fd7e14', '#ffc107'];
        var color = colors[index % colors.length];
        
        return `
        <div class="interlink-banner" style="margin:25px 0;padding:0;border-radius:16px;overflow:hidden;background:transparent;">
            <a href="${post.url}" style="display:block;background:linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));border-radius:16px;padding:16px 20px;border:1px solid rgba(255,255,255,0.08);text-decoration:none;transition:all 0.3s ease;"
               onmouseover="this.style.borderColor='${color}';this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 30px rgba(0,0,0,0.3)'"
               onmouseout="this.style.borderColor='rgba(255,255,255,0.08)';this.style.transform='translateY(0)';this.style.boxShadow='none'">
                <div style="display:flex;align-items:center;gap:15px;">
                    <div style="flex:0 0 45px;width:45px;height:45px;border-radius:12px;background:${color}20;border:2px solid ${color};display:flex;align-items:center;justify-content:center;font-size:20px;">📖</div>
                    <div style="flex:1;min-width:0;">
                        <div style="font-size:11px;color:${color};font-weight:700;text-transform:uppercase;letter-spacing:1px;">✦ تجویز کردہ</div>
                        <div style="font-size:16px;font-weight:700;color:#fff;line-height:1.4;">${post.title}</div>
                        <div style="font-size:13px;color:${color};opacity:0.8;">${post.teaser || 'مزید پڑھیں'}</div>
                    </div>
                    <div style="color:${color};font-size:20px;flex-shrink:0;">›</div>
                </div>
            </a>
        </div>
        `;
    }

    // ============================================================
    // 5. بینرز شامل کریں - بغیر کسی پیچیدگی کے
    // ============================================================
    function insertBanners() {
        console.log('🔄 بینرز شامل کیے جا رہے ہیں...');

        // متعلقہ پوسٹس
        var related = getRelatedPosts();
        console.log('📚 متعلقہ پوسٹس:', related.length);

        if (related.length === 0) {
            console.log('ℹ️ کوئی متعلقہ پوسٹ نہیں ملی');
            return;
        }

        // مواد کا کنٹینر تلاش کریں
        var container = document.querySelector('.post-content, .entry-content, .article-content, .blog-post, article, .content, .post-body, .main-content');
        
        if (!container) {
            console.warn('⚠️ کوئی کنٹینر نہیں ملا، body استعمال ہو رہا ہے');
            container = document.body;
        }

        console.log('✅ کنٹینر ملا:', container.className || container.id || 'body');

        // تمام پیراگراف تلاش کریں
        var paragraphs = container.querySelectorAll('p');
        console.log('📝 کل پیراگراف:', paragraphs.length);

        if (paragraphs.length < 2) {
            console.log('ℹ️ بہت کم پیراگراف (2 سے کم)');
            return;
        }

        // پوزیشنز
        var positions = [];
        if (paragraphs.length >= 3) {
            positions = [
                Math.floor(paragraphs.length * 0.15),
                Math.floor(paragraphs.length * 0.5),
                Math.floor(paragraphs.length * 0.85)
            ];
        } else if (paragraphs.length === 2) {
            positions = [0, 1];
        } else {
            positions = [0];
        }

        console.log('📌 پوزیشنز:', positions);

        var added = 0;
        var maxBanners = Math.min(related.length, 3);

        for (var i = 0; i < maxBanners; i++) {
            var pos = positions[i];
            if (pos !== undefined && pos < paragraphs.length) {
                var p = paragraphs[pos];
                var temp = document.createElement('div');
                temp.innerHTML = createBanner(related[i], i);
                var banner = temp.firstElementChild;
                
                if (banner) {
                    // اگر پہلے سے بینر موجود نہ ہو
                    if (!p.nextSibling || !p.nextSibling.querySelector('.interlink-banner')) {
                        p.parentNode.insertBefore(banner, p.nextSibling);
                        added++;
                        console.log('✅ بینر', i+1, 'شامل ہو گیا (پوزیشن:', pos, ')');
                    }
                }
            }
        }

        console.log('✅ کل', added, 'بینرز شامل کیے گئے');
        
        if (added === 0) {
            console.warn('⚠️ کوئی بینر شامل نہیں ہو سکا');
            // آخری کوشش - آخر میں ڈالیں
            try {
                var lastP = paragraphs[paragraphs.length - 1];
                var temp2 = document.createElement('div');
                temp2.innerHTML = createBanner(related[0], 0);
                var banner2 = temp2.firstElementChild;
                if (banner2) {
                    lastP.parentNode.appendChild(banner2);
                    console.log('✅ بینر آخر میں شامل کر دیا گیا');
                }
            } catch(e) {
                console.error('❌ بینر شامل کرنے میں ناکام:', e);
            }
        }
    }

    // ============================================================
    // 6. شروع کریں
    // ============================================================
    function init() {
        // تھوڑا انتظار کریں
        setTimeout(function() {
            insertBanners();
        }, 2000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // دوبارہ کوشش
    setTimeout(function() {
        var existing = document.querySelectorAll('.interlink-banner');
        if (existing.length === 0) {
            console.log('🔄 دوبارہ کوشش کر رہے ہیں...');
            insertBanners();
        }
    }, 4000);

    console.log('🔗 Auto-Interlink Simple System Started');

})();
