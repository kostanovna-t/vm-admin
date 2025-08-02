import { useField } from "formik";
import React from "react";
import "./Checkbox.scss";

interface CheckboxProps {
  children: React.ReactNode;
  name: string;
  [key: string]: unknown;
}

const Checkbox = ({ children, ...props }: CheckboxProps): React.JSX.Element => {
  const [field] = useField({ ...props, type: "checkbox" });

  return (
    <label className="formik-checkbox">
      <input type="checkbox" {...field} {...props} />
      <span className="checkmark" />
      {children}
    </label>
  );
};

export default Checkbox;
