import request from 'supertest';
import app from './server';

describe('Server Health Check', () => {
  it('should return health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('uptime');
  });
});

describe('API Routes', () => {
  it('should return 404 for non-existent routes', async () => {
    await request(app)
      .get('/api/non-existent')
      .expect(404);
  });
});
