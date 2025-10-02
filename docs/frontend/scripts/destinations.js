// Модуль для загрузки и рендера направлений
let allDestinations = [];

function renderDestinations(destinations) {
    const container = document.getElementById('destinations-list');
    if (!container) return;
    if (!destinations.length) {
        container.innerHTML = '<div class="empty-message">Нет направлений для отображения.</div>';
        return;
    }
    container.innerHTML = destinations.map(item => `
        <div class="destination-card">
            <div class="destination-image">
                <img src="${item.image_url || '../assets/cropped-TJ_Tourism_Logo_white.png'}" alt="${item.title}">
            </div>
            <div class="destination-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="destination-details">
                    <span class="location">📍 ${item.region || ''}</span>
                </div>
                <a href="#" class="btn btn-primary">Learn More</a>
            </div>
        </div>
    `).join('');
}

function updateRegionFilter() {
    const select = document.getElementById('dest-region-filter');
    if (!select) return;
    const regions = Array.from(new Set(allDestinations.map(d => d.region).filter(Boolean)));
    select.innerHTML = '<option value="">Все регионы</option>' +
        regions.map(r => `<option value="${r}">${r}</option>`).join('');
}

function filterAndRenderDestinations() {
    let filtered = [...allDestinations];
    const search = document.getElementById('dest-search')?.value.toLowerCase() || '';
    const sort = document.getElementById('dest-sort')?.value || 'title-asc';
    const region = document.getElementById('dest-region-filter')?.value || '';
    if (search) filtered = filtered.filter(d => d.title.toLowerCase().includes(search));
    if (region) filtered = filtered.filter(d => d.region === region);
    if (sort === 'title-asc') filtered.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'title-desc') filtered.sort((a, b) => b.title.localeCompare(a.title));
    if (sort === 'region') filtered.sort((a, b) => (a.region || '').localeCompare(b.region || ''));
    renderDestinations(filtered);
}

export function loadDestinations() {
    const container = document.getElementById('destinations-list');
    if (!container) return;
    fetch('http://localhost:8000/api/location/')
        .then(response => response.json())
        .then(data => {
            allDestinations = data;
            updateRegionFilter();
            filterAndRenderDestinations();
        })
        .catch(error => {
            container.innerHTML = '<div class="error-message">Ошибка загрузки направлений.</div>';
            console.error('Ошибка загрузки направлений:', error);
        });
    // Навешиваем обработчики
    document.getElementById('dest-search')?.addEventListener('input', filterAndRenderDestinations);
    document.getElementById('dest-sort')?.addEventListener('change', filterAndRenderDestinations);
    document.getElementById('dest-region-filter')?.addEventListener('change', filterAndRenderDestinations);
}

export function loadMainDestinations() {
    fetch('http://localhost:8000/api/location/')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('main-destinations-list');
            if (!container) return;
            if (!data.length) {
                container.innerHTML = '<p>Нет направлений для отображения.</p>';
                return;
            }
            container.innerHTML = data.slice(0, 3).map(item => `
                <div class="destination-card">
                    <div class="destination-image">
                        <img src="${item.image_url || '../assets/cropped-TJ_Tourism_Logo_white.png'}" alt="${item.title}">
                    </div>
                    <div class="destination-content">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <div class="destination-details">
                            <span class="location">📍 ${item.region}</span>
                        </div>
                        <a href="destinations.html" class="btn btn-primary">Learn More</a>
                    </div>
                </div>
            `).join('');
        })
        .catch(() => {
            const container = document.getElementById('main-destinations-list');
            if (container) container.innerHTML = '<p>Ошибка загрузки направлений.</p>';
        });
} 