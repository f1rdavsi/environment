// Модуль для аватара и меню пользователя
export function getUserInitial() {
	const name = localStorage.getItem('user_first_name')
	return name ? name[0].toUpperCase() : '?'
}

export function renderUserMenu(attempt = 1) {
	const container = document.getElementById('user-menu-container')
	const registrationBtn = document.querySelector('.registration-btn');
	if (!container) {
		if (attempt < 3) {
			setTimeout(() => renderUserMenu(attempt + 1), 100);
		}
		return;
	}

	const accessToken = localStorage.getItem('access_token')
	const userName = localStorage.getItem('user_first_name')
	console.log('access_token:', accessToken);
	console.log('user_first_name:', userName);
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