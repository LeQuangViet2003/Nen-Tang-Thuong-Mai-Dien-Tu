const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth');
const prisma = new PrismaClient();

const router = express.Router();

// Lịch sử đơn hàng
router.get('/', authenticate, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: { orderItems: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Thanh toán giỏ hàng (Tạo đơn hàng mới)
router.post('/checkout', authenticate, async (req, res) => {
  try {
    // 1. Lấy giỏ hàng
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: { product: true }
    });

    if (cartItems.length === 0) return res.status(400).json({ message: 'Giỏ hàng trống' });

    // 2. Tính tổng tiền
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.quantity * item.product.price;
    });

    // 3. Tạo Order và OrderItems, Xóa Cart (Transaction)
    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: req.user.id,
          totalPrice,
          status: 'COMPLETED', // Đặt thành completed luôn cho e-commerce mini
          orderItems: {
            create: cartItems.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price
            }))
          }
        }
      });

      // Xóa tất cả trong giỏ
      await tx.cartItem.deleteMany({
        where: { userId: req.user.id }
      });

      // Trừ stock trong product (Tùy chọn, thêm vào cho đầy đủ)
      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      return order;
    });

    res.status(201).json({ message: 'Đặt hàng thành công', order: result });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tạo đơn', error: error.message });
  }
});

module.exports = router;
