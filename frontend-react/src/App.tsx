import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './common/ui/Header.components';
import LoginPage from './authentication/ui/LoginPage.components';
import RegisterPage from './authentication/ui/RegisterPage.components';
import WalletDashboard from './wallet/ui/WalletDashboard.components';
import { AuthProvider, useAuth } from './authentication/application/useAuth.hooks';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<PrivateRoute><WalletDashboard userId="1" /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useAuth();
  return !token  ? children : <Navigate to="/login" />;
};

export default App;
