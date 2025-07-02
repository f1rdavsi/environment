// Точка входа для фронтенда
// Здесь будут импортироваться и вызываться все модули

// Пример:
// import { initializeThemeToggle } from './modules/theme.js';
// document.addEventListener('DOMContentLoaded', () => {
//   initializeThemeToggle();
// }); 

console.log('main.js loaded');
import { initializeThemeToggle } from './theme.js';
import { initializeLanguageSelector } from './language.js';
import { renderUserMenu } from './user-menu.js';
import { initializeSlider } from './slider.js';
import { initializeMobileMenu } from './mobile-menu.js';
import { loadTourismProducts } from './products.js';
import { initializeAuthForms } from './auth.js';
import { loadEvents } from './events.js';
import { loadDestinations, loadMainDestinations } from './destinations.js';

document.addEventListener('DOMContentLoaded', function () {
    initializeAuthForms();
    initializeThemeToggle();
    initializeLanguageSelector();
    renderUserMenu();
    initializeSlider();
    initializeMobileMenu();
    loadTourismProducts();
    console.log('initializeAuthForms called');
    if (document.getElementById('events-list')) {
        loadEvents();
    }
    if (document.getElementById('destinations-list')) {
        loadDestinations();
    }
    if (document.getElementById('main-destinations-list')) {
        loadMainDestinations();
    }
    // Здесь будут вызовы других модулей
}); 