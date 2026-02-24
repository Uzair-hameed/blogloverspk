// reactions.js - Bloglovers.pk پرفیکٹ ورژن
(function() {
    'use strict';
    
    if (document.getElementById('bloglovers-reactions')) return;
    
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
            <button class="reaction-btn" onclick="addReaction('${r.emoji}', this)">
                <span class="reaction-emoji">${r.emoji}</span>
                <span class="reaction-text">${r.text}</span>
                <span class="reaction-count">${reactionsData[r.emoji] || 0}</span>
            </button>
        `;
    });
    
    // صحیح URLs
    const currentPath = window.location.pathname;
    const categoryPath = currentPath.split('/')[1]; // alamaat-kubra
    
    const html = `
        <div class="reactions-wrapper">
            <!-- نیویگیشن بار - چھوٹا اور خوبصورت -->
            <div class="nav-bar">
                <a href="https://bloglovers.pk/" class="nav-item home">
                    <span class="nav-icon">🏠</span>
                    <span class="nav-text">مرکزی صفحہ</span>
                </a>
                
                <a href="https://bloglovers.pk/category-pages" class="nav-item category">
                    <span class="nav-icon">📚</span>
                    <span class="nav-text">تمام اقسام</span>
                </a>
                
                <a href="https://bloglovers.pk/${categoryPath}" class="nav-item current-cat">
                    <span class="nav-icon">📂</span>
                    <span class="nav-text">${categoryPath.replace('-', ' ')}</span>
                </a>
                
                <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="nav-item up">
                    <span class="nav-icon">⬆️</span>
                    <span class="nav-text">اوپر</span>
                </button>
                
                <button onclick="window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})" class="nav-item down">
                    <span class="nav-icon">⬇️</span>
                    <span class="nav-text">نیچے</span>
                </button>
            </div>
            
            <!-- Reactions سیکشن -->
            <div class="reactions-section">
                <div class="section-header">
                    <span class="header-icon">💭</span>
                    <span class="header-text">اس تحریر پر اپنا ردعمل دیں</span>
                </div>
                
                <div class="reactions-grid">
                    ${reactionsHTML}
                </div>
            </div>
            
            <!-- شیئر سیکشن -->
            <div class="share-section">
                <div class="share-header">
                    <span class="share-icon">📱</span>
                    <span class="share-text">شیئر کریں</span>
                </div>
                
                <div class="share-buttons">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" 
                       target="_blank" class="share-btn fb">
                        <span class="btn-icon">📘</span>
                        <span class="btn-text">فیس بک</span>
                    </a>
                    
                    <a href="https://wa.me/?text=${encodeURIComponent(document.title + ' ' + window.location.href)}" 
                       target="_blank" class="share-btn wa">
                        <span class="btn-icon">📱</span>
                        <span class="btn-text">واٹس ایپ</span>
                    </a>
                    
                    <button onclick="navigator.clipboard.writeText(window.location.href).then(() => alert('✅ لنک کاپی ہو گیا!'))" 
                            class="share-btn copy">
                        <span class="btn-icon">🔗</span>
                        <span class="btn-text">کاپی</span>
                    </button>
                </div>
            </div>
            
            <style>
                /* مکمل کنٹینر */
                .reactions-wrapper {
                    max-width: 800px;
                    margin: 40px auto 30px;
                    background: #ffffff;
                    border-radius: 20px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    padding: 20px;
                    direction: rtl;
                    font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', sans-serif;
                    border: 1px solid #edf2f7;
                }
                
                /* نیویگیشن بار */
                .nav-bar {
                    display: flex;
                    gap: 8px;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-bottom: 25px;
                    padding: 8px;
                    background: #f8fafc;
                    border-radius: 50px;
                }
                
                .nav-item {
                    padding: 6px 12px;
                    border-radius: 30px;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 14px;
                    transition: all 0.2s;
                    border: none;
                    cursor: pointer;
                    background: white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                }
                
                .nav-item.home { background: #4f46e5; color: white; }
                .nav-item.category { background: #7c3aed; color: white; }
                .nav-item.current-cat { background: #059669; color: white; }
                .nav-item.up { background: #b45309; color: white; }
                .nav-item.down { background: #1e293b; color: white; }
                
                .nav-item:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }
                
                .nav-icon { font-size: 14px; }
                .nav-text { font-size: 14px; }
                
                /* Reactions سیکشن */
                .reactions-section {
                    margin-bottom: 20px;
                }
                
                .section-header {
                    text-align: center;
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                
                .header-icon { font-size: 22px; }
                .header-text {
                    font-size: 18px;
                    color: #334155;
                    font-weight: 500;
                }
                
                .reactions-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    justify-content: center;
                }
                
                .reaction-btn {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 30px;
                    padding: 6px 12px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    transition: all 0.2s;
                    font-size: 14px;
                }
                
                .reaction-btn:hover {
                    border-color: #667eea;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(102,126,234,0.1);
                }
                
                .reaction-emoji { font-size: 16px; }
                .reaction-text { font-size: 14px; color: #334155; }
                .reaction-count {
                    background: #f1f5f9;
                    padding: 2px 6px;
                    border-radius: 12px;
                    font-size: 12px;
                    color: #475569;
                }
                
                /* شیئر سیکشن */
                .share-section {
                    background: #f8fafc;
                    border-radius: 15px;
                    padding: 15px;
                }
                
                .share-header {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-bottom: 12px;
                }
                
                .share-icon { font-size: 20px; }
                .share-text {
                    font-size: 16px;
                    color: #334155;
                }
                
                .share-buttons {
                    display: flex;
                    gap: 8px;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                
                .share-btn {
                    padding: 8px 16px;
                    border-radius: 30px;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 14px;
                    transition: all 0.2s;
                    border: none;
                    cursor: pointer;
                    flex: 0 1 auto;
                }
                
                .share-btn.fb { background: #1877f2; color: white; }
                .share-btn.wa { background: #25D366; color: white; }
                .share-btn.copy { background: #6c757d; color: white; }
                
                .share-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }
                
                .btn-icon { font-size: 16px; }
                .btn-text { font-size: 14px; }
                
                /* موبائل */
                @media (max-width: 640px) {
                    .reactions-wrapper { padding: 15px; margin: 20px 10px; }
                    
                    .nav-bar { gap: 5px; }
                    .nav-item { padding: 4px 8px; }
                    .nav-text { font-size: 12px; }
                    
                    .reactions-grid { gap: 6px; }
                    .reaction-btn { padding: 4px 8px; }
                    
                    .share-buttons { flex-direction: column; }
                    .share-btn { width: 100%; justify-content: center; }
                }
            </style>
        </div>
    `;
    
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
