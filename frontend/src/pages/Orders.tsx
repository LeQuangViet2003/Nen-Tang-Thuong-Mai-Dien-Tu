import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchOrders = async () => {
      try {
        const { data } = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, navigate]);

  if (loading) return <div className="text-center mt-8">Đang tải lịch sử...</div>;

  return (
    <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 className="mb-8 font-bold flex items-center gap-2" style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Package size={32} /> Lịch Sử Đơn Hàng
      </h2>
      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map((order: any) => (
            <div key={order.id} style={{ padding: '1.5rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }}>
              <div className="flex-between mb-4" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Mã đơn: #{order.id}</span>
                <span style={{ color: 'var(--success)' }}>Trạng thái: {order.status}</span>
                <span style={{ color: '#94a3b8' }}>Ngày: {new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
              </div>
              <div>
                {order.orderItems.map((item: any) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                    <span>{item.product.name} (x{item.quantity})</span>
                    <span>{(item.price * item.quantity).toLocaleString('vi-VN')} VND</span>
                  </div>
                ))}
              </div>
              <div className="text-right mt-4" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Tổng: <span style={{ color: 'var(--primary)' }}>{order.totalPrice.toLocaleString('vi-VN')} VND</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
