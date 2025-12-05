document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. Live Urdu Date (خودکار اردو تاریخ) ---
    function updateDate() {
        const dateEl = document.getElementById("current-date");
        if(dateEl) {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            // پاکستان کے ٹائم کے مطابق اردو تاریخ
            dateEl.innerText = "آج کی تاریخ: " + now.toLocaleDateString('ur-PK', options);
        }
    }
    updateDate();

    // --- 2. Mobile Menu (موبائل مینو) ---
    const toggleBtn = document.querySelector(".mobile-toggle");
    const menuUl = document.getElementById("menu");

    if(toggleBtn && menuUl) {
        toggleBtn.addEventListener("click", function() {
            menuUl.classList.toggle("show");
        });
    }

    // --- 3. Auto Slider (سلائیڈر) ---
    const slides = document.querySelectorAll(".slide");
    let slideIndex = 0;

    function runSlider() {
        if(slides.length === 0) return;
        
        // Remove active class from current
        slides[slideIndex].classList.remove("active");
        
        // Move to next
        slideIndex++;
        if(slideIndex >= slides.length) {
            slideIndex = 0;
        }

        // Add active class to new
        slides[slideIndex].classList.add("active");
    }

    // ہر 4 سیکنڈ بعد سلائیڈ بدلے گی
    setInterval(runSlider, 4000);
});
