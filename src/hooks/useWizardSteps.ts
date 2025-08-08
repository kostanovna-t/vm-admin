import { useState } from 'react';

export type StepStatus = 'start' | 'inProgress' | 'completed';

export type WizardStepState = {
  index: number;
  status: StepStatus;
};

export type WizardStepConfig<T> = {
  id: string;
  component: React.ComponentType;
  validationSchema: Record<string, unknown>;
  fields: (keyof T)[];
  label: string;
  description?: string;
};

export function useWizardSteps<T>(steps: WizardStepConfig<T>[]): {
  currentStep: WizardStepConfig<T> | undefined;
  stepStates: WizardStepState[];
  currentIndex: number;
  isFirst: boolean;
  isLast: boolean;
  goNext: () => void;
  goPrev: () => void;
  reset: () => void;
  totalSteps: number;
} {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    steps.map((_, i) => (i === 0 ? 'inProgress' : 'start'))
  );

  const goNext = (): void => {
    setStepStatuses((prev): StepStatus[] =>
      prev.map((status, i) => {
        if (i === currentIndex) return 'completed';
        if (i === currentIndex + 1) return 'inProgress';
        return status;
      })
    );
    setCurrentIndex((i): number => Math.min(i + 1, steps.length - 1));
  };

  const goPrev = (): void => {
    setStepStatuses((prev): StepStatus[] =>
      prev.map((status, i) => {
        if (i === currentIndex) return 'start';
        if (i === currentIndex - 1) return 'inProgress';
        return status;
      })
    );
    setCurrentIndex((i): number => Math.max(i - 1, 0));
  };

  const reset = (): void => {
    setCurrentIndex(0);
    setStepStatuses(steps.map((_, i) => (i === 0 ? 'inProgress' : 'start')));
  };

  const stepStates = stepStatuses.map((status, i) => ({
    index: i,
    status,
  }));

  return {
    currentStep: steps[currentIndex],
    stepStates,
    currentIndex,
    isFirst: currentIndex === 0,
    isLast: currentIndex === steps.length - 1,
    goNext,
    goPrev,
    reset,
    totalSteps: steps.length,
  };
}
