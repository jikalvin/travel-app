import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import SignUp from './components/SignUp';
import Home from './components/Home';
import NewNav from './components/NewNav';
import Chat from './components/Chat';
import NotFound from './components/NotFound'
import DashBoard from './components/DashBoard'
import AdminLayout from "./layouts/admin";
import AuthLayout from "layouts/auth";

function App() {
  return (
    <div className="max-w-[1440px] h-12 mx-auto bg-white">
      <Router>                             
        <Routes>                                                      
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="admin/*" element={<AdminLayout />} />
          <Route path="auth/*" element={<AuthLayout />} />
        </Routes>                    
      </Router>
    </div>
  );
}

export default App;
