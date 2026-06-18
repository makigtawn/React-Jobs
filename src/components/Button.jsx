import React from 'react';
import { cn } from '../utils/cn'; 

const Button = ({ 
  children,       
  text,          
  onClick, 
  type = "button", 
  className,
  variant = "primary", 
  ...props       
}) => {
  
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'rounded-[5px]',
    secondary: 'rounded-[5px]',
    outline: 'border rounded-[5px]',
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={cn('custom-btn', baseStyles, variants[variant], className)}
      style={{ padding: '10px 20px', ...props.style }} 
      {...props}
    >
      {children || text}
    </button>
  );
};

export default Button;
