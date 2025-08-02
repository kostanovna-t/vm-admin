import { FormikHelpers, getIn } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addVM } from '../store/slices/vmSlice';

interface FormValues {
  name: string;
  cpu: string;
  ram: string;
  isVirtualized: boolean;
}

interface UseWizardFormProps {
  isLast: boolean;
  onClose: () => void;
  onChange?: ((values: FormValues, isDirty: boolean) => void) | undefined;
  currentIndex: number;
  currentStep: { fields: string[] };
  goNext: () => void;
}

export function useWizardForm({ 
  isLast, 
  onClose,  
  currentStep,
  goNext
}: UseWizardFormProps): {
  formValues: FormValues;
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
  handleSubmit: (values: FormValues, actions: FormikHelpers<FormValues>) => Promise<void>;
  validateStepValues: (values: FormValues) => boolean;
  checkValidationErrors: (errors: Record<string, unknown>) => boolean;
} {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    cpu: "",
    ram: "",
    isVirtualized: false,
  });
  const [isDirty, setIsDirty] = useState(false);

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ): Promise<void> => {
    try {
      if (isLast) {
        const newVM = {
          server: values.name,
          cpu: parseInt(values.cpu, 10),
          memory: parseInt(values.ram, 10),
        };

        dispatch(addVM(newVM));
        setIsDirty(false);
        onClose();
      } else {
        setFormValues(values);
        goNext();
      }
    } catch (error) {
      console.error("Error creating VM:", error);
      actions.setSubmitting(false);
    }
  };

  const validateStepValues = (values: FormValues): boolean => {
    return currentStep.fields.some((field: string) => {
      const val = getIn(values, field);
      if (typeof val === "boolean") return true;
      if (typeof val === "number") return !isNaN(val);
      return val !== "" && val !== null && val !== undefined;
    });
  };

  const checkValidationErrors = (errors: Record<string, unknown>): boolean  => {
    return Object.keys(errors).length > 0;
  };

  return {
    formValues,
    isDirty,
    setIsDirty,
    handleSubmit,
    validateStepValues,
    checkValidationErrors,
  };
}; 