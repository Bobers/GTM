'use client';

import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

interface StorageWarningProps {
  percentage: number;
}

export default function StorageWarning({ percentage }: StorageWarningProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (percentage < 80 || isDismissed) {
    return null;
  }

  const getWarningLevel = () => {
    if (percentage >= 95) return 'critical';
    if (percentage >= 90) return 'high';
    return 'medium';
  };

  const warningLevel = getWarningLevel();

  const warningStyles = {
    critical: 'bg-red-50 border-red-300 text-red-800',
    high: 'bg-orange-50 border-orange-300 text-orange-800',
    medium: 'bg-yellow-50 border-yellow-300 text-yellow-800'
  };

  const iconStyles = {
    critical: 'text-red-600',
    high: 'text-orange-600',
    medium: 'text-yellow-600'
  };

  return (
    <div className={`fixed bottom-4 right-4 max-w-sm p-4 rounded-lg border-2 shadow-lg ${warningStyles[warningLevel]}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className={`w-5 h-5 mt-0.5 ${iconStyles[warningLevel]}`} />
        <div className="flex-1">
          <h4 className="font-semibold mb-1">Storage Warning</h4>
          <p className="text-sm">
            You&apos;re using {percentage}% of available storage. 
            {warningLevel === 'critical' && ' Consider exporting your data soon.'}
          </p>
          <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                warningLevel === 'critical' ? 'bg-red-600' :
                warningLevel === 'high' ? 'bg-orange-600' : 'bg-yellow-600'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}