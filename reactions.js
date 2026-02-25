// reactions.js - بلوگرز ڈاٹ پی کے (صرف API)
(function() {
    'use strict';
    
    // Cloudflare Worker URL (پروٹوکول-ریلیٹیو)
    const API_URL = '//aged-unit-8ce7.uzairhameed01.workers.dev';
    const pageId = window.location.pathname.replace(/\//g, '-');
    
    // ========== CLOUDFLARE سے ڈیٹا لوڈ کریں ==========
    async function loadReactions() {
        try {
            const response = await fetch(`${API_URL}?pageId=${pageId}`);
            if (response.ok) {
                const counts = await response.json();
                // counts کو اپ ڈیٹ کریں
                Object.keys(counts).forEach(emoji => {
                    const el = document.getElementById(`count-${emoji}`);
                    if (el) el.innerText = counts[emoji];
                });
            }
        } catch (e) {
            console.log('Load error:', e);
        }
    }
    
    // ========== ری ایکشن کلک کرنے پر ==========
    window.reactionClick = async function(emoji) {
        // count اپ ڈیٹ کریں
        const el = document.getElementById(`count-${emoji}`);
        if (el) {
            const newCount = parseInt(el.innerText) + 1;
            el.innerText = newCount;
            
            // Cloudflare میں محفوظ کریں
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pageId, emoji })
            });
        }
    };
    
    // ========== شروع کریں ==========
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadReactions);
    } else {
        loadReactions();
    }
    
    console.log('✅ reactions.js loaded - API only');
})();
