import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';

export const MainLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};