// reactions.js - بلوگرز ڈاٹ پی کے (مکمل)
(function() {
    'use strict';
    
    if (document.getElementById('bloglovers-panel')) return;
    
    // ========== PAGE INFO ==========
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(p => p);
    const currentCategory = pathParts[0] || '';
    const pageId = currentPath.replace(/\//g, '-');
    
    // ========== CATEGORY NAMES (اردو میں) ==========
    const categoryNames = {
        'alamaat-kubra': 'علامات کبری',
        'alamaat-sughra': 'علامات صغری',
        'aqwal': 'اقوال',
        'azkar': 'اذکار',
        'islami-sawalat': 'اسلامی سوالات',
        'islami-taleemat': 'اسلامی تعلیمات',
        'kids': 'بچوں کی دنیا',
        'english-adab': 'انگریزی ادب',
        'category-pages': 'تمام اقسام'
    };
    
    const categoryName = categoryNames[currentCategory] || currentCategory.replace(/-/g, ' ');
    
    // ========== REACTIONS DATA ==========
    let reactions = {
        '👍': 0, '❤️': 0, '😊': 0, '😢': 0, '👏': 0
    };
    
    try {
        const saved = localStorage.getItem('react_' + pageId);
        if (saved) reactions = JSON.parse(saved);
    } catch(e) {}
    
    // ========== ADD REACTION ==========
    window.addReaction = function(emoji) {
        reactions[emoji] = reactions[emoji] + 1;
        localStorage.setItem('react_' + pageId, JSON.stringify(reactions));
        
        document.getElementById('count-' + emoji).innerText = reactions[emoji];
        
        const btn = event.currentTarget;
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
    };
    
    // ========== HTML ==========
    const html = `
        <div id="bloglovers-panel" style="
            margin: 40px auto;
            padding: 30px;
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border-radius: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.08);
            direction: rtl;
            max-width: 900px;
            font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', sans-serif;
            border: 1px solid #eef2f6;
        ">
            <!-- ========== نیویگیشن بٹنز (اردو میں) ========== -->
            <div style="
                display: flex;
                gap: 10px;
                justify-content: center;
                flex-wrap: wrap;
                margin-bottom: 30px;
                padding: 10px;
                background: #ffffff;
                border-radius: 60px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.03);
            ">
                <a href="https://bloglovers.pk/" style="
                    background: linear-gradient(135deg, #4f46e5, #6366f1);
                    color: white;
                    padding: 8px 20px;
                    border-radius: 40px;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 16px;
                    transition: all 0.2s;
                ">
                    <span style="font-size: 18px;">🏠</span>
                    <span>مرکزی صفحہ</span>
                </a>
                
                <a href="https://bloglovers.pk/category-pages" style="
                    background: linear-gradient(135deg, #7c3aed, #8b5cf6);
                    color: white;
                    padding: 8px 20px;
                    border-radius: 40px;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 16px;
                ">
                    <span style="font-size: 18px;">📚</span>
                    <span>تمام اقسام</span>
                </a>
                
                ${currentCategory ? `
                <a href="https://bloglovers.pk/${currentCategory}" style="
                    background: linear-gradient(135deg, #059669, #10b981);
                    color: white;
                    padding: 8px 20px;
                    border-radius: 40px;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 16px;
                ">
                    <span style="font-size: 18px;">📂</span>
                    <span>${categoryName}</span>
                </a>
                ` : ''}
                
                <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" style="
                    background: linear-gradient(135deg, #b45309, #d97706);
                    color: white;
                    padding: 8px 20px;
                    border-radius: 40px;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 16px;
                ">
                    <span style="font-size: 18px;">⬆️</span>
                    <span>اوپر جائیں</span>
                </button>
                
                <button onclick="window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})" style="
                    background: linear-gradient(135deg, #6b7280, #4b5563);
                    color: white;
                    padding: 8px 20px;
                    border-radius: 40px;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 16px;
                ">
                    <span style="font-size: 18px;">⬇️</span>
                    <span>نیچے جائیں</span>
                </button>
            </div>
            
            <!-- ========== Reactions ہیڈر ========== -->
            <h3 style="
                text-align: center;
                font-size: 32px;
                color: #1e293b;
                margin-bottom: 25px;
                font-weight: 600;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.02);
            ">
                <span style="font-size: 40px; display: block; margin-bottom: 5px;">😊</span>
                اس تحریر پر اپنا ردعمل دیں
            </h3>
            
            <!-- ========== Reactions Grid ========== -->
            <div style="
                display: flex;
                gap: 15px;
                justify-content: center;
                flex-wrap: wrap;
                margin-bottom: 30px;
            ">
                <!-- 👍 پسند -->
                <button onclick="addReaction('👍')" style="
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 50px;
                    padding: 10px 20px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.2s;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
                ">
                    <span style="font-size: 28px;">👍</span>
                    <span style="color: #2563eb; font-size: 18px;">پسند</span>
                    <span id="count-👍" style="
                        background: #2563eb;
                        color: white;
                        padding: 4px 12px;
                        border-radius: 30px;
                        font-size: 16px;
                    ">${reactions['👍']}</span>
                </button>
                
                <!-- ❤️ محبت -->
                <button onclick="addReaction('❤️')" style="
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 50px;
                    padding: 10px 20px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.2s;
                ">
                    <span style="font-size: 28px;">❤️</span>
                    <span style="color: #dc2626; font-size: 18px;">محبت</span>
                    <span id="count-❤️" style="
                        background: #dc2626;
                        color: white;
                        padding: 4px 12px;
                        border-radius: 30px;
                        font-size: 16px;
                    ">${reactions['❤️']}</span>
                </button>
                
                <!-- 😊 خوشی -->
                <button onclick="addReaction('😊')" style="
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 50px;
                    padding: 10px 20px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.2s;
                ">
                    <span style="font-size: 28px;">😊</span>
                    <span style="color: #eab308; font-size: 18px;">خوشی</span>
                    <span id="count-😊" style="
                        background: #eab308;
                        color: white;
                        padding: 4px 12px;
                        border-radius: 30px;
                        font-size: 16px;
                    ">${reactions['😊']}</span>
                </button>
                
                <!-- 😢 غم -->
                <button onclick="addReaction('😢')" style="
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 50px;
                    padding: 10px 20px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.2s;
                ">
                    <span style="font-size: 28px;">😢</span>
                    <span style="color: #6b7280; font-size: 18px;">غم</span>
                    <span id="count-😢" style="
                        background: #6b7280;
                        color: white;
                        padding: 4px 12px;
                        border-radius: 30px;
                        font-size: 16px;
                    ">${reactions['😢']}</span>
                </button>
                
                <!-- 👏 واہ -->
                <button onclick="addReaction('👏')" style="
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 50px;
                    padding: 10px 20px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.2s;
                ">
                    <span style="font-size: 28px;">👏</span>
                    <span style="color: #8b5cf6; font-size: 18px;">واہ</span>
                    <span id="count-👏" style="
                        background: #8b5cf6;
                        color: white;
                        padding: 4px 12px;
                        border-radius: 30px;
                        font-size: 16px;
                    ">${reactions['👏']}</span>
                </button>
            </div>
            
            <!-- ========== سوشل میڈیا شیئر بٹنز ========== -->
            <div style="
                background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                border-radius: 30px;
                padding: 20px;
                margin-top: 20px;
            ">
                <h4 style="
                    text-align: center;
                    font-size: 22px;
                    color: #334155;
                    margin-bottom: 15px;
                ">
                    📱 سوشل میڈیا پر شیئر کریں
                </h4>
                
                <div style="
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    flex-wrap: wrap;
                ">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" style="
                        background: #1877f2;
                        color: white;
                        width: 45px;
                        height: 45px;
                        border-radius: 25px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-decoration: none;
                        font-size: 24px;
                        transition: all 0.2s;
                    ">📘</a>
                    
                    <a href="https://wa.me/?text=${encodeURIComponent(document.title + ' ' + window.location.href)}" target="_blank" style="
                        background: #25D366;
                        color: white;
                        width: 45px;
                        height: 45px;
                        border-radius: 25px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-decoration: none;
                        font-size: 24px;
                    ">📱</a>
                    
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}" target="_blank" style="
                        background: #1DA1F2;
                        color: white;
                        width: 45px;
                        height: 45px;
                        border-radius: 25px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-decoration: none;
                        font-size: 24px;
                    ">🐦</a>
                    
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank" style="
                        background: #0077b5;
                        color: white;
                        width: 45px;
                        height: 45px;
                        border-radius: 25px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-decoration: none;
                        font-size: 24px;
                    ">💼</a>
                    
                    <a href="https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}" target="_blank" style="
                        background: #0088cc;
                        color: white;
                        width: 45px;
                        height: 45px;
                        border-radius: 25px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-decoration: none;
                        font-size: 24px;
                    ">📨</a>
                    
                    <button onclick="navigator.clipboard.writeText(window.location.href).then(() => alert('✅ لنک کاپی ہو گیا'))" style="
                        background: #6c757d;
                        color: white;
                        width: 45px;
                        height: 45px;
                        border-radius: 25px;
                        border: none;
                        cursor: pointer;
                        font-size: 24px;
                        transition: all 0.2s;
                    ">🔗</button>
                </div>
            </div>
            
            <!-- ========== فوٹر ========== -->
            <div style="
                text-align: center;
                margin-top: 20px;
                padding-top: 15px;
                border-top: 2px dashed #e2e8f0;
                color: #94a3b8;
                font-size: 14px;
            ">
                <span>✨ بغیر لاگ ان کے ردعمل دیں - ڈیٹا آپ کے براؤزر میں محفوظ</span>
            </div>
            
            <style>
                button:hover, a:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                @media (max-width: 640px) {
                    #bloglovers-panel {
                        padding: 20px;
                        margin: 20px 10px;
                    }
                    button {
                        width: 100%;
                        justify-content: center;
                    }
                }
            </style>
        </div>
    `;
    
    // ========== صفحہ میں شامل کریں ==========
    const target = document.querySelector('article') || 
                   document.querySelector('.post-content') || 
                   document.querySelector('.entry-content') ||
                   document.querySelector('main') ||
                   document.body;
    
    if (target) {
        target.insertAdjacentHTML('beforeend', html);
        console.log('✅ Reactions panel added');
    }
    
})();
