import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export default function AdminPanel() {
  const { isAdmin, toggleAdmin } = useStore();
  const [input, setInput] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    if (input === 'admin') {
      toggleAdmin();
      setShowLogin(false);
      setInput('');
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end pointer-events-auto">
      <button
        onClick={() => (isAdmin ? toggleAdmin() : setShowLogin(!showLogin))}
        className="p-2 rounded-full glass-panel hover:bg-white/20 transition-all text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </button>
      {showLogin && !isAdmin && (
        <div className="mt-2 p-4 glass-panel rounded-lg flex gap-2 shadow-xl">
          <input
            type="password"
            placeholder="Pass: admin"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-white/10 border border-white/20 rounded px-2 py-1 outline-none text-white text-sm"
          />
          <button
            onClick={handleLogin}
            className="bg-luxury-gold text-white px-3 py-1 rounded text-sm"
          >
            Login
          </button>
        </div>
      )}
      {isAdmin && (
        <div className="mt-2 text-xs font-bold text-luxury-gold bg-white px-2 py-1 rounded shadow">
          CMS Mode
        </div>
      )}
    </div>
  );
}
