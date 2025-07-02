// Модуль для селектора языка
export function initializeLanguageSelector() {
	const langBtn = document.getElementById('langBtn')
	const langDropdown = document.getElementById('langDropdown')
	const langOptions = document.querySelectorAll('.lang-option')
	if (!langBtn || !langDropdown) return

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

	document.addEventListener('click', () => {
		langBtn.classList.remove('active')
		langDropdown.classList.remove('show')
	})
} 