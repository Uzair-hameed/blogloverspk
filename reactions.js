// reactions.js - Bloglovers.pk Firebase ورژن
(function() {
    'use strict';
    
    if (document.getElementById('bloglovers-reactions')) return;
    
    // ** Firebase Configuration **
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
    firebase.initializeApp(firebaseConfig);
    
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
        
        const btns = document.querySelectorAll('.reaction-btn');
        btns.forEach(btn => {
            const btnEmoji = btn.getAttribute('data-emoji');
            const countSpan = btn.querySelector('.count');
            if (btnEmoji === emoji && countSpan) {
                countSpan.textContent = reactionsData[emoji];
            }
        });
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
                border: 2px solid ${r.color}40;
                border-radius: 50px;
                padding: 12px 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 18px;
                font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', sans-serif;
                transition: all 0.2s;
            ">
                <span style="font-size: 24px;">${r.emoji}</span>
                <span style="color: ${r.color};">${r.text}</span>
                <span class="count" style="
                    background: ${r.color};
                    color: white;
                    padding: 4px 12px;
                    border-radius: 25px;
                    font-size: 14px;
                ">${reactionsData[r.emoji]}</span>
            </button>
        `;
    });
    
    const html = `
        <div id="bloglovers-reactions" style="
            margin: 40px auto;
            padding: 25px;
            background: #ffffff;
            border-radius: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            direction: rtl;
            max-width: 900px;
        ">
            <!-- Firebase Scripts -->
            <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
            <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>
            
            <h3 style="
                text-align: center;
                color: #1e293b;
                font-size: 28px;
                margin-bottom: 25px;
                font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', sans-serif;
            ">😊 اس تحریر پر اپنا ردعمل دیں</h3>
            
            <div style="
                display: flex;
                gap: 10px;
                justify-content: center;
                flex-wrap: wrap;
            ">
                ${btns}
            </div>
            
            <p style="
                text-align: center;
                color: #64748b;
                margin-top: 20px;
                font-size: 14px;
                font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', sans-serif;
            ">
                💡 آپ کا ردعمل محفوظ ہو جائے گا
            </p>
            
            <style>
                .reaction-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                @media (max-width: 600px) {
                    .reaction-btn {
                        width: 100%;
                        justify-content: center;
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
