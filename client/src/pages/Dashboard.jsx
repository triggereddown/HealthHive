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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-500 mt-2 text-sm">Here is your health dashboard and prediction history.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="card p-6">
            <h2 className="font-playfair text-xl font-semibold mb-4 border-b pb-2">Profile Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Full Name</p>
                <p className="font-medium text-gray-900 mt-1">{user?.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Email Address</p>
                <p className="font-medium text-gray-900 mt-1">{user?.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Account Role</p>
                <p className="capitalize badge bg-gray-100 text-gray-700 mt-1">{user?.role}</p>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t">
              <Link to="/predict" className="btn-primary w-full flex items-center justify-center gap-2 text-sm">
                <FaHeartbeat /> New Prediction
              </Link>
            </div>
          </div>
        </div>

        {/* Prediction History Card */}
        <div className="md:col-span-2">
          <div className="card overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
              <h2 className="font-playfair text-xl font-semibold flex items-center gap-2">
                <FaClock className="text-gray-400" /> Recent Predictions
              </h2>
            </div>
            
            <div className="p-0">
              {isLoadingHistory ? (
                <div className="py-12"><FullPageSpinner /></div>
              ) : history.length === 0 ? (
                <div className="text-center py-16 px-6">
                  <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaHeartbeat className="text-primary-300 text-2xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No predictions yet</h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                    You haven't made any health predictions. Enter your symptoms to get started.
                  </p>
                  <Link to="/predict" className="btn-secondary text-sm">Try Symptom Checker</Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                      <tr>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Symptoms</th>
                        <th className="px-6 py-4">Result</th>
                        <th className="px-6 py-4">Confidence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {history.map((pred) => (
                        <tr key={pred._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 text-gray-900">
                            {formatDate(pred.createdAt)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-1 overflow-hidden max-w-[200px]">
                              {pred.symptoms.slice(0, 2).map((s, i) => (
                                <span key={i} className="badge bg-gray-100 text-gray-700 truncate max-w-[80px]">
                                  {s}
                                </span>
                              ))}
                              {pred.symptoms.length > 2 && (
                                <span className="badge bg-gray-50 text-gray-500">+{pred.symptoms.length - 2}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {pred.result}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold ${pred.confidence >= 70 ? 'text-green-600' : pred.confidence >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                                {pred.confidence}%
                              </span>
                            </div>
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
    </div>
  );
}

export default Dashboard;
