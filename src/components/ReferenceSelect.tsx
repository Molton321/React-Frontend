import React, { useEffect, useState } from 'react';
import { Field } from 'formik';

interface ReferenceSelectProps {
  name: string;
  model: string; // ejemplo: 'restaurant', 'product', 'driver', etc.
  labelKey?: string; // qué campo mostrar como label (por defecto: 'name')
  valueKey?: string; // qué campo usar como value (por defecto: 'id')
  className?: string;
  disabled?: boolean;
}

const ReferenceSelect: React.FC<ReferenceSelectProps> = ({
  name,
  model,
  labelKey = 'name',
  valueKey = 'id',
  className = '',
  disabled = false,
}) => {
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        // Import dinámico del service
        const serviceModule = await import(`../services/${model}Service`);
        // Busca el método get...s o getAll...
        const service = serviceModule.default || Object.values(serviceModule)[0];
        let data: any[] = [];
        if (typeof service[`get${model.charAt(0).toUpperCase() + model.slice(1)}s`] === 'function') {
          data = await service[`get${model.charAt(0).toUpperCase() + model.slice(1)}s`]();
        } else if (typeof service[`getAll${model.charAt(0).toUpperCase() + model.slice(1)}s`] === 'function') {
          data = await service[`getAll${model.charAt(0).toUpperCase() + model.slice(1)}s`]();
        }
        setOptions(data || []);
      } catch (error) {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, [model]);

  return (
    <Field as="select" name={name} className={className} disabled={disabled || loading}>
      <option value="">Seleccione...</option>
      {options.map((item) => (
        <option key={item[valueKey]} value={item[valueKey]}>
          {item[labelKey] || item[valueKey]}
        </option>
      ))}
    </Field>
  );
};

export default ReferenceSelect;
