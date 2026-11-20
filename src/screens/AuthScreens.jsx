import React, { useState } from 'react';
import {
  Building2,
  MailCheck,
  Eye,
  EyeOff,
  CreditCard,
  Wrench,
  Megaphone,
  ChevronLeft,
  AlertCircle,
} from 'lucide-react';
import { useViewMode } from '../context/ViewModeContext';
import RoleSwitcher from '../components/RoleSwitcher';

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 ml-1 flex items-center gap-1.5 text-xs font-medium text-[#EF4444] animate-error">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

function DesktopAuthCard({ children, onBack, backLabel = 'ย้อนกลับ' }) {
  return (
    <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(15,23,42,0.10)] border border-slate-200 overflow-hidden grid grid-cols-2 min-h-[540px] animate-screen">
      {/* Left: Orange Dorm Info Banner */}
      <div className="bg-gradient-to-br from-[#F96316] via-[#ea580c] to-amber-500 text-white p-8 lg:p-10 flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-sm">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Easy Dorm</h1>
              <p className="text-xs text-white/85">Student Dormitory System</p>
            </div>
          </div>

          <h2 className="text-xl font-bold leading-snug mb-2">
            จัดการเรื่องหอพักได้ง่ายๆ ในที่เดียว
          </h2>
          <p className="text-sm text-white/90 leading-relaxed">
            ระบบบริการนักศึกษาสำหรับตรวจสอบบิลค่าห้อง ชำระเงินออนไลน์ แจ้งซ่อม
            และติดตามประกาศจากทางหอพัก
          </p>
        </div>

        <div className="space-y-3 my-6">
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-xs rounded-2xl px-4 py-3 transition-colors hover:bg-white/20">
            <CreditCard className="w-5 h-5 shrink-0" />
            <span className="text-xs font-medium">
              ชำระค่าน้ำ-ค่าไฟผ่าน PromptPay QR และ Mobile Banking
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-xs rounded-2xl px-4 py-3 transition-colors hover:bg-white/20">
            <Wrench className="w-5 h-5 shrink-0" />
            <span className="text-xs font-medium">
              แจ้งปัญหาซ่อมบำรุงพร้อมติดตามสถานะแบบเรียลไทม์
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-xs rounded-2xl px-4 py-3 transition-colors hover:bg-white/20">
            <Megaphone className="w-5 h-5 shrink-0" />
            <span className="text-xs font-medium">
              อัปเดตประกาศและข่าวสารสำคัญของหอพักทันที
            </span>
          </div>
        </div>

        <p className="text-[11px] text-white/80">
          หอพักนักศึกษา อาคาร B • Easy Dorm Web Portal
        </p>
      </div>

      {/* Right: Form Content */}
      <div className="p-8 lg:p-10 flex flex-col justify-center relative bg-white">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="self-start inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#F96316] mb-4 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            {backLabel}
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

const inputBaseClass =
  'w-full px-4 py-3.5 rounded-2xl bg-slate-50 border text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white transition-all duration-200';

const getInputStateClass = (hasError) =>
  hasError
    ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-4 focus:ring-red-500/15'
    : 'border-slate-200 focus:border-[#F96316] focus:ring-4 focus:ring-[#F96316]/12';

export function LoginScreen({
  selectedRole = 'student',
  onSelectRole,
  onLogin,
  onGoRegister,
}) {
  const { isDesktop } = useViewMode();
  const [studentId, setStudentId] = useState(
    selectedRole === 'admin' ? 'STAFF-001' : '67070037'
  );
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRoleChange = (nextRole) => {
    onSelectRole?.(nextRole);
    setErrors({});
    setStudentId(nextRole === 'admin' ? 'STAFF-001' : '67070037');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!studentId.trim()) {
      nextErrors.studentId =
        selectedRole === 'admin'
          ? 'กรุณากรอกรหัสเจ้าหน้าที่'
          : 'กรุณากรอกรหัสนักศึกษา';
    }
    if (!password.trim()) {
      nextErrors.password = 'กรุณากรอกรหัสผ่าน';
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    onLogin(selectedRole);
  };

  const formContent = (
    <>
      <div className="my-auto">
        {/* Brand Emblem */}
        <div className="flex flex-col items-center mb-6">
          {!isDesktop && (
            <div className="w-16 h-16 rounded-3xl bg-white border border-slate-200 shadow-[0_6px_20px_-4px_rgba(249,99,22,0.18)] flex items-center justify-center mb-3">
              <Building2 className="w-8 h-8 text-[#F96316]" />
            </div>
          )}
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Sign in
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            ระบบจัดการหอพักนักศึกษา Easy Dorm
          </p>
        </div>

        {/* Role Selector */}
        <div className="mb-5">
          <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 ml-1">
            เลือกบทบาทผู้ใช้งาน
          </label>
          <RoleSwitcher
            role={selectedRole}
            onSwitchRole={handleRoleChange}
            variant="light"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
              {selectedRole === 'admin' ? 'Staff / Admin ID' : 'Student ID'}
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                if (errors.studentId) {
                  setErrors((prev) => ({ ...prev, studentId: '' }));
                }
              }}
              placeholder={
                selectedRole === 'admin'
                  ? 'กรอกรหัสเจ้าหน้าที่ (เช่น STAFF-001)'
                  : 'กรอกรหัสนักศึกษา (เช่น 67070037)'
              }
              className={`${inputBaseClass} ${getInputStateClass(Boolean(errors.studentId))}`}
            />
            <FieldError message={errors.studentId} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: '' }));
                  }
                }}
                placeholder="กรอกรหัสผ่าน"
                className={`${inputBaseClass} pr-11 ${getInputStateClass(Boolean(errors.password))}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                aria-label="แสดงหรือซ่อนรหัสผ่าน"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <FieldError message={errors.password} />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-2xl bg-[#F96316] hover:bg-[#ea580c] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-white font-semibold text-base shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 cursor-pointer"
          >
            Sign in
          </button>
        </form>
      </div>

      {/* Bottom Register Link */}
      <div className="pt-6 text-center">
        <p className="text-sm text-slate-600">
          Want to be in a dorm?{' '}
          <button
            type="button"
            onClick={onGoRegister}
            className="text-[#F96316] font-semibold hover:underline cursor-pointer"
          >
            Register
          </button>
        </p>
      </div>
    </>
  );

  if (isDesktop) {
    return <DesktopAuthCard>{formContent}</DesktopAuthCard>;
  }

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-8 overflow-y-auto no-scrollbar animate-screen">
      {formContent}
    </div>
  );
}

export function RegisterScreen({ onRegister, onBack }) {
  const { isDesktop } = useViewMode();
  const [citizenId, setCitizenId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!citizenId.trim()) {
      nextErrors.citizenId = 'กรุณากรอกเลขบัตรประจำตัวประชาชน 13 หลัก';
    }
    if (!password.trim()) {
      nextErrors.password = 'กรุณากำหนดรหัสผ่าน';
    }
    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = 'กรุณายืนยันรหัสผ่านอีกครั้ง';
    } else if (password && password !== confirmPassword) {
      nextErrors.confirmPassword = 'รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    onRegister();
  };

  const formContent = (
    <>
      <div className="mb-7 text-center">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Register
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          ลงทะเบียนเข้าพักหอพักนักศึกษา
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
            Citizen ID
          </label>
          <input
            type="text"
            value={citizenId}
            onChange={(e) => {
              setCitizenId(e.target.value);
              if (errors.citizenId) {
                setErrors((prev) => ({ ...prev, citizenId: '' }));
              }
            }}
            placeholder="เลขบัตรประจำตัวประชาชน 13 หลัก"
            className={`${inputBaseClass} ${getInputStateClass(Boolean(errors.citizenId))}`}
          />
          <FieldError message={errors.citizenId} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: '' }));
              }
            }}
            placeholder="กำหนดรหัสผ่าน"
            className={`${inputBaseClass} ${getInputStateClass(Boolean(errors.password))}`}
          />
          <FieldError message={errors.password} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) {
                setErrors((prev) => ({ ...prev, confirmPassword: '' }));
              }
            }}
            placeholder="ยืนยันรหัสผ่านอีกครั้ง"
            className={`${inputBaseClass} ${getInputStateClass(Boolean(errors.confirmPassword))}`}
          />
          <FieldError message={errors.confirmPassword} />
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-3.5 rounded-2xl bg-[#F96316] hover:bg-[#ea580c] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-white font-semibold text-base shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 cursor-pointer"
        >
          Register
        </button>
      </form>
    </>
  );

  if (isDesktop) {
    return (
      <DesktopAuthCard onBack={onBack} backLabel="กลับไปหน้า Sign in">
        {formContent}
      </DesktopAuthCard>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-8 overflow-y-auto no-scrollbar animate-screen">
      {formContent}
    </div>
  );
}

export function VerificationScreen({ onVerify, onBack }) {
  const { isDesktop } = useViewMode();
  const [code, setCode] = useState('');
  const [resent, setResent] = useState(false);
  const [error, setError] = useState('');

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('กรุณากรอกรหัสยืนยัน 6 หลักที่ได้รับทางอีเมล');
      return;
    }
    setError('');
    onVerify();
  };

  const formContent = (
    <>
      <div className="flex flex-col items-center text-center mb-7">
        <div className="w-16 h-16 rounded-3xl bg-orange-50 border border-orange-200/70 flex items-center justify-center mb-4 shadow-xs">
          <MailCheck className="w-8 h-8 text-[#F96316]" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Email Verification</h2>
        <p className="text-sm text-slate-600 mt-2 max-w-[260px]">
          You will receive verification code via Email
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
            Verification Code
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (error) setError('');
            }}
            placeholder="กรอกรหัสยืนยัน 6 หลัก"
            className={`${inputBaseClass} text-center tracking-widest font-semibold text-base ${getInputStateClass(Boolean(error))}`}
          />
          <FieldError message={error} />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleResend}
            className="text-sm font-medium text-[#F96316] hover:underline cursor-pointer"
          >
            {resent ? 'ส่งรหัสยืนยันใหม่ไปยังอีเมลแล้ว ✓' : 'Resend Code'}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-[#F96316] hover:bg-[#ea580c] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-white font-semibold text-base shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 cursor-pointer"
        >
          Verify
        </button>
      </form>
    </>
  );

  if (isDesktop) {
    return (
      <DesktopAuthCard onBack={onBack} backLabel="ย้อนกลับ">
        {formContent}
      </DesktopAuthCard>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-8 overflow-y-auto no-scrollbar animate-screen">
      {formContent}
    </div>
  );
}
