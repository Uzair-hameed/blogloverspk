// reactions.js
(function() {
    alert("✅ ALERT: reactions.js چل رہا ہے");
    
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed; top:0; left:0; right:0; background:red; color:white; padding:20px; text-align:center; z-index:9999; font-size:20px;';
    div.innerText = "🔴 RED TEST: reactions.js کام کر رہا ہے";
    document.body.appendChild(div);
})();
