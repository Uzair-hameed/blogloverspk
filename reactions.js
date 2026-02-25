// reactions.js - بلوگرز ڈاٹ پی کے (فائنل)
(function() {
    'use strict';
    
    if (document.getElementById('reactions-final')) return;
    
    // ========== یہ ہے آپ کا صحیح Worker URL ==========
    const API_URL = 'https://aged-unit-8ce7.uzairhameed01.workers.dev';
    
    const pageId = window.location.pathname.replace(/\//g, '-');
    
    let reactions = { 
        '👍': 0, 
        '❤️': 0, 
        '😊': 0, 
        '😢': 0, 
        '🤔': 0 
    };
    
    // Cloudflare D1 سے ڈیٹا لوڈ کریں
    async function loadReactions() {
        try {
            const response = await fetch(`${API_URL}?pageId=${pageId}`);
            if (response.ok) {
                reactions = await response.json();
                updateDisplay();
            }
        } catch (e) {
            console.log('Load error:', e);
        }
    }
    
    // Reaction شامل کریں
    window.addReaction = async function(emoji) {
        reactions[emoji] = (reactions[emoji] || 0) + 1;
        updateDisplay();
        
        // Cloudflare میں محفوظ کریں
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pageId, emoji })
        });
        
        // اینیمیشن
        const btn = event.currentTarget;
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
    };
    
    // ڈسپلے اپ ڈیٹ کریں
    function updateDisplay() {
        ['👍','❤️','😊','😢','🤔'].forEach(emoji => {
            const el = document.getElementById('count-' + emoji);
            if (el) el.innerText = reactions[emoji];
        });
    }
    
    // کیٹگری کا نام (اردو میں)
    const category = window.location.pathname.split('/')[1] || '';
    const categoryNames = {
        'alamaat-kubra': 'علامات کبری',
        'alamaat-sughra': 'علامات صغری',
        'aqwal': 'اقوال',
        'azkar': 'اذکار',
        'islami-sawalat': 'اسلامی سوالات',
        'islami-taleemat': 'اسلامی تعلیمات',
        'kids': 'بچوں کی دنیا',
        'english-adab': 'انگریزی ادب'
    };
    const catName = categoryNames[category] || category.replace(/-/g, ' ');
    
    // HTML
    const html = `
        <div id="reactions-final" style="margin:40px auto; padding:30px; background:white; border-radius:30px; direction:rtl; max-width:900px; box-shadow:0 10px 30px rgba(0,0,0,0.1); font-family:'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', sans-serif;">
            
            <!-- نیویگیشن بٹن -->
            <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-bottom:30px;">
                <a href="https://bloglovers.pk/" style="background:#4f46e5; color:white; padding:8px 20px; border-radius:40px; text-decoration:none;">🏠 مرکزی صفحہ</a>
                <a href="https://bloglovers.pk/category-pages" style="background:#7c3aed; color:white; padding:8px 20px; border-radius:40px; text-decoration:none;">📚 تمام اقسام</a>
                ${category ? `<a href="https://bloglovers.pk/${category}" style="background:#059669; color:white; padding:8px 20px; border-radius:40px; text-decoration:none;">📂 ${catName}</a>` : ''}
                <button onclick="window.scrollTo({top:0,behavior:'smooth'})" style="background:#b45309; color:white; padding:8px 20px; border-radius:40px; border:none; cursor:pointer;">⬆️ اوپر</button>
                <button onclick="window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})" style="background:#4b5563; color:white; padding:8px 20px; border-radius:40px; border:none; cursor:pointer;">⬇️ نیچے</button>
            </div>
            
            <!-- Reactions ہیڈر -->
            <h3 style="text-align:center; font-size:28px; margin-bottom:25px;">
                <span style="display:block; font-size:42px; margin-bottom:5px;">😊</span>
                اس تحریر پر اپنا ردعمل دیں
            </h3>
            
            <!-- Reactions گرڈ -->
            <div style="display:grid; grid-template-columns:repeat(5,1fr); gap:10px; margin-bottom:25px;">
                <!-- 👍 عمدہ -->
                <div style="text-align:center;">
                    <button onclick="addReaction('👍')" style="background:white; border:2px solid #e2e8f0; border-radius:60px; padding:12px 5px; cursor:pointer; width:100%;">
                        <div style="font-size:32px;">👍</div>
                        <div style="color:#2563eb; font-size:14px; margin:5px 0;">عمدہ</div>
                        <div id="count-👍" style="background:#2563eb; color:white; padding:2px 10px; border-radius:20px; font-size:14px;">0</div>
                    </button>
                </div>
                <!-- ❤️ دلچسپ -->
                <div style="text-align:center;">
                    <button onclick="addReaction('❤️')" style="background:white; border:2px solid #e2e8f0; border-radius:60px; padding:12px 5px; cursor:pointer; width:100%;">
                        <div style="font-size:32px;">❤️</div>
                        <div style="color:#dc2626; font-size:14px; margin:5px 0;">دلچسپ</div>
                        <div id="count-❤️" style="background:#dc2626; color:white; padding:2px 10px; border-radius:20px; font-size:14px;">0</div>
                    </button>
                </div>
                <!-- 😊 مفید -->
                <div style="text-align:center;">
                    <button onclick="addReaction('😊')" style="background:white; border:2px solid #e2e8f0; border-radius:60px; padding:12px 5px; cursor:pointer; width:100%;">
                        <div style="font-size:32px;">😊</div>
                        <div style="color:#f59e0b; font-size:14px; margin:5px 0;">مفید</div>
                        <div id="count-😊" style="background:#f59e0b; color:white; padding:2px 10px; border-radius:20px; font-size:14px;">0</div>
                    </button>
                </div>
                <!-- 😢 قابل غور -->
                <div style="text-align:center;">
                    <button onclick="addReaction('😢')" style="background:white; border:2px solid #e2e8f0; border-radius:60px; padding:12px 5px; cursor:pointer; width:100%;">
                        <div style="font-size:32px;">😢</div>
                        <div style="color:#6b7280; font-size:14px; margin:5px 0;">قابل غور</div>
                        <div id="count-😢" style="background:#6b7280; color:white; padding:2px 10px; border-radius:20px; font-size:14px;">0</div>
                    </button>
                </div>
                <!-- 🤔 سوچ بچار -->
                <div style="text-align:center;">
                    <button onclick="addReaction('🤔')" style="background:white; border:2px solid #e2e8f0; border-radius:60px; padding:12px 5px; cursor:pointer; width:100%;">
                        <div style="font-size:32px;">🤔</div>
                        <div style="color:#8b5cf6; font-size:14px; margin:5px 0;">سوچ بچار</div>
                        <div id="count-🤔" style="background:#8b5cf6; color:white; padding:2px 10px; border-radius:20px; font-size:14px;">0</div>
                    </button>
                </div>
            </div>
            
            <!-- سوشل میڈیا -->
            <div style="background:#f1f5f9; border-radius:30px; padding:20px;">
                <h4 style="text-align:center; font-size:20px; color:#334155; margin-bottom:15px;">📱 سوشل میڈیا پر شیئر کریں</h4>
                <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" style="background:#1877f2; color:white; width:45px; height:45px; border-radius:25px; display:flex; align-items:center; justify-content:center; text-decoration:none; font-size:24px;">📘</a>
                    <a href="https://wa.me/?text=${encodeURIComponent(document.title + ' ' + window.location.href)}" target="_blank" style="background:#25D366; color:white; width:45px; height:45px; border-radius:25px; display:flex; align-items:center; justify-content:center; text-decoration:none; font-size:24px;">📱</a>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}" target="_blank" style="background:#1DA1F2; color:white; width:45px; height:45px; border-radius:25px; display:flex; align-items:center; justify-content:center; text-decoration:none; font-size:24px;">🐦</a>
                    <button onclick="navigator.clipboard.writeText(window.location.href).then(() => alert('✅ لنک کاپی ہو گیا'))" style="background:#6c757d; color:white; width:45px; height:45px; border-radius:25px; border:none; cursor:pointer; font-size:24px;">🔗</button>
                </div>
            </div>
            
            <!-- فوٹر -->
            <div style="text-align:center; margin-top:20px; padding-top:15px; border-top:2px dashed #e2e8f0; color:#94a3b8; font-size:12px;">
                ☁️ Cloudflare D1 میں محفوظ - آپ کی ڈومین پر
            </div>
            
            <style>
                button:hover, a:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                @media (max-width:640px) {
                    div[style*="grid-template-columns: repeat(5,1fr)"] {
                        grid-template-columns: repeat(2,1fr) !important;
                    }
                }
            </style>
        </div>
    `;
    
    // صفحہ میں شامل کریں
    const target = document.querySelector('article') || 
                   document.querySelector('.post-content') || 
                   document.querySelector('.entry-content') ||
                   document.querySelector('main') ||
                   document.body;
    
    if (target) {
        target.insertAdjacentHTML('beforeend', html);
        loadReactions();
        console.log('✅ Reactions loaded');
    }
    
})();
