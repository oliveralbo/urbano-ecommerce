import React from 'react';

interface FormSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  description?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  icon,
  children,
  className = '',
  description,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ${className}`}
    >
      <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {icon && <div className="text-blue-600">{icon}</div>}
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        </div>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <div className="p-8 space-y-6">{children}</div>
    </div>
  );
};
