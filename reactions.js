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
        
        // اینیمیشن
        btn.style.transform = 'scale(1.2)';
        btn.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        setTimeout(() => { 
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.02)';
        }, 200);
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
    
    // Navigation Buttons - بڑے اور خوبصورت
    const navButtons = [
        { icon: '🏠', text: 'مرکزی صفحہ', url: 'https://bloglovers.pk/', color: '#4f46e5' },
        { icon: '📚', text: 'تمام اقسام', url: 'https://bloglovers.pk/category-pages/alamaat-kubra.html', color: '#7c3aed' },
        { icon: '📂', text: categoryPath.replace(/-/g, ' ') || 'کیٹیگری', url: categoryPath ? `https://bloglovers.pk/${categoryPath}` : '#', color: '#059669' },
        { icon: '⭐', text: 'مشہور پوسٹ', url: 'https://bloglovers.pk/popular', color: '#d97706' },
        { icon: '🆕', text: 'نئی پوسٹ', url: 'https://bloglovers.pk/new', color: '#dc2626' },
        { icon: '📞', text: 'رابطہ', url: 'https://bloglovers.pk/contact-us.html', color: '#6b7280' }
    ];
    
    let navHTML = '';
    navButtons.forEach(btn => {
        if (btn.url !== '#') {
            navHTML += `
                <a href="${btn.url}" class="nav-btn" style="background: linear-gradient(135deg, ${btn.color}, ${btn.color}dd);">
                    <span class="nav-icon">${btn.icon}</span>
                    <span class="nav-text">${btn.text}</span>
                </a>
            `;
        } else {
            navHTML += `
                <span class="nav-btn disabled" style="background: linear-gradient(135deg, ${btn.color}, ${btn.color}dd); opacity: 0.5;">
                    <span class="nav-icon">${btn.icon}</span>
                    <span class="nav-text">${btn.text}</span>
                </span>
            `;
        }
    });
    
    // Add scroll buttons
    navHTML += `
        <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="nav-btn" style="background: linear-gradient(135deg, #0891b2, #06b6d4);">
            <span class="nav-icon">⬆️</span>
            <span class="nav-text">اوپر جائیں</span>
        </button>
        <button onclick="window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})" class="nav-btn" style="background: linear-gradient(135deg, #b45309, #d97706);">
            <span class="nav-icon">⬇️</span>
            <span class="nav-text">نیچے جائیں</span>
        </button>
    `;
    
    // Social Media Platforms
    const socialPlatforms = [
        { name: 'فیس بک', icon: '📘', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, color: '#1877f2' },
        { name: 'واٹس ایپ', icon: '📱', url: `https://wa.me/?text=${encodeURIComponent(document.title + ' ' + window.location.href)}`, color: '#25D366' },
        { name: 'ٹویٹر', icon: '🐦', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`, color: '#1DA1F2' },
        { name: 'لنکڈ ان', icon: '💼', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, color: '#0077b5' },
        { name: 'ٹیلی گرام', icon: '📨', url: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`, color: '#0088cc' },
        { name: 'پنٹیرسٹ', icon: '📌', url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(document.title)}`, color: '#bd081c' },
        { name: 'ریڈٹ', icon: '🤖', url: `https://www.reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(document.title)}`, color: '#ff4500' },
        { name: 'ای میل', icon: '📧', url: `mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(window.location.href)}`, color: '#ea4335' }
    ];
    
    let socialHTML = '';
    socialPlatforms.forEach(platform => {
        socialHTML += `
            <a href="${platform.url}" target="_blank" class="social-btn" style="background: linear-gradient(135deg, ${platform.color}, ${platform.color}dd);">
                <span class="social-icon">${platform.icon}</span>
                <span class="social-name">${platform.name}</span>
            </a>
        `;
    });
    
    const html = `
        <div class="reactions-wrapper">
            <!-- نیویگیشن بٹنز -->
            <div class="nav-section">
                <div class="section-title">
                    <span class="title-icon">🧭</span>
                    <span class="title-text">نیویگیشن</span>
                </div>
                <div class="nav-grid">
                    ${navHTML}
                </div>
            </div>
            
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
            
            <!-- شیئر سیکشن -->
            <div class="share-section">
                <div class="section-title">
                    <span class="title-icon">📱</span>
                    <span class="title-text">سوشل میڈیا پر شیئر کریں</span>
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
                @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
                
                /* Main Container */
                .reactions-wrapper {
                    max-width: 1000px;
                    margin: 40px auto 30px;
                    background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
                    border-radius: 40px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.05);
                    padding: 30px;
                    direction: rtl;
                    font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'Urdu Typesetting', serif;
                    border: 1px solid #eef2f6;
                    animation: fadeInUp 0.8s ease;
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Section Title */
                .section-title {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin-bottom: 25px;
                    padding-bottom: 10px;
                    border-bottom: 3px solid #e2e8f0;
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
                }
                
                /* Navigation Grid */
                .nav-section {
                    margin-bottom: 35px;
                }
                
                .nav-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 12px;
                }
                
                .nav-btn {
                    padding: 12px 15px;
                    border-radius: 40px;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                    color: white;
                    font-size: 16px;
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
                    transform: translateY(-5px) scale(1.02);
                    box-shadow: 0 15px 25px rgba(0,0,0,0.2);
                }
                
                .nav-btn:active {
                    transform: scale(0.95);
                }
                
                .nav-icon {
                    font-size: 20px;
                    filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.2));
                }
                
                .nav-text {
                    font-size: 16px;
                    font-weight: 500;
                }
                
                /* Reactions Grid */
                .reactions-section {
                    margin-bottom: 35px;
                }
                
                .reactions-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 15px;
                }
                
                .reaction-item {
                    width: 100%;
                }
                
                .reaction-btn {
                    width: 100%;
                    background: white;
                    border: 2px solid;
                    border-radius: 25px;
                    padding: 15px 8px;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
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
                    transform: translateY(-5px) scale(1.02);
                    box-shadow: 0 15px 25px rgba(0,0,0,0.15);
                }
                
                .reaction-emoji {
                    font-size: 36px;
                    filter: drop-shadow(2px 4px 4px rgba(0,0,0,0.1));
                    animation: pulse 2s infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                .reaction-text {
                    font-size: 18px;
                    font-weight: 500;
                    text-align: center;
                    font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif;
                }
                
                .reaction-count {
                    padding: 4px 12px;
                    border-radius: 30px;
                    font-size: 16px;
                    font-weight: bold;
                    min-width: 30px;
                    text-align: center;
                    font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif;
                }
                
                /* Social Grid */
                .share-section {
                    background: #f8fafc;
                    border-radius: 30px;
                    padding: 25px;
                }
                
                .social-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
                    gap: 12px;
                    margin-bottom: 20px;
                }
                
                .social-btn {
                    padding: 12px 15px;
                    border-radius: 40px;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                    color: white;
                    font-size: 16px;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    position: relative;
                    overflow: hidden;
                }
                
                .social-btn::before {
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
                
                .social-btn:hover::before {
                    width: 300px;
                    height: 300px;
                }
                
                .social-btn:hover {
                    transform: translateY(-5px) scale(1.02);
                    box-shadow: 0 15px 25px rgba(0,0,0,0.2);
                }
                
                .social-icon {
                    font-size: 18px;
                    filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.2));
                }
                
                .social-name {
                    font-size: 14px;
                    font-weight: 500;
                }
                
                /* Copy Link Button */
                .copy-link-section {
                    text-align: center;
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 2px dashed #e2e8f0;
                }
                
                .copy-link-btn {
                    background: linear-gradient(135deg, #1e293b, #334155);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 50px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 18px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    position: relative;
                    overflow: hidden;
                }
                
                .copy-link-btn::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.2);
                    transform: translate(-50%, -50%);
                    transition: width 0.6s, height 0.6s;
                }
                
                .copy-link-btn:hover::before {
                    width: 300px;
                    height: 300px;
                }
                
                .copy-link-btn:hover {
                    transform: translateY(-5px) scale(1.02);
                    box-shadow: 0 15px 25px rgba(0,0,0,0.2);
                }
                
                .copy-icon {
                    font-size: 20px;
                }
                
                .copy-text {
                    font-size: 18px;
                    font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif;
                }
                
                /* Responsive */
                @media (max-width: 768px) {
                    .reactions-wrapper { padding: 20px; margin: 20px 10px; }
                    
                    .nav-grid { grid-template-columns: repeat(2, 1fr); }
                    .reactions-grid { grid-template-columns: repeat(2, 1fr); }
                    .social-grid { grid-template-columns: repeat(2, 1fr); }
                    
                    .title-text { font-size: 20px; }
                    .nav-text { font-size: 14px; }
                    .reaction-text { font-size: 16px; }
                }
                
                @media (max-width: 480px) {
                    .nav-grid { grid-template-columns: 1fr; }
                    .reactions-grid { grid-template-columns: 1fr; }
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
