import { Link } from 'react-router-dom';
import { FaBrain, FaHospital, FaShieldAlt, FaChartLine } from 'react-icons/fa';
import useAuthStore from '../store/authStore';
import { useInView } from '../utils/useInView';
import { useEffect, useState } from 'react';

const features = [
  {
    icon: FaBrain,
    title: 'AI-Powered Predictions',
    description: 'Enter your symptoms and receive instant disease predictions powered by our intelligent analysis engine.',
  },
  {
    icon: FaHospital,
    title: 'NGO Directory',
    description: 'Discover verified NGOs and healthcare services near you, with contact details and services offered.',
  },
  {
    icon: FaShieldAlt,
    title: 'Secure & Private',
    description: 'Your health data is encrypted and protected with enterprise-grade security. Your privacy is our priority.',
  },
  {
    icon: FaChartLine,
    title: 'Health History',
    description: 'Track your prediction history over time to monitor your health journey and share with your doctor.',
  },
];

const stats = [
  { label: 'Diseases Covered', value: 18, suffix: '+' },
  { label: 'NGOs Listed', value: 50, suffix: '+' },
  { label: 'Users Helped', value: 10, suffix: 'K+' },
  { label: 'Accuracy Rate', value: 85, suffix: '%' },
];

function AnimatedNumber({ value, suffix }) {
  const [ref, inView] = useInView(0.5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 1200;
      const stepTime = Math.abs(Math.floor(duration / value));
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === value) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-[clamp(4rem,8vw,7rem)] text-ink leading-none tracking-tightest">
      {count}{suffix}
    </span>
  );
}

