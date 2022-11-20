import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // TO get bootstrap working
// import reportWebVitals from './misc/reportWebVitals';

import { BrowserRouter, Routes, Route, } from "react-router-dom"
import { AuthProvider } from './components/auth/useAuth';

import MatadorLanding from './components/landing/landing';
import MatadorSignin from "./components/auth/signin";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AuthProvider>
        <Routes>
          <Route path="/" element={<MatadorLanding/>} />
          <Route path="/signin" element={<MatadorSignin />} />
        </Routes> 
    </AuthProvider>
  </BrowserRouter>
);

