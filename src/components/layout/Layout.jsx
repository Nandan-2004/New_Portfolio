import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import useScrollToTop from '../../hooks/useScrollToTop';

export default function Layout() {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 flex flex-col justify-between relative">
      <Header />
      
      <main className="flex-1 w-full pt-20 sm:pt-24 pb-12">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
