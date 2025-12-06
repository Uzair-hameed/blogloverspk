document.addEventListener('DOMContentLoaded', () => {
    
    // --- Date Feature (Urdu) ---
    const dateElement = document.getElementById('current-date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    // Using Urdu locale for date
    dateElement.textContent = today.toLocaleDateString('ur-PK', options);

    // --- Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');

    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // --- Slider Logic ---
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    const totalSlides = slides.length;

    if(slides.length > 0) {
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            
            if (index >= totalSlides) currentSlide = 0;
            else if (index < 0) currentSlide = totalSlides - 1;
            else currentSlide = index;

            slides[currentSlide].classList.add('active');
        }

        // Auto play slider
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);

        // Manual Controls
        if(nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        if(prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    }
});
