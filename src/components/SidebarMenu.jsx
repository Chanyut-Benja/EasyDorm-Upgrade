import React from 'react';
import {
  Building2,
  Home,
  CreditCard,
  History,
  AlertCircle,
  Settings,
  LogOut,
  LayoutDashboard,
  Wrench,
  BadgeCheck,
  Megaphone,
} from 'lucide-react';

const PAYMENT_GROUP = new Set([
  'payment',
  'paymentMethod',
  'qrPayment',
  'paymentVerification',
  'paymentSuccess',
]);

const REPORT_GROUP = new Set([
  'reportStatus',
  'reportForm',
  'serviceRating',
  'feedbackConfirmation',
]);

export default function SidebarMenu({
  role = 'student',
  currentScreen,
  onNavigate,
  onLogout,
  hasUnpaidBills,
  adminTab = 'all',
  onSelectAdminTab,
  pendingReportsCount = 0,
  pendingPaymentsCount = 0,
}) {
  const studentNavItems = [
    {
      id: 'mainMenu',
      label: 'หน้าหลัก',
      icon: Home,
      isActive: currentScreen === 'mainMenu' || currentScreen === 'announcement',
    },
    {
      id: 'payment',
      label: 'ชำระค่าบริการ',
      icon: CreditCard,
      badge: hasUnpaidBills ? '!' : null,
      isActive: PAYMENT_GROUP.has(currentScreen),
    },
    {
      id: 'paymentHistory',
      label: 'ประวัติการชำระเงิน',
      icon: History,
      isActive: currentScreen === 'paymentHistory',
    },
    {
      id: 'reportStatus',
      label: 'แจ้งปัญหา/ติดตามสถานะ',
      icon: AlertCircle,
      isActive: REPORT_GROUP.has(currentScreen),
    },
    {
      id: 'setting',
      label: 'การตั้งค่า',
      icon: Settings,
      isActive: currentScreen === 'setting',
    },
  ];

  const adminNavItems = [
    {
      id: 'all',
      label: 'ภาพรวมหอพัก',
      icon: LayoutDashboard,
      isActive: adminTab === 'all',
    },
    {
      id: 'reports',
      label: 'จัดการแจ้งซ่อม',
      icon: Wrench,
      badge: pendingReportsCount > 0 ? String(pendingReportsCount) : null,
      isActive: adminTab === 'reports',
    },
    {
      id: 'payments',
      label: 'ตรวจสอบการชำระเงิน',
      icon: BadgeCheck,
      badge: pendingPaymentsCount > 0 ? String(pendingPaymentsCount) : null,
      isActive: adminTab === 'payments',
    },
    {
      id: 'announcements',
      label: 'จัดการประกาศหอพัก',
      icon: Megaphone,
      isActive: adminTab === 'announcements',
    },
  ];

  const isAdmin = role === 'admin';
  const navItems = isAdmin ? adminNavItems : studentNavItems;

  return (
    <aside className="w-64 lg:w-72 shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between select-none shadow-[2px_0_12px_-4px_rgba(15,23,42,0.03)]">
      <div>
        {/* Brand Logo Header */}
        <div className="px-5 py-5 border-b border-orange-100 bg-gradient-to-br from-orange-50/80 to-white flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#F96316] text-white flex items-center justify-center shadow-sm shadow-orange-500/20 shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold text-zinc-900 tracking-tight leading-tight">
                Easy Dorm
              </h1>
              {isAdmin && (
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-orange-100 text-[#F96316]">
                  Admin
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-500 truncate">
              {isAdmin ? 'ระบบจัดการหอพัก (ผู้ดูแล)' : 'ระบบจัดการหอพักนักศึกษา'}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  isAdmin ? onSelectAdminTab?.(item.id) : onNavigate(item.id)
                }
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-medium transition-colors cursor-pointer ${
                  item.isActive
                    ? 'bg-orange-50 text-[#F96316] font-semibold border border-orange-200/70'
                    : 'text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200 border border-transparent'
                }`}
              >
                <span className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      item.isActive ? 'text-[#F96316]' : 'text-zinc-500'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </span>
                {item.badge && (
                  <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#EF4444] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Logout */}
      <div className="p-3 border-t border-slate-200">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-medium text-[#EF4444] hover:bg-red-50 active:bg-red-100 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </aside>
  );
}
