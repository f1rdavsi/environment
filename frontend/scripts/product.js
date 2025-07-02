// Получаем id продукта из URL
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function renderProduct(product) {
    const container = document.getElementById('productDetails');
    if (!container) return;
    if (!product) {
        container.innerHTML = '<div class="error-message">Продукт не найден.</div>';
        return;
    }
    container.innerHTML = `
        <div class="product-card product-details-page" style="max-width: 900px; margin: 40px auto;">
            <div class="product-image" style="height: 350px;">
                <img src="${product.image_url}" alt="${product.title}">
            </div>
            <div class="product-content">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <div class="product-details">
                    <span class="duration"><b>Категория:</b> ${product.category || '—'}</span>
                    <span class="duration"><b>Продолжительность:</b> ${product.duration}</span>
                    <span class="difficulty"><b>Сложность:</b> ${product.difficulty}</span>
                </div>
                <div class="product-actions" style="margin-top: 1.5rem;">
                    <a href="contacts.html" class="btn btn-primary">Связаться для бронирования</a>
                </div>
            </div>
        </div>
    `;
}

async function loadProduct() {
    const id = getProductIdFromUrl();
    if (!id) {
        renderProduct(null);
        return;
    }
    try {
        const response = await fetch(`http://localhost:8000/api/tourism-products/${id}/`);
        if (!response.ok) throw new Error('Not found');
        const product = await response.json();
        renderProduct(product);
    } catch (e) {
        renderProduct(null);
    }
}

loadProduct(); 