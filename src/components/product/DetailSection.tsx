import type { LucideIcon } from 'lucide-react';
import React from 'react';

interface DetailSectionProps {
  icon?: LucideIcon;
  title: string;
  children: React.ReactNode;
  bg?: boolean;
}

export const DetailSection: React.FC<DetailSectionProps> = ({
  icon: Icon,
  title,
  children,
  bg = false,
}) => (
  <div
    className={`space-y-4 ${bg ? 'bg-gray-50 p-6 rounded-2xl border border-gray-100' : ''}`}
  >
    <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
      {Icon && <Icon size={16} className="text-blue-500" />}
      {title}
    </h4>
    {children}
  </div>
);
