// Не показывать прелоадер на registration и login
if (
	window.location.pathname.includes('registration.html') ||
	window.location.pathname.includes('login.html')
) {
	const preloader = document.getElementById('preloader');
	if (preloader) preloader.style.display = 'none';
}

// Проверка токена на главной странице
if (
	window.location.pathname.endsWith('index.html') ||
	window.location.pathname === '/' ||
	window.location.pathname === '/frontend/pages/index.html'
) {
	const accessToken = localStorage.getItem('access_token');
	if (!accessToken) {
		const preloader = document.getElementById('preloader');
		if (preloader) preloader.style.display = 'none';
		window.location.href = 'registration.html';
	}
}

// Hero content data
const heroContent = [
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
]

let currentSlide = 0
let slideInterval

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
	renderUserMenu();
	initializeSlider();
	initializeLanguageSelector();
	initializeThemeToggle();
	initializeMobileMenu();
	initializeScrollAnimations();
	initializePatternAnimations();
	loadTourismProducts();

	// --- Регистрация ---
	const regForm = document.querySelector('.reg-form')
	const regMessage = document.getElementById('reg-message')
	if (regForm) {
		regForm.addEventListener('submit', async function (e) {
			e.preventDefault()
			if (regMessage) regMessage.textContent = ''
			const email = regForm.email.value
			const password = regForm.password.value
			const confirmPassword = regForm.confirmPassword.value
			if (password !== confirmPassword) {
				if (regMessage) {
					regMessage.textContent = 'Пароли не совпадают!'
					regMessage.className = 'reg-message error'
				}
				return
			}
			const first_name = regForm.firstName.value;
			const last_name = regForm.lastName.value;
			const phone = regForm.phone.value;
			const body = {
				username: email,
				password,
				email,
				first_name,
				last_name,
				phone
			};
			regForm.querySelector('button[type="submit"]').disabled = true
			try {
				const response = await fetch('http://localhost:8000/api/register/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body)
				})
				const data = await response.json()
				if (response.ok) {
					// Сохраняем имя пользователя
					localStorage.setItem('user_first_name', first_name);
					// Автоматический вход после регистрации
					try {
						const loginResponse = await fetch('http://localhost:8000/api/token/', {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({ username: email, password })
						});
						const loginData = await loginResponse.json();
						if (loginResponse.ok && loginData.access) {
							localStorage.setItem('access_token', loginData.access);
							localStorage.setItem('refresh_token', loginData.refresh);
							if (regMessage) {
								regMessage.textContent = 'Регистрация и вход успешны! Перенаправление на главную...';
								regMessage.className = 'reg-message success';
							}
							setTimeout(() => {
								window.location.href = 'index.html';
							}, 1500);
						} else {
							if (regMessage) {
								regMessage.textContent = 'Регистрация успешна, но вход не выполнен. Пожалуйста, войдите вручную.';
								regMessage.className = 'reg-message error';
							}
							setTimeout(() => {
								window.location.href = 'login.html';
							}, 2000);
						}
					} catch (err) {
						if (regMessage) {
							regMessage.textContent = 'Регистрация успешна, но вход не выполнен. Пожалуйста, войдите вручную.';
							regMessage.className = 'reg-message error';
						}
						setTimeout(() => {
							window.location.href = 'login.html';
						}, 2000);
					}
					return;
				} else {
					if (regMessage) {
						regMessage.textContent = data.error || 'Ошибка регистрации'
						regMessage.className = 'reg-message error'
					}
					regForm.querySelector('button[type="submit"]').disabled = false
				}
			} catch (err) {
				if (regMessage) {
					regMessage.textContent = 'Ошибка соединения с сервером'
					regMessage.className = 'reg-message error'
				}
				regForm.querySelector('button[type="submit"]').disabled = false
			}
		})
	}

	// --- Логин ---
	const loginForm = document.querySelector('.login-form')
	const loginMessage = document.getElementById('login-message')
	if (loginForm) {
		loginForm.addEventListener('submit', async function (e) {
			e.preventDefault()
			if (loginMessage) loginMessage.textContent = ''
			const email = loginForm.email.value
			const password = loginForm.password.value
			const username = email
			loginForm.querySelector('button[type="submit"]').disabled = true
			try {
				const response = await fetch('http://localhost:8000/api/token/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ username, password })
				})
				const data = await response.json()
				if (response.ok && data.access) {
					localStorage.setItem('access_token', data.access)
					localStorage.setItem('refresh_token', data.refresh)
					// Получаем имя пользователя с сервера
					fetch('http://localhost:8000/api/profile/', {
						method: 'GET',
						headers: {
							'Authorization': 'Bearer ' + data.access
						}
					})
					.then(res => res.json())
					.then(profile => {
						if (profile.first_name) {
							localStorage.setItem('user_first_name', profile.first_name)
						} else {
							localStorage.setItem('user_first_name', email.charAt(0).toUpperCase())
						}
						if (loginMessage) {
							loginMessage.textContent = 'Вход выполнен! Перенаправление на главную...'
							loginMessage.className = 'reg-message success'
						}
						setTimeout(() => {
							window.location.href = 'index.html'
						}, 1500)
					})
					.catch(() => {
						// fallback
						localStorage.setItem('user_first_name', email.charAt(0).toUpperCase())
						window.location.href = 'index.html'
					})
					return;
				} else {
					if (loginMessage) {
						loginMessage.textContent = data.detail || 'Ошибка авторизации'
						loginMessage.className = 'reg-message error'
					}
					loginForm.querySelector('button[type="submit"]').disabled = false
				}
			} catch (err) {
				if (loginMessage) {
					loginMessage.textContent = 'Ошибка соединения с сервером'
					loginMessage.className = 'reg-message error'
				}
				loginForm.querySelector('button[type="submit"]').disabled = false
			}
		})
	}
})

