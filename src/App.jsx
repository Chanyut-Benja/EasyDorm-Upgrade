import React, { useState, useCallback, useRef } from 'react';
import { ViewModeProvider } from './context/ViewModeContext';
import ResponsiveShell from './components/ResponsiveShell';
import ViewSwitcher from './components/ViewSwitcher';
import ToastContainer from './components/Toast';
import {
  LoginScreen,
  RegisterScreen,
  VerificationScreen,
} from './screens/AuthScreens';
import {
  MainMenuScreen,
  AnnouncementScreen,
  SettingScreen,
} from './screens/MainMenuScreen';
import {
  PaymentScreen,
  PaymentMethodScreen,
  QrPaymentScreen,
  PaymentVerificationScreen,
  PaymentSuccessScreen,
  PaymentHistoryScreen,
} from './screens/BillingScreens';
import {
  ReportStatusScreen,
  ReportFormScreen,
  ServiceRatingScreen,
  FeedbackConfirmationScreen,
} from './screens/ReportScreens';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import {
  INITIAL_USER,
  INITIAL_ADMIN,
  INITIAL_RESIDENT_STATS,
  INITIAL_UNPAID_BILLS,
  INITIAL_PAYMENT_HISTORY,
  INITIAL_PAYMENT_VERIFICATIONS,
  INITIAL_REPORTS,
  INITIAL_ANNOUNCEMENTS,
} from './data/mockData';

const AUTH_SCREENS = new Set(['login', 'register', 'verification']);

const SCREEN_TITLES = {
  login: 'Easy Dorm',
  register: 'Register',
  verification: 'Verification',
  mainMenu: 'Easy Dorm',
  adminDashboard: 'Admin Dashboard',
  payment: 'Payment',
  paymentMethod: 'Payment Method',
  qrPayment: 'Prompt Pay QR',
  paymentVerification: 'Payment Verification',
  paymentSuccess: 'Payment Success',
  paymentHistory: 'Payment History',
  reportStatus: 'Report Status',
  reportForm: 'Report',
  serviceRating: 'Service Rating',
  feedbackConfirmation: 'Feedback',
  announcement: 'Announcement',
  setting: 'การตั้งค่า',
};

