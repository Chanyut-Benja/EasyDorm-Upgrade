import React, { useState } from 'react';
import {
  CheckCircle2,
  Wrench,
  Wallet,
  History,
  Droplets,
  Megaphone,
  Bell,
  ChevronRight,
  Sparkles,
  FileText,
  CalendarClock,
  IdCard,
  MapPin,
  User,
  Lock,
  Phone,
  Mail,
  ShieldCheck,
  KeyRound,
  Save,
  X,
  Eye,
  EyeOff,
  Receipt,
} from 'lucide-react';
import { useViewMode } from '../context/ViewModeContext';
import UserAvatar from '../components/UserAvatar';

const ANNOUNCEMENT_THEMES = {
  water: {
    gradient: 'from-orange-500 via-[#F96316] to-amber-500',
    icon: Droplets,
    badgeBg: 'bg-orange-50 text-[#F96316] border-orange-200/70',
    subtitle: 'ระบบน้ำประปาและอาคารสถานที่',
  },
  clean: {
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    icon: Sparkles,
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
    subtitle: 'สุขอนามัยและความสะอาดส่วนกลาง',
  },
  contract: {
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    icon: FileText,
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/70',
    subtitle: 'งานทะเบียนและสัญญาหอพัก',
  },
};

function AnnouncementBanner({ announcement, heightClass = 'h-36' }) {
  const theme = ANNOUNCEMENT_THEMES[announcement.theme] || ANNOUNCEMENT_THEMES.water;
  const ThemeIcon = theme.icon;

  return (
    <div
      className={`bg-gradient-to-br ${theme.gradient} relative overflow-hidden flex items-center justify-between p-5 ${heightClass}`}
    >
      {/* Decorative soft circles */}
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute right-12 -bottom-10 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />

      <div className="relative z-10 flex items-center gap-3.5 text-white min-w-0">
        <div className="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center shrink-0 shadow-sm">
          <ThemeIcon className="w-7 h-7 text-white" />
        </div>
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
            <Megaphone className="w-3 h-3" /> {announcement.tag}
          </span>
          <p className="font-bold mt-1.5 text-sm sm:text-base leading-snug line-clamp-1">
            {announcement.title}
          </p>
          <p className="text-[11px] text-white/90 mt-0.5 flex items-center gap-1">
            <CalendarClock className="w-3 h-3 shrink-0" />
            <span className="truncate">{announcement.schedule}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function MainMenuScreen({
  user,
  hasUnpaidBills,
  announcements,
  onNavigate,
  onOpenAnnouncement,
}) {
  const { isDesktop } = useViewMode();
  const [featuredAnnouncement, ...otherAnnouncements] = announcements;

  const profileCard = (
    <div
      className={`bg-white rounded-3xl border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] flex items-center gap-4 transition-all duration-200 hover:shadow-[0_10px_28px_-6px_rgba(15,23,42,0.09)] ${
        isDesktop ? 'p-6' : 'p-4'
      }`}
    >
      <UserAvatar size={isDesktop ? 'lg' : 'md'} />

      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-50 border border-green-200/80">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
          <span className="text-[11px] font-semibold text-[#16A34A]">
            Verified ผู้พักอาศัย
          </span>
        </div>

        <p
          className={`font-bold text-slate-900 truncate ${
            isDesktop ? 'text-lg' : 'text-base'
          }`}
        >
          {user.fullName}
        </p>

        <div
          className={`flex flex-col gap-0.5 text-slate-600 ${
            isDesktop ? 'text-xs' : 'text-[11px]'
          }`}
        >
          <span className="inline-flex items-center gap-1.5 font-medium">
            <IdCard className="w-3.5 h-3.5 text-[#F96316] shrink-0" />
            รหัสนักศึกษา {user.studentId}
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#F96316] shrink-0" />
            {user.roomDisplay}
          </span>
        </div>
      </div>
    </div>
  );

  const shortcutButtons = (
    <div
      className={`grid grid-cols-3 gap-3 ${
        isDesktop
          ? 'bg-white rounded-3xl p-6 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)]'
          : 'px-0.5'
      }`}
    >
      {/* Report */}
      <button
        type="button"
        onClick={() => onNavigate('reportStatus')}
        className="flex flex-col items-center gap-2 group cursor-pointer"
      >
        <div
          className={`rounded-2xl bg-white border border-slate-200 shadow-[0_4px_14px_-4px_rgba(15,23,42,0.07)] flex items-center justify-center group-hover:border-[#F96316] group-hover:bg-orange-50/70 group-hover:-translate-y-0.5 group-hover:shadow-md group-active:scale-95 transition-all duration-200 ${
            isDesktop ? 'w-18 h-18' : 'w-16 h-16'
          }`}
        >
          <Wrench className="w-7 h-7 text-[#F96316] transition-transform duration-200 group-hover:rotate-[-8deg]" />
        </div>
        <div className="text-center">
          <span
            className={`block font-semibold text-slate-800 group-hover:text-[#F96316] transition-colors ${
              isDesktop ? 'text-sm' : 'text-xs'
            }`}
          >
            Report
          </span>
          <span className="block text-[10px] text-slate-400">แจ้งซ่อม</span>
        </div>
      </button>

      {/* Payment with Red ! Notification Badge */}
      <button
        type="button"
        onClick={() => onNavigate('payment')}
        className="flex flex-col items-center gap-2 group cursor-pointer"
      >
        <div
          className={`relative rounded-2xl bg-white border border-slate-200 shadow-[0_4px_14px_-4px_rgba(15,23,42,0.07)] flex items-center justify-center group-hover:border-[#F96316] group-hover:bg-orange-50/70 group-hover:-translate-y-0.5 group-hover:shadow-md group-active:scale-95 transition-all duration-200 ${
            isDesktop ? 'w-18 h-18' : 'w-16 h-16'
          }`}
        >
          <Wallet className="w-7 h-7 text-[#F96316] transition-transform duration-200 group-hover:scale-105" />
          {hasUnpaidBills && (
            <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#EF4444] text-white text-xs font-bold flex items-center justify-center ring-2 ring-[#F8FAFC] shadow-sm">
              !
            </span>
          )}
        </div>
        <div className="text-center">
          <span
            className={`block font-semibold text-slate-800 group-hover:text-[#F96316] transition-colors ${
              isDesktop ? 'text-sm' : 'text-xs'
            }`}
          >
            Payment
          </span>
          <span className="block text-[10px] text-slate-400">ชำระบิล</span>
        </div>
      </button>

      {/* History */}
      <button
        type="button"
        onClick={() => onNavigate('paymentHistory')}
        className="flex flex-col items-center gap-2 group cursor-pointer"
      >
        <div
          className={`rounded-2xl bg-white border border-slate-200 shadow-[0_4px_14px_-4px_rgba(15,23,42,0.07)] flex items-center justify-center group-hover:border-[#F96316] group-hover:bg-orange-50/70 group-hover:-translate-y-0.5 group-hover:shadow-md group-active:scale-95 transition-all duration-200 ${
            isDesktop ? 'w-18 h-18' : 'w-16 h-16'
          }`}
        >
          <History className="w-7 h-7 text-[#F96316] transition-transform duration-200 group-hover:rotate-[-12deg]" />
        </div>
        <div className="text-center">
          <span
            className={`block font-semibold text-slate-800 group-hover:text-[#F96316] transition-colors ${
              isDesktop ? 'text-sm' : 'text-xs'
            }`}
          >
            History
          </span>
          <span className="block text-[10px] text-slate-400">ประวัติ</span>
        </div>
      </button>
    </div>
  );

  const announcementSection = (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2
          className={`font-bold text-slate-900 ${
            isDesktop ? 'text-lg' : 'text-base'
          }`}
        >
          Announcement
        </h2>
        <span className="text-[11px] font-semibold text-[#F96316] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded-full">
          {announcements.length} ประกาศล่าสุด
        </span>
      </div>

      {/* Featured Announcement Card */}
      {featuredAnnouncement && (
        <button
          type="button"
          onClick={() => onOpenAnnouncement(featuredAnnouncement.id)}
          className="w-full text-left bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_-6px_rgba(15,23,42,0.10)] hover:border-orange-200 hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 cursor-pointer"
        >
          <AnnouncementBanner
            announcement={featuredAnnouncement}
            heightClass={isDesktop ? 'h-40' : 'h-32'}
          />

          <div className={isDesktop ? 'p-5' : 'p-4'}>
            <div className="flex items-start justify-between gap-2">
              <h3
                className={`font-bold text-slate-900 leading-snug ${
                  isDesktop ? 'text-base' : 'text-sm'
                }`}
              >
                {featuredAnnouncement.title}
              </h3>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            </div>
            <p
              className={`text-slate-600 mt-1.5 leading-relaxed ${
                isDesktop ? 'text-sm line-clamp-2' : 'text-xs line-clamp-2'
              }`}
            >
              {featuredAnnouncement.brief}
            </p>
            <p className="text-[11px] text-slate-400 mt-2.5">
              ประกาศเมื่อ {featuredAnnouncement.date}
            </p>
          </div>
        </button>
      )}

      {/* Additional Announcements */}
      {otherAnnouncements.length > 0 && (
        <div className="space-y-2.5">
          {otherAnnouncements.map((item) => {
            const theme = ANNOUNCEMENT_THEMES[item.theme] || ANNOUNCEMENT_THEMES.water;
            const Icon = theme.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpenAnnouncement(item.id)}
                className="w-full text-left bg-white rounded-2xl p-3.5 border border-slate-200 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.05)] hover:shadow-[0_8px_20px_-4px_rgba(15,23,42,0.09)] hover:border-orange-200 hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 flex items-center gap-3.5 cursor-pointer"
              >
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${theme.badgeBg}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-semibold text-slate-500">
                      {item.tag}
                    </span>
                    <span className="text-slate-300 text-[10px]">•</span>
                    <span className="text-[10px] text-slate-400 truncate">
                      {item.schedule}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {item.brief}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  if (isDesktop) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start animate-screen">
        {/* Left Column: Profile Card + 3 Shortcut Buttons */}
        <div className="space-y-6">
          {profileCard}
          {shortcutButtons}
        </div>

        {/* Right Column: Announcements */}
        <div>{announcementSection}</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-5 animate-screen">
      {profileCard}
      {shortcutButtons}
      <div className="pt-0.5">{announcementSection}</div>
    </div>
  );
}

export function AnnouncementScreen({ announcement }) {
  const { isDesktop } = useViewMode();

  return (
    <div
      className={
        isDesktop
          ? 'max-w-3xl mx-auto w-full space-y-4 animate-screen'
          : 'flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-4 animate-screen'
      }
    >
      <h2 className="text-xl font-bold text-slate-900 px-1">ประกาศหอพัก</h2>

      <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] space-y-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block text-[11px] font-semibold text-[#F96316] bg-orange-50 border border-orange-200/70 px-2.5 py-1 rounded-full">
              {announcement.tag}
            </span>
            <span className="text-xs text-slate-400">{announcement.date}</span>
          </div>
          <h3 className="text-base md:text-lg font-bold text-slate-900 mt-2.5 leading-snug">
            {announcement.title}
          </h3>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xs">
          <AnnouncementBanner
            announcement={announcement}
            heightClass="h-40 md:h-48"
          />
        </div>

        {/* Body */}
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          {announcement.body.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

const NOTIFICATION_ITEMS = [
  {
    key: 'billing',
    label: 'แจ้งเตือนบิลค่าบริการรายเดือน',
    description: 'รับการแจ้งเตือนเมื่อมียอดค่าน้ำ-ค่าไฟประจำเดือนหรือใกล้ครบกำหนดชำระ',
    icon: Receipt,
  },
  {
    key: 'repair',
    label: 'แจ้งเตือนอัปเดตสถานะงานซ่อม',
    description: 'รับการแจ้งเตือนเมื่อช่างรับงาน กำลังดำเนินการ หรือซ่อมแซมเสร็จสิ้น',
    icon: Wrench,
  },
  {
    key: 'announcement',
    label: 'แจ้งเตือนข่าวสารและประกาศหอพัก',
    description: 'รับข้อมูลข่าวสาร กิจกรรม และประกาศสำคัญจากผู้ดูแลหอพัก',
    icon: Megaphone,
  },
];

function IOSToggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F96316]/20 ${
        checked ? 'bg-[#22C55E]' : 'bg-slate-300'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

function ChangePasswordModal({ isOpen, onClose, onSubmit }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const resetAndClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
    setError('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword.trim()) {
      setError('กรุณากรอกรหัสผ่านเดิม');
      return;
    }
    if (newPassword.length < 6) {
      setError('รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }
    onSubmit();
    resetAndClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-screen"
      onClick={resetAndClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-password-title"
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/70 flex items-center justify-center shrink-0">
              <KeyRound className="w-5 h-5 text-[#F96316]" />
            </div>
            <div>
              <h3
                id="change-password-title"
                className="text-base font-bold text-slate-900"
              >
                เปลี่ยนรหัสผ่าน
              </h3>
              <p className="text-xs text-slate-500">
                ตั้งรหัสผ่านใหม่เพื่อความปลอดภัยของบัญชี
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="ปิดหน้าต่าง"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-2xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs font-medium text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              รหัสผ่านเดิม
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setError('');
                }}
                placeholder="กรอกรหัสผ่านเดิม"
                className="w-full pl-4 pr-11 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#F96316] focus:ring-4 focus:ring-[#F96316]/12 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                aria-label="แสดงหรือซ่อนรหัสผ่านเดิม"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                {showCurrent ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              รหัสผ่านใหม่
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError('');
                }}
                placeholder="อย่างน้อย 6 ตัวอักษร"
                className="w-full pl-4 pr-11 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#F96316] focus:ring-4 focus:ring-[#F96316]/12 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                aria-label="แสดงหรือซ่อนรหัสผ่านใหม่"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                {showNew ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              ยืนยันรหัสผ่านใหม่
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
                placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                className="w-full pl-4 pr-11 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#F96316] focus:ring-4 focus:ring-[#F96316]/12 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label="แสดงหรือซ่อนการยืนยันรหัสผ่านใหม่"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                {showConfirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={resetAndClose}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-sm font-semibold transition cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-[#F96316] hover:bg-[#EA580C] active:scale-[0.99] text-white text-sm font-semibold shadow-sm transition cursor-pointer"
            >
              ยืนยันเปลี่ยนรหัสผ่าน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function SettingScreen({
  user,
  onUpdateProfile,
  notificationSettings,
  onToggleNotification,
  onChangePassword,
}) {
  const { isDesktop } = useViewMode();
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateProfile?.({ phone, email });
  };

  return (
    <div
      className={
        isDesktop
          ? 'max-w-3xl mx-auto w-full space-y-5 pb-6 animate-screen'
          : 'flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-4 pb-8 animate-screen'
      }
    >
      <div className="px-1">
        <h2 className="text-xl font-bold text-slate-900">การตั้งค่า</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          จัดการข้อมูลบัญชีผู้ใช้งาน การแจ้งเตือน และความปลอดภัยของบัญชี
        </p>
      </div>

      {/* 1. Account Information Card */}
      <section className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/70 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-[#F96316]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              ข้อมูลบัญชีผู้ใช้งาน
            </h3>
            <p className="text-xs text-slate-500">
              ตรวจสอบข้อมูลส่วนตัวและอัปเดตช่องทางการติดต่อ
            </p>
          </div>
        </div>

        {/* Profile Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-50/90 border border-slate-100 rounded-2xl p-4">
          <UserAvatar size="lg" />
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-base font-bold text-slate-900">
                {user?.fullName || 'นายชญานนท์ ใจดี'}
              </p>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                <CheckCircle2 className="w-3 h-3" />
                ยืนยันตัวตนแล้ว
              </span>
            </div>
            <p className="text-xs text-slate-500">
              รหัสนักศึกษา {user?.studentId || '67070037'} • ห้อง{' '}
              {user?.roomNo || 'B-402'} ({user?.dormName || 'หอพักนักศึกษา อาคาร B'})
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name (Locked) */}
            <div>
              <label className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>ชื่อ-นามสกุล</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-normal text-slate-400">
                  <Lock className="w-3 h-3" />
                  แก้ไขไม่ได้
                </span>
              </label>
              <input
                type="text"
                value={user?.fullName || 'นายชญานนท์ ใจดี'}
                disabled
                readOnly
                className="w-full px-4 py-3 rounded-2xl bg-slate-100/90 border border-slate-200 text-sm text-slate-500 cursor-not-allowed"
              />
            </div>

            {/* Student ID (Locked) */}
            <div>
              <label className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>รหัสนักศึกษา</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-normal text-slate-400">
                  <Lock className="w-3 h-3" />
                  แก้ไขไม่ได้
                </span>
              </label>
              <input
                type="text"
                value={user?.studentId || '67070037'}
                disabled
                readOnly
                className="w-full px-4 py-3 rounded-2xl bg-slate-100/90 border border-slate-200 text-sm text-slate-500 cursor-not-allowed"
              />
            </div>

            {/* Room No (Locked) */}
            <div>
              <label className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>เลขห้องพัก</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-normal text-slate-400">
                  <Lock className="w-3 h-3" />
                  แก้ไขไม่ได้
                </span>
              </label>
              <input
                type="text"
                value={user?.roomNo || 'B-402'}
                disabled
                readOnly
                className="w-full px-4 py-3 rounded-2xl bg-slate-100/90 border border-slate-200 text-sm text-slate-500 cursor-not-allowed"
              />
            </div>

            {/* Phone (Editable) */}
            <div>
              <label
                htmlFor="settings-phone"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                เบอร์โทรศัพท์
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="settings-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08x-xxx-xxxx"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#F96316] focus:ring-4 focus:ring-[#F96316]/12 transition-all"
                />
              </div>
            </div>

            {/* Email (Editable) */}
            <div className="md:col-span-2">
              <label
                htmlFor="settings-email"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                อีเมล
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="settings-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@university.ac.th"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#F96316] focus:ring-4 focus:ring-[#F96316]/12 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#F96316] hover:bg-[#EA580C] active:scale-[0.99] text-white text-sm font-semibold shadow-sm transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              บันทึกข้อมูล
            </button>
          </div>
        </form>
      </section>

      {/* 2. Notifications Card */}
      <section className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/70 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5 text-[#F96316]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              ตั้งค่าการแจ้งเตือน
            </h3>
            <p className="text-xs text-slate-500">
              เลือกประเภทการแจ้งเตือนที่คุณต้องการรับจากระบบ Easy Dorm
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {NOTIFICATION_ITEMS.map((item) => {
            const ItemIcon = item.icon;
            const enabled = Boolean(notificationSettings?.[item.key]);
            return (
              <div
                key={item.key}
                className="flex items-center justify-between gap-4 bg-slate-50/80 border border-slate-100 rounded-2xl px-4 py-3.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shrink-0 text-[#F96316]">
                    <ItemIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      {item.label}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {item.description}
                    </p>
                  </div>
                </div>
                <IOSToggle
                  checked={enabled}
                  onChange={() => onToggleNotification?.(item.key)}
                  label={item.label}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Security Card */}
      <section className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/70 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#F96316]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">ความปลอดภัย</h3>
            <p className="text-xs text-slate-500">
              จัดการรหัสผ่านและการเข้าถึงบัญชีผู้ใช้งานของคุณ
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/80 border border-slate-100 rounded-2xl px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shrink-0 text-slate-600">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                รหัสผ่านบัญชีผู้ใช้งาน
              </p>
              <p className="text-[11px] text-slate-500">
                แนะนำให้เปลี่ยนรหัสผ่านเป็นประจำเพื่อความปลอดภัย
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPasswordModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border border-orange-200 bg-orange-50 hover:bg-orange-100/80 text-[#F96316] text-sm font-semibold transition cursor-pointer shrink-0"
          >
            <KeyRound className="w-4 h-4" />
            เปลี่ยนรหัสผ่าน
          </button>
        </div>
      </section>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={() => onChangePassword?.()}
      />
    </div>
  );
}
