// Модуль для мобильного меню
export function initializeMobileMenu() {
	const mobileMenuToggle = document.getElementById('mobileMenuToggle')
	const mobileMenu = document.getElementById('mobileMenu')

	mobileMenuToggle.addEventListener('click', () => {
		mobileMenuToggle.classList.toggle('active')
		mobileMenu.classList.toggle('show')
	})

	const mobileNavLinks = document.querySelectorAll('.mobile-nav-link')
	mobileNavLinks.forEach(link => {
		link.addEventListener('click', () => {
			mobileMenuToggle.classList.remove('active')
			mobileMenu.classList.remove('show')
		})
	})
} 