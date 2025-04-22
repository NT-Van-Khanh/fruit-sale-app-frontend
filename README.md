# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

# Fruit Retail - Home Page

This project provides a basic setup for a fruit retail website using **React**, **Vite**, and **Tailwind CSS**. It includes pages for product details, cart, and home page, integrated with an API for dynamic data fetching.

## Features
- Initialized **React** project with **Vite** and **Tailwind CSS** for responsive and modern design.
- Set up **React Router** for smooth page navigation.
- Integrated **Heroicons** for scalable icons across the application.
- Added **SweetAlert2** for elegant and customizable alerts.
- API integration to dynamically fetch and display product data.
- Basic structure for product details and shopping cart pages.

## Installation

To get started with this project, follow the steps below:

1. Clone the repository:
    ```bash
    git clone https://github.com/NT-Van-Khanh/fruit-sale-app-frontend.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```
## Version

Current release: **v1.1.0**

- **v1.0.0**: Initial release with basic setup, product details, cart, and home page.
- **v1.1.0**: Refactor of API calls to `api.js` components and pages. Added error handling and notifications for invalid quantity input on Home, Cart, and Product Detail pages.

You can check out previous releases and the changelog on [GitHub Releases](https://github.com/NT-Van-Khanh/fruit-sale-app-frontend/releases).

## Changelog
### v1.1.0
- **Refactor**: Moved API calls to `api.js` for better organization of components and pages.
- **New Feature**: Added error handling and notifications when the user enters or adjusts an invalid quantity in the Home, Cart, and Product Detail pages.
- Notifications are shown for invalid quantities, including when the user tries to exceed the available stock.

### v1.0.0
- Initial release with React, Vite, Tailwind CSS setup.
- Pages for home, product details, and cart.
- Integrated API for dynamic data fetching.

