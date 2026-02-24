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
        
        btn.style.transform = 'scale(1.2) rotate(5deg)';
        setTimeout(() => { btn.style.transform = 'scale(1) rotate(0deg)'; }, 200);
    };
    
    window.printPage = function() {
        window.print();
    };
    
    // Reactions Array
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
    
    // Navigation Buttons - 4+4 دو لائنوں میں
    const navButtonsRow1 = [
        { icon: '🏠', text: 'مرکزی صفحہ', url: 'https://bloglovers.pk/', color: '#4f46e5' },
        { icon: '📚', text: 'تمام اقسام', url: 'https://bloglovers.pk/category-pages/alamaat-kubra.html', color: '#7c3aed' },
        { icon: '📂', text: categoryPath.replace(/-/g, ' ') || 'موجودہ کیٹیگری', url: categoryPath ? `https://bloglovers.pk/category-pages/alamaat-kubra.html` : '#', color: '#059669' },
        { icon: '⭐', text: 'مشہور پوسٹ', url: 'https://bloglovers.pk/alamaat-kubra/dajjal-ko-kon-kon-se-taaqaten-di-gai-honghi', color: '#d97706' }
    ];
    
    const navButtonsRow2 = [
        { icon: '🆕', text: 'فیچر پوسٹ', url: 'https://bloglovers.pk/alamaat-kubra/dajjal-se-nijaat-ke-liye-humein-kya-taleemaat-di-gai-hain', color: '#dc2626' },
        { icon: '📞', text: 'رابطہ', url: 'https://bloglovers.pk/contact', color: '#0891b2' },
        { icon: '⬆️', text: 'اوپر جائیں', action: 'scrollToTop', color: '#b45309' },
        { icon: '⬇️', text: 'نیچے جائیں', action: 'scrollToBottom', color: '#6b7280' }
    ];
    
    let navHTMLRow1 = '';
    navButtonsRow1.forEach(btn => {
        if (btn.url && btn.url !== '#') {
            navHTMLRow1 += `
                <a href="${btn.url}" class="nav-btn" style="background: linear-gradient(135deg, ${btn.color}, ${btn.color}dd);">
                    <span class="nav-icon">${btn.icon}</span>
                    <span class="nav-text">${btn.text}</span>
                </a>
            `;
        } else {
            navHTMLRow1 += `
                <span class="nav-btn disabled" style="background: linear-gradient(135deg, ${btn.color}, ${btn.color}dd); opacity: 0.5;">
                    <span class="nav-icon">${btn.icon}</span>
                    <span class="nav-text">${btn.text}</span>
                </span>
            `;
        }
    });
    
    let navHTMLRow2 = '';
    navButtonsRow2.forEach(btn => {
        if (btn.action === 'scrollToTop') {
            navHTMLRow2 += `
                <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="nav-btn" style="background: linear-gradient(135deg, ${btn.color}, ${btn.color}dd);">
                    <span class="nav-icon">${btn.icon}</span>
                    <span class="nav-text">${btn.text}</span>
                </button>
            `;
        } else if (btn.action === 'scrollToBottom') {
            navHTMLRow2 += `
                <button onclick="window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})" class="nav-btn" style="background: linear-gradient(135deg, ${btn.color}, ${btn.color}dd);">
                    <span class="nav-icon">${btn.icon}</span>
                    <span class="nav-text">${btn.text}</span>
                </button>
            `;
        } else {
            navHTMLRow2 += `
                <a href="${btn.url}" class="nav-btn" style="background: linear-gradient(135deg, ${btn.color}, ${btn.color}dd);">
                    <span class="nav-icon">${btn.icon}</span>
                    <span class="nav-text">${btn.text}</span>
                </a>
            `;
        }
    });
    
    // Social Media Icons 
    const socialIconsRow1 = [
        { icon: '📘', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, color: '#1877f2', name: 'Facebook' },
        { icon: '📱', url: `https://wa.me/?text=${encodeURIComponent(document.title + ' ' + window.location.href)}`, color: '#25D366', name: 'WhatsApp' },
        { icon: '🐦', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`, color: '#1DA1F2', name: 'Twitter' },
        { icon: '💼', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, color: '#0077b5', name: 'LinkedIn' },
        { icon: '📨', url: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`, color: '#0088cc', name: 'Telegram' }
    ];
    
    const socialIconsRow2 = [
        { icon: '📌', url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(document.title)}`, color: '#bd081c', name: 'Pinterest' },
        { icon: '🤖', url: `https://www.reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(document.title)}`, color: '#ff4500', name: 'Reddit' },
        { icon: '📧', url: `mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(window.location.href)}`, color: '#ea4335', name: 'Email' },
        { icon: '🔗', action: 'copy', color: '#6c757d', name: 'Copy Link' },
        { icon: '🖨️', action: 'print', color: '#4b5563', name: 'Print' }
    ];
    
    let socialHTMLRow1 = '';
    socialIconsRow1.forEach(icon => {
        socialHTMLRow1 += `
            <a href="${icon.url}" target="_blank" class="social-icon-btn" style="background: ${icon.color};" title="${icon.name}">
                <span class="social-icon">${icon.icon}</span>
            </a>
        `;
    });
    
    let socialHTMLRow2 = '';
    socialIconsRow2.forEach(icon => {
        if (icon.action === 'copy') {
            socialHTMLRow2 += `
                <button onclick="navigator.clipboard.writeText(window.location.href).then(() => alert('✅ لنک کاپی ہو گیا!'))" 
                        class="social-icon-btn" style="background: ${icon.color};" title="${icon.name}">
                    <span class="social-icon">${icon.icon}</span>
                </button>
            `;
        } else if (icon.action === 'print') {
            socialHTMLRow2 += `
                <button onclick="window.print()" 
                        class="social-icon-btn" style="background: ${icon.color};" title="${icon.name}">
                    <span class="social-icon">${icon.icon}</span>
                </button>
            `;
        } else {
            socialHTMLRow2 += `
                <a href="${icon.url}" target="_blank" class="social-icon-btn" style="background: ${icon.color};" title="${icon.name}">
                    <span class="social-icon">${icon.icon}</span>
                </a>
            `;
        }
    });
    
    const html = `
        <div class="reactions-wrapper">
            <!-- Reactions سیکشن -->
            <div class="reactions-section">
                <div class="section-title">
                    <span class="title-icon">💭</span>
                    <span class="title-text">اس تحریر پر اپنا ردعمل دیں</span>
                </div>
                
                <div class="reactions-grid">
                    ${reactionsHTML}
                </div>
            </div>
            
            <!-- نیویگیشن سیکشن - 4+4 دو لائنوں میں -->
            <div class="nav-section">
                <div class="section-title">
                    <span class="title-icon">🧭</span>
                    <span class="title-text">نیویگیشن</span>
                </div>
                
                <div class="nav-grid-row">
                    ${navHTMLRow1}
                </div>
                
                <div class="nav-grid-row">
                    ${navHTMLRow2}
                </div>
            </div>
            
            <!-- سوشل میڈیا سیکشن - صرف آئیکونز، 5+5 دو لائنوں میں -->
            <div class="social-section">
                <div class="section-title">
                    <span class="title-icon">📱</span>
                    <span class="title-text">شیئر کریں</span>
                </div>
                
                <div class="social-icons-row">
                    ${socialHTMLRow1}
                </div>
                
                <div class="social-icons-row">
                    ${socialHTMLRow2}
                </div>
            </div>
            
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
                
                /* Main Container */
                .reactions-wrapper {
                    max-width: 800px;
                    margin: 40px auto 30px;
                    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                    border-radius: 40px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.05);
                    padding: 30px;
                    direction: rtl;
                    font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif;
                    border: 1px solid #eef2f6;
                    animation: fadeInUp 0.8s ease;
                }
                
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                /* Section Title */
                .section-title {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 25px;
                }
                
                .title-icon {
                    font-size: 28px;
                    animation: bounce 2s infinite;
                }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                
                .title-text {
                    font-size: 24px;
                    color: #1e293b;
                    font-weight: 600;
                    background: linear-gradient(135deg, #1e293b, #334155);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                
                /* Reactions Grid */
                .reactions-section {
                    margin-bottom: 40px;
                }
                
                .reactions-grid {
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                    gap: 12px;
                }
                
                .reaction-item {
                    width: 100%;
                }
                
                .reaction-btn {
                    width: 100%;
                    background: white;
                    border: 2px solid;
                    border-radius: 25px;
                    padding: 12px 5px;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
                    position: relative;
                    overflow: hidden;
                }
                
                .reaction-btn::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.5);
                    transform: translate(-50%, -50%);
                    transition: width 0.6s, height 0.6s;
                }
                
                .reaction-btn:hover::before {
                    width: 300px;
                    height: 300px;
                }
                
                .reaction-btn:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 25px rgba(0,0,0,0.1);
                }
                
                .reaction-emoji {
                    font-size: 32px;
                    filter: drop-shadow(2px 4px 4px rgba(0,0,0,0.1));
                    animation: pulse 2s infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                .reaction-text {
                    font-size: 16px;
                    font-weight: 500;
                    text-align: center;
                }
                
                .reaction-count {
                    padding: 3px 10px;
                    border-radius: 30px;
                    font-size: 14px;
                    font-weight: bold;
                    min-width: 25px;
                    text-align: center;
                }
                
                /* Navigation Section */
                .nav-section {
                    margin-bottom: 40px;
                }
                
                .nav-grid-row {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                    margin-bottom: 10px;
                }
                
                .nav-btn {
                    padding: 10px 12px;
                    border-radius: 40px;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    transition: all 0.3s ease;
                    color: white;
                    font-size: 14px;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    position: relative;
                    overflow: hidden;
                }
                
                .nav-btn::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.3);
                    transform: translate(-50%, -50%);
                    transition: width 0.6s, height 0.6s;
                }
                
                .nav-btn:hover::before {
                    width: 300px;
                    height: 300px;
                }
                
                .nav-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                }
                
                .nav-icon {
                    font-size: 18px;
                }
                
                .nav-text {
                    font-size: 14px;
                    font-weight: 500;
                }
                
                /* Social Icons Section */
                .social-section {
                    background: #ffffff;
                    border-radius: 30px;
                    padding: 20px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.03);
                }
                
                .social-icons-row {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 10px;
                    margin-bottom: 10px;
                }
                
                .social-icon-btn {
                    width: 100%;
                    aspect-ratio: 1;
                    border-radius: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                    position: relative;
                    overflow: hidden;
                }
                
                .social-icon-btn::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.3);
                    transform: translate(-50%, -50%);
                    transition: width 0.6s, height 0.6s;
                }
                
                .social-icon-btn:hover::before {
                    width: 300px;
                    height: 300px;
                }
                
                .social-icon-btn:hover {
                    transform: translateY(-5px) rotate(5deg);
                    box-shadow: 0 15px 25px rgba(0,0,0,0.2);
                }
                
                .social-icon {
                    font-size: 28px;
                    color: white;
                    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
                }
                
                /* Responsive */
                @media (max-width: 768px) {
                    .reactions-wrapper { padding: 20px; margin: 20px 10px; }
                    
                    .reactions-grid { grid-template-columns: repeat(3, 1fr); }
                    
                    .nav-grid-row { grid-template-columns: repeat(2, 1fr); }
                    
                    .social-icons-row { grid-template-columns: repeat(3, 1fr); }
                    
                    .title-text { font-size: 20px; }
                }
                
                @media (max-width: 480px) {
                    .reactions-grid { grid-template-columns: repeat(2, 1fr); }
                    
                    .social-icons-row { grid-template-columns: repeat(3, 1fr); }
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
