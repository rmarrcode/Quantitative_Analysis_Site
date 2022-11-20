import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // TO get bootstrap working
// import reportWebVitals from './misc/reportWebVitals';

import { BrowserRouter, Routes, Route, } from "react-router-dom"
import { AuthProvider } from './new_components/auth/useAuth';

// RYAN TODO: EVENTUALLY ADD THIS BACK
// import KYC from './new_components/kyc/kyc';

// Shiny new Components
import MatadorLanding from './new_components/landing/landing';
import MatadorPage from './new_components/base/page';
import MatadorSignin from "./new_components/auth/signin";
import MatadorSignUp from "./new_components/auth/signup";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AuthProvider>
        <Routes>
          <Route path="/" element={<MatadorLanding/>} />
          <Route path="/signup" element={<MatadorSignUp />} />
          <Route path="/signin" element={<MatadorSignin />} />
        </Routes> 
    </AuthProvider>
  </BrowserRouter>
);

