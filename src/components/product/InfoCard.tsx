import type { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export const InfoCard = ({ icon: Icon, label, value }: InfoCardProps) => (
  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-50 flex-1 min-w-0">
    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 shrink-0">
      <Icon size={20} />
    </div>
    <div className="min-w-0">
      <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
        {label}
      </div>
      <div className="text-sm font-bold text-gray-800 truncate">{value}</div>
    </div>
  </div>
);