// Slider functionality
function initializeSlider() {
	const slides = document.querySelectorAll('.bg-slide')
	const indicators = document.querySelectorAll('.indicator')
	const heroDescription = document.getElementById('heroDescription')

	function showSlide(index) {
		// Update background
		slides.forEach((slide, i) => {
			slide.classList.toggle('active', i === index)
		})

		// Update indicators
		indicators.forEach((indicator, i) => {
			indicator.classList.toggle('active', i === index)
		})

		// Update hero text with animation
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

	// Auto-advance slides
	slideInterval = setInterval(nextSlide, 5000)

	// Manual slide control
	indicators.forEach((indicator, index) => {
		indicator.addEventListener('click', () => {
			clearInterval(slideInterval)
			showSlide(index)
			slideInterval = setInterval(nextSlide, 5000)
		})
	})
}

// Language selector
function initializeLanguageSelector() {
	const selector = document.getElementById('language-selector');
	if (!selector) return;
	selector.addEventListener('change', function () {
		const flag = this.value;
		const flagSpan = document.getElementById('langBtn').querySelector('.flag');
		flagSpan.textContent = flag;
	});
}

// Theme toggle
function initializeThemeToggle() {
	const themeToggle = document.getElementById('themeToggle')
	const currentTheme = localStorage.getItem('theme') || 'light'

	document.documentElement.setAttribute('data-theme', currentTheme)

	themeToggle.addEventListener('click', (e) => {
		const currentTheme = document.documentElement.getAttribute('data-theme')
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

		// --- Анимация волны ---
		const rect = themeToggle.getBoundingClientRect();
		const wave = document.createElement('div');
		wave.className = `theme-wave theme-wave-${newTheme}`;
		// Размер волны — диагональ экрана
		const maxDim = Math.max(window.innerWidth, window.innerHeight);
		const size = maxDim * 2;
		wave.style.width = wave.style.height = size + 'px';
		wave.style.left = (rect.left + rect.width/2 - size/2) + 'px';
		wave.style.top = (rect.top + rect.height/2 - size/2) + 'px';
		document.body.appendChild(wave);
		// Запуск анимации
		requestAnimationFrame(() => {
			wave.style.transform = 'scale(1)';
		});
		// После анимации меняем тему и убираем волну
		setTimeout(() => {
			document.documentElement.setAttribute('data-theme', newTheme)
			localStorage.setItem('theme', newTheme)
			wave.style.opacity = '0';
			setTimeout(() => wave.remove(), 700);
		}, 700);
	});
}

// Mobile menu
function initializeMobileMenu() {
	const mobileMenuToggle = document.getElementById('mobileMenuToggle')
	const mobileMenu = document.getElementById('mobileMenu')

	mobileMenuToggle.addEventListener('click', () => {
		mobileMenuToggle.classList.toggle('active')
		mobileMenu.classList.toggle('show')
	})

	// Close mobile menu when clicking on links
	const mobileNavLinks = document.querySelectorAll('.mobile-nav-link')
	mobileNavLinks.forEach(link => {
		link.addEventListener('click', () => {
			mobileMenuToggle.classList.remove('active')
			mobileMenu.classList.remove('show')
		})
	})
}

// Scroll animations
function initializeScrollAnimations() {
	const patterns = document.querySelectorAll('.pattern')
	let isScrolling = false
	let scrollTimeout

	window.addEventListener('scroll', () => {
		if (!isScrolling) {
			patterns.forEach(pattern => {
				pattern.classList.add('scroll-rotate')
			})
			isScrolling = true
		}

		clearTimeout(scrollTimeout)
		scrollTimeout = setTimeout(() => {
			patterns.forEach(pattern => {
				pattern.classList.remove('scroll-rotate')
			})
			isScrolling = false
		}, 150)
	})
}

// Pattern hover animations
function initializePatternAnimations() {
	const patterns = document.querySelectorAll('.pattern')

	patterns.forEach(pattern => {
		let hoverTimeout

		pattern.addEventListener('mouseenter', () => {
			clearTimeout(hoverTimeout)
		})

		pattern.addEventListener('mouseleave', () => {
			const svg = pattern.querySelector('svg')
			svg.style.transition = 'transform 1.5s ease-out'

			hoverTimeout = setTimeout(() => {
				svg.style.transition = 'transform 0.8s ease-in-out'
			}, 1500)
		})
	})
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()
		const target = document.querySelector(this.getAttribute('href'))
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	})
})

