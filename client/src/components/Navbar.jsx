import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const navLinks = [
  { to: '/', label: 'HOME' },
  { to: '/chat', label: 'DR. AI', protected: true },
  { to: '/predict', label: 'PREDICT', protected: true },
  { to: '/ngos', label: 'NGOS' },
  { to: '/about', label: 'ABOUT' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('LOGGED OUT.');
    navigate('/');
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-[100] h-[60px]
        transition-all duration-300 flex items-center
        ${scrolled 
          ? 'bg-void/95 backdrop-blur-md border-b border-[#1A1A1A]' 
          : 'bg-transparent border-b border-transparent'
        }
      `}>
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="w-1 h-4 bg-accent inline-block mr-2 align-middle" />
            <span className="font-display text-2xl tracking-tightest text-ink">COMCARE</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(({ to, label, protected: isProtected }) => {
              if (isProtected && !user) return null;
              return (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `font-body font-medium tracking-widest uppercase text-xs transition-colors duration-200 ${
                      isActive ? 'text-accent' : 'text-ink-muted hover:text-ink'
                    }`
                  }
                >
                  {label}
                </NavLink>
              );
            })}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center gap-6">
                <Link to="/dashboard" className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="font-mono text-xs text-ink-muted">{user.name.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="btn-ghost">
                  LOGOUT
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="btn-ghost">LOG IN</Link>
                <Link to="/register" className="btn-primary">GET STARTED</Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-ink-muted hover:text-ink p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="14" className="transition-transform duration-300">
              <line x1="0" y1="2" x2="20" y2="2" stroke="currentColor" strokeWidth="1.5" className={`transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <line x1="0" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" className={`transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-void z-[99] flex flex-col pt-32 px-6 pb-12 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {/* Close Button inside menu (optional, already handled by toggle but good to have) */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-6 text-ink-muted p-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col gap-6 flex-1">
          {navLinks.map(({ to, label, protected: isProtected }, idx) => {
            if (isProtected && !user) return null;
            return (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `font-display text-5xl uppercase transition-colors ${
                    isActive ? 'text-accent' : 'text-ink hover:text-accent'
                  }`
                }
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.4s cubic-bezier(0.16,1,0.3,1) ${idx * 0.06 + 0.2}s`
                }}
              >
                {label}
              </NavLink>
            );
          })}
        </div>

        <div 
          className="border-t border-[#1A1A1A] pt-8 flex gap-4"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1) 0.5s'
          }}
        >
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="btn-secondary flex-1">DASHBOARD</Link>
              <button onClick={handleLogout} className="btn-primary flex-1">LOGOUT</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="btn-secondary flex-1">LOG IN</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary flex-1">GET STARTED</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
