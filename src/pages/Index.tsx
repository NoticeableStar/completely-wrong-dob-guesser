import { useState, useCallback } from 'react';
import { LandingScreen } from '@/components/LandingScreen';
import { QuestionScreen } from '@/components/QuestionScreen';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ResultScreen } from '@/components/ResultScreen';
import { ConfirmationScreen } from '@/components/ConfirmationScreen';
import { questions } from '@/data/questions';
import { generateDOB } from '@/utils/dobGenerator';
import { Answer, DOBResult } from '@/types/quiz';
import { AnimatePresence, motion } from 'framer-motion';

type Screen = 'landing' | 'questions' | 'loading' | 'result' | 'confirmation';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('landing');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<DOBResult | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const handleBegin = useCallback(() => {
    setScreen('questions');
  }, []);

  const handleQuestionsComplete = useCallback((newAnswers: Answer[]) => {
    setAnswers(newAnswers);
    setScreen('loading');
  }, []);

  const handleLoadingComplete = useCallback(() => {
    const dobResult = generateDOB(answers, retryCount);
    setResult(dobResult);
    setScreen('result');
  }, [answers, retryCount]);

  const handleRetry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
    setScreen('loading');
  }, []);

  const handleConfirm = useCallback(() => {
    setScreen('confirmation');
  }, []);

  const handleRestart = useCallback(() => {
    setScreen('landing');
    setAnswers([]);
    setResult(null);
    setRetryCount(0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {screen === 'landing' && <LandingScreen onBegin={handleBegin} />}
          {screen === 'questions' && (
            <QuestionScreen
              questions={questions}
              onComplete={handleQuestionsComplete}
            />
          )}
          {screen === 'loading' && (
            <LoadingScreen onComplete={handleLoadingComplete} />
          )}
          {screen === 'result' && result && (
            <ResultScreen
              result={result}
              retryCount={retryCount}
              onRetry={handleRetry}
              onConfirm={handleConfirm}
            />
          )}
          {screen === 'confirmation' && (
            <ConfirmationScreen onRestart={handleRestart} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
