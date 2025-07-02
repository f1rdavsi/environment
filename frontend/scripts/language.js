// Модуль для селектора языка
export function initializeLanguageSelector() {
	console.log('🔧 Initializing language selector...');
	const langBtn = document.getElementById('langBtn')
	const langDropdown = document.getElementById('langDropdown')
	const langOptions = document.querySelectorAll('.lang-option')
	
	console.log('📋 Elements found:', {
		langBtn: !!langBtn,
		langDropdown: !!langDropdown,
		langOptionsCount: langOptions.length
	});
	
	if (!langBtn || !langDropdown) {
		console.error('❌ Language selector elements not found!');
		return
	}

	// Убеждаемся, что выпадающее меню изначально скрыто
	langBtn.classList.remove('active')
	langDropdown.classList.remove('show')

	// Устанавливаем правильный флаг в зависимости от сохраненного языка
	const savedLang = localStorage.getItem('lang') || 'en'
	const flagSpan = langBtn.querySelector('.flag')
	if (flagSpan) {
		// Находим опцию с соответствующим языком
		const currentOption = Array.from(langOptions).find(option => 
			option.getAttribute('data-lang') === savedLang
		)
		if (currentOption) {
			flagSpan.textContent = currentOption.dataset.flag
		}
	}

	langBtn.addEventListener('click', e => {
		e.stopPropagation()
		
		// Всегда используем CSS классы для показа/скрытия
		langBtn.classList.toggle('active')
		langDropdown.classList.toggle('show')
	})

	langOptions.forEach(option => {
		option.addEventListener('click', () => {
			const flag = option.dataset.flag
			const lang = option.getAttribute('data-lang')
			
			const flagSpan = langBtn.querySelector('.flag')
			flagSpan.textContent = flag
			
			// Сохраняем выбранный язык
			localStorage.setItem('lang', lang)
			
			// Применяем перевод
			setLanguage(lang)
			
			// Обновляем hero-слайдер на главной странице
			updateHeroContentByLang(lang)
			
			// Закрываем выпадающее меню
			langBtn.classList.remove('active')
			langDropdown.classList.remove('show')
		})
	})

	document.addEventListener('click', () => {
		langBtn.classList.remove('active')
		langDropdown.classList.remove('show')
	})
}

// Функция для обновления hero-слайдера при смене языка
function updateHeroContentByLang(lang) {
	// Определяем текущую страницу
	const pathname = window.location.pathname;
	
	// Обновляем heroContent в зависимости от страницы
	if (pathname.endsWith('index.html') || 
		pathname === '/' || 
		pathname === '/frontend/pages/index.html') {
		
		// Главная страница
		window.heroContent = translations[lang].hero_slider;
		
		// Вызываем функцию обновления слайдера, если она существует
		if (typeof window.showHeroSlide === 'function') {
			window.showHeroSlide(window.currentSlide || 0);
		}
	} else if (pathname.includes('tourism-products.html')) {
		// Страница Tourism Products
		window.heroContent = translations[lang].products_slider;
		
		if (typeof window.showHeroSlide === 'function') {
			window.showHeroSlide(window.currentSlide || 0);
		}
	} else if (pathname.includes('destinations.html')) {
		// Страница Destinations
		window.heroContent = translations[lang].destinations_slider;
		
		if (typeof window.showHeroSlide === 'function') {
			window.showHeroSlide(window.currentSlide || 0);
		}
	} else if (pathname.includes('events.html')) {
		// Страница Events
		window.heroContent = translations[lang].events_slider;
		
		if (typeof window.showHeroSlide === 'function') {
			window.showHeroSlide(window.currentSlide || 0);
		}
	} else if (pathname.includes('information.html')) {
		// Страница Information
		window.heroContent = translations[lang].information_slider;
		
		if (typeof window.showHeroSlide === 'function') {
			window.showHeroSlide(window.currentSlide || 0);
		}
	}
}

