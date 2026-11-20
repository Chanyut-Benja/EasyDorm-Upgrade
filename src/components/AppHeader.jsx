import React from 'react';
import { ChevronLeft, Menu, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useViewMode } from '../context/ViewModeContext';
import UserAvatar from './UserAvatar';
import RoleSwitcher from './RoleSwitcher';

export default function AppHeader({
  title = 'Easy Dorm',
  showBack = false,
  onBack,
  showMenu = false,
  onOpenMenu,
  hasNotificationDot = false,
  user = null,
  adminInfo = null,
  role = 'student',
  onSwitchRole,
  showRoleSwitcher = true,
}) {
  const { isDesktop } = useViewMode();

  if (isDesktop) {
    return (
      <header className="bg-[#F96316] text-white px-6 h-14 flex items-center justify-between gap-4 shrink-0 shadow-sm relative z-20">
        {/* Left: Back Button + Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          {showBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="ย้อนกลับ"
              className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center bg-white/15 hover:bg-white/25 active:scale-95 transition cursor-pointer shrink-0"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}
          <h2 className="text-lg font-semibold tracking-tight truncate">
            {title}
          </h2>
        </div>

        {/* Right: Role Switcher + User / Admin Badge */}
        <div className="flex items-center gap-3 shrink-0">
          {showRoleSwitcher && onSwitchRole && (
            <RoleSwitcher
              role={role}
              onSwitchRole={onSwitchRole}
              variant="header"
            />
          )}

          {role === 'admin' && adminInfo ? (
            <div className="flex items-center gap-2 bg-white/15 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-full shrink-0">
              <div className="w-6 h-6 rounded-full bg-white text-[#F96316] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <span>{adminInfo.fullName}</span>
                <span className="text-white/85 text-xs hidden lg:inline">
                  • {adminInfo.roleTitle}
                </span>
              </div>
            </div>
          ) : (
            user && (
              <div className="flex items-center gap-2.5 bg-white/15 hover:bg-white/20 transition-colors px-3 py-1 rounded-full shrink-0">
                <UserAvatar
                  size="xs"
                  className="rounded-full border border-white/60"
                />
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  <span>{user.fullName}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] fill-white shrink-0" />
                  <span className="text-white/85 text-xs hidden lg:inline">
                    • ห้อง {user.roomNo}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </header>
    );
  }

  return (
    <header className="bg-[#F96316] text-white px-3.5 h-12 flex items-center justify-between gap-2 shrink-0 shadow-sm relative z-20">
      {/* Left: Back Button + Title */}
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="ย้อนกลับ"
            className="w-8 h-8 -ml-1 rounded-full flex items-center justify-center active:bg-white/20 hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}
        <h1 className="text-[15px] font-semibold tracking-tight truncate">
          {title}
        </h1>
      </div>

      {/* Right: Compact Role Switcher + Hamburger Menu */}
      <div className="flex items-center gap-1.5 shrink-0">
        {showRoleSwitcher && onSwitchRole && (
          <RoleSwitcher
            role={role}
            onSwitchRole={onSwitchRole}
            variant="compact"
          />
        )}

        {showMenu && (
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="เปิดเมนู"
            className="relative w-8 h-8 -mr-1 rounded-full flex items-center justify-center active:bg-white/20 hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          >
            <Menu className="w-5 h-5 stroke-[2.2]" />
            {hasNotificationDot && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#EF4444] ring-2 ring-[#F96316]" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}
