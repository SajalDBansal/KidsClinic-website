import { FC, ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    icon?: ReactNode;
    fullWidth?: boolean;
    children: ReactNode;
}

const Button: FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    icon,
    fullWidth = false,
    children,
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
        secondary: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500',
        success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
        warning: 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
        outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
        ghost: 'text-gray-700 bg-transparent hover:bg-gray-100 focus:ring-blue-500'
    };

    const sizeStyles = {
        sm: 'text-xs px-3 py-1',
        md: 'text-sm px-4 py-2',
        lg: 'text-base px-6 py-3'
    };

    const styles = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

    return (
        <button className={styles} {...props}>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;