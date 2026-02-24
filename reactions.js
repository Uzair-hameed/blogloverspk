// reactions.js - Bloglovers.pk سادہ
(function() {
    'use strict';
    
    if (document.getElementById('bloglovers-reactions')) return;
    
    const pageId = window.location.pathname.replace(/\//g, '-') || 'homepage';
    
    let reactionsData = {
        '👍': 0, '❤️': 0, '😊': 0, '😢': 0, '👏': 0, '🤔': 0
    };
    
    try {
        const saved = localStorage.getItem(`reactions_${pageId}`);
        if (saved) reactionsData = JSON.parse(saved);
    } catch(e) {}
    
    window.addReaction = function(emoji) {
        reactionsData[emoji] = (reactionsData[emoji] || 0) + 1;
        localStorage.setItem(`reactions_${pageId}`, JSON.stringify(reactionsData));
        
        const btns = document.querySelectorAll('.reaction-btn');
        btns.forEach(btn => {
            const btnEmoji = btn.getAttribute('data-emoji');
            const countSpan = btn.querySelector('.count');
            if (btnEmoji === emoji && countSpan) {
                countSpan.textContent = reactionsData[emoji];
            }
        });
        
        alert('✅ ردعمل محفوظ ہو گیا');
    };
    
    const reactions = [
        { emoji: '👍', text: 'پسند آیا', color: '#3b82f6' },
        { emoji: '❤️', text: 'دل کو چھو لیا', color: '#ef4444' },
        { emoji: '😊', text: 'بہت اچھا', color: '#f59e0b' },
        { emoji: '😢', text: 'دل غمگین ہوا', color: '#6b7280' },
        { emoji: '👏', text: 'واہ واہ', color: '#8b5cf6' },
        { emoji: '🤔', text: 'سوچنے پر مجبور', color: '#14b8a6' }
    ];
    
    let btns = '';
    reactions.forEach(r => {
        btns += `
            <button class="reaction-btn" data-emoji="${r.emoji}" onclick="addReaction('${r.emoji}')" style="
                background: white;
                border: 2px solid ${r.color};
                border-radius: 40px;
                padding: 12px 20px;
                margin: 5px;
                cursor: pointer;
                font-size: 18px;
                font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', sans-serif;
                display: inline-flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            ">
                <span style="font-size: 26px;">${r.emoji}</span>
                <span style="color: ${r.color};">${r.text}</span>
                <span class="count" style="
                    background: ${r.color};
                    color: white;
                    padding: 4px 12px;
                    border-radius: 25px;
                    font-size: 16px;
                ">${reactionsData[r.emoji]}</span>
            </button>
        `;
    });
    
    const html = `
        <div id="bloglovers-reactions" style="
            margin: 40px auto;
            padding: 25px;
            background: linear-gradient(135deg, #ffffff, #f8fafc);
            border-radius: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            direction: rtl;
            text-align: center;
            max-width: 900px;
        ">
            <h3 style="
                color: #1e293b;
                font-size: 30px;
                margin-bottom: 25px;
                font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', sans-serif;
            ">
                😊 اس تحریر پر اپنا ردعمل دیں
            </h3>
            
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                ${btns}
            </div>
            
            <p style="color: #64748b; margin-top: 20px; font-size: 16px;">
                💡 آپ کا ردعمل آپ کے براؤزر میں محفوظ ہو گا
            </p>
        </div>
    `;
    
    const target = document.querySelector('article') || 
                   document.querySelector('.post-content') || 
                   document.querySelector('.entry-content') ||
                   document.querySelector('main') ||
                   document.body;
    
    if (target) {
        const div = document.createElement('div');
        div.innerHTML = html;
        target.appendChild(div.firstElementChild);
        console.log('✅ Reactions Added');
    } else {
        console.log('❌ Target not found');
    }
    
})();
