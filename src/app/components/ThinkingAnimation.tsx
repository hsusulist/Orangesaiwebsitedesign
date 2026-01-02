import { motion } from 'motion/react';

export function ThinkingAnimation() {
  return (
    <div className="flex items-center gap-3">
      {/* Main orange juice drop */}
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-12 h-12 relative"
        >
          {/* Outer glow */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full blur-lg"
          />
          
          {/* Main drop */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full" />
          
          {/* Highlight */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-2 left-2 w-3 h-3 bg-white/60 rounded-full"
          />
        </motion.div>
      </div>

      {/* Animated dots */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            className="w-3 h-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
            }}
          />
        ))}
      </div>

      {/* Sparkle effects */}
      <div className="relative w-8 h-8">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full"
            style={{
              top: i % 2 === 0 ? '0%' : '80%',
              left: i < 2 ? '0%' : '80%',
            }}
          />
        ))}
      </div>
    </div>
  );
}
