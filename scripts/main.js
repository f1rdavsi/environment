// Точка входа для фронтенда
// Здесь будут импортироваться и вызываться все модули

// Пример:
// import { initializeThemeToggle } from './modules/theme.js';
// document.addEventListener('DOMContentLoaded', () => {
//   initializeThemeToggle();
// }); 

import { initializeThemeToggle } from './theme.js';
import { initializeLanguageSelector, setLanguage } from './language.js';
import { renderUserMenu } from './user-menu.js';
import { initializeSlider } from './slider.js';
import { initializeMobileMenu } from './mobile-menu.js';
import { loadTourismProducts } from './products.js';
import { initializeAuthForms } from './auth.js';
import { loadEvents } from './events.js';
import { loadDestinations, loadMainDestinations } from './destinations.js';

document.addEventListener('DOMContentLoaded', function () {
    // Определяем текущую страницу
    const pathname = window.location.pathname;
    const isMainPage = pathname.endsWith('index.html') || 
                      pathname === '/' || 
                      pathname === '/frontend/pages/index.html';
    const isAuthPage = pathname.includes('login.html') || pathname.includes('registration.html');
    
    if (isMainPage) {
        // Для главной страницы - script.js уже инициализирует селектор языка
        if (document.getElementById('main-destinations-list')) {
            loadMainDestinations();
        }
    } else if (isAuthPage) {
        // Для страниц аутентификации - только базовые функции
        initializeAuthForms();
        initializeLanguageSelector();
        const savedLang = localStorage.getItem('lang') || 'en';
        setLanguage(savedLang);
    } else {
        // Для всех остальных страниц
        initializeAuthForms();
        initializeThemeToggle();
        renderUserMenu();
        initializeSlider();
        initializeMobileMenu();
        loadTourismProducts();
        initializeLanguageSelector();
        const savedLang = localStorage.getItem('lang') || 'en';
        setLanguage(savedLang);
        if (document.getElementById('events-list')) {
            loadEvents();
        }
        if (document.getElementById('destinations-list')) {
            loadDestinations();
        }
        if (document.getElementById('main-destinations-list')) {
            loadMainDestinations();
        }
    }
}); 