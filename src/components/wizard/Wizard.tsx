import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useRef } from "react";
import { STEPS } from "../../constants/steps";
import { useWizardConfirmation } from "../../hooks/useWizardConfirmation";
import { useWizardForm } from "../../hooks/useWizardForm";
import { StepStatus, useWizardSteps, WizardStepConfig } from "../../hooks/useWizardSteps";
import { ConfirmModal } from "../confirm-modal";
import { stepsConfig } from "./stepsConfig";
import "./Wizard.scss";

interface FormValues {
  name: string;
  cpu: string;
  ram: string;
  isVirtualized: boolean;
}

interface WizardProps {
  onClose: () => void;
  onChange?: (values: FormValues, isDirty: boolean) => void;
  onStepChange?: (stepIndex: number) => void;
}

const getMenuIcon = (stepState: StepStatus): string => {
  if (stepState === "completed") return "✓";
  if (stepState === "inProgress") return "-";
  return "";
};

const typedStepsConfig = stepsConfig as WizardStepConfig<FormValues>[];

export default function Wizard({ onClose, onChange, onStepChange }: WizardProps): React.JSX.Element | null {
  const {
    currentStep,
    stepStates,
    currentIndex,
    isFirst,
    isLast,
    goNext,
    goPrev,
  } = useWizardSteps<FormValues>(typedStepsConfig);

  const {
    formValues,
    isDirty,
    setIsDirty,
    handleSubmit,
    checkValidationErrors,
  } = useWizardForm({
    isLast,
    onClose,
    onChange,
    currentIndex,
    currentStep,
    goNext,
  });

  const {
    showConfirm,
    handleConfirmClose,
    handleCancelClose,
  } = useWizardConfirmation({
    isFirst,
    isDirty,
    onClose,
    goPrev,
  });

  const formStateRef = useRef<{ values: FormValues; dirty: boolean }>({
    values: formValues,
    dirty: false,
  });
  const validateFormRef = useRef<(() => Promise<unknown>) | null>(null);

  useEffect(() => {
    onStepChange?.(currentIndex);
  }, [currentIndex, onStepChange]);

  // Handle form state changes - this replaces the first useEffect from the original
  useEffect(() => {
    onChange?.(formStateRef.current.values, formStateRef.current.dirty);
    setIsDirty(formStateRef.current.dirty);
  }, [onChange, setIsDirty]);

  // Handle validation on step change - this replaces the second useEffect from the original
  useEffect(() => {
    if (Object.keys(formStateRef.current.values).length > 0 && validateFormRef.current) {
      validateFormRef.current();
    }
  }, [currentIndex]);

  const updateFormState = useCallback((values: FormValues, dirty: boolean) => {
    formStateRef.current = { values, dirty };
  }, []);

  const setValidateForm = useCallback((validateForm: () => Promise<unknown>) => {
    validateFormRef.current = validateForm;
  }, []);

  if (!currentStep) {
    return null;
  }

  const StepComponent = currentStep.component;

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-title">Welcome to the</div>
        <div className="sidebar-subtitle">New Virtual Machine Wizard</div>

        <ul>
          <li className={currentStep.id === STEPS.nameStep.id ? "active" : ""}>
            {getMenuIcon(stepStates[0]?.status || "start")} Virtual Machine Name
          </li>
          <li
            className={currentStep.id === STEPS.settingsStep.id ? "active" : ""}
          >
            {getMenuIcon(stepStates[1]?.status || "start")} General Settings
          </li>
        </ul>
      </div>

      <div className="wizard-main">
        <div className="wizard-scrollable">
          <div>
            <h2 className="wizard-step-title">{currentStep.label}</h2>
            <h3 className="wizard-step-description">{currentStep.description}</h3>

            <Formik
              initialValues={formValues}
              enableReinitialize
              validationSchema={currentStep.validationSchema}
              validateOnMount
              onSubmit={handleSubmit}
            >
              {({ isValid, values, dirty, validateForm, errors }) => {
                // Store the validateForm function and update form state
                setValidateForm(validateForm);
                updateFormState(values, dirty);

                const hasValidationErrors = checkValidationErrors(errors);
                const allowNext = isValid && !hasValidationErrors;

                return (
                  <Form>
                    <StepComponent />
                    <div className="wizard-actions">
                      {!isFirst && (
                        <button
                          className="wizard-back-button"
                          type="button"
                          onClick={goPrev}
                        >
                          Back
                        </button>
                      )}
                      <button
                        className="wizard-next-button"
                        type="submit"
                        disabled={!allowNext}
                      >
                        {isLast ? "Create" : "Next"}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          onConfirm={handleConfirmClose}
          onCancel={handleCancelClose}
          message="You have unsaved changes that will be lost. Do you want to continue?"
          title="Cancel creating?"
        />
      )}
    </>
  );
}
