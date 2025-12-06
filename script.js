document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Current Date in Urdu
    const dateElement = document.getElementById('current-date');
    if(dateElement){
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.innerText = now.toLocaleDateString('ur-PK', options);
    }

    // 2. Auto Slider
    let slides = document.querySelectorAll('.slide');
    if(slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000); // 4 Seconds
    }
});
