# 🎯 BillSplit.ai - Smart Expense Sharing Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green.svg)](https://www.mongodb.com/)
[![Flutter](https://img.shields.io/badge/Flutter-3.x-blue.svg)](https://flutter.dev/)

## 🚀 Live Demo

- **Frontend**: [http://localhost:3000](http://localhost:3000) (Run locally)
- **Backend API**: [http://localhost:5000](http://localhost:5000) (Run locally)
- **GitHub Repository**: [https://github.com/ShamsRupak/billsplit-ai](https://github.com/ShamsRupak/billsplit-ai)

## 🚀 Overview

BillSplit.ai is a modern expense-sharing application that combines the functionality of Splitwise with cutting-edge AI features. Built for Gen Z users, it offers seamless expense tracking, smart receipt scanning with AI parsing, and intuitive group expense management.

### ✨ Key Features

- 📸 **AI-Powered Receipt Scanning**: Upload receipts and let AI parse items automatically
- 👥 **Smart Group Management**: Create groups for trips, housemates, events
- 💰 **Flexible Splitting**: Equal, percentage, or custom splits
- 🤖 **Natural Language Processing**: "Split the pizza between me and John"
- 📱 **Cross-Platform**: Web, iOS, and Android support
- 💳 **Payment Integration**: Venmo, PayPal, CashApp integration
- 🌙 **Dark Mode**: Eye-friendly dark theme
- 🔔 **Smart Notifications**: Reminders to settle up

## 🏗️ Architecture

```
billsplit-ai/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth, validation, etc.
│   │   ├── services/       # Business logic
│   │   └── utils/          # Helper functions
│   ├── tests/              # Backend tests
│   └── package.json
├── frontend/               # React web app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # Redux store
│   │   └── styles/         # TailwindCSS styles
│   ├── tests/              # Frontend tests
│   └── package.json
├── mobile/                 # Flutter mobile app
│   ├── lib/
│   │   ├── models/         # Data models
│   │   ├── screens/        # App screens
│   │   ├── widgets/        # Reusable widgets
│   │   └── services/       # API services
│   └── pubspec.yaml
├── shared/                 # Shared utilities
│   └── types/              # TypeScript types
├── docs/                   # Documentation
├── scripts/                # Build & deployment scripts
└── docker-compose.yml      # Local development setup
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB 6+
- Flutter 3+ (for mobile development)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShamsRupak/billsplit-ai.git
   cd billsplit-ai
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend && npm install

   # Install frontend dependencies
   cd ../frontend && npm install

   # Install mobile dependencies
   cd ../mobile && flutter pub get
   ```

3. **Set up environment variables**
   ```bash
   # Backend (.env)
   cp backend/.env.example backend/.env
   # Edit backend/.env with your values

   # Frontend (.env)
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env with your values
   ```

4. **Start development servers**
   ```bash
   # From root directory
   npm run dev
   ```

   This starts:
   - Backend API on http://localhost:5000
   - Frontend on http://localhost:3000
   - MongoDB on localhost:27017

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with refresh tokens
- **File Storage**: AWS S3 / Cloudinary
- **AI Integration**: OpenAI API / Google Vision API
- **Payment**: Stripe, PayPal, Venmo APIs

### Frontend (Web)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + Framer Motion
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI / Headless UI

### Mobile
- **Framework**: Flutter
- **State Management**: Riverpod
- **Local Storage**: Hive
- **Push Notifications**: Firebase Cloud Messaging

### DevOps
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Hosting**: 
  - Backend: Railway/Render
  - Frontend: Vercel/Netlify
  - Database: MongoDB Atlas
- **Monitoring**: Sentry, LogRocket

## 📱 Features Deep Dive

### 1. AI Receipt Scanning
```javascript
// Example usage
const receipt = await scanReceipt(imageFile);
// AI parses: "Pizza $25, Drinks $15, Tax $3.20"
// Natural language: "Split pizza between me and John, I'll cover drinks"
```

### 2. Smart Expense Splitting
- **Equal Split**: Divide equally among selected members
- **Percentage Split**: Custom percentages per person
- **Item-based Split**: Assign specific items to people
- **Smart Suggestions**: AI suggests splits based on history

### 3. Group Management
- Create unlimited groups
- Invite via email, phone, or QR code
- Group categories (Trip, Home, Event, etc.)
- Activity feed and group chat

### 4. Payment Settlement
- Smart settlement suggestions (minimize transactions)
- In-app payment initiation
- Payment reminders
- Transaction history

## 🧪 Testing

```bash
# Run all tests
npm test

# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# E2E tests
npm run test:e2e

# Mobile tests
cd mobile && flutter test
```

## 📊 API Documentation

API documentation is available at:
- Development: http://localhost:5000/api-docs
- Production: https://api.billsplit.ai/docs

### Key Endpoints

```typescript
// Authentication
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout

// Users
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/search

// Groups
GET    /api/groups
POST   /api/groups
GET    /api/groups/:id
PUT    /api/groups/:id
DELETE /api/groups/:id
POST   /api/groups/:id/invite

// Expenses
GET    /api/expenses
POST   /api/expenses
GET    /api/expenses/:id
PUT    /api/expenses/:id
DELETE /api/expenses/:id
POST   /api/expenses/scan-receipt

// Settlements
GET    /api/settlements/suggestions
POST   /api/settlements/record
GET    /api/settlements/history
```

## 🎨 Design System

### Color Palette
- **Primary**: #6366F1 (Indigo)
- **Secondary**: #EC4899 (Pink)
- **Success**: #10B981 (Emerald)
- **Warning**: #F59E0B (Amber)
- **Error**: #EF4444 (Red)

### Typography
- **Headings**: Inter
- **Body**: Inter
- **Monospace**: JetBrains Mono

### Components
- Glassmorphism cards
- Smooth transitions
- Micro-interactions
- Emoji categories

## 🚀 Deployment

### Backend Deployment (Railway/Render)

```bash
# Build and deploy
npm run deploy:backend
```

### Frontend Deployment (Vercel)

```bash
# Build and deploy
npm run deploy:frontend
```

### Mobile Deployment

#### iOS
1. Update version in `pubspec.yaml`
2. Run `flutter build ios`
3. Upload to App Store Connect

#### Android
1. Update version in `pubspec.yaml`
2. Run `flutter build apk`
3. Upload to Google Play Console

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style
- `refactor:` Code refactoring
- `test:` Tests
- `chore:` Maintenance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Splitwise
- OpenAI for GPT integration
- Google Vision API for OCR
- The amazing open-source community

## 📞 Contact

- **GitHub**: [@ShamsRupak](https://github.com/ShamsRupak)
- **Email**: shams@billsplit.ai
- **Website**: [billsplit.ai](https://billsplit.ai)

## 📈 Project Status

### ✅ Completed (40%)

#### Frontend
- ✅ Project setup with Vite + React + TypeScript
- ✅ TailwindCSS integration with custom design system
- ✅ Enhanced HomePage with modern UI/UX
- ✅ Enhanced LoginPage with glassmorphism design
- ✅ Basic UI components (Button, Card, Input, Label)
- ✅ Authentication context setup
- ✅ Redux store configuration
- ✅ React Query integration

#### Backend
- ✅ Project structure and architecture
- ✅ MongoDB models (User, Group, Expense, Transaction)
- ✅ Basic authentication endpoints
- ✅ JWT token implementation
- ✅ Error handling middleware
- ✅ Input validation setup

#### Mobile
- ✅ Flutter project initialization
- ✅ Dependencies configuration
- ✅ Basic project structure

#### DevOps
- ✅ GitHub repository setup
- ✅ CI/CD pipeline with GitHub Actions
- ✅ Docker configuration
- ✅ ESLint and Prettier setup

### 🚧 In Progress (20%)

#### Frontend
- 🚧 Register page enhancement
- 🚧 Dashboard layout and components
- 🚧 Protected route implementation
- 🚧 Group management UI
- 🚧 Expense creation forms

#### Backend
- 🚧 Complete API endpoints implementation
- 🚧 Receipt scanning integration
- 🚧 Email service setup
- 🚧 File upload handling

### 📋 TODO (40%)

#### Core Features
- [ ] AI Receipt Scanning with OCR
- [ ] Natural Language Processing for expense parsing
- [ ] Smart expense splitting algorithms
- [ ] Payment integration (Stripe, PayPal, Venmo)
- [ ] Real-time notifications with WebSockets
- [ ] Group chat functionality
- [ ] Activity feed
- [ ] Transaction history and reports
- [ ] Settlement suggestions algorithm
- [ ] QR code generation for group invites

#### Frontend Pages & Components
- [ ] Groups listing page
- [ ] Group details page
- [ ] Expense details page
- [ ] Profile page
- [ ] Settings page
- [ ] Receipt upload component
- [ ] Expense split calculator
- [ ] Payment method management
- [ ] Notification center
- [ ] Search and filters

#### Backend Services
- [ ] Receipt parsing service
- [ ] Payment processing service
- [ ] Notification service
- [ ] Email templates
- [ ] Background job queue
- [ ] Data analytics endpoints
- [ ] Export functionality (CSV, PDF)

#### Mobile App
- [ ] Authentication screens
- [ ] Main navigation
- [ ] Group management screens
- [ ] Expense creation flow
- [ ] Camera integration for receipts
- [ ] Push notifications
- [ ] Offline support
- [ ] Biometric authentication

#### Testing & Documentation
- [ ] Unit tests (80% coverage target)
- [ ] Integration tests
- [ ] E2E test scenarios
- [ ] API documentation with Swagger
- [ ] User documentation
- [ ] Developer documentation

#### Production Readiness
- [ ] Environment configuration
- [ ] Security audit
- [ ] Performance optimization
- [ ] Monitoring setup (Sentry)
- [ ] Analytics integration
- [ ] Backup strategies
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] SSL certificates

### 🎯 Next Steps

1. **Complete core frontend pages** (Register, Dashboard, Groups)
2. **Implement receipt scanning** with AI integration
3. **Build expense creation and splitting** functionality
4. **Add real-time features** with Socket.io
5. **Integrate payment providers**
6. **Complete mobile app** basic functionality
7. **Deploy MVP** to production

### 📊 Estimated Timeline

- **Phase 1** (Current - 2 weeks): Complete frontend UI/UX
- **Phase 2** (2-4 weeks): Core backend functionality
- **Phase 3** (4-6 weeks): AI integration and receipt scanning
- **Phase 4** (6-8 weeks): Mobile app development
- **Phase 5** (8-10 weeks): Testing and deployment
- **Phase 6** (10-12 weeks): Production launch

---

<p align="center">Made with ❤️ by the BillSplit.ai Team</p>
