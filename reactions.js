// reactions.js - Blog Lovers PK - Complete Reaction System with Database Backup

(function() {
    'use strict';
    
    // Worker API URL - Updated
    const WORKER_API = 'https://bloglovers-api.uzairhameed01.workers.dev';
    
    // Get current page slug from URL
    function getCurrentPageSlug() {
        const path = window.location.pathname;
        // Remove leading slash and .html extension
        let slug = path.replace(/^\//, '').replace(/\.html$/, '');
        if (slug === '' || slug === '/') slug = 'home';
        return slug;
    }
    
    // Reaction mapping (Urdu names to English keys)
    const reactionKeyMap = {
        'عمدہ': 'excellent',
        'دلچسپ': 'interesting',
        'مفید': 'useful',
        'قابل غور': 'thoughtful',
        'سوچ بچار': 'contemplative',
        'شاندار': 'wonderful',
        'زبردست': 'awesome'
    };
    
    // Reverse mapping (English key to Urdu name)
    const reactionNameMap = {
        'excellent': 'عمدہ',
        'interesting': 'دلچسپ',
        'useful': 'مفید',
        'thoughtful': 'قابل غور',
        'contemplative': 'سوچ بچار',
        'wonderful': 'شاندار',
        'awesome': 'زبردست'
    };
    
    // Reaction emoji mapping
    const reactionEmojiMap = {
        'excellent': '🏆',
        'interesting': '✨',
        'useful': '📚',
        'thoughtful': '💭',
        'contemplative': '🤔',
        'wonderful': '🌟',
        'awesome': '💪'
    };
    
    // Save reaction to database (main page reactions)
    async function saveReactionToDatabase(pageId, emoji) {
        try {
            // For main page (home), use the reaction endpoint
            if (pageId === 'home') {
                const reactionKey = Object.keys(reactionEmojiMap).find(
                    key => reactionEmojiMap[key] === emoji
                );
                
                if (!reactionKey) {
                    console.error('Unknown emoji:', emoji);
                    return false;
                }
                
                const response = await fetch(`${WORKER_API}/api/reaction/${reactionKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });
                const result = await response.json();
                return result.success === true;
            } else {
                // For post pages, use the post-reaction endpoint
                const reactionKey = Object.keys(reactionEmojiMap).find(
                    key => reactionEmojiMap[key] === emoji
                );
                
                if (!reactionKey) {
                    console.error('Unknown emoji:', emoji);
                    return false;
                }
                
                // Get post title and image from page metadata
                const postTitle = document.querySelector('meta[property="og:title"]')?.content || 
                                 document.querySelector('title')?.textContent || 
                                 pageId.replace(/-/g, ' ');
                
                const postImage = document.querySelector('meta[property="og:image"]')?.content || 
                                 `https://bloglovers.pk/images/${pageId}.png`;
                
                const postCategory = document.querySelector('meta[name="category"]')?.content || 
                                    document.querySelector('.post-category')?.textContent?.trim() || 
                                    'general';
                
                const response = await fetch(`${WORKER_API}/api/post-reaction`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        slug: pageId,
                        reaction: reactionKey,
                        title: postTitle,
                        image: postImage,
                        category: postCategory
                    })
                });
                const result = await response.json();
                return result.success === true;
            }
        } catch (error) {
            console.error('Save reaction error:', error);
            return false;
        }
    }
    
    // Load reactions for current page
    async function loadAllReactions() {
        const pageId = getCurrentPageSlug();
        
        try {
            let url;
            if (pageId === 'home') {
                // Main page stats
                url = `${WORKER_API}/api/home-stats`;
            } else {
                // Post reactions
                url = `${WORKER_API}/api/post-reactions/${pageId}`;
            }
            
            const response = await fetch(url);
            if (!response.ok) throw new Error('API response not ok');
            const result = await response.json();
            
            if (result.success && result.data) {
                const reactions = result.data;
                
                // For main page, reactions are in reactions object
                // For posts, reactions are directly in data
                const reactionData = pageId === 'home' ? reactions.reactions : reactions;
                
                // Update counts on page
                if (document.getElementById('count-عمدہ')) {
                    document.getElementById('count-عمدہ').innerText = reactionData.excellent || 0;
                    document.getElementById('count-دلچسپ').innerText = reactionData.interesting || 0;
                    document.getElementById('count-مفید').innerText = reactionData.useful || 0;
                    document.getElementById('count-قابل غور').innerText = reactionData.thoughtful || 0;
                    document.getElementById('count-سوچ بچار').innerText = reactionData.contemplative || 0;
                    document.getElementById('count-شاندار').innerText = reactionData.wonderful || 0;
                    document.getElementById('count-زبردست').innerText = reactionData.awesome || 0;
                }
                
                console.log('✅ Reactions loaded:', reactionData);
                return reactionData;
            }
        } catch (error) {
            console.error('Load reactions error:', error);
        }
        return null;
    }
    
    // Main reaction click handler
    window.reactionClick = async function(reactionName) {
        const pageId = getCurrentPageSlug();
        const reactionKey = reactionKeyMap[reactionName];
        const emoji = reactionEmojiMap[reactionKey];
        
        if (!reactionKey || !emoji) {
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
            // Show success toast with appropriate message
            const message = pageId === 'home' ? 
                'شکریہ! آپ کا ری ایکشن محفوظ ہو گیا ❤️' : 
                'شکریہ! آپ نے اس پوسٹ پر ری ایکشن دیا ❤️';
            showToast(message, 'success');
            
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
    
    // Track post views (only for posts, not home)
    async function trackPostView() {
        const pageId = getCurrentPageSlug();
        if (pageId === 'home') return;
        
        try {
            const response = await fetch(`${WORKER_API}/api/add-post-view`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug: pageId })
            });
            const result = await response.json();
            if (result.success) {
                console.log('✅ Post view tracked:', pageId);
            }
        } catch (error) {
            console.error('Track post view error:', error);
        }
    }
    
    // Track main page view (only for home)
    async function trackMainPageView() {
        const pageId = getCurrentPageSlug();
        if (pageId !== 'home') return;
        
        try {
            const response = await fetch(`${WORKER_API}/api/add-view`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.json();
            if (result.success) {
                console.log('✅ Main page view tracked');
            }
        } catch (error) {
            console.error('Track main page view error:', error);
        }
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadAllReactions();
            trackPostView();
            trackMainPageView();
            console.log('✅ reactions.js loaded and initialized');
            console.log('🔗 API URL:', WORKER_API);
        });
    } else {
        loadAllReactions();
        trackPostView();
        trackMainPageView();
        console.log('✅ reactions.js loaded and initialized');
        console.log('🔗 API URL:', WORKER_API);
    }
})();
