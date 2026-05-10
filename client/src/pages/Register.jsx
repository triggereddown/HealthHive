import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      await register({ name: form.name, email: form.email, password: form.password });
      toast.success('CREDENTIALS GENERATED.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <span className="section-label">/ REGISTRATION</span>
        <h1 className="font-display text-4xl uppercase text-ink">GENERATE ACCESS</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="section-label mb-2 block" htmlFor="name">FULL IDENTIFIER</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="JOHN DOE"
            className="input-field"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="section-label mb-2 block" htmlFor="email">EMAIL ADDRESS</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="USER@DOMAIN.COM"
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
              value={form.password}
              onChange={handleChange}
              placeholder="MIN 6 CHARACTERS"
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

        <div>
          <label className="section-label mb-2 block" htmlFor="confirmPassword">VERIFY ACCESS KEY</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="REPEAT KEY"
            className="input-field"
            disabled={isLoading}
          />
        </div>

        <button
          id="register-submit"
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full mt-6 py-4"
        >
          {isLoading ? (
            <span className="font-mono flex items-center justify-center gap-1 text-sm">
              PROCESSING<span className="animate-pulse">...</span>
            </span>
          ) : (
            'INITIALIZE ACCOUNT →'
          )}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-[#222222]">
        <p className="font-body text-sm text-ink-muted">
          ALREADY REGISTERED?{' '}
          <Link to="/login" className="font-mono text-accent hover:text-white transition-colors border-b border-accent ml-2 pb-0.5">
            AUTHENTICATE
          </Link>
        </p>
      </div>

      <p className="text-left font-mono text-2xs text-ink-faint mt-8">
        BY REGISTERING, YOU ACKNOWLEDGE THIS SYSTEM IS FOR INFORMATIONAL PURPOSES ONLY. NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE.
      </p>
    </div>
  );
}

export default Register;
