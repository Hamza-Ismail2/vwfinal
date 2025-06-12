# 🚁 Helicopter Services - Full Stack MERN Application

A modern, full-stack helicopter services website built with the MERN stack, featuring stunning Three.js animations, PostgreSQL database, and Salesforce integration.

## ✨ Features

### Frontend
- **React 18** with modern hooks and functional components
- **Three.js** integration for stunning 3D helicopter animations
- **Framer Motion** for smooth animations and transitions
- **Tailwind CSS** for responsive, modern styling
- **React Hook Form** for optimized form handling
- **React Hot Toast** for elegant notifications
- **Responsive Design** that works on all devices

### Backend
- **Node.js & Express.js** RESTful API
- **PostgreSQL** database with connection pooling
- **Salesforce Integration** for CRM management
- **Input Validation** with express-validator
- **Security Features** (helmet, CORS, rate limiting)
- **Error Handling** and logging

### 3D Animations
- Interactive 3D helicopter model with spinning rotors
- Floating animations and particle effects
- Auto-rotating camera controls
- Responsive Three.js canvas

### Database Features
- Automatic table creation and seeding
- Contact form data storage
- Service management
- Booking system foundation

### Salesforce Integration
- Automatic lead creation from contact forms
- Account and opportunity management
- Error handling with local fallback

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Salesforce Developer Account (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd helicopter-services-app
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   npm run install-server
   
   # Install client dependencies
   npm run install-client
   ```

3. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb helicopter_services
   
   # The app will automatically create tables on first run
   ```

4. **Environment Configuration**
   ```bash
   # Copy environment template
   cp server/config.env.example server/.env
   
   # Edit server/.env with your configurations:
   ```
   
   Required environment variables:
   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=helicopter_services
   DB_USER=your_username
   DB_PASSWORD=your_password
   
   # JWT Secret
   JWT_SECRET=your_secure_secret_key
   
   # Salesforce (Optional)
   SALESFORCE_USERNAME=your_salesforce_username
   SALESFORCE_PASSWORD=your_salesforce_password
   SALESFORCE_SECURITY_TOKEN=your_security_token
   ```

5. **Start the application**
   ```bash
   # Development mode (both client and server)
   npm run dev
   
   # Or start separately:
   npm run server  # Backend on http://localhost:5000
   npm run client  # Frontend on http://localhost:3000
   ```

## 📁 Project Structure

```
helicopter-services-app/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   │   ├── components/    # React components
│   │   │   ├── Hero.jsx           # Three.js helicopter animation
│   │   │   ├── ContactForm.jsx    # Form with Salesforce integration
│   │   │   ├── Services.jsx       # Services showcase
│   │   │   ├── About.jsx          # Company information
│   │   │   ├── Navbar.jsx         # Navigation
│   │   │   ├── Footer.jsx         # Footer
│   │   │   ├── ParticleBackground.jsx  # Background effects
│   │   │   └── LoadingSpinner.jsx # Loading animation
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main app component
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Tailwind styles
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/                # Node.js backend
│   ├── config/           # Database configuration
│   ├── routes/           # API routes
│   │   ├── contact.js    # Contact form handling
│   │   └── services.js   # Services API
│   ├── services/         # Business logic
│   │   └── salesforce.js # Salesforce integration
│   ├── index.js          # Server entry point
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Accent**: Orange gradient (#ff5a1f to #d03801)
- **Background**: Dark gradient with transparency effects
- **Glass Morphism**: Semi-transparent elements with backdrop blur

### Animations
- **Three.js**: 3D helicopter model with realistic rotor animations
- **Framer Motion**: Page transitions, scroll animations, hover effects
- **Particle System**: Ambient background particles
- **Loading States**: Smooth loading animations

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Touch-friendly interactions

## 🔌 API Endpoints

### Contact API
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get specific contact
- `DELETE /api/contact/:id` - Delete contact

### Services API
- `GET /api/services` - Get all active services
- `GET /api/services/:id` - Get specific service
- `GET /api/services/featured/list` - Get featured services

### Health Check
- `GET /api/health` - Server health status

## 🔧 Configuration

### Tailwind CSS
Custom configuration includes:
- Extended color palette
- Custom animations and keyframes
- Typography and form plugins
- Responsive breakpoints

### Three.js Setup
- Fiber renderer for React integration
- Drei library for enhanced controls
- Optimized for performance
- Responsive canvas sizing

### PostgreSQL Schema
```sql
-- Contacts table
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  message TEXT,
  contact_consent BOOLEAN DEFAULT false,
  salesforce_id VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Services table with JSONB features
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price_range VARCHAR(100),
  duration VARCHAR(50),
  capacity INTEGER,
  features JSONB,
  is_active BOOLEAN DEFAULT true
);
```

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API request throttling
- **Input Validation**: Server-side validation
- **SQL Injection Protection**: Parameterized queries
- **XSS Protection**: Input sanitization

## 📱 Salesforce Integration

### Setup Requirements
1. Create a Salesforce Developer Account
2. Set up a Connected App (optional for OAuth)
3. Get Security Token from user settings
4. Configure environment variables

### Features
- Automatic lead creation from contact forms
- Account and contact management
- Opportunity tracking
- Error handling with local database fallback

## 🚀 Deployment

### Environment Setup
```bash
# Production build
npm run build

# Start production server
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
DB_HOST=your_production_db_host
# ... other production configs
```

### Recommended Hosting
- **Frontend**: Vercel, Netlify, or AWS S3 + CloudFront
- **Backend**: Heroku, DigitalOcean, or AWS EC2
- **Database**: AWS RDS, Heroku Postgres, or DigitalOcean Managed Database

## 🧪 Testing

```bash
# Run client tests
cd client && npm test

# Run server tests (when available)
cd server && npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🙏 Acknowledgments

- Three.js community for 3D graphics library
- Framer Motion for animation library
- Tailwind CSS for styling framework
- React Three Fiber for React + Three.js integration
- Salesforce for CRM integration capabilities

---

**Built with ❤️ for helicopter enthusiasts and aviation professionals** 