import { Answer, DOBResult } from '@/types/quiz';
import { personalityTraits } from '@/data/questions';

// Intentionally useless logic
export function generateDOB(answers: Answer[], retryCount: number = 0): DOBResult {
  // Bias toward 1994-2003 with occasional chaos
  const baseYear = Math.random() > 0.85 
    ? Math.floor(Math.random() * 10) + 1985 // Chaos: 1985-1994
    : Math.floor(Math.random() * 10) + 1994; // Normal: 1994-2003
  
  // Fake logic based on answers
  let yearModifier = 0;
  
  answers.forEach(answer => {
    if (answer.questionId === 'font-trust') {
      // Serif fonts = "older energy"
      if (answer.value === 'serif' || answer.value === 'display') {
        yearModifier -= Math.floor(Math.random() * 3) + 1;
      }
    }
    if (answer.questionId === 'alarms') {
      // More alarms = older (responsible... or anxious)
      if (answer.value === '4+') {
        yearModifier -= Math.floor(Math.random() * 2) + 1;
      }
      if (answer.value === 'natural') {
        yearModifier += Math.floor(Math.random() * 3); // Liar energy = younger
      }
    }
    if (answer.questionId === 'birthdays') {
      // Dreading birthdays = older
      if (answer.value === 'dread') {
        yearModifier -= Math.floor(Math.random() * 4) + 2;
      }
    }
    if (answer.questionId === 'age-feeling') {
      // Feeling older = actually older (fake correlation)
      if (answer.value === 'older') {
        yearModifier -= Math.floor(Math.random() * 3) + 1;
      }
      if (answer.value === 'younger') {
        yearModifier += Math.floor(Math.random() * 2) + 1;
      }
    }
    if (answer.questionId === 'truly-rested') {
      // Not remembering rest = older energy
      if (answer.value === 'dont-remember') {
        yearModifier -= Math.floor(Math.random() * 2) + 1;
      }
    }
    if (answer.questionId === 'time-of-day') {
      // Late night people = slightly younger vibes
      if (answer.value === 'late-night') {
        yearModifier += Math.floor(Math.random() * 2);
      }
    }
    if (answer.questionId === 'decisiveness') {
      // Low decisiveness = older (overthinking increases with age, apparently)
      const value = Number(answer.value);
      if (value < 30) {
        yearModifier -= Math.floor(Math.random() * 2) + 1;
      } else if (value > 80) {
        yearModifier += Math.floor(Math.random() * 2);
      }
    }
    if (answer.questionId === 'sleep-schedule') {
      // Chaotic sleep = younger energy
      if (answer.value === 'chaotic' || answer.value === 'nonexistent') {
        yearModifier += Math.floor(Math.random() * 2) + 1;
      }
    }
    if (answer.questionId === 'heavy-month') {
      // November/February = older energy (seasonal affective correlation?)
      if (answer.value === 'november' || answer.value === 'february') {
        yearModifier -= Math.floor(Math.random() * 2);
      }
    }
  });

  // Apply retry variance
  yearModifier += retryCount * (Math.random() > 0.5 ? 1 : -1);

  const year = Math.max(1980, Math.min(2005, baseYear + yearModifier));
  const month = Math.floor(Math.random() * 12);
  const day = Math.floor(Math.random() * 28) + 1; // Safe day range
  
  const date = new Date(year, month, day);
  
  // Generate birth time for extra specificity
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const birthTime = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  
  // Random accuracy between 90-99%
  const accuracy = Math.floor(Math.random() * 10) + 90;
  
  // Random margin of error between 4-7 years
  const marginOfError = Math.floor(Math.random() * 4) + 4;
  
  // Random personality trait
  const personalityTrait = personalityTraits[Math.floor(Math.random() * personalityTraits.length)];
  
  return {
    date,
    accuracy,
    marginOfError,
    birthTime,
    personalityTrait,
  };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function isBirthdayProximity(date: Date): boolean {
  const today = new Date();
  const thisYearBirthday = new Date(today.getFullYear(), date.getMonth(), date.getDate());
  const diffTime = Math.abs(today.getTime() - thisYearBirthday.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
}
