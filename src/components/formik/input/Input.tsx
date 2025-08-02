import { useField } from "formik";
import React, { useRef, useState } from "react";
import ErrorIcon from '../../../assets/circle-danger.svg';
import "./Input.scss";

const ArrowUp = (): React.JSX.Element => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2L10 6L9.29289 6.70711L6.5 3.91421V10H5.5V3.91421L2.70711 6.70711L2 6L6 2Z" fill="currentColor"/>
  </svg>
);

const ArrowDown = (): React.JSX.Element => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 10L2 6L2.70711 5.29289L5.5 8.08579V2H6.5V8.08579L9.29289 5.29289L10 6L6 10Z" fill="currentColor"/>
  </svg>
);

interface InputProps {
  label?: string;
  hint?: string;
  step?: number;
  type?: string;
  id?: string;
  name: string;
  maxValue?: number;
  units?: string;
  [key: string]: unknown;
}

const Input: React.FC<InputProps> = ({ label, hint, maxValue, units, ...props }) => {
  const [field, meta] = useField(props);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasError = meta.touched && meta.error;
  const isNumberInput = props.type === 'number';

  const hasValue = field.value !== undefined && field.value !== '' && field.value !== null;
  const shouldFloat = isFocused || hasValue;

  const shouldShowFraction = maxValue && field.value && field.value.toString().length < 3;

  const step = props.step || 1;

  const handleStep = (dir: 'up' | 'down'): void => {
    const current = parseFloat(field.value) || 0;
    const newValue = dir === 'up' ? current + step : current - step;
    field.onChange({
      target: {
        name: field.name,
        value: newValue.toString(),
      },
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (isNumberInput) {
      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Enter'];
      const isNumber = /^[0-9.]$/.test(e.key);
      const isAllowedKey = allowedKeys.includes(e.key);

      if (!isNumber && !isAllowedKey) {
        e.preventDefault();
      }

      // Prevent multiple decimal points
      if (e.key === '.' && field.value && field.value.toString().includes('.')) {
        e.preventDefault();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (isNumberInput) {
      // Only allow numeric input
      const value = e.target.value;
      if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
        field.onChange(e);
      }
    } else {
      field.onChange(e);
    }
  };

  return (
    <div className={`floating-input ${hasError ? 'has-error' : ''} ${isNumberInput ? 'number-input' : ''}`}>
      <input
        ref={inputRef}
        {...field}
        {...props}
        type={isNumberInput ? 'number' : 'text'}
        className={shouldFloat ? 'filled' : ''}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          field.onBlur(e);
        }}
        onKeyDown={isNumberInput ? handleKeyPress : undefined}
        onChange={isNumberInput ? handleInputChange : field.onChange}
        autoComplete="off"
        inputMode={isNumberInput ? 'decimal' : undefined}
      />

      <label htmlFor={props.id || props.name}>{label}</label>

      {shouldShowFraction && (
        <div className="fraction-display">
          <span className="fraction-divider">/</span>
          <span className="fraction-max">{maxValue}</span>
          {units && <span className="fraction-units">{units}</span>}
        </div>
      )}

      {isNumberInput && !hasError && (
        <div className="custom-spinner">
          <button type="button" onClick={() => handleStep('up')}>
            <ArrowUp />
          </button>
          <button type="button" onClick={() => handleStep('down')}>
            <ArrowDown />
          </button>
        </div>
      )}

      {hasError && <span className="error-icon"><ErrorIcon /></span>}


      {hint && !hasError && <div className="hint">{hint}</div>}
      {hasError && <div className="error-msg">{meta.error}</div>}
    </div>
  );
};

export default Input;

