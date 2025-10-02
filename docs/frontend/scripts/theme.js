// Модуль для смены темы и анимации волны
export function initializeThemeToggle() {
	const themeToggle = document.getElementById('themeToggle')
	if (!themeToggle) return;
	const currentTheme = localStorage.getItem('theme') || 'light'
	document.documentElement.setAttribute('data-theme', currentTheme)
	themeToggle.addEventListener('click', (e) => {
		const currentTheme = document.documentElement.getAttribute('data-theme')
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
		// --- Анимация волны ---
		const rect = themeToggle.getBoundingClientRect();
		const wave = document.createElement('div');
		wave.className = `theme-wave theme-wave-${newTheme}`;
		const maxDim = Math.max(window.innerWidth, window.innerHeight);
		const size = maxDim * 2;
		wave.style.width = wave.style.height = size + 'px';
		wave.style.left = (rect.left + rect.width/2 - size/2) + 'px';
		wave.style.top = (rect.top + rect.height/2 - size/2) + 'px';
		document.body.appendChild(wave);
		requestAnimationFrame(() => {
			wave.style.transform = 'scale(1)';
		});
		setTimeout(() => {
			document.documentElement.setAttribute('data-theme', newTheme)
			localStorage.setItem('theme', newTheme)
			wave.style.opacity = '0';
			setTimeout(() => wave.remove(), 700);
		}, 700);
	});
} 