import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './login/Login.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './dashbord/Home.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
      </Routes>
  </BrowserRouter>,
)
