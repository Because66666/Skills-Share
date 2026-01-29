import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { Form, FormItem } from '@/components/molecules/Form';
import { Input } from '@/components/atoms/Input';
import { Select, SelectOption } from '@/components/molecules/Select';
import { InputNumber } from '@/components/atoms/InputNumber';
import { TextArea } from '@/components/atoms/TextArea';
import { Button } from '@/components/atoms/Button';

export type SmartFormSchemaType = 'input' | 'select' | 'number' | 'textarea' | 'custom';

export interface SmartFormSchema {
  name: string;
  label: string;
  type: SmartFormSchemaType;
  options?: SelectOption[]; // For select
  componentProps?: any; // Passed to the underlying component
  rules?: {
    required?: boolean;
    message?: string;
  };
  span?: number; // Col span (default 12 or 6 based on layout)
  render?: (props: { value: any; onChange: (val: any) => void }) => React.ReactNode; // For custom type
}

export interface SmartFormProps {
  schema: SmartFormSchema[];
  initialValues?: Record<string, any>;
  onFinish?: (values: Record<string, any>) => void;
  onReset?: () => void;
  columns?: number; // Grid columns, default 1
  className?: string;
  submitText?: string;
  resetText?: string;
  showActions?: boolean;
  extraActions?: React.ReactNode;
}

export const SmartForm: React.FC<SmartFormProps> = ({
  schema,
  initialValues = {},
  onFinish,
  onReset,
  columns = 1,
  className,
  submitText = '提交',
  resetText = '重置',
  showActions = true,
  extraActions,
}) => {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    schema.forEach((field) => {
      if (field.rules?.required) {
        const val = values[field.name];
        if (val === undefined || val === null || val === '') {
          newErrors[field.name] = field.rules.message || `${field.label} 是必填项`;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onFinish?.(values);
    }
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    onReset?.();
  };

  const renderField = (field: SmartFormSchema) => {
    const commonProps = {
      value: values[field.name],
      error: !!errors[field.name],
      ...field.componentProps,
    };

    switch (field.type) {
      case 'input':
        return (
          <Input
            {...commonProps}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
      case 'number':
        return (
          <InputNumber
            {...commonProps}
            onChange={(val) => handleChange(field.name, val)}
          />
        );
      case 'textarea':
        return (
          <TextArea
            {...commonProps}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
      case 'select':
        return (
          <Select
            options={field.options || []}
            {...commonProps}
            onChange={(val) => handleChange(field.name, val)}
          />
        );
      case 'custom':
        return field.render ? field.render({
            value: values[field.name],
            onChange: (val) => handleChange(field.name, val)
        }) : null;
      default:
        return null;
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={className}>
      <div className={cn("grid gap-4", `grid-cols-${columns}`)}>
        {schema.map((field) => (
          <div 
            key={field.name} 
            className={cn(field.span ? `col-span-${field.span}` : `col-span-1`)}
          >
            <FormItem
              label={field.label}
              name={field.name}
              required={field.rules?.required}
              error={errors[field.name]}
            >
              {renderField(field)}
            </FormItem>
          </div>
        ))}
      </div>

      {showActions && (
        <div className="flex items-center gap-3 mt-6 justify-end">
          {extraActions}
          <Button variant="outline" type="button" onClick={handleReset}>
            {resetText}
          </Button>
          <Button type="submit">
            {submitText}
          </Button>
        </div>
      )}
    </Form>
  );
};
