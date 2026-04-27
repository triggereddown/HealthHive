import { Outlet, Link } from 'react-router-dom';
import { FaHeartbeat } from 'react-icons/fa';

function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-800 to-primary-600 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-8 text-white group">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
          <FaHeartbeat className="text-white text-xl" />
        </div>
        <span className="font-playfair text-2xl font-bold tracking-wide">ComCare</span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 animate-slide-up">
        <Outlet />
      </div>

      <p className="mt-6 text-white/60 text-sm">
        © {new Date().getFullYear()} ComCare. All rights reserved.
      </p>
    </div>
  );
}

export default AuthLayout;
