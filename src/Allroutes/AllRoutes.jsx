import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Desktop from '../pages/Desktop';

const AllRoutes = () => {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/desktop' element={<Desktop />} />
      </Routes>
    </div>
  );
}

export default AllRoutes;
