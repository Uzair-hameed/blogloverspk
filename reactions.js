// reactions.js - Bloglovers.pk اردو Reactions
(function() {
    'use strict';
    
    // پہلے سے موجود ہے تو نہ کریں
    if (document.getElementById('bloglovers-reactions')) return;
    
    // موجودہ صفحہ کی ID (URL سے)
    const pageId = window.location.pathname.replace(/\//g, '-') || 'homepage';
    
    // Reactions ڈیٹا لوڈ کریں (LocalStorage سے)
    let reactionsData = {};
    
    try {
        const saved = localStorage.getItem(`reactions_${pageId}`);
        if (saved) {
            reactionsData = JSON.parse(saved);
        } else {
            // ڈیفالٹ reactions - اردو میں
            reactionsData = {
                '👍': 0,
                '❤️': 0,
                '😊': 0,
                '😢': 0,
                '👏': 0,
                '🤔': 0
            };
        }
    } catch (e) {
        reactionsData = {
            '👍': 0,
            '❤️': 0,
            '😊': 0,
            '😢': 0,
            '👏': 0,
            '🤔': 0
        };
    }
    
    // Reactions کو محفوظ کریں
    function saveReactions() {
        try {
            localStorage.setItem(`reactions_${pageId}`, JSON.stringify(reactionsData));
        } catch (e) {
            console.log('Save error:', e);
        }
    }
    
    // Reaction شامل کریں
    function addReaction(emoji) {
        reactionsData[emoji] = (reactionsData[emoji] || 0) + 1;
        saveReactions();
        updateDisplay();
    }
    
    // Display اپ ڈیٹ کریں
    function updateDisplay() {
        const buttons = document.querySelectorAll('.reaction-btn');
        buttons.forEach(btn => {
            const emoji = btn.getAttribute('data-emoji');
            const countSpan = btn.querySelector('.reaction-count');
            if (countSpan) {
                countSpan.textContent = reactionsData[emoji] || 0;
            }
        });
    }
    
    // Reactions HTML بنائیں - اردو متن کے ساتھ
    function createReactionsHTML() {
        // اردو میں reactions کے نام
        const reactions = [
            { emoji: '👍', text: 'پسند آیا' },
            { emoji: '❤️', text: 'دل کو چھو لیا' },
            { emoji: '😊', text: 'بہت اچھا' },
            { emoji: '😢', text: 'دل غمگین ہوا' },
            { emoji: '👏', text: 'واہ واہ' },
            { emoji: '🤔', text: 'سوچنے پر مجبور' }
        ];
        
        let buttonsHTML = '';
        
        reactions.forEach(reaction => {
            buttonsHTML += `
                <button class="reaction-btn" data-emoji="${reaction.emoji}" onclick="(function(){
                    const emoji = this.getAttribute('data-emoji');
                    const countSpan = this.querySelector('.reaction-count');
                    const currentCount = parseInt(countSpan.textContent) || 0;
                    countSpan.textContent = currentCount + 1;
                    
                    // LocalStorage میں محفوظ کریں
                    let data = {};
                    try {
                        data = JSON.parse(localStorage.getItem('reactions_${pageId}')) || {};
                    } catch(e) {}
                    data[emoji] = (data[emoji] || 0) + 1;
                    localStorage.setItem('reactions_${pageId}', JSON.stringify(data));
                }).call(this)">
                    <span style="font-size: 28px; margin-left: 8px;">${reaction.emoji}</span>
                    <span style="font-size: 16px; font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', sans-serif;">${reaction.text}</span>
                    <span class="reaction-count" style="font-size: 16px; background: #e2e8f0; padding: 2px 8px; border-radius: 20px; margin-right: 8px;">${reactionsData[reaction.emoji] || 0}</span>
                </button>
            `;
        });
        
        return `
            <div style="margin: 50px 0 30px 0; padding: 30px; background: #ffffff; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); direction: rtl; font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', 'Urdu Typesetting', sans-serif;">
                
                <!-- سوشل میڈیا بٹنز - اردو میں -->
                <div style="margin-bottom: 40px; text-align: center;">
                    <h3 style="font-size: 32px; color: #1e293b; margin-bottom: 25px; border-bottom: 3px solid #667eea; padding-bottom: 10px; display: inline-block;">
                        📱 اس تحریر کو شیئر کریں
                    </h3>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" 
                           target="_blank" 
                           style="background: #1877f2; color: white; padding: 12px 30px; border-radius: 50px; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; font-size: 20px;">
                           <span style="font-size: 24px;">📘</span> فیس بک
                        </a>
                        <a href="https://wa.me/?text=${encodeURIComponent(document.title + ' ' + window.location.href)}" 
                           target="_blank" 
                           style="background: #25D366; color: white; padding: 12px 30px; border-radius: 50px; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; font-size: 20px;">
                           <span style="font-size: 24px;">📱</span> واٹس ایپ
                        </a>
                        <button onclick="navigator.clipboard.writeText(window.location.href).then(() => alert('✅ لنک کاپی ہو گیا!'))"
                           style="background: #6c757d; color: white; padding: 12px 30px; border-radius: 50px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 10px; font-size: 20px;">
                           <span style="font-size: 24px;">🔗</span> لنک کاپی کریں
                        </button>
                    </div>
                </div>
                
                <!-- Reactions Section - اردو میں -->
                <div style="margin-top: 40px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 35px 25px; border-radius: 20px; text-align: center;">
                    <h3 style="font-size: 36px; color: #1e293b; margin-bottom: 30px;">
                        😊 اس تحریر پر اپنا ردعمل دیں
                    </h3>
                    
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        ${buttonsHTML}
                    </div>
                    
                    <p style="text-align: center; color: #475569; margin-top: 25px; font-size: 18px;">
                        💡 بغیر لاگ ان کے ردعمل دیں - آپ کے براؤزر میں محفوظ ہو جائے گا
                    </p>
                </div>
            </div>
            
            <style>
                .reaction-btn {
                    background: white;
                    border: 2px solid #cbd5e1;
                    border-radius: 60px;
                    padding: 15px 25px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    transition: all 0.3s ease;
                    font-size: 18px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                    direction: rtl;
                    font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', sans-serif;
                }
                .reaction-btn:hover {
                    transform: translateY(-5px);
                    border-color: #667eea;
                    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.2);
                }
                .reaction-count {
                    background: #e2e8f0;
                    padding: 4px 12px;
                    border-radius: 25px;
                    font-weight: bold;
                    color: #1e293b;
                }
                @media (max-width: 768px) {
                    .reaction-btn {
                        width: 100%;
                        justify-content: center;
                        padding: 15px;
                    }
                    #bloglovers-reactions h3 {
                        font-size: 28px !important;
                    }
                }
            </style>
        `;
    }
    
    // Reactions سیکشن شامل کریں
    function addReactionsSection() {
        const postContent = document.querySelector('article') || 
                           document.querySelector('.post-content') || 
                           document.querySelector('.entry-content') ||
                           document.querySelector('main') ||
                           document.body;
        
        if (!postContent) return;
        
        const section = document.createElement('div');
        section.id = 'bloglovers-reactions';
        section.innerHTML = createReactionsHTML();
        postContent.appendChild(section);
        
        console.log('✅ Reactions section added - اردو میں');
    }
    
    // صفحہ لوڈ ہونے کے بعد
    if (document.readyState === 'complete') {
        addReactionsSection();
    } else {
        window.addEventListener('load', addReactionsSection);
    }
    
})();
