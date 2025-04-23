import { FC, ReactNode } from 'react';

interface BadgeProps {
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    children: ReactNode;
    className?: string;
}

const Badge: FC<BadgeProps> = ({
    variant = 'default',
    children,
    className = '',
}) => {
    const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';

    const variantStyles = {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-blue-100 text-blue-800',
        secondary: 'bg-teal-100 text-teal-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-amber-100 text-amber-800',
        danger: 'bg-red-100 text-red-800'
    };

    const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

    return <span className={styles}>{children}</span>;
};

export default Badge;