import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Question, Answer } from '@/types/quiz';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface QuestionScreenProps {
  questions: Question[];
  onComplete: (answers: Answer[]) => void;
}

export function QuestionScreen({ questions, onComplete }: QuestionScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = [
      ...answers,
      { questionId: currentQuestion.id, value: selectedOption },
    ];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 glow-effect opacity-30" />

      {/* Progress bar */}
      <div className="max-w-2xl mx-auto w-full mb-12 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground font-body">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-xs text-muted-foreground font-body">
            {Math.round(progress)}% analyzed
          </span>
        </div>
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
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

            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: selectedOption ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="mt-10 flex justify-center"
            >
              <Button
                variant="mysterious"
                size="lg"
                onClick={handleNext}
                disabled={!selectedOption}
                className="min-w-[200px]"
              >
                {currentIndex < questions.length - 1 ? 'Continue' : 'Analyze'}
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
