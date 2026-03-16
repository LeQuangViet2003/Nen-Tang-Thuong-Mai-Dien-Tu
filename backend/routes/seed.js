const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.post('/run', async (req, res) => {
  try {
    const productsCount = await prisma.product.count();
    
    if (productsCount > 0) {
      return res.json({ message: 'Dữ liệu mẫu đã tồn tại.' });
    }

    const sampleProducts = [
      { name: 'Tai nghe Bluetooth Không Dây', description: 'Tai nghe chất lượng cao với âm bass mạnh mẽ, pin trâu 24h.', price: 1500000, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Bàn phím Cơ RGB Lê Quang Việt', description: 'Bàn phím cơ phiên bản đặc biệt thiết kế bởi Lê Quang Việt, switch Blue gõ êm tai.', price: 2100000, imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Chuột Gaming Siêu Tốc', description: 'Chuột quang cảm biến nhạy, độ trễ thấp phù hợp cho gamer FPS.', price: 800000, imageUrl: 'https://images.unsplash.com/photo-1527814050087-1512bb6cd283?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Màn Hình 4K 27inch', description: 'Màn hình IPS độ phân giải 4K sắc nét, bảo vệ mắt.', price: 5500000, imageUrl: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Combo Balo Laptop Đa Năng', description: 'Balo chống nước thiết kế hiện đại, nhiều ngăn chứa tiện lợi.', price: 650000, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Đồng Hồ Thông Minh Lê Quang Việt Pro', description: 'Đo nhịp tim, thông báo tin nhắn, kết nối điện thoại phiên bản Lê Quang Việt.', price: 3200000, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000' },
    ];

    const result = await prisma.product.createMany({
      data: sampleProducts
    });

    res.status(201).json({ message: 'Đã tạo dữ liệu mẫu', count: result.count });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi seed dữ liệu', error: error.message });
  }
});

module.exports = router;
