import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const TOAST_STYLES = {
  success: {
    icon: CheckCircle2,
    iconColor: 'text-[#22C55E]',
    bgAccent: 'bg-green-50',
    border: 'border-green-200/80',
  },
  error: {
    icon: AlertCircle,
    iconColor: 'text-[#EF4444]',
    bgAccent: 'bg-red-50',
    border: 'border-red-200/80',
  },
  info: {
    icon: Info,
    iconColor: 'text-[#F96316]',
    bgAccent: 'bg-orange-50',
    border: 'border-orange-200/80',
  },
};

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-[60] flex flex-col gap-2.5 max-w-sm w-[calc(100vw-2rem)] pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const style = TOAST_STYLES[toast.type] || TOAST_STYLES.success;
        const Icon = style.icon;
        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3.5 rounded-2xl shadow-[0_10px_30px_-5px_rgba(15,23,42,0.12)] border ${style.border} animate-toast`}
          >
            <div
              className={`w-8 h-8 rounded-xl ${style.bgAccent} flex items-center justify-center shrink-0`}
            >
              <Icon className={`w-4.5 h-4.5 ${style.iconColor}`} />
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-800 flex-1 leading-snug">
              {toast.message}
            </p>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="ปิดการแจ้งเตือน"
              className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
