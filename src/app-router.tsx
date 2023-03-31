import React from 'react';
import {Routes, Route} from "react-router-dom";
import { authRoutes, privateRoutes } from './router';

export const AppRouter = () => {
  const  isAuth  = localStorage.getItem('token');

  return (
    <Routes>
      {isAuth ?
        authRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))
        :
        privateRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))
      }
    </Routes>
  );
};
