import { FC, ReactNode } from 'react';
import { CalendarX, AlertCircle, Search, FileText } from 'lucide-react';
import Button from '../ui/Button';

interface EmptyStateProps {
    type: 'appointments' | 'records' | 'search' | 'generic';
    title?: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    icon?: ReactNode;
}

const EmptyState: FC<EmptyStateProps> = ({
    type,
    title,
    description,
    action,
    icon
}) => {
    // Default content based on type
    let defaultIcon;
    let defaultTitle;
    let defaultDescription;

    switch (type) {
        case 'appointments':
            defaultIcon = <CalendarX size={48} className="text-gray-400" />;
            defaultTitle = 'No appointments found';
            defaultDescription = 'You have no upcoming appointments scheduled.';
            break;
        case 'records':
            defaultIcon = <FileText size={48} className="text-gray-400" />;
            defaultTitle = 'No medical records';
            defaultDescription = 'There are no medical records available for this patient.';
            break;
        case 'search':
            defaultIcon = <Search size={48} className="text-gray-400" />;
            defaultTitle = 'No results found';
            defaultDescription = "Try adjusting your search or filters to find what you're looking for.";
            break;
        default:
            defaultIcon = <AlertCircle size={48} className="text-gray-400" />;
            defaultTitle = 'Nothing to show';
            defaultDescription = 'There is no data available to display at this time.';
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4">
                {icon || defaultIcon}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
                {title || defaultTitle}
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mb-4">
                {description || defaultDescription}
            </p>
            {action && (
                <Button
                    onClick={action.onClick}
                    variant="primary"
                >
                    {action.label}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;