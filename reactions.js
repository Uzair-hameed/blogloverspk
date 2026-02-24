// reactions.js - Bloglovers.pk بیوٹیفل ورژن
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
    
    // Reactions Array with colors
    const reactions = [
        { emoji: '👍', text: 'پسند آیا', color: '#3b82f6', bgColor: '#eff6ff', border: '#bfdbfe' },
        { emoji: '❤️', text: 'دل کو چھو لیا', color: '#ef4444', bgColor: '#fee2e2', border: '#fecaca' },
        { emoji: '😊', text: 'بہت اچھا', color: '#f59e0b', bgColor: '#fef3c7', border: '#fde68a' },
        { emoji: '😢', text: 'دل غمگین ہوا', color: '#6b7280', bgColor: '#f3f4f6', border: '#e5e7eb' },
        { emoji: '👏', text: 'واہ واہ', color: '#8b5cf6', bgColor: '#ede9fe', border: '#ddd6fe' },
        { emoji: '🤔', text: 'سوچنے پر مجبور', color: '#14b8a6', bgColor: '#ccfbf1', border: '#99f6e4' }
    ];
    
    let reactionsHTML = '';
    reactions.forEach(r => {
        reactionsHTML += `
            <div class="reaction-item">
                <button class="reaction-btn" onclick="addReaction('${r.emoji}', this)" 
                        style="background-color: ${r.bgColor}; border-color: ${r.border};">
                    <span class="reaction-emoji">${r.emoji}</span>
                    <span class="reaction-text" style="color: ${r.color};">${r.text}</span>
                    <span class="reaction-count" style="background-color: ${r.color}; color: white;">${reactionsData[r.emoji] || 0}</span>
                </button>
            </div>
        `;
    });
    
    const currentPath = window.location.pathname;
    const categoryPath = currentPath.split('/')[1] || '';
    
    // More social platforms
    const socialPlatforms = [
        { name: 'فیس بک', icon: '📘', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, color: '#1877f2' },
        { name: 'واٹس ایپ', icon: '📱', url: `https://wa.me/?text=${encodeURIComponent(document.title + ' ' + window.location.href)}`, color: '#25D366' },
        { name: 'ٹویٹر', icon: '🐦', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`, color: '#1DA1F2' },
        { name: 'لنکڈ ان', icon: '💼', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, color: '#0077b5' },
        { name: 'ٹیلی گرام', icon: '📨', url: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`, color: '#0088cc' },
        { name: 'ای میل', icon: '📧', url: `mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(window.location.href)}`, color: '#ea4335' }
    ];
    
    let socialHTML = '';
    socialPlatforms.forEach(platform => {
        socialHTML += `
            <a href="${platform.url}" target="_blank" class="social-btn" style="background-color: ${platform.color};">
                <span class="social-icon">${platform.icon}</span>
                <span class="social-name">${platform.name}</span>
            </a>
        `;
    });
    
    const html = `
        <div class="reactions-wrapper">
            <!-- نیویگیشن بار -->
            <div class="nav-bar">
                <a href="https://bloglovers.pk/" class="nav-item home">
                    <span class="nav-icon">🏠</span>
                    <span class="nav-text">مرکزی صفحہ</span>
                </a>
                
                <a href="https://bloglovers.pk/category-pages" class="nav-item category">
                    <span class="nav-icon">📚</span>
                    <span class="nav-text">تمام اقسام</span>
                </a>
                
                ${categoryPath ? `
                <a href="https://bloglovers.pk/${categoryPath}" class="nav-item current-cat">
                    <span class="nav-icon">📂</span>
                    <span class="nav-text">${categoryPath.replace(/-/g, ' ')}</span>
                </a>
                ` : ''}
                
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
            
            <!-- شیئر سیکشن - Extended -->
            <div class="share-section">
                <div class="share-header">
                    <span class="share-icon">📱</span>
                    <span class="share-text">سوشل میڈیا پر شیئر کریں</span>
                </div>
                
                <div class="social-grid">
                    ${socialHTML}
                </div>
                
                <!-- Copy Link Button -->
                <div class="copy-link-section">
                    <button onclick="navigator.clipboard.writeText(window.location.href).then(() => alert('✅ لنک کاپی ہو گیا!'))" 
                            class="copy-link-btn">
                        <span class="copy-icon">🔗</span>
                        <span class="copy-text">لنک کاپی کریں</span>
                    </button>
                </div>
            </div>
            
            <style>
                /* Main Container */
                .reactions-wrapper {
                    max-width: 900px;
                    margin: 40px auto 30px;
                    background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
                    border-radius: 30px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    padding: 25px;
                    direction: rtl;
                    font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', sans-serif;
                    border: 1px solid #eef2f6;
                }
                
                /* Navigation Bar */
                .nav-bar {
                    display: flex;
                    gap: 8px;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-bottom: 30px;
                    padding: 8px;
                    background: #f8fafc;
                    border-radius: 50px;
                }
                
                .nav-item {
                    padding: 6px 15px;
                    border-radius: 30px;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 14px;
                    transition: all 0.2s;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                }
                
                .nav-item.home { background: linear-gradient(135deg, #4f46e5, #6366f1); color: white; }
                .nav-item.category { background: linear-gradient(135deg, #7c3aed, #8b5cf6); color: white; }
                .nav-item.current-cat { background: linear-gradient(135deg, #059669, #10b981); color: white; }
                .nav-item.up { background: linear-gradient(135deg, #b45309, #d97706); color: white; }
                .nav-item.down { background: linear-gradient(135deg, #1e293b, #334155); color: white; }
                
                .nav-item:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
                }
                
                /* Reactions Section */
                .reactions-section {
                    margin-bottom: 30px;
                }
                
                .section-header {
                    text-align: center;
                    margin-bottom: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }
                
                .header-icon { font-size: 28px; }
                .header-text {
                    font-size: 22px;
                    color: #1e293b;
                    font-weight: 500;
                }
                
                .reactions-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 15px;
                    justify-content: center;
                }
                
                .reaction-item {
                    flex: 0 1 auto;
                    min-width: 100px;
                }
                
                .reaction-btn {
                    width: 100%;
                    background: white;
                    border: 2px solid;
                    border-radius: 20px;
                    padding: 15px 10px;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
                }
                
                .reaction-btn:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 25px rgba(0,0,0,0.1);
                }
                
                .reaction-emoji {
                    font-size: 36px;
                    filter: drop-shadow(2px 4px 4px rgba(0,0,0,0.1));
                }
                
                .reaction-text {
                    font-size: 16px;
                    font-weight: 500;
                    text-align: center;
                }
                
                .reaction-count {
                    padding: 4px 12px;
                    border-radius: 30px;
                    font-size: 14px;
                    font-weight: bold;
                    min-width: 30px;
                    text-align: center;
                }
                
                /* Share Section */
                .share-section {
                    background: #f8fafc;
                    border-radius: 25px;
                    padding: 25px;
                }
                
                .share-header {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                
                .share-icon { font-size: 26px; }
                .share-text {
                    font-size: 20px;
                    color: #1e293b;
                    font-weight: 500;
                }
                
                .social-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
                    gap: 12px;
                    margin-bottom: 15px;
                }
                
                .social-btn {
                    padding: 10px 15px;
                    border-radius: 40px;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.3s;
                    color: white;
                    font-size: 14px;
                    border: none;
                    cursor: pointer;
                }
                
                .social-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 15px rgba(0,0,0,0.2);
                }
                
                .social-icon { font-size: 18px; }
                .social-name { font-size: 14px; }
                
                .copy-link-section {
                    text-align: center;
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 2px dashed #e2e8f0;
                }
                
                .copy-link-btn {
                    background: linear-gradient(135deg, #6c757d, #495057);
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 40px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 16px;
                    transition: all 0.3s;
                }
                
                .copy-link-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 15px rgba(0,0,0,0.2);
                }
                
                .copy-icon { font-size: 18px; }
                .copy-text { font-size: 16px; }
                
                /* Mobile Responsive */
                @media (max-width: 768px) {
                    .reactions-wrapper { padding: 20px; margin: 20px 10px; }
                    
                    .reactions-grid { gap: 10px; }
                    .reaction-item { min-width: 80px; }
                    .reaction-btn { padding: 12px 8px; }
                    .reaction-emoji { font-size: 28px; }
                    .reaction-text { font-size: 14px; }
                    
                    .social-grid { grid-template-columns: repeat(2, 1fr); }
                }
                
                @media (max-width: 480px) {
                    .nav-item { padding: 4px 10px; font-size: 12px; }
                    .nav-icon { font-size: 12px; }
                    .nav-text { font-size: 12px; }
                    
                    .social-grid { grid-template-columns: 1fr; }
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
