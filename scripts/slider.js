// Модуль для слайдера и hero-анимаций
let currentSlide = 0;
let slideInterval;

// Глобальная переменная для хранения контента слайдера
window.heroContent = [];

export function initializeSlider() {
	const slides = document.querySelectorAll('.bg-slide')
	const indicators = document.querySelectorAll('.indicator')
	const heroTitle = document.getElementById('heroTitle')
	const heroSubtitle = document.getElementById('heroSubtitle')
	const heroDescription = document.getElementById('heroDescription')

	// Проверяем, есть ли элементы слайдера на странице
	if (slides.length === 0) return;

	// Определяем контент слайдера в зависимости от страницы
	const pathname = window.location.pathname;
	if (pathname.endsWith('index.html') || 
		pathname === '/' || 
		pathname === '/frontend/pages/index.html') {
		// Главная страница - используем старый контент
		window.heroContent = [
			{
				title: 'TAJIKISTAN',
				subtitle: 'LAND OF',
				description: 'ANCIENT CULTURES',
			},
			{
				title: 'TAJIKISTAN',
				subtitle: 'LAND OF',
				description: 'MAJESTIC MOUNTAINS',
			},
			{
				title: 'TAJIKISTAN',
				subtitle: 'LAND OF',
				description: 'TIMELESS TRADITIONS',
			},
		];
	}

	function showSlide(index) {
		slides.forEach((slide, i) => {
			slide.classList.toggle('active', i === index)
		})
		indicators.forEach((indicator, i) => {
			indicator.classList.toggle('active', i === index)
		})
		
		// Обновляем все элементы hero
		if (heroTitle && window.heroContent[index]) {
			heroTitle.style.opacity = '0'
			heroTitle.style.transform = 'translateY(20px)'
			setTimeout(() => {
				heroTitle.textContent = window.heroContent[index].title
				heroTitle.style.opacity = '1'
				heroTitle.style.transform = 'translateY(0)'
			}, 200)
		}
		
		if (heroSubtitle && window.heroContent[index]) {
			heroSubtitle.style.opacity = '0'
			heroSubtitle.style.transform = 'translateY(20px)'
			setTimeout(() => {
				heroSubtitle.textContent = window.heroContent[index].subtitle
				heroSubtitle.style.opacity = '1'
				heroSubtitle.style.transform = 'translateY(0)'
			}, 300)
		}
		
		if (heroDescription && window.heroContent[index]) {
			heroDescription.style.opacity = '0'
			heroDescription.style.transform = 'translateY(20px)'
			setTimeout(() => {
				heroDescription.textContent = window.heroContent[index].description
				heroDescription.style.opacity = '1'
				heroDescription.style.transform = 'translateY(0)'
			}, 400)
		}
		
		currentSlide = index
		window.currentSlide = index
	}

	function nextSlide() {
		const nextIndex = (currentSlide + 1) % window.heroContent.length
		showSlide(nextIndex)
	}

	// Делаем функцию глобально доступной
	window.showHeroSlide = showSlide;

	slideInterval = setInterval(nextSlide, 5000)
	indicators.forEach((indicator, index) => {
		indicator.addEventListener('click', () => {
			clearInterval(slideInterval)
			showSlide(index)
			slideInterval = setInterval(nextSlide, 5000)
		})
	})
} 