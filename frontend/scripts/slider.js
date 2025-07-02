// Модуль для слайдера и hero-анимаций
export const heroContent = [
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

let currentSlide = 0;
let slideInterval;

export function initializeSlider() {
	const slides = document.querySelectorAll('.bg-slide')
	const indicators = document.querySelectorAll('.indicator')
	const heroDescription = document.getElementById('heroDescription')

	function showSlide(index) {
		slides.forEach((slide, i) => {
			slide.classList.toggle('active', i === index)
		})
		indicators.forEach((indicator, i) => {
			indicator.classList.toggle('active', i === index)
		})
		if (!heroDescription) return;
		heroDescription.style.opacity = '0'
		heroDescription.style.transform = 'translateY(20px)'
		setTimeout(() => {
			heroDescription.textContent = heroContent[index].description
			heroDescription.style.opacity = '1'
			heroDescription.style.transform = 'translateY(0)'
		}, 400)
		currentSlide = index
	}

	function nextSlide() {
		const nextIndex = (currentSlide + 1) % heroContent.length
		showSlide(nextIndex)
	}

	slideInterval = setInterval(nextSlide, 5000)
	indicators.forEach((indicator, index) => {
		indicator.addEventListener('click', () => {
			clearInterval(slideInterval)
			showSlide(index)
			slideInterval = setInterval(nextSlide, 5000)
		})
	})
} 