import { FC } from 'react';
import { MedicalRecord } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface PatientRecordProps {
    record: MedicalRecord;
    layout?: 'compact' | 'detailed';
}

const PatientRecord: FC<PatientRecordProps> = ({
    record,
    layout = 'detailed'
}) => {
    const { date, doctorName, diagnosis, treatment, notes, followUp } = record;

    // Format date for display
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (layout === 'compact') {
        return (
            <Card hover className="h-full">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-gray-500 text-sm">{formatDate(date)}</span>
                    <Badge variant="primary">{diagnosis}</Badge>
                </div>
                <h4 className="font-medium mb-1">{doctorName}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{treatment}</p>
            </Card>
        );
    }

    return (
        <Card className="h-full">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="text-gray-500 text-sm">{formatDate(date)}</span>
                    <h3 className="text-lg font-semibold mt-1">{diagnosis}</h3>
                </div>
                <Badge variant="primary">{diagnosis}</Badge>
            </div>

            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <div>
                    <dt className="text-sm font-medium text-gray-500">Doctor</dt>
                    <dd className="mt-1 text-sm text-gray-900">{doctorName}</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-500">Treatment</dt>
                    <dd className="mt-1 text-sm text-gray-900">{treatment}</dd>
                </div>

                <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Notes</dt>
                    <dd className="mt-1 text-sm text-gray-900">{notes}</dd>
                </div>

                {followUp && (
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Follow-up Date</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatDate(followUp)}</dd>
                    </div>
                )}
            </dl>
        </Card>
    );
};

export default PatientRecord;