import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GlobalStyle } from './styles/GlobalStyle.js';
import { GlobalProvider } from './context/globalContext.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import Dashboard from './Components/Dashboard.jsx';
import Records from './Components/Records.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CashReserves from './Components/CashReserves.jsx';
import Budget from './Components/Budget.jsx';
import Reminders from './Components/Reminders.jsx';
import ForgotPassword from './Components/ForgotPassword.jsx';
import ResetPassword from './Components/ResetPassword.jsx';
import AppProvider from './context/appContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/records" element={<Records />} />
            <Route path="/cash-reserves" element={<CashReserves />} />
            <Route path="/budgets" element={<Budget />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </Router>
      </AppProvider>
    </GlobalProvider>
  </React.StrictMode>
);