import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart, checkout } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Trash } from 'lucide-react';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const { data } = await getCart();
      setCartItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const handleRemove = async (id: number) => {
    try {
      await removeFromCart(id);
      fetchCart();
    } catch (err) {
      alert('Lỗi xóa sản phẩm');
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout();
      alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại Lê Quang Việt Shop.');
      navigate('/orders');
    } catch (err) {
      alert('Lỗi khi thanh toán');
    }
  };

  const total = cartItems.reduce((acc: number, item: any) => acc + (item.quantity * item.product.price), 0);

  if (loading) return <div className="text-center mt-8">Đang tải giỏ hàng...</div>;

  return (
    <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 className="mb-8 font-bold" style={{ fontSize: '2rem' }}>Giỏ Hàng Của Bạn</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item: any) => (
              <div key={item.id} className="cart-item">
                <img src={item.product.imageUrl} alt={item.product.name} />
                <div className="cart-item-info">
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{item.product.name}</h4>
                  <p style={{ color: '#94a3b8' }}>{item.product.price.toLocaleString('vi-VN')} VND x {item.quantity}</p>
                </div>
                <div style={{ fontWeight: 'bold' }}>
                  {(item.quantity * item.product.price).toLocaleString('vi-VN')} VND
                </div>
                <button onClick={() => handleRemove(item.id)} className="btn btn-danger" style={{ padding: '0.5rem' }}>
                  <Trash size={18} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex-between mt-8" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem' }}>Tổng cộng: <span style={{ color: 'var(--primary)' }}>{total.toLocaleString('vi-VN')} VND</span></h3>
            <button onClick={handleCheckout} className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
              Thanh Toán Ngay
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
