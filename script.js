// DOM لود ہونے پر
document.addEventListener('DOMContentLoaded', function() {
    // پوسٹ سلائیڈر فنکشن
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 سیکنڈ
    let slideTimer;
    
    // سلائیڈ دکھانے کا فنکشن
    function showSlide(n) {
        // تمام سلائیڈز اور ڈاٹس سے active کلاس ہٹائیں
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // کرنٹ سلائیڈ سیٹ کریں
        currentSlide = (n + slides.length) % slides.length;
        
        // نئی سلائیڈ اور ڈاٹ کو active کریں
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // اگلی سلائیڈ دکھانے کا فنکشن
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // پچھلی سلائیڈ دکھانے کا فنکشن
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // سلائیڈر ٹائمر شروع کریں
    function startSlideTimer() {
        slideTimer = setInterval(nextSlide, slideInterval);
    }
    
    // سلائیڈر ٹائمر روکیں
    function stopSlideTimer() {
        clearInterval(slideTimer);
    }
    
    // سلائیڈر کنٹرولز پر ایونٹ لسٹنر
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideTimer();
            startSlideTimer();
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideTimer();
            startSlideTimer();
        });
    }
    
    // ڈاٹس پر کلک ایونٹ
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopSlideTimer();
            startSlideTimer();
        });
    });
    
    // سلائیڈر پر ہوور کرنے پر ٹائمر روکیں
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopSlideTimer);
        slider.addEventListener('mouseleave', startSlideTimer);
    }
    
    // سلائیڈر شروع کریں
    showSlide(0);
    startSlideTimer();
    
    // موبائل مینو ٹوگل فنکشن
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainMenu = document.querySelector('.main-menu');
    
    if (mobileMenuBtn && mainMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
        
        // مینو آئٹم پر کلک کرنے پر مینو بند ہو
        const menuItems = mainMenu.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mainMenu.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }
    
    // ڈارک تھیم ٹوگل
    const themeToggle = document.querySelector('a[href="#"] .fa-moon');
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle('dark-theme');
            
            // تھیم کو لوکل اسٹوریج میں محفوظ کریں
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                this.classList.remove('fa-moon');
                this.classList.add('fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                this.classList.remove('fa-sun');
                this.classList.add('fa-moon');
            }
        });
        
        // پیج لود ہونے پر تھیم چیک کریں
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.classList.remove('fa-moon');
            themeToggle.classList.add('fa-sun');
        }
    }
    
    // ڈارک تھیم اسٹائلز
    const darkThemeStyles = `
        <style id="dark-theme-styles">
            body.dark-theme {
                background-color: #121212;
                color: #e0e0e0;
            }
            
            body.dark-theme .post-card,
            body.dark-theme .sidebar-widget,
            body.dark-theme .small-category-section,
            body.dark-theme .list-post {
                background-color: #1e1e1e;
                color: #e0e0e0;
                border-color: #333;
            }
            
            body.dark-theme .post-card h3,
            body.dark-theme .list-post-content h3,
            body.dark-theme .small-posts-list a,
            body.dark-theme .popular-post-title,
            body.dark-theme .recent-post-title,
            body.dark-theme .categories-list a {
                color: #e0e0e0;
            }
            
            body.dark-theme .post-excerpt,
            body.dark-theme .post-meta,
            body.dark-theme .small-posts-list a:hover {
                color: #aaa;
            }
            
            body.dark-theme .ad-placeholder {
                background-color: #2d2d2d;
                border-color: #444;
                color: #aaa;
            }
            
            body.dark-theme .section-header {
                border-color: #444;
            }
            
            body.dark-theme .small-posts-list a,
            body.dark-theme .popular-post,
            body.dark-theme .recent-post,
            body.dark-theme .categories-list a {
                border-color: #333;
            }
            
            body.dark-theme .categories-list a span {
                background-color: #333;
                color: #aaa;
            }
            
            body.dark-theme .footer {
                background-color: #0d1b2a;
            }
        </style>
    `;
    
    // ڈارک تھیم اسٹائلز شامل کریں
    document.head.insertAdjacentHTML('beforeend', darkThemeStyles);
    
    // نیوز ٹکر کنٹرول
    const tickerContent = document.querySelector('.ticker-content');
    if (tickerContent) {
        // نیوز ٹکر کی رفتار کو کنٹرول کرنے کے لیے
        let tickerSpeed = 30; // سیکنڈز میں
        let tickerWidth = tickerContent.scrollWidth;
        
        // ریسائز ایونٹ پر ٹکر کی رفتار ایڈجسٹ کریں
        window.addEventListener('resize', function() {
            tickerWidth = tickerContent.scrollWidth;
        });
        
        // ٹکر پر ہوور کرنے پر رفتار کم کریں
        tickerContent.addEventListener('mouseenter', function() {
            this.style.animationDuration = '60s';
        });
        
        tickerContent.addEventListener('mouseleave', function() {
            this.style.animationDuration = '30s';
        });
    }
    
    // سکرول پر ہیڈر اسٹائل بدلیں
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // نیچے سکرول کرنے پر
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // اوپر سکرول کرنے پر
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // نیوز لیٹر فارم
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // یہاں AJAX ریکویسٹ بھیجی جا سکتی ہے
                alert('آپ کی سبسکرپشن کامیابی کے ساتھ رجسٹر ہو گئی ہے!');
                emailInput.value = '';
            }
        });
    }
    
    // لکھائی ایفیکٹس
    const typedElements = document.querySelectorAll('.typed-effect');
    typedElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // ایلیمینٹ نظر آنے پر ٹائپ رائٹر ایفیکٹ شروع کریں
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(el);
                }
            });
        });
        
        observer.observe(el);
    });
    
    // سائیڈبار ویجٹس کو فولڈ ایبل بنانا (موبائل پر)
    if (window.innerWidth <= 768) {
        const sidebarWidgets = document.querySelectorAll('.sidebar-widget h3');
        sidebarWidgets.forEach(widgetTitle => {
            widgetTitle.style.cursor = 'pointer';
            widgetTitle.addEventListener('click', function() {
                const widgetContent = this.nextElementSibling;
                if (widgetContent.style.display === 'none' || widgetContent.style.display === '') {
                    widgetContent.style.display = 'block';
                    this.querySelector('i').style.transform = 'rotate(0deg)';
                } else {
                    widgetContent.style.display = 'none';
                    this.querySelector('i').style.transform = 'rotate(-90deg)';
                }
            });
        });
    }
});