import { useFormikContext } from "formik";
import React from "react";
import Checkbox from "../../formik/checkbox/Checkbox";
import Input from "../../formik/input/Input";
import Slider from '../../slider/Slider';

interface FormValues {
  name: string;
  cpu: string;
  ram: string;
  isVirtualized: boolean;
}

export default function SettingsStep(): React.JSX.Element {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  const handleRamChange = (val: number): void => {
    setFieldValue("ram", val.toString());
  };

  return (
    <div className="settings-step">
      <Input 
        label="CPU" 
        name="cpu" 
        type="number" 
        maxValue={12} 
      />
      
      <Checkbox name="isVirtualized">
        Enable virtualized CPU performance counters
      </Checkbox>

      <Input 
        label="RAM" 
        name="ram" 
        type="number" 
        maxValue={50} 
        units="GB" 
      />
      
      <Slider 
        value={parseInt(values.ram) || 0}
        onChange={handleRamChange}
        isVirtualized={values.isVirtualized}
        max={50} 
      />
    </div>
  );
}
