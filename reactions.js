// reactions.js - Bloglovers.pk مکمل ورژن (نیویگیشن بٹنز کے ساتھ)
(function() {
    'use strict';
    
    // پہلے سے موجود ہے تو نہ کریں
    if (document.getElementById('bloglovers-reactions')) return;
    
    // موجودہ صفحہ کی ID
    const pageId = window.location.pathname.replace(/\//g, '-') || 'homepage';
    
    // Reactions ڈیٹا
    let reactionsData = {};
    try {
        const saved = localStorage.getItem(`reactions_${pageId}`);
        reactionsData = saved ? JSON.parse(saved) : {
            '👍': 0, '❤️': 0, '😊': 0, '😢': 0, '👏': 0, '🤔': 0
        };
    } catch (e) {
        reactionsData = {'👍': 0, '❤️': 0, '😊': 0, '😢': 0, '👏': 0, '🤔': 0};
    }
    
    // Reaction شامل کریں
    window.addReaction = function(emoji, btn) {
        const countSpan = btn.querySelector('.reaction-count');
        const currentCount = parseInt(countSpan.textContent) || 0;
        countSpan.textContent = currentCount + 1;
        
        reactionsData[emoji] = (reactionsData[emoji] || 0) + 1;
        localStorage.setItem(`reactions_${pageId}`, JSON.stringify(reactionsData));
        
        btn.style.transform = 'scale(1.1)';
        setTimeout(() => { btn.style.transform = 'scale(1)'; }, 200);
    };
    
    // Reactions Array
    const reactions = [
        { emoji: '👍', text: 'پسند آیا', color: '#1877f2' },
        { emoji: '❤️', text: 'دل کو چھو لیا', color: '#e11d48' },
        { emoji: '😊', text: 'بہت اچھا', color: '#f59e0b' },
        { emoji: '😢', text: 'دل غمگین ہوا', color: '#64748b' },
        { emoji: '👏', text: 'واہ واہ', color: '#8b5cf6' },
        { emoji: '🤔', text: 'سوچنے پر مجبور', color: '#14b8a6' }
    ];
    
    let reactionsHTML = '';
    reactions.forEach(r => {
        reactionsHTML += `
            <button class="reaction-btn" onclick="addReaction('${r.emoji}', this)" style="border-color: ${r.color}40;">
                <span class="reaction-emoji">${r.emoji}</span>
                <span class="reaction-text">${r.text}</span>
                <span class="reaction-count">${reactionsData[r.emoji] || 0}</span>
            </button>
        `;
    });
    
    // مکمل HTML
    const html = `
        <div class="reactions-container">
            <!-- نیویگیشن بٹنز (اوپر) -->
            <div class="nav-buttons-top">
                <a href="https://bloglovers.pk/" class="nav-btn home-btn">
                    <span class="nav-icon">🏠</span>
                    <span class="nav-text">مرکزی صفحہ</span>
                </a>
                <a href="https://bloglovers.pk/category-pages" class="nav-btn category-btn">
                    <span class="nav-icon">📚</span>
                    <span class="nav-text">تمام اقسام</span>
                </a>
                <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="nav-btn up-btn">
                    <span class="nav-icon">⬆️</span>
                    <span class="nav-text">اوپر جائیں</span>
                </button>
                <button onclick="window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})" class="nav-btn down-btn">
                    <span class="nav-icon">⬇️</span>
                    <span class="nav-text">نیچے جائیں</span>
                </button>
            </div>
            
            <!-- ہیڈر -->
            <div class="reactions-header">
                <div class="header-decoration"></div>
                <h3 class="header-title">🌟 دل کی بات کہیں</h3>
                <p class="header-subtitle">اس تحریر پر اپنا ردعمل دیں</p>
            </div>
            
            <!-- Reactions Grid -->
            <div class="reactions-grid">
                ${reactionsHTML}
            </div>
            
            <!-- شیئر بٹنز -->
            <div class="share-section">
                <h4 class="share-title">📱 سوشل میڈیا پر شیئر کریں</h4>
                <div class="share-buttons">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" 
                       target="_blank" class="share-btn facebook">
                        <span class="share-icon">📘</span>
                        <span class="share-text">فیس بک</span>
                    </a>
                    <a href="https://wa.me/?text=${encodeURIComponent(document.title + ' ' + window.location.href)}" 
                       target="_blank" class="share-btn whatsapp">
                        <span class="share-icon">📱</span>
                        <span class="share-text">واٹس ایپ</span>
                    </a>
                    <button onclick="navigator.clipboard.writeText(window.location.href).then(() => alert('✅ لنک کاپی ہو گیا!'))" 
                            class="share-btn copy">
                        <span class="share-icon">🔗</span>
                        <span class="share-text">لنک کاپی کریں</span>
                    </button>
                </div>
            </div>
            
            <!-- نیویگیشن بٹنز (نیچے) -->
            <div class="nav-buttons-bottom">
                <a href="https://bloglovers.pk/" class="nav-btn home-btn">
                    <span class="nav-icon">🏠</span>
                    <span class="nav-text">مرکزی صفحہ</span>
                </a>
                <a href="https://bloglovers.pk/category-pages" class="nav-btn category-btn">
                    <span class="nav-icon">📚</span>
                    <span class="nav-text">تمام اقسام</span>
                </a>
                <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="nav-btn up-btn">
                    <span class="nav-icon">⬆️</span>
                    <span class="nav-text">اوپر جائیں</span>
                </button>
                <button onclick="window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})" class="nav-btn down-btn">
                    <span class="nav-icon">⬇️</span>
                    <span class="nav-text">نیچے جائیں</span>
                </button>
            </div>
            
            <!-- فوٹر -->
            <div class="reactions-footer">
                <span class="footer-text">✨ بغیر لاگ ان کے ردعمل دیں</span>
            </div>
        </div>
        
        <style>
            .reactions-container {
                max-width: 900px;
                margin: 50px auto 30px;
                background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                border-radius: 40px 40px 30px 30px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                padding: 30px 25px;
                position: relative;
                overflow: hidden;
                border: 1px solid rgba(255,255,255,0.3);
                backdrop-filter: blur(10px);
                direction: rtl;
                font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', sans-serif;
            }
            
            /* نیویگیشن بٹنز */
            .nav-buttons-top, .nav-buttons-bottom {
                display: flex;
                gap: 12px;
                justify-content: center;
                flex-wrap: wrap;
                margin-bottom: 30px;
                padding: 15px;
                background: rgba(255,255,255,0.5);
                border-radius: 60px;
                backdrop-filter: blur(5px);
                border: 1px solid rgba(255,255,255,0.8);
            }
            
            .nav-buttons-bottom {
                margin-top: 30px;
                margin-bottom: 20px;
            }
            
            .nav-btn {
                padding: 12px 25px;
                border-radius: 50px;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                font-size: 18px;
                transition: all 0.3s;
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                flex: 0 1 auto;
                min-width: 110px;
                justify-content: center;
            }
            
            .home-btn {
                background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
                color: white;
            }
            
            .category-btn {
                background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
                color: white;
            }
            
            .up-btn {
                background: linear-gradient(135deg, #059669 0%, #10b981 100%);
                color: white;
            }
            
            .down-btn {
                background: linear-gradient(135deg, #b45309 0%, #d97706 100%);
                color: white;
            }
            
            .nav-btn:hover {
                transform: translateY(-3px) scale(1.02);
                box-shadow: 0 10px 20px rgba(0,0,0,0.15);
            }
            
            .nav-icon {
                font-size: 22px;
            }
            
            .nav-text {
                font-size: 18px;
                font-weight: 500;
            }
            
            .reactions-header {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .header-decoration {
                width: 100px;
                height: 4px;
                background: linear-gradient(90deg, transparent, #667eea, #764ba2, #667eea, transparent);
                margin: 0 auto 15px;
                border-radius: 2px;
            }
            
            .header-title {
                font-size: 36px;
                color: #1e293b;
                margin: 0 0 5px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
            }
            
            .header-subtitle {
                font-size: 20px;
                color: #64748b;
                margin: 0;
            }
            
            .reactions-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                gap: 15px;
                margin-bottom: 35px;
            }
            
            .reaction-btn {
                background: white;
                border: 2px solid #e2e8f0;
                border-radius: 60px;
                padding: 15px 12px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 4px 6px rgba(0,0,0,0.02);
                position: relative;
                overflow: hidden;
            }
            
            .reaction-btn:hover {
                transform: translateY(-5px) scale(1.02);
                border-color: #667eea;
                box-shadow: 0 15px 25px rgba(102,126,234,0.2);
            }
            
            .reaction-emoji {
                font-size: 28px;
                filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1));
            }
            
            .reaction-text {
                font-size: 18px;
                color: #334155;
                font-weight: 500;
            }
            
            .reaction-count {
                background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
                padding: 4px 12px;
                border-radius: 30px;
                font-size: 16px;
                font-weight: bold;
                color: #1e293b;
            }
            
            .share-section {
                background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                border-radius: 30px;
                padding: 25px 20px;
                margin: 20px 0;
            }
            
            .share-title {
                font-size: 24px;
                color: white;
                margin: 0 0 15px;
                text-align: center;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
            }
            
            .share-buttons {
                display: flex;
                gap: 15px;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .share-btn {
                padding: 12px 25px;
                border-radius: 50px;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 10px;
                font-size: 18px;
                transition: all 0.3s;
                border: none;
                cursor: pointer;
                flex: 0 1 auto;
                min-width: 130px;
                justify-content: center;
                box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }
            
            .share-btn:hover {
                transform: translateY(-3px) scale(1.02);
                box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            }
            
            .share-btn.facebook {
                background: linear-gradient(135deg, #1877f2 0%, #0e5a9c 100%);
                color: white;
            }
            
            .share-btn.whatsapp {
                background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                color: white;
            }
            
            .share-btn.copy {
                background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
                color: white;
            }
            
            .share-icon {
                font-size: 24px;
            }
            
            .reactions-footer {
                text-align: center;
                margin-top: 20px;
                padding-top: 15px;
                border-top: 2px dashed #e2e8f0;
            }
            
            .footer-text {
                font-size: 16px;
                color: #94a3b8;
                display: inline-block;
                padding: 5px 15px;
                background: #f1f5f9;
                border-radius: 30px;
            }
            
            @media (max-width: 768px) {
                .reactions-container {
                    padding: 20px 15px;
                    margin: 30px 10px;
                }
                
                .nav-buttons-top, .nav-buttons-bottom {
                    gap: 8px;
                }
                
                .nav-btn {
                    padding: 10px 15px;
                    min-width: 80px;
                }
                
                .nav-text {
                    font-size: 16px;
                }
                
                .reactions-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .share-buttons {
                    flex-direction: column;
                }
                
                .share-btn {
                    width: 100%;
                }
                
                .header-title {
                    font-size: 28px;
                }
            }
            
            @media (max-width: 480px) {
                .reactions-grid {
                    grid-template-columns: 1fr;
                }
                
                .nav-btn {
                    width: calc(50% - 5px);
                }
            }
        </style>
    `;
    
    // صفحہ میں شامل کریں
    const postContent = document.querySelector('article') || 
                       document.querySelector('.post-content') || 
                       document.querySelector('.entry-content') ||
                       document.querySelector('main') ||
                       document.body;
    
    if (postContent) {
        const section = document.createElement('div');
        section.id = 'bloglovers-reactions';
        section.innerHTML = html;
        postContent.appendChild(section);
    }
    
})();
