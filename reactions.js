// reactions.js - بلوگرز ڈاٹ پی کے (انتہائی سادہ)
(function() {
    'use strict';
    
    // سیدھا باکس بنا دو
    const box = document.createElement('div');
    box.style.cssText = 'margin:40px auto; padding:30px; background:white; border-radius:30px; direction:rtl; max-width:800px; box-shadow:0 10px 30px rgba(0,0,0,0.1);';
    box.innerHTML = `
        <h3 style="text-align:center;">😊 ردعمل دیں</h3>
        <div style="display:flex; gap:10px; justify-content:center;">
            <button onclick="alert('👍')" style="padding:10px 20px;">👍 عمدہ</button>
            <button onclick="alert('❤️')" style="padding:10px 20px;">❤️ دلچسپ</button>
            <button onclick="alert('😊')" style="padding:10px 20px;">😊 مفید</button>
        </div>
    `;
    
    // پوسٹ کے آخر میں شامل کریں
    document.body.appendChild(box);
})();
