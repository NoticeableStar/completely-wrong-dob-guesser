import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { loadingMessages } from '@/data/questions';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [hasGlitched, setHasGlitched] = useState(false);

  useEffect(() => {
    // Quirky progress bar behavior
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // Quick progress at first
        if (prev < 70) {
          return prev + Math.random() * 8 + 2;
        }
        // Slow down around 90-95%
        if (prev < 92) {
          return prev + Math.random() * 2 + 0.5;
        }
        // Jump backward once
        if (prev >= 92 && prev < 95 && !hasGlitched) {
          setHasGlitched(true);
          return prev - 15;
        }
        // Finally complete
        if (prev < 100) {
          return prev + Math.random() * 3 + 1;
        }
        return prev;
      });
    }, 200);

    // Rotate messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [hasGlitched]);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 glow-effect opacity-40" />
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        >
          <div className="absolute inset-0 rounded-full border border-primary/10" />
          <div className="absolute inset-[100px] rounded-full border border-accent/10" />
          <div className="absolute inset-[200px] rounded-full border border-primary/5" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-md w-full text-center">
        {/* Spinning indicator */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 mx-auto mb-8 rounded-full border-2 border-primary/20 border-t-primary"
        />

        {/* Loading message */}
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="font-display text-xl md:text-2xl mb-8 text-foreground/80"
        >
          {loadingMessages[messageIndex]}
        </motion.p>

        {/* Progress bar */}
        <div className="relative">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-body"
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.span>
        </div>

        {/* Subtle warning */}
        {progress > 80 && progress < 100 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-xs text-muted-foreground/50 font-body italic"
          >
            This is taking longer than expected. That's normal.
          </motion.p>
        )}
      </div>
    </div>
  );
}
