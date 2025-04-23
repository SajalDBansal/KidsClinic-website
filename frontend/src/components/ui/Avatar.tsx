import { FC } from 'react';

interface AvatarProps {
    src?: string;
    alt: string;
    size?: 'sm' | 'md' | 'lg';
    status?: 'online' | 'offline' | 'busy' | 'away';
    className?: string;
}

const Avatar: FC<AvatarProps> = ({
    src,
    alt,
    size = 'md',
    status,
    className = '',
}) => {
    const sizeStyles = {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12'
    };

    const statusColors = {
        online: 'bg-green-500',
        offline: 'bg-gray-400',
        busy: 'bg-red-500',
        away: 'bg-amber-500'
    };

    return (
        <div className={`relative ${className}`}>
            <div className={`${sizeStyles[size]} rounded-full overflow-hidden bg-gray-200 flex items-center justify-center`}>
                {src ? (
                    <img
                        src={src}
                        alt={alt}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span className="text-gray-500 font-medium">
                        {alt.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                )}
            </div>

            {status && (
                <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-white ${statusColors[status]}`}
                />
            )}
        </div>
    );
};

export default Avatar;