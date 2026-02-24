// comments.js - Bloglovers.pk Facebook Comments کے ساتھ
(function() {
    'use strict';
    
    // چیک کریں کہ کہیں پہلے سے شامل تو نہیں
    if (document.getElementById('bloglovers-comments-section')) return;
    
    // Facebook SDK لوڈ کریں
    function loadFacebookSDK() {
        if (document.getElementById('facebook-jssdk')) return;
        
        const script = document.createElement('script');
        script.id = 'facebook-jssdk';
        script.src = 'https://connect.facebook.net/ur_PK/sdk.js#xfbml=1&version=v18.0';
        script.crossOrigin = 'anonymous';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
    
    loadFacebookSDK();
    
    // کمنٹ سیکشن بنائیں
    const commentsSection = document.createElement('div');
    commentsSection.id = 'bloglovers-comments-section';
    commentsSection.style.cssText = `
        margin: 50px 0 30px 0;
        padding: 30px 20px;
        background: #ffffff;
        border-radius: 15px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', 'Urdu Typesetting', sans-serif;
        direction: rtl;
    `;
    
    // موجودہ URL
    const currentUrl = window.location.href;
    
    commentsSection.innerHTML = `
        <!-- سوشل میڈیا شیئر بٹنز -->
        <div style="margin-bottom: 40px;">
            <h3 style="font-size: 28px; color: #1e293b; margin-bottom: 20px; text-align: center; border-bottom: 2px solid #1877f2; padding-bottom: 10px;">
                📱 اس تحریر کو شیئر کریں
            </h3>
            
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}" 
                   target="_blank" 
                   style="background: #1877f2; color: white; padding: 12px 30px; border-radius: 50px; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; font-size: 18px;">
                   <span style="font-size: 24px;">📘</span> فیس بک
                </a>
                
                <a href="https://wa.me/?text=${encodeURIComponent(document.title + ' ' + currentUrl)}" 
                   target="_blank" 
                   style="background: #25D366; color: white; padding: 12px 30px; border-radius: 50px; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; font-size: 18px;">
                   <span style="font-size: 24px;">📱</span> واٹس ایپ
                </a>
                
                <button onclick="navigator.clipboard.writeText('${currentUrl}').then(() => alert('✅ لنک کاپی ہو گیا!'))"
                   style="background: #6c757d; color: white; padding: 12px 30px; border-radius: 50px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 10px; font-size: 18px;">
                   <span style="font-size: 24px;">🔗</span> لنک کاپی کریں
                </button>
            </div>
        </div>
        
        <!-- Facebook Comments Section -->
        <div style="margin-top: 40px; background: #f8fafc; padding: 25px; border-radius: 15px;">
            <h3 style="font-size: 28px; color: #1e293b; margin-bottom: 20px; text-align: center; border-bottom: 2px solid #25D366; padding-bottom: 10px;">
                💬 آپ کے تبصرے
            </h3>
            
            <!-- Facebook Comments Plugin -->
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
        
        <!-- Mobile Responsive Style -->
        <style>
            @media (max-width: 768px) {
                #bloglovers-comments-section div[style*="gap: 15px"] {
                    flex-direction: column;
                }
                #bloglovers-comments-section a, 
                #bloglovers-comments-section button {
                    width: 100%;
                    justify-content: center;
                }
                .fb-comments {
                    width: 100% !important;
                }
            }
        </style>
    `;
    
    // پوسٹ کے آخر میں شامل کریں
    const postContent = document.querySelector('article') || 
                       document.querySelector('.post-content') || 
                       document.querySelector('.entry-content') ||
                       document.querySelector('main') ||
                       document.body;
    
    if (postContent) {
        postContent.appendChild(commentsSection);
        console.log('✅ Facebook Comments سیکشن ایکٹیویٹ ہو گیا');
        
        // Facebook SDK دوبارہ پارس کرے
        if (window.FB) {
            setTimeout(() => {
                window.FB.XFBML.parse();
            }, 2000);
        }
    }
})();
