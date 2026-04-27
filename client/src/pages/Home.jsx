import { Link } from 'react-router-dom';
import { FaBrain, FaHospital, FaShieldAlt, FaChartLine, FaArrowRight, FaHeartbeat } from 'react-icons/fa';
import { MdHealthAndSafety } from 'react-icons/md';
import useAuthStore from '../store/authStore';

const features = [
  {
    icon: FaBrain,
    title: 'AI-Powered Predictions',
    description: 'Enter your symptoms and receive instant disease predictions powered by our intelligent analysis engine.',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: FaHospital,
    title: 'NGO Directory',
    description: 'Discover verified NGOs and healthcare services near you, with contact details and services offered.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: FaShieldAlt,
    title: 'Secure & Private',
    description: 'Your health data is encrypted and protected with enterprise-grade security. Your privacy is our priority.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: FaChartLine,
    title: 'Health History',
    description: 'Track your prediction history over time to monitor your health journey and share with your doctor.',
    color: 'bg-orange-100 text-orange-600',
  },
];

const stats = [
  { label: 'Diseases Covered', value: '18+' },
  { label: 'NGOs Listed', value: '50+' },
  { label: 'Users Helped', value: '10K+' },
  { label: 'Accuracy Rate', value: '85%' },
];

function Home() {
  const { user } = useAuthStore();

  return (
    <div>
      {/* ─── Hero Section ────────────────────────────────── */}
      <section className="bg-hero-gradient min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-2 mb-6 text-sm font-medium backdrop-blur-sm">
                <MdHealthAndSafety className="text-primary-300" />
                <span>Smart Healthcare Platform</span>
              </div>

              <h1 className="font-playfair text-5xl md:text-6xl font-bold leading-tight mb-6">
                Your Health,{' '}
                <span className="text-primary-300">Intelligently</span>{' '}
                Understood
              </h1>

              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
                Enter your symptoms, get instant disease insights, discover healthcare NGOs, and take control of your health journey — all in one platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Link to="/predict" className="btn-primary bg-white text-primary-800 hover:bg-gray-100 flex items-center justify-center gap-2">
                    Check Symptoms <FaArrowRight />
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn-primary bg-white text-primary-800 hover:bg-gray-100 flex items-center justify-center gap-2 text-base">
                      Get Started Free <FaArrowRight />
                    </Link>
                    <Link to="/ngos" className="btn-secondary border-white/40 text-white hover:bg-white/10 flex items-center justify-center gap-2 text-base">
                      Find NGOs
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Hero Card */}
            <div className="hidden lg:flex justify-center animate-fade-in">
              <div className="relative w-80">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-400/30 rounded-xl flex items-center justify-center">
                      <FaHeartbeat className="text-white text-lg animate-pulse-slow" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Latest Prediction</p>
                      <p className="text-white/60 text-xs">Just now</p>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/70 text-xs mb-1">Symptoms entered</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {['Fever', 'Fatigue', 'Cough', 'Headache'].map(s => (
                        <span key={s} className="badge bg-primary-300/30 text-white text-xs">{s}</span>
                      ))}
                    </div>
                    <div className="border-t border-white/10 pt-3">
                      <p className="text-white/70 text-xs mb-1">Result</p>
                      <p className="text-white font-semibold">Influenza (Flu)</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 bg-white/10 rounded-full h-1.5">
                          <div className="bg-primary-300 h-1.5 rounded-full" style={{ width: '78%' }} />
                        </div>
                        <span className="text-white text-xs font-medium">78%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300 text-sm">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    Recommendations ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ───────────────────────────────────────── */}
      <section className="bg-primary-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ label, value }) => (
              <div key={label}>
                <p className="font-playfair text-4xl font-bold text-primary-200">{value}</p>
                <p className="text-sm text-white/70 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Everything You Need for Better Health</h2>
            <p className="section-subtitle">Powerful tools to understand, track, and improve your health outcomes.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description, color }) => (
              <div key={title} className="card p-6 text-center group cursor-default">
                <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110 duration-200`}>
                  <Icon className="text-2xl" />
                </div>
                <h3 className="font-playfair text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-hero-gradient rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="font-playfair text-4xl font-bold mb-4">Ready to Take Charge of Your Health?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of users who trust ComCare for symptom analysis and healthcare discovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-primary-800 font-semibold py-3 px-8 rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                Create Free Account
              </Link>
              <Link to="/ngos" className="border-2 border-white/40 text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/10 transition-colors">
                Browse NGOs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
