import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Question, Answer } from '@/types/quiz';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { months, processingMessages } from '@/data/questions';
import { Slider } from '@/components/ui/slider';

interface QuestionScreenProps {
  questions: Question[];
  onComplete: (answers: Answer[]) => void;
}

export function QuestionScreen({ questions, onComplete }: QuestionScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const [sliderValue, setSliderValue] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMicrocopy, setShowMicrocopy] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleSelect = useCallback((value: string) => {
    setSelectedOption(value);
    setShowMicrocopy(true);
  }, []);

  const advanceToNext = useCallback((value: string | number) => {
    const newAnswers = [
      ...answers,
      { questionId: currentQuestion.id, value },
    ];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setSliderValue(50);
      setShowMicrocopy(false);
    } else {
      onComplete(newAnswers);
    }
  }, [answers, currentQuestion?.id, currentIndex, questions.length, onComplete]);

  const handleNext = useCallback(() => {
    const value = currentQuestion.type === 'slider' ? sliderValue : selectedOption;
    if (value === null) return;

    // Show processing message for specific questions
    if (currentQuestion.showProcessing) {
      setIsProcessing(true);
      const delay = 300 + Math.random() * 400;
      setTimeout(() => {
        setIsProcessing(false);
        advanceToNext(value);
      }, delay);
    } else {
      // Occasional subtle delay
      const shouldDelay = Math.random() > 0.7;
      if (shouldDelay) {
        setTimeout(() => advanceToNext(value), 200);
      } else {
        advanceToNext(value);
      }
    }
  }, [currentQuestion, selectedOption, sliderValue, advanceToNext]);

  const canContinue = currentQuestion.type === 'slider' ? true : selectedOption !== null;

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 glow-effect opacity-30" />

      {/* Progress bar */}
      <div className="max-w-2xl mx-auto w-full mb-12 relative z-10">
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <p className="text-muted-foreground font-body text-lg">
                {processingMessages[Math.floor(Math.random() * processingMessages.length)]}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl w-full"
            >
              <h2 className="font-display text-3xl md:text-4xl font-medium mb-10 text-center">
                {currentQuestion.question}
              </h2>

              {/* Choice / Font options */}
              {(currentQuestion.type === 'choice' || currentQuestion.type === 'font') && (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      onClick={() => handleSelect(option.id)}
                      className={cn(
                        'w-full p-5 rounded-xl border text-left transition-all duration-300',
                        'hover:bg-secondary/50 hover:border-primary/30',
                        selectedOption === option.id
                          ? 'bg-secondary border-primary shadow-lg shadow-primary/10'
                          : 'bg-card/50 border-border/50 backdrop-blur-sm'
                      )}
                      style={
                        currentQuestion.type === 'font' && option.fontFamily
                          ? { fontFamily: option.fontFamily }
                          : undefined
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span
                            className={cn(
                              'font-medium text-lg',
                              currentQuestion.type === 'font' ? 'text-xl' : 'font-body'
                            )}
                          >
                            {option.label}
                          </span>
                          {option.subtext && (
                            <p className="text-sm text-muted-foreground mt-1 font-body font-light">
                              {option.subtext}
                            </p>
                          )}
                        </div>
                        <div
                          className={cn(
                            'w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center',
                            selectedOption === option.id
                              ? 'border-primary bg-primary'
                              : 'border-muted-foreground/30'
                          )}
                        >
                          {selectedOption === option.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 rounded-full bg-primary-foreground"
                            />
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Slider input */}
              {currentQuestion.type === 'slider' && currentQuestion.sliderConfig && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="px-4">
                    <Slider
                      value={[sliderValue]}
                      onValueChange={(value) => setSliderValue(value[0])}
                      min={currentQuestion.sliderConfig.min}
                      max={currentQuestion.sliderConfig.max}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-3 text-sm text-muted-foreground font-body">
                      <span>{currentQuestion.sliderConfig.min}</span>
                      <span className="text-primary font-medium text-lg">{sliderValue}</span>
                      <span>{currentQuestion.sliderConfig.max}</span>
                    </div>
                  </div>
                  {currentQuestion.sliderConfig.microcopy && (
                    <p className="text-center text-sm text-muted-foreground/70 font-body italic">
                      {currentQuestion.sliderConfig.microcopy}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Month tiles */}
              {currentQuestion.type === 'month' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-3 md:grid-cols-4 gap-3"
                >
                  {months.map((month, index) => (
                    <motion.button
                      key={month.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => handleSelect(month.id)}
                      className={cn(
                        'p-4 rounded-lg border text-center transition-all duration-300',
                        'hover:bg-secondary/50 hover:border-primary/30',
                        selectedOption === month.id
                          ? 'bg-secondary border-primary shadow-lg shadow-primary/10'
                          : 'bg-card/50 border-border/50 backdrop-blur-sm'
                      )}
                    >
                      <span className="font-body text-sm md:text-base">{month.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Microcopy after selection */}
              <AnimatePresence>
                {showMicrocopy && currentQuestion.microcopy && selectedOption && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-sm text-muted-foreground/70 font-body mt-6 italic"
                  >
                    {currentQuestion.microcopy}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: canContinue ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
                className="mt-10 flex justify-center"
              >
                <Button
                  variant="mysterious"
                  size="lg"
                  onClick={handleNext}
                  disabled={!canContinue}
                  className="min-w-[200px]"
                >
                  {currentIndex < questions.length - 1 ? 'Next →' : 'Analyze'}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
