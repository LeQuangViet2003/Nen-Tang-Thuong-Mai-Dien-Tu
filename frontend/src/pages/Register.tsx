import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      alert('Đăng ký thành công, vui lòng đăng nhập');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="auth-container glass">
      <h2 className="text-center mb-8" style={{ fontSize: '2rem', color: '#fff' }}>Đăng ký</h2>
      {error && <p className="text-center mb-4" style={{ color: 'var(--danger)' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Họ và Tên</label>
          <input 
            type="text" 
            className="form-input" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder="Ví dụ: Lê Quang Việt"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            className="form-input" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
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
        <button type="submit" className="btn btn-primary w-full mt-4">Tạo Tài Khoản</button>
      </form>
      <p className="text-center mt-4">
        Đã có tài khoản? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Đăng nhập</Link>
      </p>
    </div>
  );
};

export default Register;
