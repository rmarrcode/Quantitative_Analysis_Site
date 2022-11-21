import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // TO get bootstrap working
// import reportWebVitals from './misc/reportWebVitals';

import { BrowserRouter, Routes, Route, } from "react-router-dom"
import { AuthProvider } from './components/auth/useAuth';

import Console from './components/console/console';
import Signin from "./components/auth/signin";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AuthProvider>
        <Routes>
          <Route path="/console" element={<Console/>} />
          <Route path="/" element={<Signin />} />
        </Routes> 
    </AuthProvider>
  </BrowserRouter>
);

