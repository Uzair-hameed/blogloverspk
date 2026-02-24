// reactions.js - Bloglovers.pk مکمل ورژن
(function() {
    'use strict';
    
    if (document.getElementById('bloglovers-reactions')) return;
    
    // ** Firebase Config **
    const firebaseConfig = {
        apiKey: "AIzaSyDkB7FCubEwLko8-M0E_XbYcc52RjCbq4Y",
        authDomain: "bloglovers-reactions.firebaseapp.com",
        databaseURL: "https://bloglovers-reactions-default-rtdb.firebaseio.com",
        projectId: "bloglovers-reactions",
        storageBucket: "bloglovers-reactions.firebasestorage.app",
        messagingSenderId: "234362795204",
        appId: "1:234362795204:web:da28aef4c7e06bc13f8591",
        measurementId: "G-719BWL84NW"
    };
    
    // Firebase Initialize
    if (!window.firebaseInitialized) {
        firebase.initializeApp(firebaseConfig);
        window.firebaseInitialized = true;
    }
    
    const database = firebase.database();
    const pageId = window.location.pathname.replace(/\//g, '-') || 'homepage';
    
    // Reactions Data
    let reactionsData = {
        '👍': 0, '❤️': 0, '😊': 0, '😢': 0, '👏': 0, '🤔': 0
    };
    
    // Firebase سے ڈیٹا لوڈ کریں
    const reactionsRef = database.ref(`reactions/${pageId}`);
    reactionsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            reactionsData = data;
            updateDisplay();
        }
    });
    
    window.addReaction = function(emoji) {
        reactionsData[emoji] = (reactionsData[emoji] || 0) + 1;
        reactionsRef.set(reactionsData);
        
        updateDisplay();
        
        // اینیمیشن
        const btn = event.currentTarget;
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => { btn.style.transform = 'scale(1)'; }, 200);
    };
    
    function updateDisplay() {
        const btns = document.querySelectorAll('.reaction-btn');
        btns.forEach(btn => {
            const emoji = btn.getAttribute('data-emoji');
            const countSpan = btn.querySelector('.count');
            if (countSpan) {
                countSpan.textContent = reactionsData[emoji] || 0;
            }
        });
    }
    
    // Reactions Array
    const reactions = [
        { emoji: '👍', text: 'پسند آیا', color: '#3b82f6' },
        { emoji: '❤️', text: 'دل کو چھو لیا', color: '#ef4444' },
        { emoji: '😊', text: 'بہت اچھا', color: '#f59e0b' },
        { emoji: '😢', text: 'دل غمگین ہوا', color: '#6b7280' },
        { emoji: '👏', text: 'واہ واہ', color: '#8b5cf6' },
        { emoji: '🤔', text: 'سوچنے پر مجبور', color: '#14b8a6' }
    ];
    
    let reactionsHTML = '';
    reactions.forEach(r => {
        reactionsHTML += `
            <button class="reaction-btn" data-emoji="${r.emoji}" onclick="addReaction('${r.emoji}')" style="
                background: white;
                border: 2px solid ${r.color}40;
                border-radius: 50px;
                padding: 10px 15px;
                cursor: pointer;
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
                min-width: 90px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                transition: all 0.2s;
            ">
                <span style="font-size: 28px;">${r.emoji}</span>
                <span style="color: ${r.color}; font-size: 16px;">${r.text}</span>
                <span class="count" style="
                    background: ${r.color};
                    color: white;
                    padding: 2px 10px;
                    border-radius: 20px;
                    font-size: 14px;
                ">${reactionsData[r.emoji]}</span>
            </button>
        `;
    });
    
    // Navigation Buttons
    const currentPath = window.location.pathname;
    const category = currentPath.split('/')[1] || '';
    
    const navHTML = `
        <div style="
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 25px;
        ">
            <a href="https://bloglovers.pk/" style="
                background: #4f46e5;
                color: white;
                padding: 12px;
                border-radius: 40px;
                text-decoration: none;
                text-align: center;
                font-size: 16px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            ">🏠 مرکزی صفحہ</a>
            
            <a href="https://bloglovers.pk/category-pages" style="
                background: #7c3aed;
                color: white;
                padding: 12px;
                border-radius: 40px;
                text-decoration: none;
                text-align: center;
                font-size: 16px;
            ">📚 تمام اقسام</a>
            
            ${category ? `
            <a href="https://bloglovers.pk/${category}" style="
                background: #059669;
                color: white;
                padding: 12px;
                border-radius: 40px;
                text-decoration: none;
                text-align: center;
                font-size: 16px;
            ">📂 ${category.replace('-', ' ')}</a>
            ` : ''}
            
            <a href="https://bloglovers.pk/contact" style="
                background: #0891b2;
                color: white;
                padding: 12px;
                border-radius: 40px;
                text-decoration: none;
                text-align: center;
                font-size: 16px;
            ">📞 رابطہ</a>
            
            <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" style="
                background: #b45309;
                color: white;
                padding: 12px;
                border-radius: 40px;
                border: none;
                cursor: pointer;
                font-size: 16px;
            ">⬆️ اوپر</button>
            
            <button onclick="window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})" style="
                background: #6b7280;
                color: white;
                padding: 12px;
                border-radius: 40px;
                border: none;
                cursor: pointer;
                font-size: 16px;
            ">⬇️ نیچے</button>
        </div>
    `;
    
    // Social Media Icons
    const socialHTML = `
        <div style="
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin: 25px 0;
        ">
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" style="background: #1877f2; color: white; padding: 15px; border-radius: 30px; text-align: center; font-size: 24px;">📘</a>
            <a href="https://wa.me/?text=${encodeURIComponent(document.title + ' ' + window.location.href)}" target="_blank" style="background: #25D366; color: white; padding: 15px; border-radius: 30px; text-align: center; font-size: 24px;">📱</a>
            <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}" target="_blank" style="background: #1DA1F2; color: white; padding: 15px; border-radius: 30px; text-align: center; font-size: 24px;">🐦</a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank" style="background: #0077b5; color: white; padding: 15px; border-radius: 30px; text-align: center; font-size: 24px;">💼</a>
            <a href="https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}" target="_blank" style="background: #0088cc; color: white; padding: 15px; border-radius: 30px; text-align: center; font-size: 24px;">📨</a>
            <a href="https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(document.title)}" target="_blank" style="background: #bd081c; color: white; padding: 15px; border-radius: 30px; text-align: center; font-size: 24px;">📌</a>
            <a href="https://www.reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(document.title)}" target="_blank" style="background: #ff4500; color: white; padding: 15px; border-radius: 30px; text-align: center; font-size: 24px;">🤖</a>
            <a href="mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(window.location.href)}" style="background: #ea4335; color: white; padding: 15px; border-radius: 30px; text-align: center; font-size: 24px;">📧</a>
            <button onclick="navigator.clipboard.writeText(window.location.href).then(() => alert('✅ لنک کاپی ہو گیا'))" style="background: #6c757d; color: white; padding: 15px; border-radius: 30px; border: none; cursor: pointer; font-size: 24px;">🔗</button>
            <button onclick="window.print()" style="background: #4b5563; color: white; padding: 15px; border-radius: 30px; border: none; cursor: pointer; font-size: 24px;">🖨️</button>
        </div>
    `;
    
    const html = `
        <div id="bloglovers-reactions" style="
            margin: 40px auto;
            padding: 25px;
            background: white;
            border-radius: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            direction: rtl;
            max-width: 900px;
            font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', sans-serif;
        ">
            <!-- Firebase Scripts -->
            <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
            <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>
            
            <!-- Navigation -->
            ${navHTML}
            
            <!-- Reactions -->
            <h3 style="text-align: center; font-size: 28px; margin: 20px 0; color: #1e293b;">
                😊 ردعمل دیں
            </h3>
            
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                ${reactionsHTML}
            </div>
            
            <!-- Social Media -->
            ${socialHTML}
            
            <p style="text-align: center; color: #64748b; margin-top: 15px;">
                💡 ڈیٹا Firebase میں محفوظ ہو رہا ہے
            </p>
            
            <style>
                button:hover, a:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                }
                @media (max-width: 768px) {
                    div[style*="grid-template-columns: repeat(4, 1fr)"] {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    div[style*="grid-template-columns: repeat(5, 1fr)"] {
                        grid-template-columns: repeat(3, 1fr) !important;
                    }
                }
            </style>
        </div>
    `;
    
    const target = document.querySelector('article') || 
                   document.querySelector('.post') || 
                   document.querySelector('.content') || 
                   document.querySelector('main') || 
                   document.body;
    
    if (target) {
        const div = document.createElement('div');
        div.innerHTML = html;
        target.appendChild(div.firstElementChild);
    }
    
})();
