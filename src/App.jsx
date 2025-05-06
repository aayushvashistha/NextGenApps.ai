import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import HomePage from './HomePage';
import ContactPage from './ContactPage';

export default function App() {
  return (
    <AuthProvider> {/* Wrap the Router with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={5000} />
      </Router>
    </AuthProvider>
  );
}
