import React from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { useViewMode } from '../context/ViewModeContext';

export default function ViewSwitcher() {
  const { isWideScreen, viewMode, setViewMode } = useViewMode();

  if (!isWideScreen) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1 p-1 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-zinc-200/90"
      role="group"
      aria-label="สลับมุมมองหน้าจอ"
    >
      <button
        type="button"
        onClick={() => setViewMode('desktop')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
          viewMode === 'desktop'
            ? 'bg-[#F96316] text-white shadow-xs'
            : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
        }`}
      >
        <Monitor className="w-3.5 h-3.5" />
        <span>Desktop</span>
      </button>
      <button
        type="button"
        onClick={() => setViewMode('mobile')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
          viewMode === 'mobile'
            ? 'bg-[#F96316] text-white shadow-xs'
            : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
        }`}
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span>Mobile</span>
      </button>
    </div>
  );
}
