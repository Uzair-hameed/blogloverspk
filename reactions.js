// reactions.js - Blog Lovers PK - Complete Reaction System with Database Backup

(function() {
    'use strict';
    
    // Worker API URL
    const WORKER_API = 'https://aged-unit-8ce7.uzairhameed01.workers.dev';
    
    // Get current page slug from URL
    function getCurrentPageSlug() {
        const path = window.location.pathname;
        // Remove leading slash and .html extension
        let slug = path.replace(/^\//, '').replace(/\.html$/, '');
        if (slug === '' || slug === '/') slug = 'home';
        return slug;
    }
    
    // Reaction emoji mapping (Urdu names to emojis)
    const reactionEmojiMap = {
        'عمدہ': '🏆',
        'دلچسپ': '✨',
        'مفید': '📚',
        'قابل غور': '💭',
        'سوچ بچار': '🤔',
        'شاندار': '🌟',
        'زبردست': '💪'
    };
    
    // Reverse mapping (emoji to Urdu name)
    const reactionNameMap = {
        '🏆': 'عمدہ',
        '✨': 'دلچسپ',
        '📚': 'مفید',
        '💭': 'قابل غور',
        '🤔': 'سوچ بچار',
        '🌟': 'شاندار',
        '💪': 'زبردست'
    };
    
    // Save reaction to database
    async function saveReactionToDatabase(pageId, emoji) {
        try {
            const response = await fetch(`${WORKER_API}/api/save-reaction`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    page_id: pageId, 
                    emoji: emoji 
                })
            });
            const result = await response.json();
            return result.success === true;
        } catch (error) {
            console.error('Save reaction error:', error);
            return false;
        }
    }
    
    // Load all reactions for this page from the aggregated stats
    async function loadAllReactions() {
        try {
            const response = await fetch(`${WORKER_API}/api/home-stats`);
            if (!response.ok) throw new Error('API response not ok');
            const result = await response.json();
            
            if (result.success && result.data && result.data.reactions) {
                const reactions = result.data.reactions;
                
                // Update counts on page
                if (document.getElementById('count-عمدہ')) {
                    document.getElementById('count-عمدہ').innerText = reactions.excellent || 0;
                    document.getElementById('count-دلچسپ').innerText = reactions.interesting || 0;
                    document.getElementById('count-مفید').innerText = reactions.useful || 0;
                    document.getElementById('count-قابل غور').innerText = reactions.thoughtful || 0;
                    document.getElementById('count-سوچ بچار').innerText = reactions.contemplative || 0;
                    document.getElementById('count-شاندار').innerText = reactions.wonderful || 0;
                    document.getElementById('count-زبردست').innerText = reactions.awesome || 0;
                }
                
                console.log('✅ Reactions loaded:', reactions);
                return reactions;
            }
        } catch (error) {
            console.error('Load reactions error:', error);
        }
        return null;
    }
    
    // Main reaction click handler
    window.reactionClick = async function(reactionName) {
        const pageId = getCurrentPageSlug();
        const emoji = reactionEmojiMap[reactionName];
        
        if (!emoji) {
            console.error('Unknown reaction:', reactionName);
            return;
        }
        
        // Get the button element for visual feedback
        const buttons = document.querySelectorAll('.reaction-btn');
        let targetBtn = null;
        for (let btn of buttons) {
            if (btn.innerText.includes(reactionName)) {
                targetBtn = btn;
                break;
            }
        }
        
        // Visual feedback - button press effect
        if (targetBtn) {
            targetBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                targetBtn.style.transform = 'scale(1)';
            }, 150);
        }
        
        // Save to database
        const saved = await saveReactionToDatabase(pageId, emoji);
        
        if (saved) {
            // Show success toast
            showToast('شکریہ! آپ کا ری ایکشن محفوظ ہو گیا ❤️', 'success');
            
            // Reload all reactions to show updated counts
            await loadAllReactions();
        } else {
            // Fallback: still update local count
            const countSpan = document.getElementById(`count-${reactionName}`);
            if (countSpan) {
                const current = parseInt(countSpan.innerText) || 0;
                countSpan.innerText = current + 1;
            }
            showToast('ری ایکشن محفوظ ہو گیا!', 'info');
        }
    };
    
    // Toast notification function
    function showToast(message, type = 'success') {
        // Remove existing toast
        const existingToast = document.querySelector('.reaction-toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = 'reaction-toast';
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            color: white;
            padding: 10px 20px;
            border-radius: 50px;
            z-index: 10000;
            font-size: 14px;
            font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif;
            direction: rtl;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            border-right: 3px solid ${type === 'success' ? '#00ff88' : '#00f2ff'};
            animation: slideUpToast 0.3s ease;
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
    
    // Add toast animation style if not exists
    if (!document.querySelector('#reaction-toast-style')) {
        const style = document.createElement('style');
        style.id = 'reaction-toast-style';
        style.textContent = `
            @keyframes slideUpToast {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Share functions
    window.shareOnSocial = function(platform) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        let shareUrl = '';
        
        if (platform === 'facebook') {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        } else if (platform === 'whatsapp') {
            shareUrl = `https://wa.me/?text=${title}%20${url}`;
        } else if (platform === 'twitter') {
            shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        } else if (platform === 'linkedin') {
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        } else if (platform === 'telegram') {
            shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
        } else if (platform === 'pinterest') {
            shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
            
            // Also record share count to database
            fetch(`${WORKER_API}/api/share-site`, { method: 'POST' }).catch(console.error);
        }
    };
    
    window.copyPageLink = function() {
        navigator.clipboard.writeText(window.location.href);
        showToast('لنک کاپی ہو گیا! اب آپ کہیں بھی شیئر کر سکتے ہیں', 'success');
        
        // Record share count
        fetch(`${WORKER_API}/api/share-site`, { method: 'POST' }).catch(console.error);
    };
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadAllReactions();
            console.log('✅ reactions.js loaded and initialized');
        });
    } else {
        loadAllReactions();
        console.log('✅ reactions.js loaded and initialized');
    }
})();
