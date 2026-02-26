// reactions.js - بلوگرز ڈاٹ پی کے (کاؤنٹر سپورٹ کے ساتھ)
(function() {
    'use strict';
    
    const API_URL = '//aged-unit-8ce7.uzairhameed01.workers.dev';
    const pageId = window.location.pathname.replace(/\//g, '-');
    
    // Cloudflare سے ڈیٹا لوڈ کریں
    async function loadReactions() {
        try {
            const response = await fetch(`${API_URL}?pageId=${pageId}`);
            if (response.ok) {
                const counts = await response.json();
                Object.keys(counts).forEach(emoji => {
                    const el = document.getElementById(`count-${emoji}`);
                    if (el) el.innerText = counts[emoji];
                });
            }
        } catch (e) {
            console.log('Load error:', e);
        }
    }
    
    // ری ایکشن کلک کرنے پر
    window.reactionClick = async function(emoji) {
        const el = document.getElementById(`count-${emoji}`);
        if (el) {
            const newCount = parseInt(el.innerText || '0') + 1;
            el.innerText = newCount;
            
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pageId, emoji })
            });
        }
    };
    
    // شروع کریں
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadReactions);
    } else {
        loadReactions();
    }
    
    console.log('✅ reactions.js loaded');
})();
