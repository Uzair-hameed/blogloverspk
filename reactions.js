// reactions.js - بلوگرز ڈاٹ پی کے (Firebase)
(function() {
    'use strict';
    
    console.log("✅ reactions.js loaded");
    
    if (document.getElementById('bloglovers-reactions')) return;
    
    // ========== FIREBASE CONFIG ==========
    const firebaseConfig = {
        apiKey: "AIzaSyDkB7FCubEwLko8-M0E_XbYcc52RjCbq4Y",
        authDomain: "bloglovers-reactions.firebaseapp.com",
        databaseURL: "https://bloglovers-reactions-default-rtdb.firebaseio.com",
        projectId: "bloglovers-reactions",
        storageBucket: "bloglovers-reactions.firebasestorage.app",
        messagingSenderId: "234362795204",
        appId: "1:234362795204:web:da28aef4c7e06bc13f8591"
    };
    
    // Firebase Initialize
    if (!window.firebaseApp) {
        firebase.initializeApp(firebaseConfig);
        window.firebaseApp = true;
        console.log("✅ Firebase initialized");
    }
    
    const database = firebase.database();
    
    // ========== PAGE INFO ==========
    const pathParts = window.location.pathname.split('/');
    const category = pathParts[1] || 'home';
    const postSlug = pathParts[2] || 'index';
    const pageId = category + '-' + postSlug;
    
    console.log("📄 Page ID:", pageId);
    
    // ========== REACTIONS DATA ==========
    let reactionsData = {
        '👍': 0, '❤️': 0, '😊': 0, '😢': 0, '👏': 0
    };
    
    // Firebase سے ڈیٹا لینا
    const reactionsRef = database.ref('reactions/' + pageId);
    reactionsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            reactionsData = data;
            updateCounts();
            console.log("📊 Data loaded from Firebase:", data);
        }
    });
    
    // ========== ADD REACTION ==========
    window.addReaction = function(emoji) {
        reactionsData[emoji] = (reactionsData[emoji] || 0) + 1;
        reactionsRef.set(reactionsData);
        
        const span = document.getElementById('count-' + emoji);
        if (span) span.innerText = reactionsData[emoji];
        
        const btn = event.currentTarget;
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
        
        console.log("👍 Reaction added:", emoji, reactionsData[emoji]);
    };
    
    function updateCounts() {
        const emojis = ['👍', '❤️', '😊', '😢', '👏'];
        emojis.forEach(emoji => {
            const span = document.getElementById('count-' + emoji);
            if (span) span.innerText = reactionsData[emoji] || 0;
        });
    }
    
    // ========== CATEGORY NAMES ==========
    const catNames = {
        'alamaat-kubra': 'علامات کبری',
        'alamaat-sughra': 'علامات صغری',
        'aqwal': 'اقوال',
        'azkar': 'اذکار',
        'islami-sawalat': 'اسلامی سوالات',
        'islami-taleemat': 'اسلامی تعلیمات',
        'kids': 'بچوں کی دنیا',
        'english-adab': 'انگریزی ادب'
    };
    
    const catName = catNames[category] || category.replace(/-/g, ' ');
    
    // ========== HTML ==========
    const html = `
        <div id="bloglovers-reactions" style="
            margin: 40px auto;
            padding: 25px;
            background: white;
            border-radius: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            direction: rtl;
            max-width: 800px;
            font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', sans-serif;
        ">
            <!-- Firebase Scripts -->
            <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
            <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>
            
            <!-- Navigation -->
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 25px;">
                <a href="https://bloglovers.pk/" style="background: #4f46e5; color: white; padding: 8px 20px; border-radius: 40px; text-decoration: none;">🏠 مرکزی صفحہ</a>
                
                <a href="https://bloglovers.pk/category-pages" style="background: #7c3aed; color: white; padding: 8px 20px; border-radius: 40px; text-decoration: none;">📚 تمام اقسام</a>
                
                ${category ? `
                <a href="https://bloglovers.pk/${category}" style="background: #059669; color: white; padding: 8px 20px; border-radius: 40px; text-decoration: none;">
                    📂 ${catName}
                </a>
                ` : ''}
                
                <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" style="background: #b45309; color: white; padding: 8px 20px; border-radius: 40px; border: none; cursor: pointer;">⬆️ اوپر</button>
                
                <button onclick="window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})" style="background: #6b7280; color: white; padding: 8px 20px; border-radius: 40px; border: none; cursor: pointer;">⬇️ نیچے</button>
            </div>
            
            <!-- Title -->
            <h3 style="text-align: center; font-size: 28px; color: #1e293b; margin-bottom: 20px;">
                😊 اس تحریر پر اپنا ردعمل دیں
            </h3>
            
            <!-- Reactions -->
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button onclick="addReaction('👍')" style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 50px; padding: 10px 20px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 24px;">👍</span>
                    <span style="color: #3b82f6;">پسند</span>
                    <span id="count-👍" style="background: #3b82f6; color: white; padding: 2px 12px; border-radius: 20px;">${reactionsData['👍']}</span>
                </button>
                
                <button onclick="addReaction('❤️')" style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 50px; padding: 10px 20px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 24px;">❤️</span>
                    <span style="color: #ef4444;">محبت</span>
                    <span id="count-❤️" style="background: #ef4444; color: white; padding: 2px 12px; border-radius: 20px;">${reactionsData['❤️']}</span>
                </button>
                
                <button onclick="addReaction('😊')" style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 50px; padding: 10px 20px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 24px;">😊</span>
                    <span style="color: #f59e0b;">اچھا</span>
                    <span id="count-😊" style="background: #f59e0b; color: white; padding: 2px 12px; border-radius: 20px;">${reactionsData['😊']}</span>
                </button>
                
                <button onclick="addReaction('😢')" style="background: #f3f4f6; border: 2px solid #6b7280; border-radius: 50px; padding: 10px 20px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 24px;">😢</span>
                    <span style="color: #6b7280;">غم</span>
                    <span id="count-😢" style="background: #6b7280; color: white; padding: 2px 12px; border-radius: 20px;">${reactionsData['😢']}</span>
                </button>
                
                <button onclick="addReaction('👏')" style="background: #ede9fe; border: 2px solid #8b5cf6; border-radius: 50px; padding: 10px 20px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 24px;">👏</span>
                    <span style="color: #8b5cf6;">واہ</span>
                    <span id="count-👏" style="background: #8b5cf6; color: white; padding: 2px 12px; border-radius: 20px;">${reactionsData['👏']}</span>
                </button>
            </div>
            
            <!-- Social Media -->
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 25px;">
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" style="background: #1877f2; color: white; width: 45px; height: 45px; border-radius: 25px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 24px;">📘</a>
                
                <a href="https://wa.me/?text=${encodeURIComponent(document.title + ' ' + window.location.href)}" target="_blank" style="background: #25D366; color: white; width: 45px; height: 45px; border-radius: 25px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 24px;">📱</a>
                
                <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}" target="_blank" style="background: #1DA1F2; color: white; width: 45px; height: 45px; border-radius: 25px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 24px;">🐦</a>
                
                <button onclick="navigator.clipboard.writeText(window.location.href).then(() => alert('✅ لنک کاپی ہو گیا'))" style="background: #6c757d; color: white; width: 45px; height: 45px; border-radius: 25px; border: none; cursor: pointer; font-size: 24px;">🔗</button>
            </div>
            
            <!-- Firebase Status -->
            <p style="text-align: center; color: #059669; margin-top: 15px; font-size: 14px; font-weight: bold;">
                🔥 Firebase سے منسلک - ڈیٹا محفوظ ہو رہا ہے
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
        console.log("✅ Reactions added with Firebase");
    }
    
})();
