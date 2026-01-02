import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';  
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import App from './App.tsx'
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./Context/AuthContext";




createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <AuthContextProvider>
    <App />
  </AuthContextProvider>
      <ToastContainer />
  </StrictMode>,
)
