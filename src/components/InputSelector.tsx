import React from 'react';
import { Field } from 'formik';

type InputSelectorProps = {
  name: string;
  value: any;
  options?: string[];
  type?: string;
  className?: string;
  disabled?: boolean; // <-- add this
};

const InputSelector: React.FC<InputSelectorProps> = ({
  name,
  value,
  options,
  type = 'text',
  className = '',
  disabled = false,
}) => {
  if (options && options.length > 0) {
    return (
      <Field as="select" name={name} className={className} disabled={disabled}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </Field>
    );
  }
  return (
    <Field type={type} name={name} className={className} disabled={disabled} />
  );
};

export default InputSelector;
