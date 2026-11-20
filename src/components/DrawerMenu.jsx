import React from 'react';
import {
  X,
  Home,
  CreditCard,
  History,
  AlertCircle,
  Settings,
  LogOut,
  CheckCircle2,
  ShieldCheck,
  LayoutDashboard,
  Wrench,
  BadgeCheck,
  Megaphone,
} from 'lucide-react';
import UserAvatar from './UserAvatar';

export default function DrawerMenu({
  isOpen,
  onClose,
  role = 'student',
  currentScreen,
  onNavigate,
  onLogout,
  user,
  adminInfo,
  hasUnpaidBills,
  adminTab = 'all',
  onSelectAdminTab,
  pendingReportsCount = 0,
  pendingPaymentsCount = 0,
}) {
  if (!isOpen) return null;

  const isAdmin = role === 'admin';

  const studentNavItems = [
    { id: 'mainMenu', label: 'หน้าหลัก', icon: Home },
    {
      id: 'payment',
      label: 'ชำระเงิน',
      icon: CreditCard,
      badge: hasUnpaidBills ? '!' : null,
    },
    { id: 'paymentHistory', label: 'ประวัติการชำระเงิน', icon: History },
    { id: 'reportStatus', label: 'แจ้งปัญหา', icon: AlertCircle },
    { id: 'setting', label: 'การตั้งค่า', icon: Settings },
  ];

  const adminNavItems = [
    { id: 'all', label: 'ภาพรวมหอพัก', icon: LayoutDashboard },
    {
      id: 'reports',
      label: 'จัดการแจ้งซ่อม',
      icon: Wrench,
      badge: pendingReportsCount > 0 ? String(pendingReportsCount) : null,
    },
    {
      id: 'payments',
      label: 'ตรวจสอบการชำระเงิน',
      icon: BadgeCheck,
      badge: pendingPaymentsCount > 0 ? String(pendingPaymentsCount) : null,
    },
    { id: 'announcements', label: 'จัดการประกาศหอพัก', icon: Megaphone },
  ];

  const navItems = isAdmin ? adminNavItems : studentNavItems;

  return (
    <div className="absolute inset-0 z-40 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside className="relative w-[272px] max-w-[82%] h-full bg-white shadow-2xl flex flex-col z-10 animate-screen">
        {/* Drawer Header */}
        <div className="bg-[#F96316] text-white px-5 pt-5 pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight">
                Easy Dorm
              </span>
              {isAdmin && (
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-white/20 text-white">
                  Admin
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="ปิดเมนู"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/15 hover:bg-white/25 active:scale-95 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isAdmin && adminInfo ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-[#F96316] flex items-center justify-center border-2 border-white/80 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">
                  {adminInfo.fullName}
                </p>
                <p className="text-xs text-white/90 truncate">
                  {adminInfo.staffId} • {adminInfo.roleTitle}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <UserAvatar
                size="sm"
                className="rounded-full border-2 border-white/80"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold truncate">
                    {user.fullName}
                  </p>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] fill-white shrink-0" />
                </div>
                <p className="text-xs text-white/90 truncate">
                  {user.studentId} • ห้อง {user.roomNo}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isAdmin
              ? adminTab === item.id
              : currentScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (isAdmin) {
                    onSelectAdminTab?.(item.id);
                  } else {
                    onNavigate(item.id);
                  }
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-orange-50 text-[#F96316] font-semibold'
                    : 'text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? 'text-[#F96316]' : 'text-zinc-500'
                    }`}
                  />
                  {item.label}
                </span>
                {item.badge && (
                  <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#EF4444] text-white text-[11px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-zinc-200">
          <button
            type="button"
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-medium text-[#EF4444] hover:bg-red-50 active:bg-red-100 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            ออกจากระบบ
          </button>
        </div>
      </aside>
    </div>
  );
}
