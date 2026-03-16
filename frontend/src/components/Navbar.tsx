import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, LogOut, Package, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar glass">
      <div className="container navbar-content">
        <Link to="/" className="logo">Lê Quang Việt Shop</Link>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/orders" className="nav-link"><Package size={20} /> Đơn hàng</Link>
              <Link to="/cart" className="nav-link"><ShoppingCart size={20} /> Giỏ hàng</Link>
              <span className="nav-link text-white"><User size={20} /> {user.name}</span>
              <button onClick={handleLogout} className="btn btn-danger flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <LogOut size={16} /> Thoát
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Đăng nhập</Link>
              <Link to="/register" className="btn btn-primary">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
