// comments.js - Bloglovers.pk Final Version
(function() {
    'use strict';
    
    // پہلے سے موجود ہے تو دوبارہ نہ بنائیں
    if (document.getElementById('bloglovers-comments-section')) return;
    
    // Facebook SDK لوڈ کرنے کا بہتر طریقہ
    window.fbAsyncInit = function() {
        FB.init({
            xfbml: true,
            version: 'v18.0'
        });
    };
    
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/ur_PK/sdk.js#xfbml=1&version=v18.0';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
    // کمنٹ سیکشن بنائیں
    function addCommentSection() {
        // پوسٹ کا مواد تلاش کریں
        const postContent = document.querySelector('article') || 
                           document.querySelector('.post-content') || 
                           document.querySelector('.entry-content') ||
                           document.querySelector('main') ||
                           document.body;
        
        if (!postContent) return;
        
        const commentsSection = document.createElement('div');
        commentsSection.id = 'bloglovers-comments-section';
        
        // موجودہ URL
        const currentUrl = window.location.href;
        
        commentsSection.innerHTML = `
            <div style="margin: 50px 0 30px 0; padding: 30px 20px; background: #ffffff; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); direction: rtl;">
                
                <!-- سوشل میڈیا بٹن -->
                <div style="margin-bottom: 40px;">
                    <h3 style="font-size: 28px; color: #1e293b; margin-bottom: 20px; text-align: center;">📱 اس تحریر کو شیئر کریں</h3>
                    
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
                         data-href="${currentUrl}"
                         data-width="100%" 
                         data-numposts="10"
                         data-order-by="reverse_time"
                         data-mobile="true"
                         style="background: white; padding: 15px; border-radius: 10px;">
                    </div>
                    
                    <p style="text-align: center; color: #64748b; margin-top: 15px; font-size: 14px;">
                        💡 تبصرہ کرنے کے لیے فیس بک اکاؤنٹ درکار ہے۔
                    </p>
                </div>
            </div>
        `;
        
        postContent.appendChild(commentsSection);
        console.log('✅ Facebook Comments سیکشن شامل ہو گیا');
    }
    
    // تھوڑی دیر بعد Add کریں
    setTimeout(addCommentSection, 1000);
})();
