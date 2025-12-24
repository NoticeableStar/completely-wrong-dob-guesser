import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DOBResult } from '@/types/quiz';
import { formatDate, isBirthdayProximity } from '@/utils/dobGenerator';
import { retryMessages } from '@/data/questions';
import { motion } from 'framer-motion';

interface ResultScreenProps {
  result: DOBResult;
  retryCount: number;
  onRetry: () => void;
  onConfirm: () => void;
}

export function ResultScreen({ result, retryCount, onRetry, onConfirm }: ResultScreenProps) {
  const [showPremium, setShowPremium] = useState(false);
  const isNearBirthday = isBirthdayProximity(result.date);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 glow-effect opacity-40" />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-xl w-full text-center"
      >
        {/* Retry message */}
        {retryCount > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-accent mb-6 font-body italic"
          >
            {retryMessages[Math.min(retryCount - 1, retryMessages.length - 1)]}
          </motion.p>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-body">
            The system has concluded
          </span>
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 mb-2"
        >
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-gradient">
            {formatDate(result.date)}
          </h1>
          {result.birthTime && (
            <p className="text-lg text-muted-foreground mt-2 font-body">
              at approximately {result.birthTime}
            </p>
          )}
        </motion.div>

        {/* Birthday proximity message */}
        {isNearBirthday && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 inline-block"
          >
            <span className="text-sm text-primary font-body">
              ✨ Your birthday is approaching. The system noticed.
            </span>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex justify-center gap-8"
        >
          <div className="text-center">
            <p className="text-3xl font-display font-semibold text-primary">
              {result.accuracy}%
            </p>
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mt-1">
              Accuracy
            </p>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <p className="text-3xl font-display font-semibold text-accent">
              ±{result.marginOfError}
            </p>
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mt-1">
              Years
            </p>
          </div>
        </motion.div>

        {/* Personality trait */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 p-6 rounded-xl card-gradient border border-border/50"
        >
          <p className="font-display text-lg italic text-foreground/90">
            "{result.personalityTrait}"
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="hero" size="lg" onClick={onConfirm}>
            This feels correct
          </Button>
          <Button variant="mysterious" size="lg" onClick={onRetry}>
            Try again
          </Button>
        </motion.div>

        {/* Premium upsell */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >
          {!showPremium ? (
            <button
              onClick={() => setShowPremium(true)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-body underline underline-offset-4"
            >
              Unlock Exact Birth Time — $4.99
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-card/50 border border-border/50"
            >
              <p className="text-sm text-muted-foreground font-body">
                After careful consideration, we've decided not to take your money.
                <br />
                <span className="text-xs italic mt-2 block">
                  Some truths are not for sale.
                </span>
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-8 text-xs text-muted-foreground/50 font-body"
        >
          For entertainment purposes. Probably.
        </motion.p>
      </motion.div>
    </div>
  );
}
