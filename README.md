<div align="center">

# 💧 Aquaflow Connect

**Smart Water Distribution Management System**

[![React](https://img.shields.io/badge/React-19.2.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📋 Overview

**Aquaflow Connect** is a comprehensive water distribution management system designed to streamline water supply operations, billing, and consumer services. The platform provides role-based dashboards for administrators, staff, and consumers, enabling efficient management of water resources, complaint handling, meter readings, and billing operations.

Built with modern web technologies, Aquaflow offers real-time monitoring, analytics, and AI-powered insights to optimize water distribution and improve service delivery.

---

## ✨ Key Features

### 👤 Consumer Portal
- **Dashboard Overview** - View current bills, consumption trends, and supply schedules
- **Water Supply Schedule** - Check zone-wise water supply timings
- **Bill Management** - View billing history and make online payments
- **Complaint System** - Submit and track complaints with image attachments
- **Consumption Analytics** - Visualize water usage patterns with interactive charts

### 👷 Staff Portal
- **Staff Dashboard** - Monitor pending complaints, collection rates, and key metrics
- **Supply Management** - Update water supply schedules and status
- **Complaint Management** - Review, prioritize, and resolve consumer complaints
- **Consumer Management** - Search and manage consumer accounts
- **Meter Reading Entry** - Submit meter readings with auto-bill generation

### 🔐 Admin Portal
- **System Analytics** - Track total consumers, revenue, system uptime
- **User Management** - Create, update, and manage user accounts
- **Zone Management** - Configure water distribution zones and capacities
- **Reports & Insights** - Generate consumption and revenue reports
- **System Settings** - Configure system-wide parameters

### 🤖 AI-Powered Features
- Intelligent complaint categorization
- Predictive maintenance alerts
- Consumption pattern analysis
- Anomaly detection in water usage

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 19.2.3 with TypeScript
- **Build Tool:** Vite 6.2.0
- **Routing:** React Router DOM 7.12.0
- **UI Components:** Custom components with Lucide React icons
- **Animations:** Framer Motion 12.26.2
- **Charts:** Recharts 3.6.0
- **Styling:** Vanilla CSS with modern design system
- **AI Integration:** Google Generative AI (@google/genai)

### Backend
- **Runtime:** Node.js with Express 4.18.2
- **Database:** SQLite 3 with Sequelize ORM 6.35.2
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **Security:** bcryptjs 2.4.3 for password hashing
- **CORS:** Enabled for cross-origin requests
- **Environment:** dotenv 16.3.1

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Aquaflow
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure environment variables**
   
   **Frontend** - Create/update `.env.local`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   **Backend** - Create/update `server/.env`:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

5. **Seed the database** (optional, for demo data)
   ```bash
   cd server
   npm run seed
   cd ..
   ```

### Running the Application

**Option 1: Run both servers separately**

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

**Option 2: Production build**
```bash
npm run build
npm run preview
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

---

## 🔑 Demo Credentials

| Role     | Email                    | Password     |
|----------|--------------------------|--------------|
| Admin    | admin@aquaflow.com       | admin123     |
| Staff    | staff@aquaflow.com       | staff123     |
| Consumer | john@example.com         | consumer123  |

---

## 📁 Project Structure

```
Aquaflow/
├── src/                          # Frontend source code
│   ├── components/               # Reusable UI components
│   │   ├── Header.tsx           # Navigation header
│   │   └── Sidebar.tsx          # Role-based sidebar
│   ├── contexts/                # React contexts
│   │   └── AuthContext.tsx      # Authentication state
│   ├── layouts/                 # Layout components
│   │   └── MainLayout.tsx       # Main app layout
│   ├── pages/                   # Page components
│   │   ├── admin/               # Admin portal pages
│   │   ├── staff/               # Staff portal pages
│   │   ├── consumer/            # Consumer portal pages
│   │   └── LoginPage.tsx        # Authentication page
│   ├── services/                # API services
│   │   └── api.ts               # API client
│   ├── types.ts                 # TypeScript type definitions
│   ├── App.tsx                  # Main app component
│   ├── index.tsx                # App entry point
│   └── index.css                # Global styles
├── server/                      # Backend source code
│   ├── config/                  # Configuration files
│   │   └── database.js          # Database configuration
│   ├── middleware/              # Express middleware
│   │   └── auth.js              # JWT authentication
│   ├── models/                  # Sequelize models
│   │   ├── User.js              # User model
│   │   ├── Bill.js              # Bill model
│   │   ├── Complaint.js         # Complaint model
│   │   ├── MeterReading.js      # Meter reading model
│   │   ├── SupplySchedule.js    # Supply schedule model
│   │   ├── Zone.js              # Zone model
│   │   ├── Notification.js      # Notification model
│   │   └── index.js             # Model associations
│   ├── routes/                  # API routes
│   │   ├── auth.js              # Authentication routes
│   │   ├── consumer.js          # Consumer routes
│   │   ├── staff.js             # Staff routes
│   │   └── admin.js             # Admin routes
│   ├── utils/                   # Utility functions
│   │   └── seed.js              # Database seeding
│   ├── index.js                 # Server entry point
│   ├── API_DOCS.md              # API documentation
│   └── database.sqlite          # SQLite database
├── index.html                   # HTML entry point
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Frontend dependencies
└── README.md                    # This file
```

---

## 🔌 API Documentation

The backend provides a RESTful API with the following endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Consumer Endpoints
- `GET /api/consumer/dashboard` - Dashboard data
- `GET /api/consumer/supply-schedule` - Water supply schedule
- `GET /api/consumer/bills` - Billing history
- `POST /api/consumer/bills/:id/pay` - Pay bill
- `GET /api/consumer/complaints` - User complaints
- `POST /api/consumer/complaints` - Submit complaint

### Staff Endpoints
- `GET /api/staff/dashboard` - Staff metrics
- `GET /api/staff/schedules` - Supply schedules
- `PUT /api/staff/schedules/:id` - Update schedule
- `GET /api/staff/complaints` - All complaints
- `PUT /api/staff/complaints/:id` - Update complaint
- `GET /api/staff/consumers` - Consumer list
- `POST /api/staff/meter-readings` - Submit meter reading

### Admin Endpoints
- `GET /api/admin/dashboard` - System analytics
- `GET /api/admin/users` - User management
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/zones` - Zone management
- `POST /api/admin/zones` - Create zone
- `GET /api/admin/reports` - System reports

For detailed API documentation, see [server/API_DOCS.md](server/API_DOCS.md).

---

## 🎨 Design System

Aquaflow features a modern, responsive design with:
- **Color Palette:** Professional blue gradient theme
- **Typography:** Clean, readable fonts with proper hierarchy
- **Components:** Reusable cards, buttons, forms, and modals
- **Animations:** Smooth transitions with Framer Motion
- **Charts:** Interactive data visualizations with Recharts
- **Icons:** Lucide React icon library
- **Responsive:** Mobile-first design approach

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt encryption for passwords
- **Role-Based Access Control** - Granular permissions (Admin, Staff, Consumer)
- **Protected Routes** - Frontend and backend route protection
- **CORS Configuration** - Controlled cross-origin access
- **Input Validation** - Server-side validation for all inputs

---

## 🧪 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend:**
- `npm run dev` - Start with auto-reload
- `npm start` - Start production server
- `npm run seed` - Seed database with demo data

### Database Schema

The application uses SQLite with the following main tables:
- **Users** - User accounts with role-based access
- **Zones** - Water distribution zones
- **SupplySchedules** - Water supply timings
- **Bills** - Consumer billing records
- **MeterReadings** - Meter reading history
- **Complaints** - Consumer complaints
- **Notifications** - System notifications

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Aquaflow Development Team**

For questions or support, please contact: support@aquaflow.com

---

## 🙏 Acknowledgments

- Google Generative AI for AI-powered features
- React and Vite communities
- All contributors and testers

---

<div align="center">

**Made with 💙 for better water management**

[Report Bug](https://github.com/yourusername/aquaflow/issues) · [Request Feature](https://github.com/yourusername/aquaflow/issues)

</div>
