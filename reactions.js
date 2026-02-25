// reactions.js - بلوگرز ڈاٹ پی کے (فائنل)
(function() {
    'use strict';
    
    if (document.getElementById('final-reactions')) return;
    
    const pageId = window.location.pathname.replace(/\//g, '-');
    const API_URL = 'https://aged-unit-8ce7.uzairhameed01.workers.dev';
    
    let reactions = { '👍':0, '❤️':0, '😊':0, '😢':0, '🤔':0 };
    
    async function loadReactions() {
        try {
            const res = await fetch(`${API_URL}?pageId=${pageId}`);
            if (res.ok) reactions = await res.json();
            updateCounts();
        } catch(e) { console.log(e); }
    }
    
    window.addReaction = async function(emoji) {
        reactions[emoji]++; updateCounts();
        await fetch(API_URL, {
            method:'POST', headers:{'Content-Type':'application/json'},
            body: JSON.stringify({pageId, emoji})
        });
        event.currentTarget.style.transform = 'scale(1.2)';
        setTimeout(() => event.currentTarget.style.transform = 'scale(1)', 200);
    };
    
    function updateCounts() {
        ['👍','❤️','😊','😢','🤔'].forEach(e => {
            let el = document.getElementById('c-'+e);
            if(el) el.innerText = reactions[e];
        });
    }
    
    const category = window.location.pathname.split('/')[1] || '';
    const catNames = {
        'alamaat-kubra':'علامات کبری', 'alamaat-sughra':'علامات صغری',
        'aqwal':'اقوال', 'azkar':'اذکار', 'islami-sawalat':'اسلامی سوالات',
        'islami-taleemat':'اسلامی تعلیمات', 'kids':'بچوں کی دنیا',
        'english-adab':'انگریزی ادب'
    };
    const catName = catNames[category] || category.replace(/-/g,' ');
    
    document.body.insertAdjacentHTML('beforeend', `
        <div id="final-reactions" style="margin:40px auto; padding:30px; background:#fff; border-radius:30px; direction:rtl; max-width:900px;">
            <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-bottom:30px;">
                <a href="https://bloglovers.pk/" style="background:#4f46e5; color:#fff; padding:8px 20px; border-radius:40px;">🏠 مرکزی صفحہ</a>
                <a href="https://bloglovers.pk/category-pages" style="background:#7c3aed; color:#fff; padding:8px 20px; border-radius:40px;">📚 تمام اقسام</a>
                ${category ? `<a href="https://bloglovers.pk/${category}" style="background:#059669; color:#fff; padding:8px 20px; border-radius:40px;">📂 ${catName}</a>` : ''}
                <button onclick="window.scrollTo({top:0,behavior:'smooth'})" style="background:#b45309; color:#fff; padding:8px 20px; border-radius:40px;">⬆️ اوپر</button>
                <button onclick="window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})" style="background:#4b5563; color:#fff; padding:8px 20px; border-radius:40px;">⬇️ نیچے</button>
            </div>
            <h3 style="text-align:center; font-size:28px;"><span style="font-size:42px;">😊</span><br>اس تحریر پر اپنا ردعمل دیں</h3>
            <div style="display:grid; grid-template-columns:repeat(5,1fr); gap:10px; margin:30px 0;">
                ${['👍','❤️','😊','😢','🤔'].map((e,i)=>{
                    let txt = ['عمدہ','دلچسپ','مفید','قابل غور','سوچ بچار'];
                    let clr = ['#2563eb','#dc2626','#f59e0b','#6b7280','#8b5cf6'];
                    return `<div style="text-align:center;"><button onclick="addReaction('${e}')" style="background:#fff; border:2px solid #e2e8f0; border-radius:60px; padding:12px 5px; width:100%;"><div style="font-size:32px;">${e}</div><div style="color:${clr[i]}; margin:5px 0;">${txt[i]}</div><div id="c-${e}" style="background:${clr[i]}; color:#fff; padding:2px 10px; border-radius:20px;">0</div></button></div>`
                }).join('')}
            </div>
            <div style="background:#f1f5f9; border-radius:30px; padding:20px;">
                <h4 style="text-align:center;">📱 سوشل میڈیا پر شیئر کریں</h4>
                <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}" target="_blank" style="background:#1877f2; color:#fff; width:45px; height:45px; border-radius:25px; display:flex; align-items:center; justify-content:center;">📘</a>
                    <a href="https://wa.me/?text=${encodeURIComponent(document.title+' '+location.href)}" target="_blank" style="background:#25D366; color:#fff; width:45px; height:45px; border-radius:25px; display:flex; align-items:center; justify-content:center;">📱</a>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(document.title)}" target="_blank" style="background:#1DA1F2; color:#fff; width:45px; height:45px; border-radius:25px; display:flex; align-items:center; justify-content:center;">🐦</a>
                    <button onclick="navigator.clipboard.writeText(location.href).then(()=>alert('✅ کاپی ہو گیا'))" style="background:#6c757d; color:#fff; width:45px; height:45px; border-radius:25px; border:none; cursor:pointer;">🔗</button>
                </div>
            </div>
            <p style="text-align:center; color:#666; margin-top:15px;">☁️ Cloudflare D1 میں محفوظ</p>
        </div>
    `);
    
    loadReactions();
})();
