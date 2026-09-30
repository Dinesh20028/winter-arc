import React from 'react';
import Sidebar from './Sidebar';

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <main className="flex-1 overflow-hidden bg-slate-950">{children}</main>
    </div>
  );
}

export default MainLayout;
