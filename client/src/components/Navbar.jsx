import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/predict', label: 'Predict', protected: true },
  { to: '/ngos', label: 'NGOs' },
  { to: '/about', label: 'About' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully.');
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-700 transition-colors">
              <FaHeartbeat className="text-white text-sm" />
            </div>
            <span className="font-playfair text-xl font-bold text-primary-800">ComCare</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, protected: isProtected }) => {
              if (isProtected && !user) return null;
              return (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:text-primary-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {label}
                </NavLink>
              );
            })}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-700 transition-colors"
                >
                  <FaUserCircle className="text-xl text-primary-500" />
                  <span className="font-medium">{user.name.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="btn-secondary text-sm py-2 px-4">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-ghost text-sm">Log In</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-5">Get Started</Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 animate-slide-up">
          <div className="flex flex-col gap-1 mt-3">
            {navLinks.map(({ to, label, protected: isProtected }) => {
              if (isProtected && !user) return null;
              return (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {label}
                </NavLink>
              );
            })}

            <hr className="my-2 border-gray-100" />
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2"
                >
                  <FaUserCircle className="text-primary-500" /> {user.name}
                </Link>
                <button onClick={handleLogout} className="btn-secondary w-full text-sm mt-1">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="btn-ghost w-full text-center text-sm">
                  Log In
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary w-full text-center text-sm mt-1">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
