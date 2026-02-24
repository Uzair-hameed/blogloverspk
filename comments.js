// comments.js - Bloglovers.pk کے لیے
(function() {
    'use strict';
    
    // چیک کریں کہ کہیں پہلے سے شامل تو نہیں
    if (document.getElementById('bloglovers-comments-section')) return;
    
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
    
    commentsSection.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 5px 15px; border-radius: 50px; font-size: 14px;">
                📅 ${new Date().toLocaleDateString('ur-PK')}
            </span>
        </div>
        
        <!-- سوشل شیئر بٹنز -->
        <div style="margin-bottom: 40px;">
            <h3 style="font-size: 26px; color: #1e293b; margin-bottom: 20px; text-align: center; padding-bottom: 10px; border-bottom: 3px solid #667eea; display: inline-block; width: 100%;">
                📱 اس تحریر کو شیئر کریں
            </h3>
            
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 20px;">
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" 
                   target="_blank" 
                   style="background: #1877f2; color: white; padding: 12px 25px; border-radius: 50px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-size: 16px; transition: all 0.3s;">
                   <span style="font-size: 20px;">📘</span> فیس بک
                </a>
                
                <a href="https://wa.me/?text=${encodeURIComponent(document.title + ' ' + window.location.href)}" 
                   target="_blank" 
                   style="background: #25D366; color: white; padding: 12px 25px; border-radius: 50px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-size: 16px; transition: all 0.3s;">
                   <span style="font-size: 20px;">📱</span> واٹس ایپ
                </a>
                
                <button onclick="navigator.clipboard.writeText(window.location.href).then(() => { alert('✅ لنک کاپی ہو گیا!'); }).catch(() => { alert('❌ لنک کاپی نہیں ہو سکا'); });"
                   style="background: #6c757d; color: white; padding: 12px 25px; border-radius: 50px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-size: 16px;">
                   <span style="font-size: 20px;">🔗</span> لنک کاپی کریں
                </button>
            </div>
        </div>
        
        <!-- تبصرے کا سیکشن - یہاں Utterances کا کوڈ ہے -->
        <div style="margin-top: 40px; background: #f8fafc; padding: 25px; border-radius: 15px;">
            <h3 style="font-size: 26px; color: #1e293b; margin-bottom: 20px; text-align: center; padding-bottom: 10px; border-bottom: 3px solid #764ba2; display: inline-block; width: 100%;">
                💬 تبصرے
            </h3>
            
            <!-- یہ ہے Utterances کا مکمل کوڈ بالکل ویسا جیسا آپ نے سکرین پر دیکھا -->
            <script src="https://utteranc.es/client.js"
                    repo="Uzair-hameed/blogloverspk"
                    issue-term="pathname"
                    theme="github-light"
                    crossorigin="anonymous"
                    async>
            </script>
            
            <div style="margin-top: 15px; text-align: center; font-size: 14px; color: #94a3b8;">
                <p>💡 تبصرہ کرنے کے لیے GitHub اکاؤنٹ درکار ہے۔</p>
                <p>آپ کا تبصرہ فوری طور پر ظاہر ہو جائے گا۔</p>
            </div>
        </div>
        
        <style>
            @media (max-width: 768px) {
                #bloglovers-comments-section div[style*="gap: 12px"] {
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
    
    // پوسٹ کے آخر میں شامل کریں
    const postContent = document.querySelector('article') || 
                       document.querySelector('.post-content') || 
                       document.querySelector('.entry-content') ||
                       document.querySelector('main') ||
                       document.querySelector('.content') ||
                       document.body;
    
    if (postContent) {
        postContent.appendChild(commentsSection);
        console.log('✅ Bloglovers.pk کمنٹ سیکشن ایکٹیویٹ ہو گیا');
    }
})();
