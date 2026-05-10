import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields.');
      return;
    }
    try {
      await login(form);
      toast.success('ACCESS GRANTED');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="mb-10">
        <span className="section-label">/ AUTHENTICATION</span>
        <h1 className="font-display text-4xl uppercase text-ink">SYSTEM LOGIN</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="section-label mb-2 block" htmlFor="email">EMAIL ADDRESS</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ID FORMAT: user@domain.com"
            className="input-field"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="section-label mb-2 block" htmlFor="password">ACCESS KEY</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              placeholder="ENTER CREDENTIALS"
              className="input-field pr-12"
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint hover:text-accent transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          id="login-submit"
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full mt-4 py-4"
        >
          {isLoading ? (
            <span className="font-mono flex items-center justify-center gap-1 text-sm">
              AUTHENTICATING<span className="animate-pulse">...</span>
            </span>
          ) : (
            'AUTHENTICATE →'
          )}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-[#222222]">
        <p className="font-body text-sm text-ink-muted">
          NO ACCESS CREDENTIALS?{' '}
          <Link to="/register" className="font-mono text-accent hover:text-white transition-colors border-b border-accent ml-2 pb-0.5">
            REQUEST ACCESS
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
