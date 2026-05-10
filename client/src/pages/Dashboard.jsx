import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaHeartbeat } from 'react-icons/fa';
import useAuthStore from '../store/authStore';
import usePredictionStore from '../store/predictionStore';
import { FullPageSpinner } from '../components/Spinner';

function Dashboard() {
  const { user } = useAuthStore();
  const { history, fetchHistory, isLoadingHistory } = usePredictionStore();

  useEffect(() => {
    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options).toUpperCase();
  };

  return (
    <div className="bg-void min-h-screen pt-24 pb-32">
      <div className="px-6 sm:px-12 lg:px-24 max-w-screen-2xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#222222] pb-8">
          <div>
            <span className="section-label">/ COMMAND CENTER</span>
            <h1 className="font-display text-display-sm uppercase text-ink">
              DASHBOARD
            </h1>
          </div>
          <Link to="/predict" className="btn-primary">
            NEW PREDICTION →
          </Link>
        </div>

        <div className="grid lg:grid-cols-4 gap-px bg-[#222222] border border-[#222222]">
          
          {/* Profile Details */}
          <div className="lg:col-span-1 bg-surface p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <FaHeartbeat className="text-9xl text-white" />
            </div>
            
            <span className="section-label">/ IDENTITY</span>
            <h2 className="font-display text-3xl uppercase text-ink mb-10">USER PROFILE</h2>
            
            <div className="space-y-6">
              <div>
                <span className="font-mono text-2xs text-ink-faint block mb-1">FULL NAME</span>
                <span className="font-body text-ink uppercase text-sm">{user?.name}</span>
              </div>
              <div className="w-full h-px bg-[#1A1A1A]" />
              <div>
                <span className="font-mono text-2xs text-ink-faint block mb-1">EMAIL ADDRESS</span>
                <span className="font-mono text-ink text-xs">{user?.email}</span>
              </div>
              <div className="w-full h-px bg-[#1A1A1A]" />
              <div>
                <span className="font-mono text-2xs text-ink-faint block mb-2">ACCOUNT ROLE</span>
                <span className="badge-default">SYSTEM {user?.role.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Prediction History */}
          <div className="lg:col-span-3 bg-surface p-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="section-label">/ HISTORY LOG</span>
                <h2 className="font-display text-3xl uppercase text-ink">RECENT PREDICTIONS</h2>
              </div>
              <FaClock className="text-ink-faint text-xl" />
            </div>
            
            {isLoadingHistory ? (
              <div className="py-20 flex justify-center"><FullPageSpinner /></div>
            ) : history.length === 0 ? (
              <div className="border border-[#222222] py-20 text-center">
                <span className="font-mono text-xs text-ink-faint block mb-4">EMPTY_LOG_FILE</span>
                <h3 className="font-display text-2xl uppercase text-ink">NO RECORDS FOUND</h3>
                <Link to="/predict" className="btn-secondary mt-6 inline-block">INITIALIZE ANALYSIS</Link>
              </div>
            ) : (
              <div className="overflow-x-auto border border-[#222222]">
                <table className="w-full text-left font-mono text-xs whitespace-nowrap">
                  <thead className="bg-[#111] text-ink-faint border-b border-[#222222]">
                    <tr>
                      <th className="px-6 py-4 font-normal">TIMESTAMP</th>
                      <th className="px-6 py-4 font-normal">SYMPTOMS_VECTOR</th>
                      <th className="px-6 py-4 font-normal">OUTPUT_RESULT</th>
                      <th className="px-6 py-4 font-normal">CONFIDENCE_SCORE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222222]">
                    {history.map((pred) => (
                      <tr key={pred._id} className="hover:bg-[#1A1A1A] transition-colors group">
                        <td className="px-6 py-5 text-ink-muted group-hover:text-ink transition-colors">
                          {formatDate(pred.createdAt)}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex gap-2 overflow-hidden max-w-[250px]">
                            {pred.symptoms.slice(0, 2).map((s, i) => (
                              <span key={i} className="text-ink uppercase">
                                [{s}]
                              </span>
                            ))}
                            {pred.symptoms.length > 2 && (
                              <span className="text-accent">+{pred.symptoms.length - 2} MORE</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-ink uppercase">
                          {pred.result}
                        </td>
                        <td className="px-6 py-5">
                          <span className={`${pred.confidence >= 70 ? 'text-green-500' : pred.confidence >= 40 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {pred.confidence}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
