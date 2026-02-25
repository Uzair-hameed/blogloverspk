// reactions.js - بلوگرز ڈاٹ پی کے (شفاف ورژن)
(function() {
    'use strict';
    
    if (document.getElementById('reactions-transparent')) return;
    
    // ========== CONFIG ==========
   const API_URL = '//aged-unit-8ce7.uzairhameed01.workers.dev';
    const pageId = window.location.pathname.replace(/\//g, '-');
    
    let reactions = { 
        '👍': 0, 
        '❤️': 0, 
        '😊': 0, 
        '😢': 0, 
        '🤔': 0 
    };
    
    // ========== LOAD REACTIONS ==========
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
    
    // ========== ADD REACTION ==========
    window.addReaction = async function(emoji) {
        reactions[emoji] = (reactions[emoji] || 0) + 1;
        updateDisplay();
        
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pageId, emoji })
        });
        
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
    
    // ========== CATEGORY ==========
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
    
    // ========== HTML (شفاف) ==========
    const html = `
        <div id="reactions-transparent" style="margin:40px auto; padding:20px; background:transparent; direction:rtl; max-width:900px; font-family:'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', sans-serif;">
            
            <!-- نیویگیشن (شفاف) -->
            <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-bottom:30px;">
                <a href="https://bloglovers.pk/" style="background:rgba(79,70,229,0.1); color:#4f46e5; padding:8px 20px; border-radius:40px; text-decoration:none; backdrop-filter:blur(5px); border:1px solid rgba(79,70,229,0.2);">🏠 مرکزی صفحہ</a>
                
                <a href="https://bloglovers.pk/category-pages" style="background:rgba(124,58,237,0.1); color:#7c3aed; padding:8px 20px; border-radius:40px; text-decoration:none; backdrop-filter:blur(5px); border:1px solid rgba(124,58,237,0.2);">📚 تمام اقسام</a>
                
                ${category ? `<a href="https://bloglovers.pk/${category}" style="background:rgba(5,150,105,0.1); color:#059669; padding:8px 20px; border-radius:40px; text-decoration:none; backdrop-filter:blur(5px); border:1px solid rgba(5,150,105,0.2);">📂 ${catName}</a>` : ''}
                
                <button onclick="window.scrollTo({top:0,behavior:'smooth'})" style="background:rgba(180,83,9,0.1); color:#b45309; padding:8px 20px; border-radius:40px; border:1px solid rgba(180,83,9,0.2); cursor:pointer; backdrop-filter:blur(5px);">⬆️ اوپر</button>
                
                <button onclick="window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})" style="background:rgba(75,85,99,0.1); color:#4b5563; padding:8px 20px; border-radius:40px; border:1px solid rgba(75,85,99,0.2); cursor:pointer; backdrop-filter:blur(5px);">⬇️ نیچے</button>
            </div>
            
            <!-- Reactions Header (شفاف) -->
            <h3 style="text-align:center; font-size:28px; color:#1e293b; margin-bottom:25px; text-shadow:0 2px 4px rgba(0,0,0,0.1);">
                <span style="display:block; font-size:42px; margin-bottom:5px; filter:drop-shadow(0 4px 4px rgba(0,0,0,0.1));">😊</span>
                اس تحریر پر اپنا ردعمل دیں
            </h3>
            
            <!-- Reactions Grid (شفاف) -->
            <div style="display:grid; grid-template-columns:repeat(5,1fr); gap:10px; margin-bottom:25px;">
                
                <!-- عمدہ -->
                <div style="text-align:center;">
                    <button onclick="addReaction('👍')" style="background:rgba(37,99,235,0.05); border:1px solid rgba(37,99,235,0.2); border-radius:60px; padding:12px 5px; cursor:pointer; width:100%; backdrop-filter:blur(5px); transition:all 0.2s;">
                        <div style="font-size:32px; filter:drop-shadow(0 4px 4px rgba(0,0,0,0.1));">👍</div>
                        <div style="color:#2563eb; font-size:16px; margin:5px 0; text-shadow:0 1px 2px rgba(37,99,235,0.2);">عمدہ</div>
                        <div id="count-👍" style="background:rgba(37,99,235,0.8); color:white; padding:2px 10px; border-radius:20px; font-size:14px; backdrop-filter:blur(5px);">0</div>
                    </button>
                </div>
                
                <!-- دلچسپ -->
                <div style="text-align:center;">
                    <button onclick="addReaction('❤️')" style="background:rgba(220,38,38,0.05); border:1px solid rgba(220,38,38,0.2); border-radius:60px; padding:12px 5px; cursor:pointer; width:100%; backdrop-filter:blur(5px);">
                        <div style="font-size:32px;">❤️</div>
                        <div style="color:#dc2626; font-size:16px; margin:5px 0;">دلچسپ</div>
                        <div id="count-❤️" style="background:rgba(220,38,38,0.8); color:white; padding:2px 10px; border-radius:20px; font-size:14px;">0</div>
                    </button>
                </div>
                
                <!-- مفید -->
                <div style="text-align:center;">
                    <button onclick="addReaction('😊')" style="background:rgba(245,158,11,0.05); border:1px solid rgba(245,158,11,0.2); border-radius:60px; padding:12px 5px; cursor:pointer; width:100%; backdrop-filter:blur(5px);">
                        <div style="font-size:32px;">😊</div>
                        <div style="color:#f59e0b; font-size:16px; margin:5px 0;">مفید</div>
                        <div id="count-😊" style="background:rgba(245,158,11,0.8); color:white; padding:2px 10px; border-radius:20px; font-size:14px;">0</div>
                    </button>
                </div>
                
                <!-- قابل غور -->
                <div style="text-align:center;">
                    <button onclick="addReaction('😢')" style="background:rgba(107,114,128,0.05); border:1px solid rgba(107,114,128,0.2); border-radius:60px; padding:12px 5px; cursor:pointer; width:100%; backdrop-filter:blur(5px);">
                        <div style="font-size:32px;">😢</div>
                        <div style="color:#6b7280; font-size:16px; margin:5px 0;">قابل غور</div>
                        <div id="count-😢" style="background:rgba(107,114,128,0.8); color:white; padding:2px 10px; border-radius:20px; font-size:14px;">0</div>
                    </button>
                </div>
                
                <!-- سوچ بچار -->
                <div style="text-align:center;">
                    <button onclick="addReaction('🤔')" style="background:rgba(139,92,246,0.05); border:1px solid rgba(139,92,246,0.2); border-radius:60px; padding:12px 5px; cursor:pointer; width:100%; backdrop-filter:blur(5px);">
                        <div style="font-size:32px;">🤔</div>
                        <div style="color:#8b5cf6; font-size:16px; margin:5px 0;">سوچ بچار</div>
                        <div id="count-🤔" style="background:rgba(139,92,246,0.8); color:white; padding:2px 10px; border-radius:20px; font-size:14px;">0</div>
                    </button>
                </div>
            </div>
            
            <!-- سوشل میڈیا (شفاف) -->
            <div style="background:rgba(241,245,249,0.5); border-radius:30px; padding:20px; backdrop-filter:blur(10px); border:1px solid rgba(203,213,225,0.3);">
                <h4 style="text-align:center; font-size:20px; color:#334155; margin-bottom:15px;">📱 سوشل میڈیا پر شیئر کریں</h4>
                <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" style="background:rgba(24,119,242,0.8); color:white; width:45px; height:45px; border-radius:25px; display:flex; align-items:center; justify-content:center; text-decoration:none; font-size:24px; backdrop-filter:blur(5px);">📘</a>
                    <a href="https://wa.me/?text=${encodeURIComponent(document.title + ' ' + window.location.href)}" target="_blank" style="background:rgba(37,211,102,0.8); color:white; width:45px; height:45px; border-radius:25px; display:flex; align-items:center; justify-content:center; text-decoration:none; font-size:24px; backdrop-filter:blur(5px);">📱</a>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}" target="_blank" style="background:rgba(29,161,242,0.8); color:white; width:45px; height:45px; border-radius:25px; display:flex; align-items:center; justify-content:center; text-decoration:none; font-size:24px; backdrop-filter:blur(5px);">🐦</a>
                    <button onclick="navigator.clipboard.writeText(window.location.href).then(() => alert('✅ لنک کاپی ہو گیا'))" style="background:rgba(107,114,128,0.8); color:white; width:45px; height:45px; border-radius:25px; border:none; cursor:pointer; font-size:24px; backdrop-filter:blur(5px);">🔗</button>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align:center; margin-top:20px; padding-top:15px; border-top:1px dashed rgba(100,116,139,0.3); color:#64748b; font-size:12px;">
                ☁️ Cloudflare D1 میں محفوظ - شفاف ڈیزائن
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
    
    // ========== PAGE KE AAKHIR MEIN ADD KAREN ==========
    document.body.insertAdjacentHTML('beforeend', html);
    loadReactions();
    
})();
