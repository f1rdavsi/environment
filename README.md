# 🌍 Tajikistan Tourism Portal

Welcome to **environment** – an interactive web platform that celebrates the breathtaking nature, vibrant culture, and unique travel experiences of Tajikistan!

---

## 🌐 Multilingual Translations (i18n)

The project implements multilingual support through a separate translations folder:

- `frontend/translate/en.js` — English translations
- `frontend/translate/ko.js` — Korean translations
- `frontend/translate/index.js` — combines all languages into a `translations` object

### Usage

Translations are imported in JS like this:
```js
import { translations } from '../translate/index.js';
```

### Available Languages
- `en` — English
- `ko` — Korean

### Translation Structure
- Main elements (headers, navigation)
- Pages (home, products, destinations, events, information, contacts)
- Forms (login, registration, contacts)
- Sliders for each page
- Error messages and notifications

### Adding a New Language
1. Create a new file, e.g., `ru.js`
2. Add export to `index.js`
3. Update logic in `language.js` if necessary

---

## ✨ Project Highlights

- **Dynamic tourism product catalog** with filters, search, and detailed pages
- **Interactive SVG map** of Tajikistan with animated regions
- **Modern responsive design** with dark mode and language switcher (EN/RU/TJ)
- **Events, destinations, and information pages** for travelers
- **Admin panel** for content and user management
- **RESTful API** for frontend-backend communication

---

## 🚀 Live Demo & Repository

- [GitHub Repository](https://github.com/f1rdavsi/environment)

---

## 👥 Team

- Firdavs Fozilov
- Behbudov Muhsin
- Saidakbar Nemonov

---

## 🏗️ Project Structure

```
environment/
  backend/      # Django backend (API, admin, models)
  frontend/     # Static frontend (HTML, CSS, JS, assets)
```

---

## 💻 Technologies Used

| Technology     | Purpose                                 |
|---------------|-----------------------------------------|
| Python/Django | Backend, REST API, admin panel          |
| HTML5/CSS3    | Page structure, responsive UI           |
| JavaScript    | Dynamic content, interactivity          |
| MySQL         | Database for content & users            |
| REST          | API for frontend-backend communication  |

---

## 🏛️ Architecture Overview

- **Frontend:**
  - Pure HTML/CSS/JS (no frameworks)
  - Pages: Home, Tourism Products, Destinations, Events, Information, Contacts
  - Dynamic rendering of product cards, filters, and product details via JS
  - Interactive SVG map with hover animation and region highlighting
  - Language switcher (EN/RU/TJ), dark mode toggle
  - Responsive and mobile-friendly design

- **Backend:**
  - Django REST Framework API
  - Models: TourismProduct, Event, Location, User
  - Endpoints for listing, filtering, and retrieving products, events, locations
  - Admin panel for content and user management
  - Authentication and user profile support

- **Database:**
  - MySQL (can be swapped for SQLite/Postgres)
  - Stores products, events, locations, users

---

## 📦 Database Models (Core)

- **TourismProduct**
  - `id`: integer (auto)
  - `title`: string
  - `description`: text
  - `image_url`: string (URL)
  - `duration`: string
  - `difficulty`: string
  - `category`: string

- **Event**
  - `id`, `title`, `description`, `date`, `image_url`, ...

- **Location**
  - `id`, `name`, `description`, `region`, ...

---

## 🔗 API Endpoints (Backend)

| Endpoint                        | Method | Description                  |
|---------------------------------|--------|------------------------------|
| /api/tourism-products/          | GET    | List all tourism products    |
| /api/tourism-products/<id>/     | GET    | Get product details by id    |
| /api/events/                    | GET    | List all events              |
| /api/location/                  | GET    | List all locations           |
| /api/register/                  | POST   | Register new user            |
| /api/profile/                   | GET    | Get user profile             |

**Example: Get all tourism products**
```http
GET http://localhost:8000/api/tourism-products/
```
**Response:**
```json
[
  {
    "id": 1,
    "title": "Pamir Adventure",
    "description": "Explore the Pamir mountains...",
    "image_url": "https://...",
    "duration": "7 days",
    "difficulty": "Hard",
    "category": "Mountains"
  },
  ...
]
```

---

## 🛠️ How to Run Locally

1. **Clone the repo:**
   ```bash
   git clone https://github.com/f1rdavsi/environment.git
   cd environment
   ```
2. **Backend setup:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```
3. **Frontend:**
   - Open any HTML file from `frontend/pages/` in your browser (e.g., `index.html`)
   - Make sure backend is running at `http://localhost:8000`

---

## 🧑‍💻 For Developers
- Modular codebase: easy to extend with new models, endpoints, or frontend pages
- All API endpoints are RESTful and return JSON
- Add new products, events, or locations via Django admin
- Customize styles in `frontend/styles/` and scripts in `frontend/scripts/`
- SVG map regions can be made clickable for advanced interactivity
- Easily add new languages or UI themes

**Deployment tips:**
- Use Gunicorn + Nginx for production backend
- Serve static files via CDN or Nginx
- Set up `.env` for secrets and DB config
- Use HTTPS in production

---

## 🌐 For Travelers & Users
- Browse dozens of curated tourism products and experiences
- Use filters and search to find your perfect adventure
- Explore Tajikistan's regions on the interactive map
- Check out upcoming events and must-see destinations
- Contact travel experts for custom tours
- Enjoy a seamless experience on any device, in your preferred language

---

## 🎨 Design & UX
- Clean, modern, and mobile-friendly
- Dark mode support
- Language switcher (EN, RU, TJ)
- Animated SVG map for visual engagement
- Consistent branding and easy navigation

---

## 🌱 Future Ideas
- User reviews and ratings for products
- Booking and payment integration
- User-generated content (photo uploads, stories)
- Advanced analytics for admins
- Integration with Google Maps
- More interactive map features (region popups, links)

---

> **Discover Tajikistan. Experience the adventure. Share the story.**