export const translations = {
	en: {
		main_title: "TAJIKISTAN",
		main_subtitle: "LAND OF",
		main_description: "ANCIENT CULTURES",
		discover_title: "Discover Tajikistan",
		discover_subtitle: "A land of breathtaking mountains, crystal-clear lakes, and rich cultural heritage",
		about_mountains: "Majestic Mountains",
		about_mountains_desc: "Home to the Pamir Mountains, known as the 'Roof of the World', with peaks reaching over 7,000 meters.",
		about_nature: "Natural Beauty",
		about_nature_desc: "From the turquoise waters of Iskanderkul to the vast alpine meadows, nature's beauty is everywhere.",
		about_culture: "Ancient Culture",
		about_culture_desc: "Centuries-old traditions, vibrant bazaars, and warm hospitality define Tajik culture.",
		map_title: "Map of Tajikistan",
		destinations_title: "Popular Destinations",
		destinations_subtitle: "Explore the most beautiful places in Tajikistan",
		categories_title: "Explore by Category",
		categories_subtitle: "Find your perfect adventure",
		cat_mountains: "Mountains",
		cat_mountains_desc: "Climb the highest peaks and explore remote valleys",
		cat_lakes: "Lakes",
		cat_lakes_desc: "Discover crystal-clear alpine lakes and rivers",
		cat_culture: "Cultural Sites",
		cat_culture_desc: "Visit ancient monuments and historical places",
		cat_adventure: "Adventure",
		cat_adventure_desc: "Hiking, camping, and outdoor activities",
		cta_title: "Ready to Explore Tajikistan?",
		cta_desc: "Start planning your journey to discover the natural wonders and cultural treasures of this beautiful country.",
		cta_btn1: "Plan Your Trip",
		cta_btn2: "Learn More",
		nav_home: "Home",
		nav_products: "Tourism Products",
		nav_destinations: "Destinations",
		nav_events: "Events",
		nav_info: "Information",
		nav_contacts: "Contacts",
		footer_about_title: "About Tajikistan Tourism",
		footer_about_desc: "Discover the natural beauty and rich cultural heritage of Tajikistan, a hidden gem in Central Asia.",
		footer_links_title: "Quick Links",
		footer_link_products: "Tourism Products",
		footer_link_guide: "Travel Guide",
		footer_link_events: "Events",
		footer_link_contact: "Contact",
		footer_contact_title: "Contact Info",
		footer_contact_email: "Email: maks88821@gmai.com",
		footer_contact_phone: "Phone: +992919667741",
		footer_contact_address: "Address: Dushanbe, Tajikistan",
		footer_copyright: "© 2024 Tajikistan Tourism. All rights reserved.",
		hero_slider: [
			{
				title: 'TAJIKISTAN',
				subtitle: 'LAND OF',
				description: 'ANCIENT CULTURES',
			},
			{
				title: 'TAJIKISTAN',
				subtitle: 'LAND OF',
				description: 'MAJESTIC MOUNTAINS',
			},
			{
				title: 'TAJIKISTAN',
				subtitle: 'LAND OF',
				description: 'TIMELESS TRADITIONS',
			},
		],
		region_khatlon: "Khatlon",
		region_drs: "DRS",
		region_gbao: "GBAO",
		region_sughd: "Sughd",
		// Login page
		login_page_title: "Login - Tajikistan Tourism",
		login_sign_in: "Sign In",
		login_welcome: "Welcome back! Please sign in to your account",
		login_email: "Email Address",
		login_password: "Password",
		login_remember: "Remember me",
		login_no_account: "Don't have an account?",
		login_sign_up: "Sign Up",
		login_forgot_password: "Forgot Password?",
		// Registration page
		reg_page_title: "Registration - Tajikistan Tourism",
		reg_create_account: "Create Account",
		reg_join_community: "Join our community and discover the beauty of Tajikistan",
		reg_first_name: "First Name",
		reg_last_name: "Last Name",
		reg_email: "Email Address",
		reg_phone: "Phone Number",
		reg_password: "Password",
		reg_confirm_password: "Confirm Password",
		reg_terms_agree: "I agree to the Terms of Service and Privacy Policy",
		reg_terms_service: "Terms of Service",
		reg_privacy_policy: "Privacy Policy",
		reg_newsletter: "Subscribe to our newsletter for travel updates",
		reg_have_account: "Already have an account?",
		reg_sign_in: "Sign In",
		// Contacts page
		contacts_page_title: "Contact Us - Tajikistan",
		contacts_hero_title: "CONTACT US",
		contacts_hero_subtitle: "GET IN",
		contacts_hero_description: "TOUCH",
		contacts_get_touch: "Get in Touch",
		contacts_subtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
		contacts_info_title: "Contact Information",
		contacts_address: "Address",
		contacts_address_text: "123 Tourism Street\nDushanbe, Tajikistan 734000",
		contacts_phone: "Phone",
		contacts_phone_text: "+992 48 123 4567\n+992 48 123 4568",
		contacts_email: "Email",
		contacts_email_text: "info@tajikistan-tourism.com\nsupport@tajikistan-tourism.com",
		contacts_hours: "Working Hours",
		contacts_hours_text: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
		contacts_form_title: "Send us a Message",
		contacts_form_name: "Full Name *",
		contacts_form_email: "Email Address *",
		contacts_form_phone: "Phone Number",
		contacts_form_subject: "Subject *",
		contacts_form_select_subject: "Select a subject",
		contacts_form_general: "General Inquiry",
		contacts_form_booking: "Tour Booking",
		contacts_form_support: "Customer Support",
		contacts_form_partnership: "Partnership",
		contacts_form_other: "Other",
		contacts_form_message: "Message *",
		contacts_form_send: "Send Message",
		contacts_find_us: "Find Us",
		contacts_map_subtitle: "Visit our office in the heart of Dushanbe",
		// Auth messages
		auth_passwords_not_match: "Passwords do not match!",
		auth_registration_login_success: "Registration and login successful! Redirecting to main page...",
		auth_registration_success_login_failed: "Registration successful, but login failed. Please log in manually.",
		auth_registration_error: "Registration error",
		auth_connection_error: "Server connection error",
		auth_login_success: "Login successful! Redirecting to main page...",
		auth_authorization_error: "Authorization error",
		// Tourism Products page
		products_page_title: "Tourism Products - Tajikistan",
		products_hero_title: "TOURISM PRODUCTS",
		products_hero_subtitle: "DISCOVER",
		products_hero_description: "UNIQUE EXPERIENCES",
		products_section_title: "Tourism Products",
		products_section_subtitle: "Explore our curated selection of tourism products and experiences",
		products_search_placeholder: "Search by name...",
		products_sort_title_asc: "Alphabetically (A-Z)",
		products_sort_title_desc: "Alphabetically (Z-A)",
		products_sort_difficulty: "By difficulty",
		products_category_all: "All categories",
		products_cta_title: "Ready to Book Your Adventure?",
		products_cta_desc: "Contact our travel experts to customize your perfect Tajikistan experience.",
		products_cta_contact: "Contact Us",
		products_cta_view_all: "View All Products",
		// Products slider
		products_slider: [
			{
				title: 'TOURISM PRODUCTS',
				subtitle: 'DISCOVER',
				description: 'UNIQUE EXPERIENCES',
			},
			{
				title: 'TOURISM PRODUCTS',
				subtitle: 'EXPLORE',
				description: 'AMAZING ADVENTURES',
			},
			{
				title: 'TOURISM PRODUCTS',
				subtitle: 'EXPERIENCE',
				description: 'CULTURAL HERITAGE',
			},
		],
		// Destinations page
		destinations_page_title: "Destinations - Tajikistan",
		destinations_hero_title: "DESTINATIONS",
		destinations_hero_subtitle: "EXPLORE",
		destinations_hero_description: "AMAZING PLACES",
		destinations_section_title: "Popular Destinations",
		destinations_section_subtitle: "Discover the most beautiful and fascinating places in Tajikistan",
		destinations_search_placeholder: "Search by name...",
		destinations_sort_title_asc: "Alphabetically (A-Z)",
		destinations_sort_title_desc: "Alphabetically (Z-A)",
		destinations_sort_region: "By region",
		destinations_region_all: "All regions",
		destinations_cta_title: "Ready to Explore These Amazing Places?",
		destinations_cta_desc: "Start planning your journey to discover the natural wonders and cultural treasures of Tajikistan.",
		destinations_cta_plan: "Plan Your Trip",
		destinations_cta_tours: "View Tours",
		// Destinations slider
		destinations_slider: [
			{
				title: 'DESTINATIONS',
				subtitle: 'EXPLORE',
				description: 'AMAZING PLACES',
			},
			{
				title: 'DESTINATIONS',
				subtitle: 'DISCOVER',
				description: 'HIDDEN GEMS',
			},
			{
				title: 'DESTINATIONS',
				subtitle: 'VISIT',
				description: 'BEAUTIFUL LANDSCAPES',
			},
		],
		// Events page
		events_page_title: "Events - Tajikistan",
		events_hero_title: "EVENTS",
		events_hero_subtitle: "DISCOVER",
		events_hero_description: "CULTURAL FESTIVALS",
		events_section_title: "Upcoming Events",
		events_section_subtitle: "Experience the rich culture and traditions of Tajikistan through our exciting events",
		events_search_placeholder: "Search by name...",
		events_sort_date_desc: "Newest first",
		events_sort_date_asc: "Oldest first",
		events_sort_title_asc: "Alphabetically (A-Z)",
		events_sort_title_desc: "Alphabetically (Z-A)",
		events_location_all: "All locations",
		events_cta_title: "Don't Miss Out on These Amazing Events!",
		events_cta_desc: "Book your tickets early and experience the vibrant culture of Tajikistan.",
		events_cta_contact: "Contact Us",
		events_cta_calendar: "View Calendar",
		// Events slider
		events_slider: [
			{
				title: 'EVENTS',
				subtitle: 'DISCOVER',
				description: 'CULTURAL FESTIVALS',
			},
			{
				title: 'EVENTS',
				subtitle: 'EXPERIENCE',
				description: 'TRADITIONAL CELEBRATIONS',
			},
			{
				title: 'EVENTS',
				subtitle: 'JOIN',
				description: 'EXCITING ACTIVITIES',
			},
		],
		// Information page
		information_page_title: "Information - Tajikistan",
		information_hero_title: "INFORMATION",
		information_hero_subtitle: "ESSENTIAL",
		information_hero_description: "TRAVEL GUIDE",
		information_section_title: "Travel Information",
		information_section_subtitle: "Everything you need to know before visiting Tajikistan",
		// Visa card
		information_visa_title: "Visa Requirements",
		information_visa_desc: "Most visitors need a visa to enter Tajikistan. E-visas are available for many nationalities.",
		information_visa_evisa: "E-visa available for 60+ countries",
		information_visa_processing: "Processing time: 3-5 business days",
		information_visa_valid: "Valid for 45 days",
		information_visa_cost: "Cost: $25-50 USD",
		information_visa_apply: "Apply for Visa",
		// Weather card
		information_weather_title: "Weather & Climate",
		information_weather_desc: "Tajikistan has a continental climate with hot summers and cold winters.",
		information_weather_spring: "Spring (Mar-May): 10-25°C",
		information_weather_summer: "Summer (Jun-Aug): 20-35°C",
		information_weather_autumn: "Autumn (Sep-Nov): 10-25°C",
		information_weather_winter: "Winter (Dec-Feb): -5-10°C",
		information_weather_check: "Check Weather",
		// Currency card
		information_currency_title: "Currency & Money",
		information_currency_desc: "The official currency is the Tajikistani Somoni (TJS).",
		information_currency_rate: "1 USD ≈ 10.5 TJS",
		information_currency_cards: "Credit cards accepted in major cities",
		information_currency_atms: "ATMs available in Dushanbe",
		information_currency_cash: "Cash preferred in rural areas",
		information_currency_converter: "Currency Converter",
		// Transportation card
		information_transport_title: "Transportation",
		information_transport_desc: "Getting around Tajikistan requires planning, especially in remote areas.",
		information_transport_taxis: "Shared taxis between cities",
		information_transport_flights: "Domestic flights available",
		information_transport_public: "Public transport in Dushanbe",
		information_transport_4x4: "4x4 recommended for mountains",
		information_transport_guide: "Transport Guide",
		// Accommodation card
		information_accommodation_title: "Accommodation",
		information_accommodation_desc: "From luxury hotels to homestays, Tajikistan offers various accommodation options.",
		information_accommodation_hotels: "Hotels in major cities",
		information_accommodation_guesthouses: "Guesthouses in rural areas",
		information_accommodation_homestays: "Homestays with locals",
		information_accommodation_camping: "Camping in mountains",
		information_accommodation_book: "Book Accommodation",
		// Food card
		information_food_title: "Food & Cuisine",
		information_food_desc: "Tajik cuisine features hearty dishes with rice, meat, and fresh vegetables.",
		information_food_plov: "Plov (rice with meat)",
		information_food_qurutob: "Qurutob (bread with yogurt)",
		information_food_shashlik: "Shashlik (grilled meat)",
		information_food_fruits: "Fresh fruits and nuts",
		information_food_guide: "Food Guide",
		// Safety section
		information_safety_title: "Safety & Health",
		information_safety_subtitle: "Important information for a safe and healthy trip",
		information_health_title: "Health Information",
		information_health_vaccinations: "No special vaccinations required",
		information_health_water: "Drink bottled or boiled water",
		information_health_medical: "Medical facilities limited in rural areas",
		information_health_insurance: "Travel insurance recommended",
		information_safety_tips_title: "Safety Tips",
		information_safety_embassy: "Register with your embassy",
		information_safety_customs: "Respect local customs and dress modestly",
		information_safety_mountains: "Be cautious in mountain areas",
		information_safety_documents: "Keep copies of important documents",
		// CTA section
		information_cta_title: "Ready to Plan Your Trip?",
		information_cta_desc: "Contact our travel experts for personalized advice and assistance.",
		information_cta_contact: "Contact Us",
		information_cta_tours: "View Tours",
		// Information slider
		information_slider: [
			{
				title: 'INFORMATION',
				subtitle: 'ESSENTIAL',
				description: 'TRAVEL GUIDE',
			},
			{
				title: 'INFORMATION',
				subtitle: 'USEFUL',
				description: 'TRAVEL TIPS',
			},
			{
				title: 'INFORMATION',
				subtitle: 'IMPORTANT',
				description: 'TRAVEL FACTS',
			},
		],
	},
	ko: {
		main_title: "타지키스탄",
		main_subtitle: "땅의",
		main_description: "고대 문화",
		discover_title: "타지키스탄을 발견하다",
		discover_subtitle: "숨막히는 산, 맑은 호수, 풍부한 문화 유산의 땅",
		about_mountains: "장엄한 산맥",
		about_mountains_desc: "'세계의 지붕'으로 알려진 파미르 산맥, 7,000m가 넘는 봉우리 포함.",
		about_nature: "자연의 아름다움",
		about_nature_desc: "이스칸데르쿨의 청록색 물, 광활한 고산 초원 등 자연의 아름다움이 가득합니다.",
		about_culture: "고대 문화",
		about_culture_desc: "수세기 전통, 활기찬 시장, 따뜻한 환대가 타지크 문화를 정의합니다.",
		map_title: "타지키스탄 지도",
		destinations_title: "인기 목적지",
		destinations_subtitle: "타지키스탄의 가장 아름다운 장소 탐험",
		categories_title: "카테고리별 탐색",
		categories_subtitle: "완벽한 모험 찾기",
		cat_mountains: "산",
		cat_mountains_desc: "가장 높은 봉우리를 오르고 외딴 계곡을 탐험하세요",
		cat_lakes: "호수",
		cat_lakes_desc: "맑은 고산 호수와 강을 발견하세요",
		cat_culture: "문화 유적지",
		cat_culture_desc: "고대 기념물과 역사적 장소 방문",
		cat_adventure: "모험",
		cat_adventure_desc: "하이킹, 캠핑, 야외 활동",
		cta_title: "타지키스탄을 탐험할 준비가 되셨나요?",
		cta_desc: "이 아름다운 나라의 자연 경이로움과 문화적 보물을 발견할 여행을 계획하세요.",
		cta_btn1: "여행 계획하기",
		cta_btn2: "자세히 알아보기",
		nav_home: "홈",
		nav_products: "관광 상품",
		nav_destinations: "목적지",
		nav_events: "이벤트",
		nav_info: "정보",
		nav_contacts: "연락처",
		footer_about_title: "타지키스탄 관광 소개",
		footer_about_desc: "타지키스탄의 자연미와 풍부한 문화유산을 발견하세요. 중앙아시아의 숨겨진 보석입니다.",
		footer_links_title: "빠른 링크",
		footer_link_products: "관광 상품",
		footer_link_guide: "여행 가이드",
		footer_link_events: "이벤트",
		footer_link_contact: "연락처",
		footer_contact_title: "연락처 정보",
		footer_contact_email: "이메일: maks88821@gmai.com",
		footer_contact_phone: "전화: +992919667741",
		footer_contact_address: "주소: 두샨베, 타지키스탄",
		footer_copyright: "© 2024 타지키스탄 관광. 모든 권리 보유.",
		hero_slider: [
			{
				title: '타지키스탄',
				subtitle: '땅',
				description: '고대 문화',
			},
			{
				title: '타지키스탄',
				subtitle: '땅',
				description: '장엄한 산맥',
			},
			{
				title: '타지키스탄',
				subtitle: '땅',
				description: '영원한 전통',
			},
		],
		region_khatlon: "하틀론",
		region_drs: "수도권",
		region_gbao: "고르노-바다흐샨",
		region_sughd: "수그드",
		// Login page
		login_page_title: "로그인 - 타지키스탄 관광",
		login_sign_in: "로그인",
		login_welcome: "다시 오신 것을 환영합니다! 계정에 로그인해 주세요",
		login_email: "이메일 주소",
		login_password: "비밀번호",
		login_remember: "로그인 상태 유지",
		login_no_account: "계정이 없으신가요?",
		login_sign_up: "회원가입",
		login_forgot_password: "비밀번호를 잊으셨나요?",
		// Registration page
		reg_page_title: "회원가입 - 타지키스탄 관광",
		reg_create_account: "계정 만들기",
		reg_join_community: "우리 커뮤니티에 가입하고 타지키스탄의 아름다움을 발견하세요",
		reg_first_name: "이름",
		reg_last_name: "성",
		reg_email: "이메일 주소",
		reg_phone: "전화번호",
		reg_password: "비밀번호",
		reg_confirm_password: "비밀번호 확인",
		reg_terms_agree: "이용약관 및 개인정보처리방침에 동의합니다",
		reg_terms_service: "이용약관",
		reg_privacy_policy: "개인정보처리방침",
		reg_newsletter: "여행 업데이트를 위한 뉴스레터 구독",
		reg_have_account: "이미 계정이 있으신가요?",
		reg_sign_in: "로그인",
		// Contacts page
		contacts_page_title: "연락처 - 타지키스탄",
		contacts_hero_title: "연락처",
		contacts_hero_subtitle: "연락",
		contacts_hero_description: "하세요",
		contacts_get_touch: "연락하기",
		contacts_subtitle: "여러분의 소식을 듣고 싶습니다. 메시지를 보내주시면 최대한 빨리 답변드리겠습니다.",
		contacts_info_title: "연락처 정보",
		contacts_address: "주소",
		contacts_address_text: "123 관광거리\n두샨베, 타지키스탄 734000",
		contacts_phone: "전화",
		contacts_phone_text: "+992 48 123 4567\n+992 48 123 4568",
		contacts_email: "이메일",
		contacts_email_text: "info@tajikistan-tourism.com\nsupport@tajikistan-tourism.com",
		contacts_hours: "근무시간",
		contacts_hours_text: "월요일 - 금요일: 오전 9시 - 오후 6시\n토요일: 오전 10시 - 오후 4시\n일요일: 휴무",
		contacts_form_title: "메시지 보내기",
		contacts_form_name: "성명 *",
		contacts_form_email: "이메일 주소 *",
		contacts_form_phone: "전화번호",
		contacts_form_subject: "제목 *",
		contacts_form_select_subject: "제목을 선택하세요",
		contacts_form_general: "일반 문의",
		contacts_form_booking: "투어 예약",
		contacts_form_support: "고객 지원",
		contacts_form_partnership: "파트너십",
		contacts_form_other: "기타",
		contacts_form_message: "메시지 *",
		contacts_form_send: "메시지 보내기",
		contacts_find_us: "찾아오시는 길",
		contacts_map_subtitle: "두샨베 중심부에 있는 우리 사무실을 방문하세요",
		// Auth messages
		auth_passwords_not_match: "비밀번호가 일치하지 않습니다!",
		auth_registration_login_success: "회원가입 및 로그인 성공! 메인 페이지로 이동합니다...",
		auth_registration_success_login_failed: "회원가입은 성공했지만 로그인에 실패했습니다. 수동으로 로그인해 주세요.",
		auth_registration_error: "회원가입 오류",
		auth_connection_error: "서버 연결 오류",
		auth_login_success: "로그인 성공! 메인 페이지로 이동합니다...",
		auth_authorization_error: "인증 오류",
		// Tourism Products page
		products_page_title: "관광 상품 - 타지키스탄",
		products_hero_title: "관광 상품",
		products_hero_subtitle: "발견",
		products_hero_description: "특별한 경험",
		products_section_title: "관광 상품",
		products_section_subtitle: "엄선된 관광 상품과 경험을 탐험하세요",
		products_search_placeholder: "이름으로 검색...",
		products_sort_title_asc: "알파벳순 (A-Z)",
		products_sort_title_desc: "알파벳순 (Z-A)",
		products_sort_difficulty: "난이도별",
		products_category_all: "모든 카테고리",
		products_cta_title: "모험을 예약할 준비가 되셨나요?",
		products_cta_desc: "완벽한 타지키스탄 경험을 위해 여행 전문가에게 문의하세요.",
		products_cta_contact: "연락처",
		products_cta_view_all: "모든 상품 보기",
		// Products slider
		products_slider: [
			{
				title: '관광 상품',
				subtitle: '발견',
				description: '특별한 경험',
			},
			{
				title: '관광 상품',
				subtitle: '탐험',
				description: '놀라운 모험',
			},
			{
				title: '관광 상품',
				subtitle: '경험',
				description: '문화 유산',
			},
		],
		// Destinations page
		destinations_page_title: "목적지 - 타지키스탄",
		destinations_hero_title: "목적지",
		destinations_hero_subtitle: "탐험",
		destinations_hero_description: "놀라운 장소",
		destinations_section_title: "인기 목적지",
		destinations_section_subtitle: "타지키스탄의 가장 아름답고 매혹적인 장소들을 발견하세요",
		destinations_search_placeholder: "이름으로 검색...",
		destinations_sort_title_asc: "알파벳순 (A-Z)",
		destinations_sort_title_desc: "알파벳순 (Z-A)",
		destinations_sort_region: "지역별",
		destinations_region_all: "모든 지역",
		destinations_cta_title: "이 놀라운 장소들을 탐험할 준비가 되셨나요?",
		destinations_cta_desc: "타지키스탄의 자연의 경이로움과 문화적 보물을 발견하는 여행을 계획하세요.",
		destinations_cta_plan: "여행 계획",
		destinations_cta_tours: "투어 보기",
		// Destinations slider
		destinations_slider: [
			{
				title: '목적지',
				subtitle: '탐험',
				description: '놀라운 장소',
			},
			{
				title: '목적지',
				subtitle: '발견',
				description: '숨겨진 보석',
			},
			{
				title: '목적지',
				subtitle: '방문',
				description: '아름다운 풍경',
			},
		],
		// Events page
		events_page_title: "이벤트 - 타지키스탄",
		events_hero_title: "이벤트",
		events_hero_subtitle: "발견",
		events_hero_description: "문화 축제",
		events_section_title: "예정된 이벤트",
		events_section_subtitle: "흥미진진한 이벤트를 통해 타지키스탄의 풍부한 문화와 전통을 경험하세요",
		events_search_placeholder: "이름으로 검색...",
		events_sort_date_desc: "최신순",
		events_sort_date_asc: "오래된순",
		events_sort_title_asc: "알파벳순 (A-Z)",
		events_sort_title_desc: "알파벳순 (Z-A)",
		events_location_all: "모든 위치",
		events_cta_title: "이 놀라운 이벤트들을 놓치지 마세요!",
		events_cta_desc: "일찍 티켓을 예약하고 타지키스탄의 활기찬 문화를 경험하세요.",
		events_cta_contact: "연락처",
		events_cta_calendar: "캘린더 보기",
		// Events slider
		events_slider: [
			{
				title: '이벤트',
				subtitle: '발견',
				description: '문화 축제',
			},
			{
				title: '이벤트',
				subtitle: '경험',
				description: '전통 축제',
			},
			{
				title: '이벤트',
				subtitle: '참여',
				description: '흥미진진한 활동',
			},
		],
		// Information page
		information_page_title: "정보 - 타지키스탄",
		information_hero_title: "정보",
		information_hero_subtitle: "필수",
		information_hero_description: "여행 가이드",
		information_section_title: "여행 정보",
		information_section_subtitle: "타지키스탄을 방문하기 전에 알아야 할 모든 것",
		// Visa card
		information_visa_title: "비자 요구사항",
		information_visa_desc: "대부분의 방문객은 타지키스탄 입국을 위해 비자가 필요합니다. 전자비자는 많은 국적에 대해 이용 가능합니다.",
		information_visa_evisa: "60개 이상 국가에 전자비자 이용 가능",
		information_visa_processing: "처리 시간: 영업일 기준 3-5일",
		information_visa_valid: "45일간 유효",
		information_visa_cost: "비용: $25-50 USD",
		information_visa_apply: "비자 신청",
		// Weather card
		information_weather_title: "날씨 및 기후",
		information_weather_desc: "타지키스탄은 더운 여름과 추운 겨울이 있는 대륙성 기후를 가지고 있습니다.",
		information_weather_spring: "봄 (3-5월): 10-25°C",
		information_weather_summer: "여름 (6-8월): 20-35°C",
		information_weather_autumn: "가을 (9-11월): 10-25°C",
		information_weather_winter: "겨울 (12-2월): -5-10°C",
		information_weather_check: "날씨 확인",
		// Currency card
		information_currency_title: "통화 및 돈",
		information_currency_desc: "공식 통화는 타지키스탄 소모니(TJS)입니다.",
		information_currency_rate: "1 USD ≈ 10.5 TJS",
		information_currency_cards: "주요 도시에서 신용카드 사용 가능",
		information_currency_atms: "두샨베에서 ATM 이용 가능",
		information_currency_cash: "농촌 지역에서는 현금 선호",
		information_currency_converter: "환율 변환기",
		// Transportation card
		information_transport_title: "교통",
		information_transport_desc: "타지키스탄을 여행하려면 계획이 필요하며, 특히 원격 지역에서는 더욱 그렇습니다.",
		information_transport_taxis: "도시 간 공유 택시",
		information_transport_flights: "국내 항공편 이용 가능",
		information_transport_public: "두샨베의 대중교통",
		information_transport_4x4: "산악 지역에는 4x4 권장",
		information_transport_guide: "교통 가이드",
		// Accommodation card
		information_accommodation_title: "숙박",
		information_accommodation_desc: "럭셔리 호텔부터 홈스테이까지, 타지키스탄은 다양한 숙박 옵션을 제공합니다.",
		information_accommodation_hotels: "주요 도시의 호텔",
		information_accommodation_guesthouses: "농촌 지역의 게스트하우스",
		information_accommodation_homestays: "현지인과의 홈스테이",
		information_accommodation_camping: "산에서의 캠핑",
		information_accommodation_book: "숙박 예약",
		// Food card
		information_food_title: "음식 및 요리",
		information_food_desc: "타지키 요리는 쌀, 고기, 신선한 채소가 들어간 든든한 요리가 특징입니다.",
		information_food_plov: "플로프 (고기가 들어간 쌀)",
		information_food_qurutob: "쿠루토브 (요거트가 들어간 빵)",
		information_food_shashlik: "샤슬릭 (구운 고기)",
		information_food_fruits: "신선한 과일과 견과류",
		information_food_guide: "음식 가이드",
		// Safety section
		information_safety_title: "안전 및 건강",
		information_safety_subtitle: "안전하고 건강한 여행을 위한 중요한 정보",
		information_health_title: "건강 정보",
		information_health_vaccinations: "특별한 예방접종 불필요",
		information_health_water: "생수나 끓인 물 마시기",
		information_health_medical: "농촌 지역에서는 의료 시설 제한적",
		information_health_insurance: "여행 보험 권장",
		information_safety_tips_title: "안전 팁",
		information_safety_embassy: "대사관에 등록하기",
		information_safety_customs: "현지 관습을 존중하고 검소하게 입기",
		information_safety_mountains: "산악 지역에서는 주의하기",
		information_safety_documents: "중요한 서류의 복사본 보관하기",
		// CTA section
		information_cta_title: "여행 계획을 세울 준비가 되셨나요?",
		information_cta_desc: "개인화된 조언과 도움을 위해 여행 전문가에게 문의하세요.",
		information_cta_contact: "연락처",
		information_cta_tours: "투어 보기",
		// Information slider
		information_slider: [
			{
				title: '정보',
				subtitle: '필수',
				description: '여행 가이드',
			},
			{
				title: '정보',
				subtitle: '유용한',
				description: '여행 팁',
			},
			{
				title: '정보',
				subtitle: '중요한',
				description: '여행 사실',
			},
		],
	}
};

