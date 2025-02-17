# LogiTrack-Dashboard 🌐📦

[![React](https://img.shields.io/badge/React-18.2.0-%2361DAFB)](https://reactjs.org/)
[![WebSocket](https://img.shields.io/badge/WebSocket-Real--Time-blue)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
[![Jest](https://img.shields.io/badge/Tested%20with-Jest-%23C21325)](https://jestjs.io/)

A responsive, real-time dashboard built with **React** for tracking logistics shipments. Features WebSocket updates, dark/light theme toggle, lazy-loading for performance, and comprehensive unit tests. Designed for seamless use across mobile, tablet, and desktop.

![Dashboard Preview](https://via.placeholder.com/800x400.png?text=Dashboard+Preview) <!-- Add real screenshot later -->

## ✨ Features

- **Real-Time Tracking**  
  WebSocket integration for instant shipment updates
- **Adaptive UI**  
  Responsive layout for all screen sizes (mobile, tablet, desktop)
- **Performance First**  
  Lazy-loading + optimized bundle size
- **Theme System**  
  CSS variable-powered dark/light mode toggle
- **Test Coverage**  
  Component tests with Jest/Vitest

## 🚀 Quick Start

1. Clone repo:
   ```bash
   git clone https://github.com/MwangangiBrian/LogiTrack.git

2. Install dependencies:
   ```bash
   pnpm install

3. Start dev server:
   ```bash
   pnpm run dev

## 📂 Project Structure
    src/
    ├── assets/           # Static files
    ├── components/       # Reusable UI components
    ├── hooks/            # Custom hooks (React)
    ├── layouts/          # Page layout components
    ├── stores/           # State management
    ├── styles/           # Global CSS/SCSS
    ├── utils/            # Helper functions
    ├── views/            # Main page components
    └── main.jsx          # Entry point

## 🔧 Key Technologies

  - Frontend: React 18 + Vite (or Vue 3)

  - Styling: TypeScript + SCSS

  - State: Context API (React)

  - Testing: Jest + React Testing Library

  - Tooling: Webpack (or Vite), ESLint, Prettier

## 🧪 Testing

Run unit tests:
```bash
pnpm test
```

Test coverage:
```bash
pnpm test -- --coverage
```