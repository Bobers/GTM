'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Target, Rocket, TrendingUp, Globe } from 'lucide-react';

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  stageIndex: number;
}

const stageBadges = [
  {
    icon: Trophy,
    title: 'The Proof of Concept Pioneer',
    description: 'You\'ve validated your first concept!',
    tip: '💡 Pro tip: Talk to 10 more users this week to strengthen your validation.',
    color: 'blue'
  },
  {
    icon: Target,
    title: 'The Revenue Ranger',
    description: 'First paying customers acquired!',
    tip: '💰 Pro tip: Track your CAC closely - aim for payback in <6 months.',
    color: 'green'
  },
  {
    icon: Rocket,
    title: 'The Scale Seeker',
    description: 'You\'ve found a repeatable GTM motion!',
    tip: '📈 Pro tip: Double down on what\'s working before exploring new channels.',
    color: 'purple'
  },
  {
    icon: TrendingUp,
    title: 'The Profit Prophet',
    description: 'Sustainable business model achieved!',
    tip: '💪 Pro tip: Focus on unit economics - healthy margins enable growth.',
    color: 'orange'
  },
  {
    icon: Globe,
    title: 'The Market Master',
    description: 'Ready for market expansion!',
    tip: '🌍 Pro tip: Apply your learnings to adjacent markets systematically.',
    color: 'indigo'
  }
];

export default function BadgeModal({ isOpen, onClose, stageIndex }: BadgeModalProps) {
  const badge = stageBadges[stageIndex];
  const Icon = badge.icon;

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const colorStyles = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    purple: 'from-purple-400 to-purple-600',
    orange: 'from-orange-400 to-orange-600',
    indigo: 'from-indigo-400 to-indigo-600'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            {/* Confetti animation */}
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-br from-yellow-400 to-pink-400"
                  initial={{
                    x: '50vw',
                    y: '50vh',
                    scale: 0,
                    rotate: 0
                  }}
                  animate={{
                    x: `${Math.random() * 100}vw`,
                    y: `${Math.random() * 100}vh`,
                    scale: [0, 1, 0],
                    rotate: Math.random() * 720
                  }}
                  transition={{
                    duration: 2,
                    delay: Math.random() * 0.5,
                    ease: 'easeOut'
                  }}
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                  }}
                />
              ))}
            </div>

            {/* Badge modal */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="relative bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4 pointer-events-auto"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${colorStyles[badge.color as keyof typeof colorStyles]} flex items-center justify-center`}
                >
                  <Icon className="w-12 h-12 text-white" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold mb-2"
                >
                  Achievement Unlocked!
                </motion.h2>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl font-semibold text-gray-700 mb-2"
                >
                  {badge.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600 mb-4"
                >
                  {badge.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gray-100 p-4 rounded-lg"
                >
                  <p className="text-sm text-gray-700">{badge.tip}</p>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={onClose}
                  className="mt-6 px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}