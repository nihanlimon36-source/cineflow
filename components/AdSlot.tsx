
import React from 'react';

interface AdSlotProps {
  label: string;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ label, className = '' }) => {
  return (
    <div className={`bg-[#1a1a1a] border border-dashed border-gray-700 flex flex-col items-center justify-center p-4 min-h-[100px] text-gray-500 rounded-md overflow-hidden ${className}`}>
      <span className="text-xs font-bold uppercase tracking-widest mb-1 opacity-50">Advertisement</span>
      <p className="text-sm font-medium italic">{label}</p>
      <div className="mt-2 w-full h-1 bg-[#222] animate-pulse rounded"></div>
    </div>
  );
};