function Home() {
  const { user } = useAuthStore();

  return (
    <div className="bg-void">
      {/* SECTION 1 — HERO */}
      <section className="curtain-section z-10 bg-void bg-dot-grid">
        <div className="grid lg:grid-cols-2 min-h-screen px-6 sm:px-12 lg:px-24 pt-32 pb-24 gap-16 lg:gap-8">
          
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-center">
            <span className="section-label">/ AI HEALTH INTELLIGENCE</span>
            
            <h1 className="font-display text-display-xl uppercase text-ink leading-none tracking-tightest mb-8">
              <span className="block">YOUR HEALTH,</span>
              <span className="block text-accent">INTELLIGENTLY</span>
              <span className="block">UNDERSTOOD</span>
            </h1>
            
            <p className="font-body font-light text-base text-ink-muted leading-relaxed max-w-md">
              Enter your symptoms, get instant disease insights, discover healthcare NGOs,
              and take control of your health journey — all in one platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              {user ? (
                <Link to="/predict" className="btn-primary">
                  CHECK SYMPTOMS →
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary">
                    GET STARTED →
                  </Link>
                  <Link to="/ngos" className="btn-secondary">
                    FIND NGOS
                  </Link>
                </>
              )}
            </div>

            <div className="mt-16 flex flex-wrap gap-12">
              <div>
                <span className="font-display text-5xl text-ink">18+</span>
                <span className="section-label mt-2">Diseases Covered</span>
              </div>
              <div>
                <span className="font-display text-5xl text-ink">85%</span>
                <span className="section-label mt-2">Accuracy Rate</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="hidden lg:flex items-center justify-end">
            <div className="w-full max-w-md bg-surface border border-[#2A2A2A] rounded-lg p-6 border-t-2 border-t-accent animate-float">
              <div className="flex justify-between items-center mb-6">
                <span className="section-label mb-0">LATEST PREDICTION</span>
                <div className="animate-pulse bg-green-500 w-2 h-2 rounded-full" />
              </div>

              <div>
                <span className="font-mono text-2xs text-ink-faint">SYMPTOMS ENTERED</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge-default">Fever</span>
                  <span className="badge-default">Fatigue</span>
                  <span className="badge-default">Cough</span>
                  <span className="badge-default">Headache</span>
                </div>
              </div>

              <div className="border-t border-[#1A1A1A] my-4" />

              <div>
                <span className="section-label mb-2">RESULT</span>
                <span className="font-display text-3xl text-ink uppercase">Influenza (Flu)</span>
                <div className="flex items-center mt-3">
                  <div className="bg-surface2 h-1 w-full rounded-none">
                    <div className="bg-accent h-1 rounded-none w-[78%]" />
                  </div>
                  <span className="font-mono text-xs text-accent ml-2">78%</span>
                </div>
              </div>

              <div className="mt-6">
                <span className="badge-success">RECOMMENDATIONS READY</span>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* SECTION 2 — FEATURES */}
      <section className="curtain-section z-20 bg-surface">
        <div className="py-section px-6 sm:px-12 lg:px-24 min-h-screen flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-8 mb-16 items-end">
            <div>
              <span className="section-label">/ CAPABILITIES</span>
              <h2 className="font-display text-display-md uppercase text-ink leading-none">
                EVERYTHING YOU NEED FOR BETTER HEALTH
              </h2>
            </div>
            <div className="lg:pb-2">
              <p className="font-body font-light text-sm text-ink-muted max-w-sm">
                Powerful tools to understand, track, and improve your health outcomes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#222222] border border-[#222222]">
            {features.map(({ icon: Icon, title, description }, idx) => (
              <div key={title} className="bg-surface p-8 md:p-10 group transition-colors hover:bg-surface2">
                <div className="flex justify-between items-start mb-6">
                  <Icon className="text-ink-faint text-2xl group-hover:text-ink transition-colors" />
                  <span className="font-mono text-2xs text-ink-faint">0{idx + 1}</span>
                </div>
                <h3 className="font-display text-2xl uppercase text-ink mt-6 mb-3">{title}</h3>
                <p className="font-body font-light text-sm text-ink-muted leading-relaxed">{description}</p>
                <div className="w-8 h-px bg-accent mt-8 transition-all duration-300 group-hover:w-16" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — STATS */}
      <section className="curtain-section z-30 bg-void">
        <div className="py-section px-6 sm:px-12 lg:px-24 min-h-screen flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-4 border-y border-[#222222]">
            {stats.map(({ label, value, suffix }, idx) => (
              <div key={label} className={`flex flex-col py-12 ${idx !== 0 ? 'md:border-l border-[#222222] md:pl-8' : 'pr-8'}`}>
                <AnimatedNumber value={value} suffix={suffix} />
                <span className="section-label mt-3 mb-0">{label}</span>
                <p className="font-body font-light text-xs text-ink-faint mt-2 max-w-[150px]">
                  Comprehensive clinical database across conditions
                </p>
              </div>
            ))}
          </div>
          
          <div className="h-px w-full bg-[#1A1A1A] mt-16" />
          <p className="font-mono text-xs text-ink-faint mt-4">
            * All data as of 2025. Predictions are informational only.
          </p>
        </div>
      </section>

      {/* SECTION 4 — CTA */}
      <section className="curtain-section z-40 bg-void bg-dot-grid-accent">
        <div className="py-section px-6 min-h-screen flex flex-col items-center justify-center text-center">
          <div className="max-w-2xl mx-auto">
            <span className="section-label">/ GET STARTED TODAY</span>
            <h2 className="font-display text-display-lg uppercase text-ink leading-none">
              READY TO TAKE{' '}
              <span style={{ textDecoration: 'underline', textDecorationColor: 'var(--accent)', textDecorationThickness: '4px', textUnderlineOffset: '8px' }}>
                CHARGE
              </span>
              {' '}OF YOUR HEALTH?
            </h2>
            <p className="mt-6 text-ink-muted font-body font-light text-base">
              Join thousands of users who trust ComCare for symptom analysis and healthcare discovery.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/register" className="btn-primary">CREATE FREE ACCOUNT</Link>
              <Link to="/ngos" className="btn-secondary">BROWSE NGOS</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
