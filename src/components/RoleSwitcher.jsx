import React from 'react';
import { GraduationCap, ShieldCheck } from 'lucide-react';

export default function RoleSwitcher({
  role,
  onSwitchRole,
  variant = 'header',
}) {
  if (variant === 'light') {
    return (
      <div
        className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-slate-100 border border-slate-200/80"
        role="group"
        aria-label="เลือกบทบาทผู้ใช้งาน"
      >
        <button
          type="button"
          onClick={() => onSwitchRole('student')}
          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
            role === 'student'
              ? 'bg-white text-[#F96316] shadow-xs border border-orange-200/70'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4 shrink-0" />
          <span>นักศึกษา (Student)</span>
        </button>
        <button
          type="button"
          onClick={() => onSwitchRole('admin')}
          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
            role === 'admin'
              ? 'bg-white text-[#F96316] shadow-xs border border-orange-200/70'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>ผู้ดูแลหอ (Admin)</span>
        </button>
      </div>
    );
  }

  const isCompact = variant === 'compact';

  return (
    <div
      className={`inline-flex items-center gap-0.5 p-0.5 rounded-full bg-white/18 backdrop-blur-xs border border-white/25 ${
        isCompact ? 'shrink-0' : ''
      }`}
      role="group"
      aria-label="สลับมุมมองผู้ใช้งาน"
    >
      <button
        type="button"
        onClick={() => onSwitchRole('student')}
        className={`flex items-center gap-1 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
          isCompact ? 'px-2 py-1 text-[10px]' : 'px-2.5 py-1 text-xs'
        } ${
          role === 'student'
            ? 'bg-white text-[#F96316] shadow-xs'
            : 'text-white/90 hover:text-white hover:bg-white/10'
        }`}
      >
        <GraduationCap className={isCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        <span>{isCompact ? 'Student' : 'นักศึกษา'}</span>
      </button>
      <button
        type="button"
        onClick={() => onSwitchRole('admin')}
        className={`flex items-center gap-1 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
          isCompact ? 'px-2 py-1 text-[10px]' : 'px-2.5 py-1 text-xs'
        } ${
          role === 'admin'
            ? 'bg-white text-[#F96316] shadow-xs'
            : 'text-white/90 hover:text-white hover:bg-white/10'
        }`}
      >
        <ShieldCheck className={isCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        <span>Admin</span>
      </button>
    </div>
  );
}
