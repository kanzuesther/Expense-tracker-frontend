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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/records" element={<Records />} />
      </Routes>
    </Router>
    </GlobalProvider>
  </React.StrictMode>
);