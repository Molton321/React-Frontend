import React from 'react';
import { Field } from 'formik';
import ReferenceSelect from './ReferenceSelect';

type OptionType = string | { value: any; label?: string };

type InputSelectorProps = {
  name: string;
  value: any;
  options?: OptionType[];
  type?: string;
  className?: string;
  disabled?: boolean;
};

const InputSelector: React.FC<InputSelectorProps> = ({
  name,
  value,
  options,
  type = 'text',
  className = '',
  disabled = false,
}) => {
  // Si options es un array de objetos (referencias), mostrar value y label separados
  // Si la key termina en _id, usar ReferenceSelect, pero si hay options, usar el select clásico
  if (name.endsWith('_id') && (!options || options.length === 0)) {
    const model = name.replace(/_id$/, '');
    return (
      <ReferenceSelect
        name={name}
        model={model}
        className={className}
        disabled={disabled}
      />
    );
  }
  if (options && options.length > 0) {
    const isReference = typeof options[0] === 'object' && options[0] !== null && 'value' in options[0];
    if (isReference) {
      return (
        <Field as="select" name={name} className={className} disabled={disabled}>
          <option value="">Seleccione...</option>
          {(options as { value: any; label?: string }[]).map((opt) => {
            let labelText = opt.label;
            let idText = '';
            if (typeof opt.label === 'string' && opt.label.includes('_')) {
              const [id, ...rest] = opt.label.split('_');
              idText = id;
              labelText = rest.join('_');
            }
            return (
              <option key={opt.value} value={Number(opt.value)}>
                {idText ? `${idText} - ${labelText}` : (opt.label ? `${opt.value} - ${opt.label}` : opt.value)}
              </option>
            );
          })}
        </Field>
      );
    } else {
      return (
        <Field as="select" name={name} className={className} disabled={disabled}>
          {options.map((option) => (
            <option key={typeof option === 'string' ? option : String(option)} value={typeof option === 'string' ? option : String(option)}>
              {typeof option === 'string' ? option.charAt(0).toUpperCase() + option.slice(1) : String(option)}
            </option>
          ))}
        </Field>
      );
    }
  }

  // Utilidad para formatear correctamente el valor para datetime-local
  const formatDateTimeLocal = (value: any) => {
    if (!value) return '';
    if (value instanceof Date) {
      const pad = (n: number) => n.toString().padStart(2, '0');
      return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}T${pad(value.getHours())}:${pad(value.getMinutes())}`;
    }
    if (typeof value === 'string') {
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return value;
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) return value.slice(0, 16);
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value + 'T00:00';
      const d = new Date(value);
      if (!isNaN(d.getTime())) return formatDateTimeLocal(d);
    }
    return '';
  };

  return (
    <Field
      type={type}
      name={name}
      className={className}
      disabled={disabled}
      value={type === 'datetime-local' ? formatDateTimeLocal(value) : value}
    />
  );
};

export default InputSelector;
