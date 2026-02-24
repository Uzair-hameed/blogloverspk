// reactions.js - Bloglovers.pk
(function() {
    'use strict';
    
    if (document.getElementById('bloglovers-reactions')) return;
    
    // ========== FIREBASE SETUP ==========
    const firebaseConfig = {
        apiKey: "AIzaSyDkB7FCubEwLko8-M0E_XbYcc52RjCbq4Y",
        authDomain: "bloglovers-reactions.firebaseapp.com",
        databaseURL: "https://bloglovers-reactions-default-rtdb.firebaseio.com",
        projectId: "bloglovers-reactions",
        storageBucket: "bloglovers-reactions.firebasestorage.app",
        messagingSenderId: "234362795204",
        appId: "1:234362795204:web:da28aef4c7e06bc13f8591"
    };
    
    // Firebase initialize
    if (!window.firebaseApp) {
        firebase.initializeApp(firebaseConfig);
        window.firebaseApp = true;
    }
    
    const database = firebase.database();
    
    // ========== GET PAGE INFO ==========
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(p => p);
    const currentCategory = pathParts[0] || '';
    const currentPost = pathParts[1] || 'index';
    const pageId = currentCategory + '-' + currentPost;
    
    // ========== CATEGORY NAMES ==========
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
    let reactionsData = {
        '👍': 0, '❤️': 0, '😊': 0, '😢': 0, '👏': 0, '🤔': 0
    };
    
    // Firebase سے ڈیٹا لینا
    const reactionsRef = database.ref('reactions/' + pageId);
    reactionsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            reactionsData = data;
            updateCounts();
        }
    });
    
    window.addReaction = function(emoji) {
        reactionsData[emoji] = (reactionsData[emoji] || 0) + 1;
        reactionsRef.set(reactionsData);
        
        const span = document.getElementById('count-' + emoji);
        if (span) span.textContent = reactionsData[emoji];
        
        const btn = event.currentTarget;
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => { btn.style.transform = 'scale(1)'; }, 200);
    };
    
    function updateCounts() {
        const emojis = ['👍', '❤️', '😊', '😢', '👏', '🤔'];
        emojis.forEach(emoji => {
            const span = document.getElementById('count-' + emoji);
            if (span) span.textContent = reactionsData[emoji] || 0;
        });
    }
    
    // ========== REACTIONS BUTTONS ==========
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
            <button class="reaction-btn" onclick="addReaction('${r.emoji}')" style="
                background: white;
                border: 2px solid ${r.color};
                border-radius: 40px;
                padding: 10px 15px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 18px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            ">
                <span style="font-size: 24px;">${r.emoji}</span>
                <span style="color: ${r.color};">${r.text}</span>
                <span id="count-${r.emoji}" style="
                    background: ${r.color};
                    color: white;
                    padding: 2px 12px;
                    border-radius: 20px;
                ">${reactionsData[r.emoji]}</span>
            </button>
        `;
    });
    
    // ========== NAVIGATION BUTTONS ==========
    const navHTML = `
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
            <a href="https://bloglovers.pk/" style="background: #4f46e5; color: white; padding: 8px 15px; border-radius: 30px; text-decoration: none;">🏠 مرکزی صفحہ</a>
            
            <a href="https://bloglovers.pk/category-pages" style="background: #7c3aed; color: white; padding: 8px 15px; border-radius: 30px; text-decoration: none;">📚 تمام اقسام</a>
            
            ${currentCategory ? `
            <a href="https://bloglovers.pk/${currentCategory}" style="background: #059669; color: white; padding: 8px 15px; border-radius: 30px; text-decoration: none;">
                📂 ${categoryName}
            </a>
            ` : ''}
            
            <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" style="background: #b45309; color: white; padding: 8px 15px; border-radius: 30px; border: none; cursor: pointer;">⬆️ اوپر</button>
            
            <button onclick="window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})" style="background: #6b7280; color: white; padding: 8px 15px; border-radius: 30px; border: none; cursor: pointer;">⬇️ نیچے</button>
        </div>
    `;
    
    // ========== SOCIAL BUTTONS ==========
    const socialHTML = `
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin: 20px 0;">
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" style="background: #1877f2; color: white; width: 45px; height: 45px; border-radius: 25px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 24px;">📘</a>
            
            <a href="https://wa.me/?text=${encodeURIComponent(document.title + ' ' + window.location.href)}" target="_blank" style="background: #25D366; color: white; width: 45px; height: 45px; border-radius: 25px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 24px;">📱</a>
            
            <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}" target="_blank" style="background: #1DA1F2; color: white; width: 45px; height: 45px; border-radius: 25px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 24px;">🐦</a>
            
            <button onclick="navigator.clipboard.writeText(window.location.href).then(() => alert('✅ لنک کاپی ہو گیا'))" style="background: #6c757d; color: white; width: 45px; height: 45px; border-radius: 25px; border: none; cursor: pointer; font-size: 24px;">🔗</button>
        </div>
    `;
    
    // ========== MAIN HTML ==========
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
            <!-- Firebase Script -->
            <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
            <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>
            
            ${navHTML}
            
            <h3 style="text-align: center; font-size: 28px; color: #1e293b; margin: 20px 0;">
                😊 اس تحریر پر اپنا ردعمل دیں
            </h3>
            
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                ${reactionsHTML}
            </div>
            
            ${socialHTML}
            
            <p style="text-align: center; color: #64748b; margin-top: 15px;">
                💡 Firebase میں محفوظ ہو رہا ہے
            </p>
        </div>
    `;
    
    // ========== ADD TO PAGE ==========
    const target = document.querySelector('article') || 
                   document.querySelector('.post-content') || 
                   document.querySelector('.entry-content') ||
                   document.querySelector('main') ||
                   document.body;
    
    if (target) {
        const div = document.createElement('div');
        div.innerHTML = html;
        target.appendChild(div.firstElementChild);
    }
    
})();
