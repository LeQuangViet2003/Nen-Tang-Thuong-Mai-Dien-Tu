import React, { useEffect, useState } from 'react';
import { getProducts, seedData } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      if (res.data.length === 0) {
        await seedData();
        const res2 = await getProducts();
        setProducts(res2.data);
      } else {
        setProducts(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-8">Đang tải sản phẩm...</div>;

  return (
    <div>
      <h1 className="text-center mt-4" style={{ fontSize: '2.5rem', fontWeight: 700, color: '#fff' }}>
        Sản Phẩm Nổi Bật Lê Quang Việt
      </h1>
      <p className="text-center" style={{ color: '#cbd5e1', marginBottom: '2rem' }}>
        Tận hưởng trải nghiệm mua sắm tuyệt vời cùng các sản phẩm chọn lọc.
      </p>
      <div className="product-grid">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
