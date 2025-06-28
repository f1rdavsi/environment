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
	initializeSlider()
	initializeLanguageSelector()
	initializeThemeToggle()
	initializeMobileMenu()
	initializeScrollAnimations()
	initializePatternAnimations()
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
	const langBtn = document.getElementById('langBtn')
	const langDropdown = document.getElementById('langDropdown')
	const langOptions = document.querySelectorAll('.lang-option')

	langBtn.addEventListener('click', e => {
		e.stopPropagation()
		langBtn.classList.toggle('active')
		langDropdown.classList.toggle('show')
	})

	langOptions.forEach(option => {
		option.addEventListener('click', () => {
			const flag = option.dataset.flag
			const flagSpan = langBtn.querySelector('.flag')
			flagSpan.textContent = flag

			langBtn.classList.remove('active')
			langDropdown.classList.remove('show')
		})
	})

	// Close dropdown when clicking outside
	document.addEventListener('click', () => {
		langBtn.classList.remove('active')
		langDropdown.classList.remove('show')
	})
}

// Theme toggle
function initializeThemeToggle() {
	const themeToggle = document.getElementById('themeToggle')
	const currentTheme = localStorage.getItem('theme') || 'light'

	document.documentElement.setAttribute('data-theme', currentTheme)

	themeToggle.addEventListener('click', () => {
		const currentTheme = document.documentElement.getAttribute('data-theme')
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

		document.documentElement.setAttribute('data-theme', newTheme)
		localStorage.setItem('theme', newTheme)
	})
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
