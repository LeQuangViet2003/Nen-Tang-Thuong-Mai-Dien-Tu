import React from 'react';
import { useAuth } from '../context/AuthContext';
import { addToCart } from '../services/api';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      alert('Vui lòng đăng nhập để thêm vào giỏ hàng');
      return;
    }
    try {
      await addToCart(product.id, 1);
      alert('Đã thêm vào giỏ hàng!');
    } catch (err) {
      alert('Lỗi thêm giỏ hàng');
    }
  };

  return (
    <div className="product-card glass">
      <img src={product.imageUrl} alt={product.name} className="product-img" />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <p className="product-price">{product.price.toLocaleString('vi-VN')} VND</p>
        <button onClick={handleAddToCart} className="btn btn-primary w-full mt-auto">
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
