import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MainLayout() {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 overflow-y-auto page-enter" key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
