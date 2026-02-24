// comments.js - Bloglovers.pk فائنل ورژن
(function() {
    'use strict';
    
    // پہلے سے موجود ہے تو نہ کریں
    if (document.getElementById('bloglovers-comments-section')) return;
    
    // موجودہ URL
    const currentUrl = window.location.href;
    
    // Facebook SDK لوڈ کرنے کا آسان طریقہ
    window.fbAsyncInit = function() {
        FB.init({
            xfbml: true,
            version: 'v18.0'
        });
        console.log('✅ Facebook SDK initialized');
    };
    
    // SDK لوڈ کریں
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/ur_PK/sdk.js#xfbml=1&version=v18.0";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
    // کمنٹ سیکشن بنائیں
    function addCommentSection() {
        const postContent = document.querySelector('article') || 
                           document.querySelector('.post-content') || 
                           document.querySelector('.entry-content') ||
                           document.querySelector('main') ||
                           document.body;
        
        if (!postContent) return;
        
        const section = document.createElement('div');
        section.id = 'bloglovers-comments-section';
        
        section.innerHTML = `
            <div style="margin: 50px 0 30px 0; padding: 30px; background: #ffffff; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); direction: rtl;">
                
                <!-- سوشل میڈیا بٹنز -->
                <div style="margin-bottom: 40px; text-align: center;">
                    <h3 style="font-size: 28px; color: #1e293b; margin-bottom: 20px;">📱 اس تحریر کو شیئر کریں</h3>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}" 
                           target="_blank" 
                           style="background: #1877f2; color: white; padding: 12px 30px; border-radius: 50px; text-decoration: none; display: inline-flex; align-items: center; gap: 10px;">
                           📘 فیس بک
                        </a>
                        <a href="https://wa.me/?text=${encodeURIComponent(document.title + ' ' + currentUrl)}" 
                           target="_blank" 
                           style="background: #25D366; color: white; padding: 12px 30px; border-radius: 50px; text-decoration: none; display: inline-flex; align-items: center; gap: 10px;">
                           📱 واٹس ایپ
                        </a>
                        <button onclick="navigator.clipboard.writeText('${currentUrl}').then(() => alert('✅ لنک کاپی ہو گیا!'))"
                           style="background: #6c757d; color: white; padding: 12px 30px; border-radius: 50px; border: none; cursor: pointer;">
                           🔗 کاپی کریں
                        </button>
                    </div>
                </div>
                
                <!-- Facebook Comments -->
                <div style="margin-top: 40px; background: #f8fafc; padding: 25px; border-radius: 15px;">
                    <h3 style="font-size: 28px; color: #1e293b; margin-bottom: 20px; text-align: center;">💬 تبصرے</h3>
                    
                    <div class="fb-comments" 
                         data-href="${currentUrl.split('?')[0].split('#')[0]}" 
                         data-width="100%" 
                         data-numposts="10"
                         data-order-by="reverse_time"
                         data-mobile="true">
                    </div>
                    
                    <p style="text-align: center; color: #64748b; margin-top: 15px; font-size: 14px;">
                        💡 تبصرہ کرنے کے لیے فیس بک میں لاگ ان کریں
                    </p>
                </div>
            </div>
            
            <style>
                .fb-comments, .fb-comments span, .fb-comments iframe {
                    width: 100% !important;
                }
                @media (max-width: 768px) {
                    #bloglovers-comments-section div[style*="gap: 15px"] {
                        flex-direction: column;
                    }
                    #bloglovers-comments-section a, 
                    #bloglovers-comments-section button {
                        width: 100%;
                        justify-content: center;
                    }
                }
            </style>
        `;
        
        postContent.appendChild(section);
        console.log('✅ Comment section added');
    }
    
    // صفحہ مکمل لوڈ ہونے کے بعد اضافہ کریں
    if (document.readyState === 'complete') {
        addCommentSection();
    } else {
        window.addEventListener('load', addCommentSection);
    }
})();
