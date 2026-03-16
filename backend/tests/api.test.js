const request = require('supertest');
const app = require('../server');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let server;
let token;

beforeAll(async () => {
  // Start server
  server = app.listen(5001);
  // Reset database for testing
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
  server.close();
});

describe('E-commerce API Tests', () => {
  it('1. POST /api/auth/register - Đăng ký user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'test@lequangviet.com',
      password: 'password123',
      name: 'Lê Quang Việt Test'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('userId');
  });

  it('2. POST /api/auth/login - Đăng nhập', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@lequangviet.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('3. POST /api/seed/run - Tạo dữ liệu mẫu', async () => {
    const res = await request(app).post('/api/seed/run');
    expect(res.statusCode).toBe(201);
    expect(res.body.count).toBeGreaterThan(0);
  });

  it('4. GET /api/products - Lấy danh sách sản phẩm', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('5. Giao dịch Giỏ hàng và Thanh toán', async () => {
    // Lấy 1 sản phẩm
    const productsRes = await request(app).get('/api/products');
    const productId = productsRes.body[0].id;

    // Thêm vào giỏ
    const addCartRes = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 2 });
    expect(addCartRes.statusCode).toBe(201);

    // Lấy giỏ hàng
    const getCartRes = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`);
    expect(getCartRes.statusCode).toBe(200);
    expect(getCartRes.body.length).toBe(1);

    // Thanh toán
    const checkoutRes = await request(app)
      .post('/api/orders/checkout')
      .set('Authorization', `Bearer ${token}`);
    expect(checkoutRes.statusCode).toBe(201);
    expect(checkoutRes.body.order).toHaveProperty('id');
  });
});
