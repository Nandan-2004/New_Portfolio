import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, FileText, ArrowRight, Terminal } from 'lucide-react';
import { navRoutes, contactInfo } from '../../data/navigation';

export default function MobileNav({ isOpen, onClose, onOpenCV }) {
  const shouldReduceMotion = useReducedMotion();

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  const drawerVariants = {
    closed: { 
      y: shouldReduceMotion ? 0 : -15, 
      opacity: 0,
      transition: { duration: 0.15 } 
    },
    open: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.25, ease: 'easeOut' } 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer Menu Panel */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            className="fixed top-16 left-3 right-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-semibold">
                <Terminal className="w-4 h-4" />
                <span>~/portfolio/menu</span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close Navigation Menu"
                className="p-1 rounded-lg text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="flex flex-col space-y-1.5">
              {navRoutes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  end={route.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `px-3.5 py-2.5 rounded-xl text-xs font-mono flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <span>{route.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </NavLink>
              ))}
            </nav>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => { onClose(); onOpenCV(); }}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-medium flex items-center justify-center gap-2 shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Curriculum Vitae</span>
              </button>
              
              <div className="text-[11px] font-mono text-emerald-700 text-center pt-1 font-semibold">
                {contactInfo.availability}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
