import React, { useState } from 'react';
import { Input, InputProps } from './Input';
import { Eye, EyeOff } from 'lucide-react';

export interface InputPasswordProps extends Omit<InputProps, 'type' | 'rightIcon' | 'onRightIconClick'> {}

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
      setVisible(!visible);
    };

    return (
      <Input
        {...props}
        ref={ref}
        type={visible ? 'text' : 'password'}
        rightIcon={visible ? <EyeOff size={18} /> : <Eye size={18} />}
        onRightIconClick={toggleVisibility}
      />
    );
  }
);

InputPassword.displayName = 'InputPassword';