// Intersection Observer for animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px',
}

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.style.animationPlayState = 'running'
		}
	})
}, observerOptions)

// Observe hero elements
document
	.querySelectorAll('.hero-title, .hero-subtitle, .hero-description')
	.forEach(el => {
		observer.observe(el)
	})

// Загрузка туристических продуктов с API и рендеринг карточек
function loadTourismProducts() {
	const grid = document.getElementById('productsGrid')
	if (!grid) return
	fetch('http://localhost:8000/api/tourism-products/')
		.then(response => response.json())
		.then(products => {
			grid.innerHTML = ''
			products.forEach(product => {
				const card = document.createElement('div')
				card.className = 'product-card'
				card.innerHTML = `
					<div class="product-image">
						<img src="${product.image_url}" alt="${product.title}">
					</div>
					<div class="product-content">
						<h3>${product.title}</h3>
						<p>${product.description}</p>
						<div class="product-details">
							<span class="duration">Duration: ${product.duration}</span>
							<span class="difficulty">Difficulty: ${product.difficulty}</span>
						</div>
						<a href="#" class="btn btn-primary">Learn More</a>
					</div>
				`
				grid.appendChild(card)
			})
		})
		.catch(error => {
			grid.innerHTML = '<p style="color:red">Ошибка загрузки данных.</p>'
			console.error('Ошибка загрузки туристических продуктов:', error)
		})
}

function getUserInitial() {
	const name = localStorage.getItem('user_first_name')
	return name ? name[0].toUpperCase() : '?'
}

function renderUserMenu(attempt = 1) {
	console.log('renderUserMenu called, attempt', attempt);
	const container = document.getElementById('user-menu-container')
	console.log('user-menu-container:', container);
	const registrationBtn = document.querySelector('.registration-btn');
	console.log('registrationBtn:', registrationBtn);
	if (!container) {
		console.warn('user-menu-container не найден!');
		if (attempt < 3) {
			setTimeout(() => renderUserMenu(attempt + 1), 100);
		}
		return;
	}

	const accessToken = localStorage.getItem('access_token')
	const userName = localStorage.getItem('user_first_name')
	console.log('access_token:', accessToken);
	console.log('user_first_name:', userName);
	// Если нет токена, перенаправляем на регистрацию
	if (!accessToken) {
		console.log('Нет access_token, показываем кнопку регистрации и редиректим.');
		if (registrationBtn) registrationBtn.style.display = '';
		window.location.href = 'registration.html';
		return;
	}
	if (accessToken && userName) {
		console.log('Пользователь залогинен, скрываем кнопку регистрации и показываем аватар.');
		if (registrationBtn) registrationBtn.style.display = 'none';
		container.innerHTML = `
			<div class="user-avatar" id="user-avatar">${getUserInitial()}</div>
			<div class="user-dropdown" id="user-dropdown">
				<button id="logout-btn">Выйти</button>
			</div>
		`
		const avatar = document.getElementById('user-avatar')
		const dropdown = document.getElementById('user-dropdown')
		avatar.onclick = (e) => {
			e.stopPropagation()
			dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none'
		}
		document.getElementById('logout-btn').onclick = () => {
			localStorage.removeItem('access_token')
			localStorage.removeItem('refresh_token')
			localStorage.removeItem('user_first_name')
			if (registrationBtn) registrationBtn.style.display = '';
			window.location.href = 'login.html'
		}
		document.addEventListener('click', function hideDropdown(e) {
			if (!container.contains(e.target)) {
				dropdown.style.display = 'none'
			}
		})
	} else {
		console.log('Пользователь не залогинен, показываем SVG-аватар и кнопку регистрации.');
		if (registrationBtn) registrationBtn.style.display = '';
		container.innerHTML = `
			<div class="user-avatar" id="user-avatar">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="12" cy="8" r="4" fill="#bdbdbd"/>
					<rect x="4" y="16" width="16" height="6" rx="3" fill="#bdbdbd"/>
				</svg>
			</div>
		`
	}
}

