import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Comentarios from './pages/Comentarios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />    
        <Route path="/comentarios" element={<Comentarios />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
