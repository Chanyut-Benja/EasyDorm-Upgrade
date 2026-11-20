import React, { useState } from 'react';
import {
  BadgeCheck,
  Wrench,
  Users,
  CheckCircle2,
  Clock,
  Star,
  Megaphone,
  Send,
  AlertCircle,
  DoorOpen,
  User,
  Receipt,
  Sparkles,
  PlayCircle,
  MessageSquareQuote,
} from 'lucide-react';
import { formatBaht } from '../data/mockData';
import { useViewMode } from '../context/ViewModeContext';

const REPORT_STATUS_STYLE = {
  Pending: {
    label: 'Pending',
    className: 'text-amber-700 bg-amber-50 border-amber-200/80',
    dot: 'bg-[#EAB308]',
  },
  กำลังดำเนินการ: {
    label: 'กำลังดำเนินการ',
    className: 'text-sky-700 bg-sky-50 border-sky-200/80',
    dot: 'bg-sky-500',
  },
  Success: {
    label: 'Success',
    className: 'text-[#16A34A] bg-green-50 border-green-200/80',
    dot: 'bg-[#22C55E]',
  },
};

const ANNOUNCEMENT_TAG_OPTIONS = [
  { tag: 'แจ้งซ่อมบำรุง', theme: 'water' },
  { tag: 'สาธารณสุข', theme: 'clean' },
  { tag: 'งานทะเบียนหอพัก', theme: 'contract' },
  { tag: 'ข่าวสารหอพัก', theme: 'water' },
];

