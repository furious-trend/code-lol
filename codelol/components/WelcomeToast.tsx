'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

function ToastContent() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get('toast') === 'welcome-back') {
      setShow(true);
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
      const timer = setTimeout(() => setShow(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 px-6 py-4 rounded-2xl shadow-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold backdrop-blur-md border border-indigo-400/50 flex items-center gap-3"
        >
          <span className="text-2xl">👋</span>
          Welcome back! Logged you into your existing account.
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function WelcomeToast() {
  return (
    <Suspense fallback={null}>
      <ToastContent />
    </Suspense>
  );
}
