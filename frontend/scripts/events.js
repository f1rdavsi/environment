// Модуль для загрузки и рендера событий
let allEvents = [];

function renderEvents(events) {
    const container = document.getElementById('events-list');
    if (!container) return;
    if (!events.length) {
        container.innerHTML = '<div class="empty-message">Нет событий для отображения.</div>';
        return;
    }
    container.innerHTML = events.map(item => {
        let day = '', month = '';
        if (item.date) {
            const dateObj = new Date(item.date);
            day = String(dateObj.getDate()).padStart(2, '0');
            month = dateObj.toLocaleString('en', { month: 'short' }).toUpperCase();
        }
        return `
        <div class="event-card">
            <div class="event-image">
                <img src="${item.image_url || '../assets/cropped-TJ_Tourism_Logo_white.png'}" alt="${item.title}">
            </div>
            <div class="event-content">
                <div class="event-date">
                    <span class="day">${day}</span>
                    <span class="month">${month}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="event-details">
                    <span class="location">📍 ${item.location || ''}</span>
                </div>
                <a href="#" class="btn btn-primary">Learn More</a>
            </div>
        </div>
        `;
    }).join('');
}

function updateLocationFilter() {
    const select = document.getElementById('events-location-filter');
    if (!select) return;
    const locations = Array.from(new Set(allEvents.map(e => e.location).filter(Boolean)));
    select.innerHTML = '<option value="">Все локации</option>' +
        locations.map(l => `<option value="${l}">${l}</option>`).join('');
}

function filterAndRenderEvents() {
    let filtered = [...allEvents];
    const search = document.getElementById('events-search')?.value.toLowerCase() || '';
    const sort = document.getElementById('events-sort')?.value || 'date-desc';
    const location = document.getElementById('events-location-filter')?.value || '';
    if (search) filtered = filtered.filter(e => e.title.toLowerCase().includes(search));
    if (location) filtered = filtered.filter(e => e.location === location);
    if (sort === 'date-desc') filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort === 'date-asc') filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sort === 'title-asc') filtered.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'title-desc') filtered.sort((a, b) => b.title.localeCompare(a.title));
    renderEvents(filtered);
}

export function loadEvents() {
    const container = document.getElementById('events-list');
    if (!container) return;
    fetch('http://localhost:8000/api/events/')
        .then(response => response.json())
        .then(data => {
            allEvents = data;
            updateLocationFilter();
            filterAndRenderEvents();
        })
        .catch(error => {
            container.innerHTML = '<div class="error-message">Ошибка загрузки событий.</div>';
            console.error('Ошибка загрузки событий:', error);
        });
    // Навешиваем обработчики
    document.getElementById('events-search')?.addEventListener('input', filterAndRenderEvents);
    document.getElementById('events-sort')?.addEventListener('change', filterAndRenderEvents);
    document.getElementById('events-location-filter')?.addEventListener('change', filterAndRenderEvents);
} 