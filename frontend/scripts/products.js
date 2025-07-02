// Модуль для загрузки и рендера туристических продуктов
let allProducts = [];

function renderProducts(products) {
	const grid = document.getElementById('productsGrid')
	if (!grid) return
	if (!products.length) {
		grid.innerHTML = '<div class="empty-message">Нет продуктов для отображения.</div>'
		return
	}
	grid.innerHTML = products.map(product => `
		<div class="product-card">
			<div class="product-image">
				<img src="${product.image_url}" alt="${product.title}">
			</div>
			<div class="product-content">
				<h3>${product.title}</h3>
				<p>${product.description}</p>
				<div class="product-details">
					<span class="duration">Duration: ${product.duration}</span>
					<span class="difficulty">Difficulty: ${product.difficulty}</span>
				</div>
				<a href="#" class="btn btn-primary">Learn More</a>
			</div>
		</div>
	`).join('')
}

function updateCategoryFilter() {
	const select = document.getElementById('products-category-filter')
	if (!select) return
	const categories = Array.from(new Set(allProducts.map(p => p.category).filter(Boolean)))
	select.innerHTML = '<option value="">Все категории</option>' +
		categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')
}

function filterAndRenderProducts() {
	let filtered = [...allProducts]
	const search = document.getElementById('products-search')?.value.toLowerCase() || ''
	const sort = document.getElementById('products-sort')?.value || 'title-asc'
	const category = document.getElementById('products-category-filter')?.value || ''
	if (search) filtered = filtered.filter(p => p.title.toLowerCase().includes(search))
	if (category) filtered = filtered.filter(p => p.category === category)
	if (sort === 'title-asc') filtered.sort((a, b) => a.title.localeCompare(b.title))
	if (sort === 'title-desc') filtered.sort((a, b) => b.title.localeCompare(a.title))
	if (sort === 'difficulty') filtered.sort((a, b) => (a.difficulty || '').localeCompare(b.difficulty || ''))
	renderProducts(filtered)
}

export function loadTourismProducts() {
	const grid = document.getElementById('productsGrid')
	if (!grid) return
	fetch('http://localhost:8000/api/tourism-products/')
		.then(response => response.json())
		.then(products => {
			allProducts = products
			updateCategoryFilter()
			filterAndRenderProducts()
		})
		.catch(error => {
			grid.innerHTML = '<div class="error-message">Ошибка загрузки данных.</div>'
			console.error('Ошибка загрузки туристических продуктов:', error)
		})
	// Навешиваем обработчики
	document.getElementById('products-search')?.addEventListener('input', filterAndRenderProducts)
	document.getElementById('products-sort')?.addEventListener('change', filterAndRenderProducts)
	document.getElementById('products-category-filter')?.addEventListener('change', filterAndRenderProducts)
} 