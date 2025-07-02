// Модуль для регистрации и логина
import { translations } from './language.js';

function getMessage(key) {
	const lang = localStorage.getItem('lang') || 'en';
	return translations[lang][key] || translations['en'][key];
}

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
					regMessage.textContent = getMessage('auth_passwords_not_match');
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
								regMessage.textContent = getMessage('auth_registration_login_success');
								regMessage.className = 'reg-message success';
							}
							setTimeout(() => {
								window.location.href = 'index.html';
							}, 1500);
						} else {
							if (regMessage) {
								regMessage.textContent = getMessage('auth_registration_success_login_failed');
								regMessage.className = 'reg-message error';
							}
							setTimeout(() => {
								window.location.href = 'login.html';
							}, 2000);
						}
					} catch (err) {
						if (regMessage) {
							regMessage.textContent = getMessage('auth_registration_success_login_failed');
							regMessage.className = 'reg-message error';
						}
						setTimeout(() => {
							window.location.href = 'login.html';
						}, 2000);
					}
					return;
				} else {
					if (regMessage) {
						regMessage.textContent = data.error || getMessage('auth_registration_error');
						regMessage.className = 'reg-message error'
					}
					regForm.querySelector('button[type="submit"]').disabled = false
				}
			} catch (err) {
				if (regMessage) {
					regMessage.textContent = getMessage('auth_connection_error');
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
							loginMessage.textContent = getMessage('auth_login_success');
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
						loginMessage.textContent = data.detail || getMessage('auth_authorization_error');
						loginMessage.className = 'reg-message error'
					}
					loginForm.querySelector('button[type="submit"]').disabled = false
				}
			} catch (err) {
				if (loginMessage) {
					loginMessage.textContent = getMessage('auth_connection_error');
					loginMessage.className = 'reg-message error'
				}
				loginForm.querySelector('button[type="submit"]').disabled = false
			}
		})
	}
}

// === Глазок для показа/скрытия пароля ===
document.addEventListener('DOMContentLoaded', function () {
	const passwordInput = document.getElementById('password');
	const confirmPasswordInput = document.getElementById('confirmPassword');
	const togglePassword = document.getElementById('toggle-reg-password');
	const toggleConfirmPassword = document.getElementById('toggle-reg-confirm-password');
	const openEye = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
	const closedEye = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.81 21.81 0 0 1 5.06-6.06M9.53 9.53A3.5 3.5 0 0 1 12 8.5c2.5 0 4.5 2 4.5 4.5a3.5 3.5 0 0 1-1.03 2.47M1 1l22 22"/></svg>';
	if (togglePassword && passwordInput) {
		togglePassword.addEventListener('click', function () {
			const type = passwordInput.type === 'password' ? 'text' : 'password';
			passwordInput.type = type;
			togglePassword.innerHTML = type === 'password' ? openEye : closedEye;
		});
	}
	if (toggleConfirmPassword && confirmPasswordInput) {
		toggleConfirmPassword.addEventListener('click', function () {
			const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
			confirmPasswordInput.type = type;
			toggleConfirmPassword.innerHTML = type === 'password' ? openEye : closedEye;
		});
	}
}); 