import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss';
import hpp from 'hpp';
import { createServer } from 'http';
import { Server } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { connectDB } from './config/database';
import { connectRedis } from './config/redis';
import { logger } from './utils/logger';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import { authMiddleware } from './middleware/authMiddleware';

// Import routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';
import expenseRoutes from './routes/expenseRoutes';
import settlementRoutes from './routes/settlementRoutes';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Connect to databases
connectDB();
connectRedis();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Data sanitization
app.use(mongoSanitize());
app.use(hpp());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Compression
app.use(compression());

// Swagger documentation
if (process.env.SWAGGER_ENABLED === 'true') {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'BillSplit.ai API',
        version: '1.0.0',
        description: 'Smart expense sharing platform with AI-powered receipt scanning',
      },
      servers: [
        {
          url: process.env.NODE_ENV === 'production' 
            ? 'https://api.billsplit.ai' 
            : `http://localhost:${process.env.PORT || 5000}`,
          description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts'],
  };

  const specs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/groups', authMiddleware, groupRoutes);
app.use('/api/expenses', authMiddleware, expenseRoutes);
app.use('/api/settlements', authMiddleware, settlementRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on('join-group', (groupId) => {
    socket.join(groupId);
    logger.info(`User ${socket.id} joined group ${groupId}`);
  });

  socket.on('leave-group', (groupId) => {
    socket.leave(groupId);
    logger.info(`User ${socket.id} left group ${groupId}`);
  });

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Store io instance for use in other modules
app.set('io', io);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  if (process.env.SWAGGER_ENABLED === 'true') {
    logger.info(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
  }
});

export { io };
export default app;
