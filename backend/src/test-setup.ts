// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.MONGODB_URI = 'mongodb://localhost:27017/billsplit-test';

// Mock Redis for tests
jest.mock('./config/redis', () => ({
  connectRedis: jest.fn(),
  getRedisClient: jest.fn(() => null),
  disconnectRedis: jest.fn(),
}));

// Mock Socket.IO
jest.mock('socket.io', () => ({
  Server: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    emit: jest.fn(),
  })),
}));
