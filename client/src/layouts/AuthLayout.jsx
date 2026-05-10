import { Outlet, Link } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT PANEL */}
      <div className="hidden md:block relative bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-50" />
        {/* Large faded CC monogram */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[30vw] text-[#111111] select-none pointer-events-none leading-none">
          CC
        </div>
        
        <div className="relative h-full flex flex-col justify-center px-12 lg:px-24">
          <div>
            <span className="w-1 h-8 bg-accent inline-block mr-3 align-middle" />
            <span className="font-display text-4xl tracking-tightest text-ink align-middle">COMCARE</span>
          </div>
          <p className="font-body font-light text-sm text-ink-muted mt-4">
            Health intelligence. For everyone.
          </p>
          
          <div className="mt-16">
            <span className="font-display text-7xl text-ink leading-none block mb-2">85%</span>
            <span className="section-label">AI PREDICTION ACCURACY</span>
            
            <div className="border-t border-[#222222] my-6 max-w-[200px]" />
            
            <span className="font-display text-4xl text-ink leading-none block mb-2">10K+</span>
            <span className="section-label">USERS HELPED</span>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-8">
          <p className="font-mono text-2xs text-ink-faint">© 2025 COMCARE<br/>INFORMATIONAL USE ONLY</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="bg-void flex items-center justify-center p-8 md:p-16 relative">
        <div className="w-full max-w-sm animate-fade-in relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
