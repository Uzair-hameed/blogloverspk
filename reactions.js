// reactions.js - بلوگرز ڈاٹ پی کے (فائنل)
(function() {
    'use strict';
    
    if (document.getElementById('final-reactions-box')) return;
    
    const pageId = window.location.pathname.replace(/\//g, '-');
    // ✅ آپ کا صحیح Worker URL
    const API_URL = 'https://aged-unit-8ce7.uzairhameed01.workers.dev';
    
    let reactions = { 
        '👍': 0, 
        '❤️': 0, 
        '😊': 0, 
        '😢': 0, 
        '🤔': 0 
    };
    
    // Cloudflare سے ڈیٹا لوڈ
    async function loadReactions() {
        try {
            const response = await fetch(`${API_URL}?pageId=${pageId}`);
            if (response.ok) {
                reactions = await response.json();
                updateCounts();
            }
        } catch (e) {
            console.log('Load error:', e);
        }
    }
    
    window.addReaction = async function(emoji) {
        reactions[emoji] = (reactions[emoji] || 0) + 1;
        updateCounts();
        
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pageId, emoji })
        });
        
        const btn = event.currentTarget;
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
    };
    
    function updateCounts() {
        ['👍','❤️','😊','😢','🤔'].forEach(emoji => {
            const el = document.getElementById(`count-${emoji}`);
            if (el) el.innerText = reactions[emoji];
        });
    }
    
    const currentPath = window.location.pathname;
    const category = currentPath.split('/')[1] || '';
    
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
    
    document.body.insertAdjacentHTML('beforeend', `
        <div id="final-reactions-box" style="margin:40px auto; padding:30px; background:#fff; border-radius:30px; direction:rtl; max-width:900px; box-shadow:0 10px 30px rgba(0,0,0,0.1);">
            <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-bottom:30px;">
                <a href="https://bloglovers.pk/" style="background:#4f46e5; color:#fff; padding:8px 20px; border-radius:40px; text-decoration:none;">🏠 مرکزی صفحہ</a>
                <a href="https://bloglovers.pk/category-pages" style="background:#7c3aed; color:#fff; padding:8px 20px; border-radius:40px; text-decoration:none;">📚 تمام اقسام</a>
                ${category ? `<a href="https://bloglovers.pk/${category}" style="background:#059669; color:#fff; padding:8px 20px; border-radius:40px; text-decoration:none;">📂 ${catName}</a>` : ''}
                <button onclick="window.scrollTo({top:0,behavior:'smooth'})" style="background:#b45309; color:#fff; padding:8px 20px; border-radius:40px; border:none; cursor:pointer;">⬆️ اوپر</button>
                <button onclick="window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})" style="background:#4b5563; color:#fff; padding:8px 20px; border-radius:40px; border:none; cursor:pointer;">⬇️ نیچے</button>
            </div>
            <h3 style="text-align:center; font-size:28px; margin-bottom:30px;"><span style="font-size:42px;">😊</span><br>اس تحریر پر اپنا ردعمل دیں</h3>
            <div style="display:grid; grid-template-columns:repeat(5,1fr); gap:10px; margin-bottom:30px;">
                ${['👍','❤️','😊','😢','🤔'].map((emoji, i) => {
                    const texts = ['عمدہ', 'دلچسپ', 'مفید', 'قابل غور', 'سوچ بچار'];
                    const colors = ['#2563eb', '#dc2626', '#f59e0b', '#6b7280', '#8b5cf6'];
                    return `
                        <div style="text-align:center;">
                            <button onclick="addReaction('${emoji}')" style="background:#fff; border:2px solid #e2e8f0; border-radius:60px; padding:12px 5px; cursor:pointer; width:100%;">
                                <div style="font-size:32px;">${emoji}</div>
                                <div style="color:${colors[i]}; font-size:14px; margin:5px 0;">${texts[i]}</div>
                                <div id="count-${emoji}" style="background:${colors[i]}; color:#fff; padding:2px 10px; border-radius:20px; font-size:14px;">0</div>
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>
            <div style="background:#f1f5f9; border-radius:30px; padding:20px;">
                <h4 style="text-align:center; font-size:20px; margin-bottom:15px;">📱 سوشل میڈیا پر شیئر کریں</h4>
                <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}" target="_blank" style="background:#1877f2; color:#fff; width:45px; height:45px; border-radius:25px; display:flex; align-items:center; justify-content:center; text-decoration:none; font-size:24px;">📘</a>
                    <a href="https://wa.me/?text=${encodeURIComponent(document.title + ' ' + location.href)}" target="_blank" style="background:#25D366; color:#fff; width:45px; height:45px; border-radius:25px; display:flex; align-items:center; justify-content:center; text-decoration:none; font-size:24px;">📱</a>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(document.title)}" target="_blank" style="background:#1DA1F2; color:#fff; width:45px; height:45px; border-radius:25px; display:flex; align-items:center; justify-content:center; text-decoration:none; font-size:24px;">🐦</a>
                    <button onclick="navigator.clipboard.writeText(location.href).then(()=>alert('✅ کاپی ہو گیا'))" style="background:#6c757d; color:#fff; width:45px; height:45px; border-radius:25px; border:none; cursor:pointer; font-size:24px;">🔗</button>
                </div>
            </div>
            <div style="text-align:center; margin-top:20px; color:#64748b; font-size:12px;">☁️ Cloudflare D1 میں محفوظ</div>
            <style>
                button:hover, a:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
                @media (max-width:640px){ div[style*="grid-template-columns: repeat(5,1fr)"] { grid-template-columns: repeat(2,1fr) !important; } }
            </style>
        </div>
    `);
    
    loadReactions();
})();
