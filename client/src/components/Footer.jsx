import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-void relative z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 pt-24 pb-12">
        
        {/* Top Section */}
        <div className="mb-16">
          <h2 className="font-display text-[clamp(4rem,12vw,10rem)] text-[#1A1A1A] leading-none select-none tracking-tightest">
            COMCARE
          </h2>
          <div className="h-px w-full bg-[#222222] mt-4" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
          {/* Brand Statement */}
          <div>
            <span className="font-body font-medium tracking-ultra uppercase text-2xs text-accent mb-4 block">
              / HEALTH INTELLIGENCE PLATFORM
            </span>
            <p className="font-body font-light text-sm text-ink-muted leading-relaxed max-w-sm">
              AI-powered symptom analysis, disease prediction, and healthcare resource discovery for everyone.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <span className="font-body font-medium tracking-ultra uppercase text-2xs text-ink-faint mb-6 block">
              PLATFORM
            </span>
            <ul className="flex flex-col gap-3">
              <li><Link to="/" className="text-sm text-ink-muted hover:text-ink transition-colors">Home</Link></li>
              <li><Link to="/predict" className="text-sm text-ink-muted hover:text-ink transition-colors">Symptom Checker</Link></li>
              <li><Link to="/ngos" className="text-sm text-ink-muted hover:text-ink transition-colors">Directory</Link></li>
              <li><Link to="/about" className="text-sm text-ink-muted hover:text-ink transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <span className="font-body font-medium tracking-ultra uppercase text-2xs text-ink-faint mb-6 block">
              ACCOUNT
            </span>
            <ul className="flex flex-col gap-3">
              <li><Link to="/login" className="text-sm text-ink-muted hover:text-ink transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="text-sm text-ink-muted hover:text-ink transition-colors">Create Account</Link></li>
              <li><Link to="/dashboard" className="text-sm text-ink-muted hover:text-ink transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1A1A1A] pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-mono text-xs text-ink-faint">
            © {currentYear} COMCARE
          </p>
          <p className="font-mono text-xs text-ink-faint">
            NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
