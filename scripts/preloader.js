window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('preloader-hide');
            setTimeout(() => {
                preloader.style.display = 'none';
                preloader.remove();
            }, 700);
        }, 3000);
    }
});

// Анимация появления при скролле для всех страниц
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animate');
    const windowHeight = window.innerHeight;
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - 60) {
            el.classList.add('scroll-animate-visible');
        }
    });
}
window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('DOMContentLoaded', handleScrollAnimations); 