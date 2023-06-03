import React from 'react';
import logo from './logo.svg';
import { Routes,Route } from 'react-router-dom';

import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
function App() {
  return (
    <div className="bg-slate-400 h-screen">
    <Routes>
<Route  path='/' element={<Login/>} ></Route>
<Route  path='/signup' element={<Signup/>} ></Route>

<Route path='/dashboard' element={<Dashboard/>} ></Route>

</Routes>

    </div>
  );
}

export default App;