export function setLanguage(lang) {
	console.log('🌍 Setting language to:', lang);
	const elements = document.querySelectorAll('[data-i18n]');
	console.log('📋 Found elements with data-i18n:', elements.length);
	
	elements.forEach(el => {
		const key = el.getAttribute('data-i18n');
		if (translations[lang] && translations[lang][key]) {
			// Проверяем, является ли это placeholder
			if (key.startsWith('[placeholder]')) {
				const actualKey = key.replace('[placeholder]', '');
				if (translations[lang][actualKey]) {
					el.placeholder = translations[lang][actualKey];
					console.log('✅ Set placeholder for', actualKey, ':', translations[lang][actualKey]);
				}
			} else {
				el.textContent = translations[lang][key];
				console.log('✅ Set text for', key, ':', translations[lang][key]);
			}
		} else {
			console.log('❌ Translation not found for key:', key, 'in language:', lang);
		}
	});
	
	// Обновляем title страницы
	const titleElement = document.querySelector('title[data-i18n]');
	if (titleElement) {
		const key = titleElement.getAttribute('data-i18n');
		if (translations[lang] && translations[lang][key]) {
			document.title = translations[lang][key];
			console.log('✅ Set page title to:', translations[lang][key]);
		}
	}
	
	// Обновляем hero-слайдер при смене языка
	updateHeroContentByLang(lang);
} 