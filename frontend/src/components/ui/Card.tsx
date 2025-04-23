import { FC, ReactNode } from 'react';

interface CardProps {
    title?: string;
    subtitle?: string;
    children: ReactNode;
    footer?: ReactNode;
    hover?: boolean;
    className?: string;
}

const Card: FC<CardProps> = ({
    title,
    subtitle,
    children,
    footer,
    hover = false,
    className = '',
}) => {
    return (
        <div className={`
      bg-white rounded-xl shadow-sm overflow-hidden
      ${hover ? 'transition-shadow hover:shadow-md' : ''}
      ${className}
    `}>
            {(title || subtitle) && (
                <div className="p-4 border-b border-gray-100">
                    {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
                    {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
                </div>
            )}
            <div className="p-4">{children}</div>
            {footer && <div className="p-4 bg-gray-50 border-t border-gray-100">{footer}</div>}
        </div>
    );
};

export default Card;