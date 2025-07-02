// Модуль для регистрации и логина
export function initializeAuthForms() {
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
					localStorage.setItem('user_first_name', first_name);
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
} 