export default function AdminDashboardScreen({
  adminInfo,
  residentStats,
  reports,
  paymentVerifications,
  announcements,
  adminTab = 'all',
  onSelectAdminTab,
  onUpdateReportStatus,
  onApprovePayment,
  onCreateAnnouncement,
}) {
  const { isDesktop } = useViewMode();

  // Report filter state
  const [reportFilter, setReportFilter] = useState('all');

  // Announcement form state
  const [annTitle, setAnnTitle] = useState('');
  const [annTagIndex, setAnnTagIndex] = useState(0);
  const [annDetail, setAnnDetail] = useState('');
  const [annErrors, setAnnErrors] = useState({});

  const pendingPaymentsCount = paymentVerifications.filter(
    (p) => p.status === 'รอตรวจสอบ'
  ).length;
  const pendingReportsCount = reports.filter(
    (r) => r.status !== 'Success'
  ).length;

  const filteredReports = reports.filter((r) => {
    if (reportFilter === 'pending') return r.status !== 'Success';
    if (reportFilter === 'success') return r.status === 'Success';
    return true;
  });

  const sortedPayments = [...paymentVerifications].sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status === 'รอตรวจสอบ' ? -1 : 1;
  });

  const handlePublishAnnouncement = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!annTitle.trim()) {
      nextErrors.title = 'กรุณากรอกหัวข้อประกาศ';
    }
    if (!annDetail.trim()) {
      nextErrors.detail = 'กรุณากรอกรายละเอียดประกาศ';
    }
    if (Object.keys(nextErrors).length > 0) {
      setAnnErrors(nextErrors);
      return;
    }

    const chosen = ANNOUNCEMENT_TAG_OPTIONS[annTagIndex] || ANNOUNCEMENT_TAG_OPTIONS[0];
    onCreateAnnouncement({
      title: annTitle.trim(),
      tag: chosen.tag,
      theme: chosen.theme,
      detail: annDetail.trim(),
    });

    setAnnTitle('');
    setAnnDetail('');
    setAnnErrors({});
  };

  const showReports = adminTab === 'all' || adminTab === 'reports';
  const showPayments = adminTab === 'all' || adminTab === 'payments';
  const showAnnouncements = adminTab === 'all' || adminTab === 'announcements';

  const tabPills = [
    { id: 'all', label: 'ทั้งหมด' },
    {
      id: 'reports',
      label: `แจ้งซ่อม (${pendingReportsCount})`,
    },
    {
      id: 'payments',
      label: `ชำระเงิน (${pendingPaymentsCount})`,
    },
    { id: 'announcements', label: 'ประกาศ' },
  ];

  return (
    <div
      className={
        isDesktop
          ? 'space-y-6 animate-screen pb-8'
          : 'flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-5 animate-screen'
      }
    >
      {/* Top Welcome Banner + Quick Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#F96316] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3" />
            Admin Dashboard
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            ภาพรวมการจัดการหอพัก
          </h2>
          <p className="text-xs text-slate-500">
            {adminInfo.dormName} • {adminInfo.fullName}
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {tabPills.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectAdminTab?.(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                adminTab === tab.id
                  ? 'bg-[#F96316] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-200 hover:text-[#F96316]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Admin Overview (3 KPI Cards) */}
      <section aria-label="ภาพรวมหอพัก">
        <div
          className={
            isDesktop
              ? 'grid grid-cols-1 md:grid-cols-3 gap-4'
              : 'grid grid-cols-1 gap-3'
          }
        >
          {/* KPI 1: Pending Payment Verifications */}
          <button
            type="button"
            onClick={() => onSelectAdminTab?.('payments')}
            className="text-left bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:border-orange-200 hover:shadow-md transition-all flex items-center justify-between gap-3 cursor-pointer"
          >
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">
                ยอดรอตรวจสอบการชำระเงิน
              </p>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-bold text-slate-900 tabular-nums">
                  {pendingPaymentsCount}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  รายการ
                </span>
              </div>
              <p className="text-[11px] text-[#F96316] font-medium mt-1">
                {pendingPaymentsCount > 0
                  ? 'กดเพื่อตรวจสอบและอนุมัติ'
                  : 'ตรวจสอบครบทุกรายการแล้ว'}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/70 flex items-center justify-center shrink-0">
              <BadgeCheck className="w-6 h-6 text-[#F96316]" />
            </div>
          </button>

          {/* KPI 2: Pending Repair Reports */}
          <button
            type="button"
            onClick={() => onSelectAdminTab?.('reports')}
            className="text-left bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:border-orange-200 hover:shadow-md transition-all flex items-center justify-between gap-3 cursor-pointer"
          >
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">
                รายการแจ้งซ่อมรอดำเนินการ
              </p>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-bold text-slate-900 tabular-nums">
                  {pendingReportsCount}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  รายการ
                </span>
              </div>
              <p className="text-[11px] text-amber-600 font-medium mt-1">
                จากทั้งหมด {reports.length} รายการแจ้งซ่อม
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6 text-amber-600" />
            </div>
          </button>

          {/* KPI 3: Verified Residents */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">
                ผู้พักอาศัยที่ยืนยันตัวตนแล้ว
              </p>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-bold text-slate-900 tabular-nums">
                  {residentStats.verifiedRooms}
                </span>
                <span className="text-xs font-medium text-slate-500">ห้อง</span>
              </div>
              <p className="text-[11px] text-[#16A34A] font-medium mt-1">
                จากทั้งหมด {residentStats.totalRooms} ห้อง • อาคาร B
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-50 border border-green-200/70 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-[#22C55E]" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Manage Reports (จัดการรายการแจ้งซ่อม) */}
      {showReports && (
        <section className="space-y-3" aria-label="จัดการรายการแจ้งซ่อม">
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200/70 flex items-center justify-center">
                <Wrench className="w-4 h-4 text-[#F96316]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  จัดการรายการแจ้งซ่อม
                </h3>
                <p className="text-[11px] text-slate-500">
                  อัปเดตสถานะงานซ่อมแบบเรียลไทม์ถึงหน้านักศึกษา
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {[
                { id: 'all', label: 'ทั้งหมด' },
                { id: 'pending', label: 'รอดำเนินการ' },
                { id: 'success', label: 'เสร็จสิ้น' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setReportFilter(f.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                    reportFilter === f.id
                      ? 'bg-white text-[#F96316] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className={
              isDesktop ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-3'
            }
          >
            {filteredReports.map((report) => {
              const statusMeta =
                REPORT_STATUS_STYLE[report.status] ||
                REPORT_STATUS_STYLE.Pending;
              const isPending = report.status === 'Pending';
              const isInProgress = report.status === 'กำลังดำเนินการ';
              const isSuccess = report.status === 'Success';

              return (
                <div
                  key={report.id}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] flex flex-col justify-between space-y-3.5"
                >
                  <div className="space-y-2.5">
                    {/* Top meta row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F96316] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded-full">
                          <DoorOpen className="w-3 h-3" />
                          ห้อง {report.roomNo || 'B-402'}
                        </span>
                        <span className="text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200/70 px-2.5 py-0.5 rounded-full">
                          {report.category}
                        </span>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold border px-2.5 py-1 rounded-full shrink-0 ${statusMeta.className}`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${statusMeta.dot}`}
                        />
                        {statusMeta.label}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {report.title}
                      </h4>
                      {report.description && (
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          {report.description}
                        </p>
                      )}
                    </div>

                    {/* Reporter info */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        ผู้แจ้ง: {report.reporterName || 'นายชญานนท์ ใจดี'}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        แจ้งเมื่อ {report.createdAt}
                      </span>
                    </div>

                    {/* Student Rating & Comment (visible once rated!) */}
                    {isSuccess && report.rated && (
                      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-amber-900 inline-flex items-center gap-1">
                            <MessageSquareQuote className="w-3.5 h-3.5 text-amber-600" />
                            ผลประเมินจากนักศึกษา
                          </span>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3.5 h-3.5 ${
                                  star <= report.rating
                                    ? 'fill-[#EAB308] text-[#EAB308]'
                                    : 'text-amber-200'
                                }`}
                              />
                            ))}
                            <span className="text-[11px] font-bold text-amber-800 ml-1">
                              ({report.rating}/5)
                            </span>
                          </div>
                        </div>
                        {report.comment ? (
                          <p className="text-xs text-amber-950 leading-relaxed">
                            “{report.comment}”
                          </p>
                        ) : (
                          <p className="text-[11px] text-amber-700 italic">
                            นักศึกษาให้คะแนนความพึงพอใจโดยไม่ได้ระบุข้อความเพิ่มเติม
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Admin Status Action Buttons */}
                  <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    {isPending && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateReportStatus(report.id, 'กำลังดำเนินการ')
                          }
                          className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold transition cursor-pointer"
                        >
                          <PlayCircle className="w-4 h-4" />
                          รับเรื่อง / กำลังดำเนินการ
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateReportStatus(report.id, 'Success')
                          }
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F96316] hover:bg-[#ea580c] text-white text-xs font-bold shadow-xs transition cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Success
                        </button>
                      </>
                    )}

                    {isInProgress && (
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateReportStatus(report.id, 'Success')
                        }
                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F96316] hover:bg-[#ea580c] text-white text-xs font-bold shadow-sm shadow-orange-500/20 transition cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        ดำเนินการเสร็จสิ้น (Success)
                      </button>
                    )}

                    {isSuccess && (
                      <div className="w-full flex items-center justify-between text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1 text-[#16A34A] font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                          ปิดงานซ่อมเรียบร้อย
                        </span>
                        {!report.rated && (
                          <span className="text-[11px] text-slate-400">
                            รอนักศึกษาประเมินผล
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. Payment Verification (ตรวจสอบการชำระเงิน) */}
      {showPayments && (
        <section className="space-y-3" aria-label="ตรวจสอบการชำระเงิน">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200/70 flex items-center justify-center">
                <Receipt className="w-4 h-4 text-[#F96316]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  ตรวจสอบการชำระเงิน
                </h3>
                <p className="text-[11px] text-slate-500">
                  ตรวจสอบยอดโอนและกดอนุมัติเพื่ออัปเดตสถานะบิลให้นักศึกษา
                </p>
              </div>
            </div>
          </div>

          <div
            className={
              isDesktop ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-3'
            }
          >
            {sortedPayments.map((item) => {
              const isPending = item.status === 'รอตรวจสอบ';
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl p-4 sm:p-5 border shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] space-y-3 ${
                    isPending ? 'border-orange-200/90' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F96316] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded-full">
                          ห้อง {item.roomNo}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {item.method}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {item.month}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.studentName} ({item.studentId})
                      </p>
                    </div>

                    {isPending ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full shrink-0">
                        <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
                        รอตรวจสอบ
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#16A34A] bg-green-50 border border-green-200/80 px-2.5 py-1 rounded-full shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                        อนุมัติแล้ว
                      </span>
                    )}
                  </div>

                  <div className="bg-slate-50/90 border border-slate-100 rounded-2xl p-3 space-y-1.5 text-xs text-slate-700">
                    <div className="flex justify-between">
                      <span>ค่าน้ำ</span>
                      <span className="tabular-nums">
                        {formatBaht(item.water)} บาท
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>ค่าไฟ</span>
                      <span className="tabular-nums">
                        {formatBaht(item.electric)} บาท
                      </span>
                    </div>
                    <div className="border-t border-slate-200/80 pt-1.5 flex justify-between font-bold text-sm text-slate-900">
                      <span>ยอดชำระ</span>
                      <span className="text-[#F96316] tabular-nums">
                        {formatBaht(item.total)} บาท
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="text-[11px] text-slate-400">
                      <span>ชำระเมื่อ {item.paidDate}</span>
                      <span className="mx-1.5">•</span>
                      <span>Ref #{item.transactionId}</span>
                    </div>

                    {isPending && (
                      <button
                        type="button"
                        onClick={() => onApprovePayment(item.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F96316] hover:bg-[#ea580c] active:scale-95 text-white text-xs font-bold shadow-sm shadow-orange-500/20 transition cursor-pointer shrink-0"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        อนุมัติ (Approve)
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Manage Announcements (จัดการประกาศหอพัก) */}
      {showAnnouncements && (
        <section className="space-y-3" aria-label="จัดการประกาศหอพัก">
          <div className="flex items-center gap-2 px-1">
            <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200/70 flex items-center justify-center">
              <Megaphone className="w-4 h-4 text-[#F96316]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                จัดการประกาศหอพัก
              </h3>
              <p className="text-[11px] text-slate-500">
                โพสต์ประกาศใหม่เพื่อแสดงบนหน้าหลักของนักศึกษาทันที
              </p>
            </div>
          </div>

          <div
            className={
              isDesktop
                ? 'grid grid-cols-1 lg:grid-cols-5 gap-5 items-start'
                : 'space-y-4'
            }
          >
            {/* Create Announcement Form */}
            <form
              onSubmit={handlePublishAnnouncement}
              noValidate
              className={`bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] space-y-4 ${
                isDesktop ? 'lg:col-span-2' : ''
              }`}
            >
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                  หมวดหมู่ประกาศ
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ANNOUNCEMENT_TAG_OPTIONS.map((opt, idx) => (
                    <button
                      key={opt.tag}
                      type="button"
                      onClick={() => setAnnTagIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                        annTagIndex === idx
                          ? 'bg-orange-50 text-[#F96316] border border-[#F96316]'
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {opt.tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                  หัวข้อประกาศ
                </label>
                <input
                  type="text"
                  value={annTitle}
                  onChange={(e) => {
                    setAnnTitle(e.target.value);
                    if (annErrors.title) {
                      setAnnErrors((prev) => ({ ...prev, title: '' }));
                    }
                  }}
                  placeholder="เช่น แจ้งกำหนดการตรวจเช็กเครื่องปรับอากาศ"
                  className={`w-full px-4 py-3 rounded-2xl bg-slate-50 border text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white transition-all ${
                    annErrors.title
                      ? 'border-[#EF4444] focus:ring-4 focus:ring-red-500/15'
                      : 'border-slate-200 focus:border-[#F96316] focus:ring-4 focus:ring-[#F96316]/12'
                  }`}
                />
                {annErrors.title && (
                  <p className="mt-1.5 ml-1 flex items-center gap-1 text-xs font-medium text-[#EF4444]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {annErrors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                  รายละเอียด
                </label>
                <textarea
                  rows={4}
                  value={annDetail}
                  onChange={(e) => {
                    setAnnDetail(e.target.value);
                    if (annErrors.detail) {
                      setAnnErrors((prev) => ({ ...prev, detail: '' }));
                    }
                  }}
                  placeholder="พิมพ์รายละเอียดประกาศ วันเวลา และข้อปฏิบัติสำหรับนักศึกษา..."
                  className={`w-full px-4 py-3 rounded-2xl bg-slate-50 border text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white transition-all resize-none ${
                    annErrors.detail
                      ? 'border-[#EF4444] focus:ring-4 focus:ring-red-500/15'
                      : 'border-slate-200 focus:border-[#F96316] focus:ring-4 focus:ring-[#F96316]/12'
                  }`}
                />
                {annErrors.detail && (
                  <p className="mt-1.5 ml-1 flex items-center gap-1 text-xs font-medium text-[#EF4444]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {annErrors.detail}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#F96316] hover:bg-[#ea580c] active:scale-[0.98] text-white text-sm font-bold shadow-md shadow-orange-500/20 transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                โพสต์ประกาศหอพัก
              </button>
            </form>

            {/* Published Announcements List */}
            <div
              className={`bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] space-y-3 ${
                isDesktop ? 'lg:col-span-3' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">
                  ประกาศที่เผยแพร่อยู่ ({announcements.length})
                </h4>
                <span className="text-[11px] font-medium text-slate-400">
                  แสดงบนหน้าหลักนักศึกษา
                </span>
              </div>

              <div className="space-y-2.5">
                {announcements.map((ann, idx) => (
                  <div
                    key={ann.id}
                    className={`rounded-2xl p-3.5 border transition-colors ${
                      idx === 0
                        ? 'bg-orange-50/50 border-orange-200/80'
                        : 'bg-slate-50/80 border-slate-100'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-[#F96316] bg-white border border-orange-200/80 px-2 py-0.5 rounded-full">
                          {ann.tag}
                        </span>
                        {idx === 0 && (
                          <span className="text-[10px] font-bold text-[#16A34A] bg-green-50 border border-green-200/80 px-2 py-0.5 rounded-full">
                            ล่าสุด
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {ann.date}
                      </span>
                    </div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                      {ann.title}
                    </h5>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {ann.brief}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
