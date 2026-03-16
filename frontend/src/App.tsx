import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// Temporary imports for pages before they are fully created
// We'll replace them when created
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Orders from './pages/Orders';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container" style={{ flex: 1, padding: '2rem 1.5rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
      <footer className="glass text-center" style={{ padding: '1rem', marginTop: 'auto', borderTop: '1px solid var(--glass-border)' }}>
        <p>© 2026 Bản quyền thuộc về Lê Quang Việt - Project Demo</p>
      </footer>
    </Router>
  );
}

export default App;
