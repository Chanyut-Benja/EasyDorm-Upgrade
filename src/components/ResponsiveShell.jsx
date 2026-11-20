import React from 'react';
import { useViewMode } from '../context/ViewModeContext';
import SidebarMenu from './SidebarMenu';
import AppHeader from './AppHeader';
import DrawerMenu from './DrawerMenu';

export default function ResponsiveShell({
  children,
  isAuthScreen,
  title,
  showBackButton,
  onBack,
  currentScreen,
  onNavigate,
  onLogout,
  user,
  adminInfo,
  role = 'student',
  onSwitchRole,
  adminTab = 'all',
  onSelectAdminTab,
  pendingReportsCount = 0,
  pendingPaymentsCount = 0,
  hasUnpaidBills,
  drawerOpen,
  onOpenDrawer,
  onCloseDrawer,
}) {
  const { isDesktop, isWideScreen } = useViewMode();
  const isAdmin = role === 'admin';
  const hasNotificationDot = isAdmin
    ? pendingReportsCount > 0 || pendingPaymentsCount > 0
    : hasUnpaidBills;

  // Desktop Layout (>= 768px in Desktop mode)
  if (isDesktop) {
    if (isAuthScreen) {
      return (
        <div className="min-h-dvh w-full bg-[#F8FAFC] flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-4xl">{children}</div>
        </div>
      );
    }

    return (
      <div className="min-h-dvh w-full bg-[#F8FAFC] flex">
        <SidebarMenu
          role={role}
          currentScreen={currentScreen}
          onNavigate={onNavigate}
          onLogout={onLogout}
          hasUnpaidBills={hasUnpaidBills}
          adminTab={adminTab}
          onSelectAdminTab={onSelectAdminTab}
          pendingReportsCount={pendingReportsCount}
          pendingPaymentsCount={pendingPaymentsCount}
        />

        <div className="flex-1 flex flex-col min-w-0 min-h-dvh">
          <AppHeader
            title={title}
            showBack={showBackButton}
            onBack={onBack}
            user={user}
            adminInfo={adminInfo}
            role={role}
            onSwitchRole={onSwitchRole}
            showRoleSwitcher={!isAuthScreen}
          />

          <main className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full p-6 lg:p-8 flex flex-col min-h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Mobile Layout (< 768px OR Mobile preview mode on Desktop)
  return (
    <div
      className={
        isWideScreen
          ? 'min-h-dvh w-full bg-[#F8FAFC] flex justify-center'
          : 'w-full h-dvh bg-[#F8FAFC]'
      }
    >
      <div
        className={`relative w-full h-dvh bg-[#F8FAFC] flex flex-col overflow-hidden ${
          isWideScreen ? 'max-w-[430px] shadow-xl border-x border-slate-200' : ''
        }`}
      >
        <AppHeader
          title={title}
          showBack={showBackButton}
          onBack={onBack}
          showMenu={!isAuthScreen}
          onOpenMenu={onOpenDrawer}
          hasNotificationDot={hasNotificationDot}
          role={role}
          onSwitchRole={onSwitchRole}
          showRoleSwitcher={!isAuthScreen}
        />

        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {children}
        </main>

        {/* Orange Bottom Bar Accent */}
        <div className="bg-[#F96316] h-2.5 w-full shrink-0 select-none z-20" />

        {/* Slide-over Hamburger Drawer */}
        <DrawerMenu
          isOpen={drawerOpen}
          onClose={onCloseDrawer}
          role={role}
          currentScreen={currentScreen}
          onNavigate={onNavigate}
          onLogout={onLogout}
          user={user}
          adminInfo={adminInfo}
          hasUnpaidBills={hasUnpaidBills}
          adminTab={adminTab}
          onSelectAdminTab={onSelectAdminTab}
          pendingReportsCount={pendingReportsCount}
          pendingPaymentsCount={pendingPaymentsCount}
        />
      </div>
    </div>
  );
}
