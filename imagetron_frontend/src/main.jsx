import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { GoogleOAuthProvider} from "@react-oauth/google";
import { BrowserRouter as Router} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <GoogleOAuthProvider clientId="66463181402-qiugg8m23pahgc0otl7krdetqpsnelua.apps.googleusercontent.com"><App /></GoogleOAuthProvider>
      
    </Router>
  </React.StrictMode>,
)
