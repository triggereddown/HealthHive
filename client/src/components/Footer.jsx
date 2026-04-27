import { Link } from 'react-router-dom';
import { FaHeartbeat, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <FaHeartbeat className="text-white text-sm" />
              </div>
              <span className="font-playfair text-xl font-bold text-white">ComCare</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              AI-powered symptom analysis, disease prediction, and healthcare resource discovery for everyone.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors"><FaGithub className="text-lg" /></a>
              <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors"><FaTwitter className="text-lg" /></a>
              <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors"><FaLinkedin className="text-lg" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/predict" className="hover:text-primary-400 transition-colors">Symptom Checker</Link></li>
              <li><Link to="/ngos" className="hover:text-primary-400 transition-colors">Find NGOs</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-primary-400 transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-primary-400 transition-colors">Register</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary-400 transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 mt-10 mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
          <p>© {currentYear} ComCare. All rights reserved.</p>
          <p className="text-xs">⚠️ ComCare is not a substitute for professional medical advice.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
