import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      authLogin(data.token, data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="auth-container glass">
      <h2 className="text-center mb-8" style={{ fontSize: '2rem', color: '#fff' }}>Đăng nhập</h2>
      {error && <p className="text-center mb-4" style={{ color: 'var(--danger)' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email Lê Quang Việt</label>
          <input 
            type="email" 
            className="form-input" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="test@lequangviet.com"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Mật khẩu</label>
          <input 
            type="password" 
            className="form-input" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary w-full mt-4">Đăng Nhập</button>
      </form>
      <p className="text-center mt-4">
        Chưa có tài khoản? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Đăng ký</Link>
      </p>
    </div>
  );
};

export default Login;
