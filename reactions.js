// reactions.js - بلوگرز ڈاٹ پی کے (مکمل ورژن)
(function() {
    'use strict';
    
    if (document.getElementById('cf-reactions')) return;
    
    const pageId = window.location.pathname.replace(/\//g, '-');
    // 🔁 آپ کا Cloudflare Worker URL (یہ صحیح ہے)
    const API_URL = 'https://aged-unit-8ce7.uzairhameed01.workers.dev';
    
    let reactions = { 
        '👍': 0, 
        '❤️': 0, 
        '😊': 0, 
        '😢': 0, 
        '🤔': 0 
    };
    
    // Cloudflare D1 سے ڈیٹا لوڈ
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
    
    window.addReaction = async function(emoji) {
        reactions[emoji] = (reactions[emoji] || 0) + 1;
        
        // Cloudflare D1 میں محفوظ
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pageId, emoji })
        });
        
        document.getElementById('count-' + emoji).innerText = reactions[emoji];
        
        // Animation
        const btn = event.currentTarget;
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
    };
    
    function updateDisplay() {
        ['👍','❤️','😊','😢','🤔'].forEach(emoji => {
            const el = document.getElementById('count-' + emoji);
            if (el) el.innerText = reactions[emoji];
        });
    }
    
    // ========== CATEGORY NAMES (اردو میں) ==========
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(p => p);
    const currentCategory = pathParts[0] || '';
    
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
    
    const categoryName = categoryNames[currentCategory] || currentCategory.replace(/-/g, ' ');
    
    // HTML (اردو Reactions + نیویگیشن + سوشل میڈیا)
    const html = `
        <div id="cf-reactions" style="margin:40px auto; padding:25px; background:linear-gradient(145deg, #ffffff, #f8fafc); border-radius:40px; box-shadow:0 20px 40px rgba(0,0,0,0.08); direction:rtl; max-width:900px; font-family:'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', sans-serif;">
            
            <!-- نیویگیشن بٹنز -->
            <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-bottom:25px;">
                <a href="https://bloglovers.pk/" style="background:#4f46e5; color:white; padding:6px 18px; border-radius:40px; text-decoration:none;">🏠 مرکزی صفحہ</a>
                <a href="https://bloglovers.pk/category-pages" style="background:#7c3aed; color:white; padding:6px 18px; border-radius:40px; text-decoration:none;">📚 تمام اقسام</a>
                ${currentCategory ? `<a href="https://bloglovers.pk/${currentCategory}" style="background:#059669; color:white; padding:6px 18px; border-radius:40px; text-decoration:none;">📂 ${categoryName}</a>` : ''}
                <button onclick="window.scrollTo({top:0,behavior:'smooth'})" style="background:#b45309; color:white; padding:6px 18px; border-radius:40px; border:none; cursor:pointer;">⬆️ اوپر</button>
                <button onclick="window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})" style="background:#4b5563; color:white; padding:6px 18px; border-radius:40px; border:none; cursor:pointer;">⬇️ نیچے</button>
            </div>
            
            <!-- Reactions ہیڈر -->
            <h3 style="text-align:center; font-size:28px; color:#1e293b; margin-bottom:25px;">
                <span style="display:block; font-size:42px; margin-bottom:5px;">😊</span>
                اس تحریر پر اپنا ردعمل دیں
            </h3>
            
            <!-- Reactions Grid (5 Reactions) -->
            <div style="display:grid; grid-template-columns:repeat(5,1fr); gap:10px; margin-bottom:25px;">
                
                <!-- عمدہ -->
                <div style="text-align:center;">
                    <button onclick="addReaction('👍')" style="background:white; border:2px solid #e2e8f0; border-radius:60px; padding:12px 5px; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:5px; width:100%;">
                        <span style="font-size:28px;">👍</span>
                        <span style="color:#2563eb; font-size:16px;">عمدہ</span>
                        <span id="count-👍" style="background:#2563eb; color:white; padding:2px 10px; border-radius:20px; font-size:14px;">0</span>
                    </button>
                </div>
                
                <!-- دلچسپ -->
                <div style="text-align:center;">
                    <button onclick="addReaction('❤️')" style="background:white; border:2px solid #e2e8f0; border-radius:60px; padding:12px 5px; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:5px; width:100%;">
                        <span style="font-size:28px;">❤️</span>
                        <span style="color:#dc2626; font-size:16px;">دلچسپ</span>
                        <span id="count-❤️" style="background:#dc2626; color:white; padding:2px 10px; border-radius:20px; font-size:14px;">0</span>
                    </button>
                </div>
                
                <!-- مفید -->
                <div style="text-align:center;">
                    <button onclick="addReaction('😊')" style="background:white; border:2px solid #e2e8f0; border-radius:60px; padding:12px 5px; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:5px; width:100%;">
                        <span style="font-size:28px;">😊</span>
                        <span style="color:#f59e0b; font-size:16px;">مفید</span>
                        <span id="count-😊" style="background:#f59e0b; color:white; padding:2px 10px; border-radius:20px; font-size:14px;">0</span>
                    </button>
                </div>
                
                <!-- قابل غور -->
                <div style="text-align:center;">
                    <button onclick="addReaction('😢')" style="background:white; border:2px solid #e2e8f0; border-radius:60px; padding:12px 5px; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:5px; width:100%;">
                        <span style="font-size:28px;">😢</span>
                        <span style="color:#6b7280; font-size:16px;">قابل غور</span>
                        <span id="count-😢" style="background:#6b7280; color:white; padding:2px 10px; border-radius:20px; font-size:14px;">0</span>
                    </button>
                </div>
                
                <!-- سوچ بچار -->
                <div style="text-align:center;">
                    <button onclick="addReaction('🤔')" style="background:white; border:2px solid #e2e8f0; border-radius:60px; padding:12px 5px; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:5px; width:100%;">
                        <span style="font-size:28px;">🤔</span>
                        <span style="color:#8b5cf6; font-size:16px;">سوچ بچار</span>
                        <span id="count-🤔" style="background:#8b5cf6; color:white; padding:2px 10px; border-radius:20px; font-size:14px;">0</span>
                    </button>
                </div>
            </div>
            
            <!-- سوشل میڈیا شیئر بٹنز -->
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
            <div style="text-align:center; margin-top:20px; padding-top:15px; border-top:2px dashed #e2e8f0; color:#94a3b8; font-size:13px;">
                <span>☁️ Cloudflare D1 میں محفوظ - آپ کی ڈومین پر</span>
            </div>
            
            <style>
                button:hover, a:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                @media (max-width: 640px) {
                    div[style*="grid-template-columns: repeat(5, 1fr)"] {
                        grid-template-columns: repeat(2, 1fr) !important;
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
        loadReactions(); // Cloudflare D1 سے ڈیٹا لوڈ
    }
    
})();