function loadMainDestinations() {
	fetch('http://localhost:8000/api/location/')
		.then(res => res.json())
		.then(data => {
			const container = document.getElementById('main-destinations-list');
			if (!container) return;
			if (!data.length) {
				container.innerHTML = '<p>Нет направлений для отображения.</p>';
				return;
			}
			container.innerHTML = data.slice(0, 3).map(item => `
				<div class="destination-card">
					<div class="destination-image">
						<img src="${item.image_url}" alt="${item.title}">
					</div>
					<div class="destination-content">
						<h3>${item.title}</h3>
						<p>${item.description}</p>
						<div class="destination-details">
							<span class="location">📍 ${item.region}</span>
						</div>
						<a href="destinations.html" class="btn btn-primary">Learn More</a>
					</div>
				</div>
			`).join('');
		})
		.catch(() => {
			const container = document.getElementById('main-destinations-list');
			if (container) container.innerHTML = '<p>Ошибка загрузки направлений.</p>';
		});
}
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '/frontend/pages/index.html') {
	document.addEventListener('DOMContentLoaded', loadMainDestinations);
}

function loadDestinations() {
	fetch('http://localhost:8000/api/location/')
		.then(res => res.json())
		.then(data => {
			const container = document.getElementById('destinations-list');
			if (!container) return;
			if (!data.length) {
				container.innerHTML = '<p>Нет направлений для отображения.</p>';
				return;
			}
			container.innerHTML = data.map(item => `
				<div class="destination-card">
					<div class="destination-image">
						<img src="${item.image_url}" alt="${item.title}">
					</div>
					<div class="destination-content">
						<h3>${item.title}</h3>
						<p>${item.description}</p>
						<div class="destination-details">
							<span class="location">📍 ${item.region}</span>
						</div>
						<a href="#" class="btn btn-primary">Learn More</a>
					</div>
				</div>
			`).join('');
		})
		.catch(() => {
			const container = document.getElementById('destinations-list');
			if (container) container.innerHTML = '<p>Ошибка загрузки направлений.</p>';
		});
}
if (window.location.pathname.includes('destinations.html')) {
	document.addEventListener('DOMContentLoaded', loadDestinations);
}

function loadEvents() {
	fetch('http://localhost:8000/api/events/')
		.then(res => res.json())
		.then(data => {
			const container = document.getElementById('events-list');
			if (!container) return;
			if (!data.length) {
				container.innerHTML = '<p>Нет событий для отображения.</p>';
				return;
			}
			container.innerHTML = data.map(item => {
				// Форматируем дату: YYYY-MM-DD -> день и месяц
				let day = '', month = '';
				if (item.date) {
					const dateObj = new Date(item.date);
					day = String(dateObj.getDate()).padStart(2, '0');
					month = dateObj.toLocaleString('en', { month: 'short' }).toUpperCase();
				}
				return `
				<div class="event-card">
					<div class="event-image">
						<img src="${item.image_url}" alt="${item.title}">
					</div>
					<div class="event-content">
						<div class="event-date">
							<span class="day">${day}</span>
							<span class="month">${month}</span>
						</div>
						<h3>${item.title}</h3>
						<p>${item.description}</p>
						<div class="event-details">
							<span class="location">📍 ${item.location}</span>
						</div>
						<a href="#" class="btn btn-primary">Learn More</a>
					</div>
				</div>
				`;
			}).join('');
		})
		.catch(() => {
			const container = document.getElementById('events-list');
			if (container) container.innerHTML = '<p>Ошибка загрузки событий.</p>';
		});
}
if (window.location.pathname.includes('events.html')) {
	document.addEventListener('DOMContentLoaded', loadEvents);
}

window.addEventListener('load', function() {
	const preloader = document.getElementById('preloader');
	if (preloader) {
		if (
			window.location.pathname.endsWith('index.html') ||
			window.location.pathname === '/' ||
			window.location.pathname === '/frontend/pages/index.html'
		) {
			setTimeout(() => {
				preloader.classList.add('preloader-hide');
				setTimeout(() => {
					preloader.style.display = 'none';
					preloader.remove();
				}, 700);
			}, 3000);
		} else {
			preloader.classList.add('preloader-hide');
			setTimeout(() => {
				preloader.style.display = 'none';
				preloader.remove();
			}, 700);
		}
	}
});
