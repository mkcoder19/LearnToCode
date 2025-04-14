# CodeLearn Setup Instructions

## System Requirements
- Node.js v16+
- Docker Engine
- MongoDB 4.4+
- 2GB RAM minimum
- Linux/Windows/macOS

## Backend Installation
1. Install dependencies:
```bash
cd backend
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configurations
```

3. Start MongoDB service:
```bash
mongod --dbpath=/path/to/data
```

4. Run in development mode:
```bash
npm run dev
```

5. Run in production:
```bash
npm start
```

## Frontend Integration
1. Link the frontend to backend:
```javascript
// In frontend/js/compiler.js
const API_BASE_URL = 'http://your-server-ip:5000';
```

2. Enable CORS in backend/server.js:
```javascript
app.use(cors({
  origin: 'http://your-frontend-domain',
  methods: ['GET','POST']
}));
```

## Security Setup
1. Configure firewall:
```bash
sudo ufw allow 5000/tcp
sudo ufw enable
```

2. Set up rate limiting:
```bash
npm install express-rate-limit
```

3. Add to server.js:
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/execute', limiter);
```

## Deployment Notes
For production deployment:
1. Use PM2 process manager
2. Set up Nginx reverse proxy
3. Enable HTTPS
4. Monitor with logging
