const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth');
const prisma = new PrismaClient();

const router = express.Router();

// Lấy giỏ hàng của user
router.get('/', authenticate, async (req, res) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: { product: true }
    });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Thêm/cập nhật sản phẩm vào giỏ
router.post('/', authenticate, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const existing = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId: req.user.id, productId } }
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity }
      });
      return res.json(updated);
    }

    const newItem = await prisma.cartItem.create({
      data: { userId: req.user.id, productId, quantity }
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm vào giỏ', error: error.message });
  }
});

// Xóa sản phẩm khỏi giỏ
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await prisma.cartItem.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Đã xóa khỏi giỏ hàng' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa khỏi giỏ', error: error.message });
  }
});

module.exports = router;
