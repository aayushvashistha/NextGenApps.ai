import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
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
      </Router>
    </AuthProvider>
  );
}
