// Import translations from translate folder
import { translations } from '../translate/index.js';

// Модуль для селектора языка
export function initializeLanguageSelector() {
	const langBtn = document.getElementById('langBtn')
	const langDropdown = document.getElementById('langDropdown')
	const langOptions = document.querySelectorAll('.lang-option')
	
	if (!langBtn || !langDropdown) {
		return
	}

	// Убеждаемся, что выпадающее меню изначально скрыто
	langBtn.classList.remove('active')
	langDropdown.classList.remove('show')

	// Устанавливаем правильный флаг в зависимости от сохраненного языка
	const savedLang = localStorage.getItem('lang') || 'en'
	const flagSpan = langBtn.querySelector('.flag')
	if (flagSpan) {
		// Находим опцию с соответствующим языком
		const currentOption = Array.from(langOptions).find(option => 
			option.getAttribute('data-lang') === savedLang
		)
		if (currentOption) {
			flagSpan.textContent = currentOption.dataset.flag
		}
	}

	langBtn.addEventListener('click', e => {
		e.stopPropagation()
		
		// Всегда используем CSS классы для показа/скрытия
		langBtn.classList.toggle('active')
		langDropdown.classList.toggle('show')
	})

	langOptions.forEach(option => {
		option.addEventListener('click', () => {
			const flag = option.dataset.flag
			const lang = option.getAttribute('data-lang')
			
			const flagSpan = langBtn.querySelector('.flag')
			flagSpan.textContent = flag
			
			// Сохраняем выбранный язык
			localStorage.setItem('lang', lang)
			
			// Применяем перевод
			setLanguage(lang)
			
			// Обновляем hero-слайдер на главной странице
			updateHeroContentByLang(lang)
			
			// Закрываем выпадающее меню
			langBtn.classList.remove('active')
			langDropdown.classList.remove('show')
		})
	})

	document.addEventListener('click', () => {
		langBtn.classList.remove('active')
		langDropdown.classList.remove('show')
	})
}

// Функция для обновления hero-слайдера при смене языка
function updateHeroContentByLang(lang) {
	// Определяем текущую страницу
	const pathname = window.location.pathname;
	
	// Обновляем heroContent в зависимости от страницы
	if (pathname.endsWith('index.html') || 
		pathname === '/' || 
		pathname === '/frontend/pages/index.html') {
		
		// Главная страница
		window.heroContent = translations[lang].hero_slider;
		
		// Вызываем функцию обновления слайдера, если она существует
		if (typeof window.showHeroSlide === 'function') {
			window.showHeroSlide(window.currentSlide || 0);
		}
	} else if (pathname.includes('tourism-products.html')) {
		// Страница Tourism Products
		window.heroContent = translations[lang].products_slider;
		
		if (typeof window.showHeroSlide === 'function') {
			window.showHeroSlide(window.currentSlide || 0);
		}
	} else if (pathname.includes('destinations.html')) {
		// Страница Destinations
		window.heroContent = translations[lang].destinations_slider;
		
		if (typeof window.showHeroSlide === 'function') {
			window.showHeroSlide(window.currentSlide || 0);
		}
	} else if (pathname.includes('events.html')) {
		// Страница Events
		window.heroContent = translations[lang].events_slider;
		
		if (typeof window.showHeroSlide === 'function') {
			window.showHeroSlide(window.currentSlide || 0);
		}
	} else if (pathname.includes('information.html')) {
		// Страница Information
		window.heroContent = translations[lang].information_slider;
		
		if (typeof window.showHeroSlide === 'function') {
			window.showHeroSlide(window.currentSlide || 0);
		}
	}
}

export function setLanguage(lang) {
	const elements = document.querySelectorAll('[data-i18n]');
	
	elements.forEach(el => {
		const key = el.getAttribute('data-i18n');
		if (translations[lang] && translations[lang][key]) {
			// Проверяем, является ли это placeholder
			if (key.startsWith('[placeholder]')) {
				const actualKey = key.replace('[placeholder]', '');
				if (translations[lang][actualKey]) {
					el.placeholder = translations[lang][actualKey];
				}
			} else {
				el.textContent = translations[lang][key];
			}
		}
	});
	
	// Обновляем title страницы
	const titleElement = document.querySelector('title[data-i18n]');
	if (titleElement) {
		const key = titleElement.getAttribute('data-i18n');
		if (translations[lang] && translations[lang][key]) {
			document.title = translations[lang][key];
		}
	}
	
	// Обновляем hero-слайдер при смене языка
	updateHeroContentByLang(lang);
} 