function AppContent() {
  const [navStack, setNavStack] = useState(['login']);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Demo Role & Admin Tab State
  const [role, setRole] = useState('student');
  const [adminTab, setAdminTab] = useState('all');

  // Toast Notification State
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = 'success') => {
      const id = ++toastIdRef.current;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        dismissToast(id);
      }, 3200);
    },
    [dismissToast]
  );

  // Real-time Shared App State (Student <-> Admin)
  const [user, setUser] = useState(INITIAL_USER);
  const [adminInfo] = useState(INITIAL_ADMIN);
  const [residentStats] = useState(INITIAL_RESIDENT_STATS);
  const [unpaidBills, setUnpaidBills] = useState(INITIAL_UNPAID_BILLS);
  const [paymentHistory, setPaymentHistory] = useState(INITIAL_PAYMENT_HISTORY);
  const [paymentVerifications, setPaymentVerifications] = useState(
    INITIAL_PAYMENT_VERIFICATIONS
  );
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(
    INITIAL_ANNOUNCEMENTS[0].id
  );
  const [notificationSettings, setNotificationSettings] = useState({
    billing: true,
    repair: true,
    announcement: true,
  });

  // Flow State
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState('PromptPay QR');
  const [lastReceipt, setLastReceipt] = useState({
    date: '25 พ.ย. 2569',
    transactionId: 'ED2569112501',
    water: 180.0,
    electric: 2320.93,
    total: 2500.93,
  });
  const [ratingTargetId, setRatingTargetId] = useState(null);

  const currentScreen = navStack[navStack.length - 1];
  const isAuthScreen = AUTH_SCREENS.has(currentScreen);
  const hasUnpaidBills = unpaidBills.length > 0;

  const pendingReportsCount = reports.filter(
    (r) => r.status !== 'Success'
  ).length;
  const pendingPaymentsCount = paymentVerifications.filter(
    (p) => p.status === 'รอตรวจสอบ'
  ).length;

  const navigate = useCallback((screen) => {
    setNavStack((prev) => {
      if (prev[prev.length - 1] === screen) return prev;
      return [...prev, screen];
    });
  }, []);

  const resetTo = useCallback((screen) => {
    setNavStack([screen]);
  }, []);

  const goBack = useCallback(() => {
    setNavStack((prev) => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, -1);
    });
  }, []);

  const handleNavMenuSelect = useCallback(
    (screen) => {
      if (screen === 'mainMenu') {
        resetTo('mainMenu');
      } else {
        setNavStack(['mainMenu', screen]);
      }
    },
    [resetTo]
  );

  const handleLoginSuccess = useCallback(
    (loginRole = role) => {
      const targetRole = loginRole === 'admin' ? 'admin' : 'student';
      setRole(targetRole);
      if (targetRole === 'admin') {
        setAdminTab('all');
        resetTo('adminDashboard');
        addToast(`เข้าสู่ระบบผู้ดูแลหอพัก ยินดีต้อนรับ ${adminInfo.fullName}`);
      } else {
        resetTo('mainMenu');
        addToast(`เข้าสู่ระบบสำเร็จ ยินดีต้อนรับ ${user.fullName}`);
      }
    },
    [role, resetTo, addToast, adminInfo.fullName, user.fullName]
  );

  const handleSwitchRole = useCallback(
    (nextRole) => {
      if (nextRole === role) return;
      setRole(nextRole);
      setDrawerOpen(false);
      if (!isAuthScreen) {
        if (nextRole === 'admin') {
          setAdminTab('all');
          resetTo('adminDashboard');
          addToast('สลับเป็นมุมมองผู้ดูแลหอพัก (Admin)', 'info');
        } else {
          resetTo('mainMenu');
          addToast('สลับเป็นมุมมองนักศึกษา (Student)', 'info');
        }
      }
    },
    [role, isAuthScreen, resetTo, addToast]
  );

  const handleLogout = useCallback(() => {
    setDrawerOpen(false);
    resetTo('login');
    addToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
  }, [resetTo, addToast]);

  const handleCompletePayment = useCallback(() => {
    setUnpaidBills((currentUnpaid) => {
      if (currentUnpaid.length > 0) {
        const totalWater = currentUnpaid.reduce((s, b) => s + b.water, 0);
        const totalElectric = currentUnpaid.reduce((s, b) => s + b.electric, 0);
        const totalAll = currentUnpaid.reduce((s, b) => s + b.total, 0);
        const now = Date.now();
        const txId = `ED${now.toString().slice(-10)}`;

        setLastReceipt({
          date: '16 พ.ย. 2569',
          transactionId: txId,
          water: totalWater,
          electric: totalElectric,
          total: totalAll,
        });

        const newHistoryEntries = currentUnpaid.map((bill, idx) => ({
          id: `hist-paid-${bill.id}-${now}-${idx}`,
          month: bill.month,
          water: bill.water,
          electric: bill.electric,
          total: bill.total,
          paidDate: '16 พ.ย. 2569',
          transactionId: txId,
          status: 'รอตรวจสอบ',
        }));

        const newVerificationEntries = newHistoryEntries.map((hist, idx) => ({
          id: `pay-ver-${now}-${idx}`,
          historyId: hist.id,
          studentName: user.fullName,
          studentId: user.studentId,
          roomNo: user.roomNo,
          month: hist.month,
          water: hist.water,
          electric: hist.electric,
          total: hist.total,
          paidDate: hist.paidDate,
          transactionId: txId,
          method: selectedPaymentMethod,
          status: 'รอตรวจสอบ',
        }));

        setPaymentHistory((prevHist) => [...newHistoryEntries, ...prevHist]);
        setPaymentVerifications((prevVer) => [
          ...newVerificationEntries,
          ...prevVer,
        ]);
      }
      return [];
    });
    resetTo('paymentSuccess');
    addToast('ส่งรายการชำระเงินแล้ว รอผู้ดูแลตรวจสอบ');
  }, [resetTo, addToast, user, selectedPaymentMethod]);

  const handleApprovePayment = useCallback(
    (verificationId) => {
      let approvedRoom = '';
      let targetHistoryId = null;

      setPaymentVerifications((prev) =>
        prev.map((item) => {
          if (item.id === verificationId) {
            approvedRoom = item.roomNo;
            targetHistoryId = item.historyId;
            return { ...item, status: 'ชำระแล้ว' };
          }
          return item;
        })
      );

      if (targetHistoryId) {
        setPaymentHistory((prevHist) =>
          prevHist.map((h) =>
            h.id === targetHistoryId ? { ...h, status: 'ชำระแล้ว' } : h
          )
        );
      }

      addToast(
        approvedRoom
          ? `อนุมัติการชำระเงินห้อง ${approvedRoom} เรียบร้อยแล้ว`
          : 'อนุมัติการชำระเงินเรียบร้อยแล้ว'
      );
    },
    [addToast]
  );

  const handleSubmitReport = useCallback(
    ({ title, category, description }) => {
      const newReport = {
        id: `rep-${Date.now()}`,
        title,
        category,
        description,
        reporterName: user.fullName,
        roomNo: user.roomNo,
        status: 'Pending',
        createdAt: 'วันนี้',
        rated: false,
        rating: 0,
        comment: '',
      };
      setReports((prev) => [newReport, ...prev]);
      setNavStack(['mainMenu', 'reportStatus']);
      addToast('ส่งคำร้องแจ้งซ่อมเรียบร้อยแล้ว');
    },
    [addToast, user.fullName, user.roomNo]
  );

  const handleUpdateReportStatus = useCallback(
    (reportId, nextStatus) => {
      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? { ...r, status: nextStatus } : r))
      );
      addToast(`อัปเดตสถานะงานซ่อมเป็น "${nextStatus}" แล้ว`);
    },
    [addToast]
  );

  const handleSubmitRating = useCallback(
    (reportId, rating, comment) => {
      if (reportId) {
        setReports((prev) =>
          prev.map((r) =>
            r.id === reportId ? { ...r, rated: true, rating, comment } : r
          )
        );
      }
      setNavStack(['mainMenu', 'reportStatus', 'feedbackConfirmation']);
      addToast('ส่งแบบประเมินความพึงพอใจเรียบร้อยแล้ว');
    },
    [addToast]
  );

  const handleCreateAnnouncement = useCallback(
    ({ title, tag, theme, detail }) => {
      const paragraphs = detail
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean);
      const newAnnouncement = {
        id: `ann-${Date.now()}`,
        tag: tag || 'ข่าวสารหอพัก',
        theme: theme || 'water',
        title,
        brief: paragraphs[0] || detail,
        date: '16 พฤศจิกายน 2569',
        schedule: 'ประกาศล่าสุด • วันนี้',
        body: paragraphs.length > 0 ? paragraphs : [detail],
      };
      setAnnouncements((prev) => [newAnnouncement, ...prev]);
      addToast('โพสต์ประกาศหอพักเรียบร้อยแล้ว');
    },
    [addToast]
  );

  const handleUpdateProfile = useCallback(
    ({ phone, email }) => {
      setUser((prev) => ({
        ...prev,
        phone: phone.trim(),
        email: email.trim(),
      }));
      addToast('บันทึกข้อมูลบัญชีผู้ใช้งานเรียบร้อยแล้ว');
    },
    [addToast]
  );

  const handleToggleNotification = useCallback(
    (key) => {
      setNotificationSettings((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
      addToast('บันทึกการตั้งค่าการแจ้งเตือนแล้ว');
    },
    [addToast]
  );

  const handleChangePassword = useCallback(() => {
    addToast('เปลี่ยนรหัสผ่านเรียบร้อยแล้ว');
  }, [addToast]);

  const showBackButton =
    currentScreen !== 'login' &&
    currentScreen !== 'mainMenu' &&
    currentScreen !== 'adminDashboard' &&
    currentScreen !== 'paymentVerification' &&
    currentScreen !== 'paymentSuccess' &&
    currentScreen !== 'feedbackConfirmation';

  const totalUnpaidAmount = unpaidBills.reduce((sum, b) => sum + b.total, 0);
  const ratingTargetReport = reports.find((r) => r.id === ratingTargetId);
  const activeAnnouncement =
    announcements.find((a) => a.id === selectedAnnouncementId) ||
    announcements[0];

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <ResponsiveShell
        isAuthScreen={isAuthScreen}
        title={SCREEN_TITLES[currentScreen] || 'Easy Dorm'}
        showBackButton={showBackButton}
        onBack={goBack}
        currentScreen={currentScreen}
        onNavigate={handleNavMenuSelect}
        onLogout={handleLogout}
        user={user}
        adminInfo={adminInfo}
        role={role}
        onSwitchRole={handleSwitchRole}
        adminTab={adminTab}
        onSelectAdminTab={setAdminTab}
        pendingReportsCount={pendingReportsCount}
        pendingPaymentsCount={pendingPaymentsCount}
        hasUnpaidBills={hasUnpaidBills}
        drawerOpen={drawerOpen}
        onOpenDrawer={() => setDrawerOpen(true)}
        onCloseDrawer={() => setDrawerOpen(false)}
      >
        {currentScreen === 'login' && (
          <LoginScreen
            selectedRole={role}
            onSelectRole={setRole}
            onLogin={handleLoginSuccess}
            onGoRegister={() => navigate('register')}
          />
        )}

        {currentScreen === 'register' && (
          <RegisterScreen
            onRegister={() => {
              addToast('ส่งรหัสยืนยันไปยังอีเมลของคุณแล้ว', 'info');
              navigate('verification');
            }}
            onBack={goBack}
          />
        )}

        {currentScreen === 'verification' && (
          <VerificationScreen
            onVerify={() => handleLoginSuccess('student')}
            onBack={goBack}
          />
        )}

        {currentScreen === 'adminDashboard' && (
          <AdminDashboardScreen
            adminInfo={adminInfo}
            residentStats={residentStats}
            reports={reports}
            paymentVerifications={paymentVerifications}
            announcements={announcements}
            adminTab={adminTab}
            onSelectAdminTab={setAdminTab}
            onUpdateReportStatus={handleUpdateReportStatus}
            onApprovePayment={handleApprovePayment}
            onCreateAnnouncement={handleCreateAnnouncement}
          />
        )}

        {currentScreen === 'mainMenu' && (
          <MainMenuScreen
            user={user}
            hasUnpaidBills={hasUnpaidBills}
            announcements={announcements}
            onNavigate={navigate}
            onOpenAnnouncement={(annId) => {
              setSelectedAnnouncementId(annId);
              navigate('announcement');
            }}
          />
        )}

        {currentScreen === 'payment' && (
          <PaymentScreen
            user={user}
            unpaidBills={unpaidBills}
            onProceedToMethod={() => navigate('paymentMethod')}
            onGoHistory={() => navigate('paymentHistory')}
          />
        )}

        {currentScreen === 'paymentMethod' && (
          <PaymentMethodScreen
            onSelectMethod={(method) => {
              setSelectedPaymentMethod(method);
              navigate('qrPayment');
            }}
          />
        )}

        {currentScreen === 'qrPayment' && (
          <QrPaymentScreen
            totalAmount={totalUnpaidAmount}
            selectedMethod={selectedPaymentMethod}
            onCopyAccount={() => addToast('คัดลอกเลขบัญชีสำเร็จ')}
            onConfirmPayment={() => {
              addToast('สแกน QR สำเร็จ กำลังตรวจสอบรายการ', 'info');
              navigate('paymentVerification');
            }}
          />
        )}

        {currentScreen === 'paymentVerification' && (
          <PaymentVerificationScreen onComplete={handleCompletePayment} />
        )}

        {currentScreen === 'paymentSuccess' && (
          <PaymentSuccessScreen
            receipt={lastReceipt}
            onBackHome={() => resetTo('mainMenu')}
          />
        )}

        {currentScreen === 'paymentHistory' && (
          <PaymentHistoryScreen history={paymentHistory} />
        )}

        {currentScreen === 'reportStatus' && (
          <ReportStatusScreen
            reports={reports}
            onGoReportForm={() => navigate('reportForm')}
            onGoRateReport={(reportId) => {
              setRatingTargetId(reportId);
              navigate('serviceRating');
            }}
          />
        )}

        {currentScreen === 'reportForm' && (
          <ReportFormScreen onSubmitReport={handleSubmitReport} />
        )}

        {currentScreen === 'serviceRating' && (
          <ServiceRatingScreen
            report={ratingTargetReport}
            onSubmitRating={handleSubmitRating}
          />
        )}

        {currentScreen === 'feedbackConfirmation' && (
          <FeedbackConfirmationScreen onBackHome={() => resetTo('mainMenu')} />
        )}

        {currentScreen === 'announcement' && (
          <AnnouncementScreen announcement={activeAnnouncement} />
        )}

        {currentScreen === 'setting' && (
          <SettingScreen
            user={user}
            onUpdateProfile={handleUpdateProfile}
            notificationSettings={notificationSettings}
            onToggleNotification={handleToggleNotification}
            onChangePassword={handleChangePassword}
          />
        )}
      </ResponsiveShell>

      <ViewSwitcher />
    </>
  );
}

export default function App() {
  return (
    <ViewModeProvider>
      <AppContent />
    </ViewModeProvider>
  );
}
