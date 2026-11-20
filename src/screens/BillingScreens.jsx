import React, { useEffect, useState } from 'react';
import {
  QrCode,
  ChevronRight,
  Loader2,
  CheckCircle2,
  Receipt,
  Droplets,
  Zap,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import { MOBILE_BANKS, PROMPTPAY_INFO, formatBaht } from '../data/mockData';
import { useViewMode } from '../context/ViewModeContext';

export function PaymentScreen({
  user,
  unpaidBills,
  onProceedToMethod,
  onGoHistory,
}) {
  const { isDesktop } = useViewMode();
  const totalAmount = unpaidBills.reduce((sum, b) => sum + b.total, 0);

  const emptyState = (
    <div
      className={`bg-white rounded-3xl p-6 text-center border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] space-y-3 mt-4 ${
        isDesktop ? 'max-w-lg mx-auto p-8' : ''
      }`}
    >
      <div className="w-14 h-14 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8 text-[#22C55E]" />
      </div>
      <h3 className="text-base font-bold text-slate-900">
        ไม่มีค่าบริการค้างชำระ
      </h3>
      <p className="text-xs text-slate-500">
        คุณได้ชำระค่าบริการหอพักครบถ้วนแล้ว
      </p>
      <button
        type="button"
        onClick={onGoHistory}
        className="mt-2 px-5 py-2.5 rounded-2xl bg-[#F96316] text-white text-sm font-semibold hover:bg-[#ea580c] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-sm shadow-orange-500/20 transition-all duration-200 cursor-pointer"
      >
        ดูประวัติการชำระเงิน
      </button>
    </div>
  );

  const renderBillCard = (bill) => (
    <div
      key={bill.id}
      className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_28px_-6px_rgba(15,23,42,0.09)] hover:border-orange-200/80 transition-all duration-200 space-y-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900">{bill.month}</h3>
          {bill.dueDate && (
            <p className="text-[11px] text-slate-400 mt-0.5">{bill.dueDate}</p>
          )}
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 shrink-0">
          รอชำระ
        </span>
      </div>

      <div className="bg-slate-50/90 border border-slate-100 rounded-2xl p-3.5 space-y-2 text-sm">
        <div className="flex items-center justify-between text-slate-700">
          <span className="flex items-center gap-1.5">
            <Droplets className="w-4 h-4 text-sky-500" />
            <span>
              ค่าน้ำ{' '}
              {bill.waterUnits ? (
                <span className="text-[11px] text-slate-400">
                  ({bill.waterUnits} หน่วย)
                </span>
              ) : null}
            </span>
          </span>
          <span className="font-medium tabular-nums">
            {formatBaht(bill.water)} บาท
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-700">
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>
              ค่าไฟ{' '}
              {bill.electricUnits ? (
                <span className="text-[11px] text-slate-400">
                  ({bill.electricUnits} หน่วย)
                </span>
              ) : null}
            </span>
          </span>
          <span className="font-medium tabular-nums">
            {formatBaht(bill.electric)} บาท
          </span>
        </div>
        <div className="border-t border-slate-200/80 pt-2 flex items-center justify-between font-bold text-slate-900">
          <span>รวม</span>
          <span className="text-[#F96316] tabular-nums">
            {formatBaht(bill.total)} บาท
          </span>
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <div className="space-y-5 animate-screen">
        <div className="flex flex-wrap items-end justify-between gap-2 px-1">
          <div>
            <p className="text-xs font-medium text-slate-500">
              ผู้ใช้งาน: {user.fullName} • {user.roomDisplay}
            </p>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              ค่าบริการทั้งหมด
            </h2>
          </div>
        </div>

        {unpaidBills.length === 0 ? (
          emptyState
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left: 2-Column Grid of Monthly Bills */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {unpaidBills.map(renderBillCard)}
            </div>

            {/* Right: Orange Summary Box */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#F96316] to-[#ea580c] text-white rounded-3xl p-6 shadow-lg shadow-orange-500/25 space-y-4">
                <div>
                  <p className="text-xs text-white/85">
                    สรุปยอดค้างชำระ ({unpaidBills.length} รายการ)
                  </p>
                  <p className="text-sm text-white/95 mt-2">ยอดชำระทั้งหมด:</p>
                  <p className="text-2xl font-bold tracking-tight mt-0.5 tabular-nums">
                    {formatBaht(totalAmount)} บาท
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onProceedToMethod}
                  className="w-full py-3.5 rounded-2xl bg-white text-[#F96316] font-bold text-sm shadow-sm hover:bg-orange-50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  ชำระเงิน
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 animate-screen">
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-4">
        <div className="px-1">
          <p className="text-xs font-medium text-slate-500">
            ผู้ใช้งาน • {user.roomNo}
          </p>
          <p className="text-base font-bold text-slate-900">{user.fullName}</p>
          <h2 className="text-lg font-bold text-slate-900 mt-3">
            ค่าบริการทั้งหมด
          </h2>
        </div>

        {unpaidBills.length === 0 ? (
          emptyState
        ) : (
          <div className="space-y-3">{unpaidBills.map(renderBillCard)}</div>
        )}
      </div>

      {/* Bottom Orange Summary Box */}
      {unpaidBills.length > 0 && (
        <div className="p-4 pt-2 bg-[#F8FAFC] shrink-0">
          <div className="bg-gradient-to-r from-[#F96316] to-[#ea580c] text-white rounded-3xl p-4 shadow-lg shadow-orange-500/25 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-white/90">ยอดชำระทั้งหมด:</p>
              <p className="text-xl font-bold tracking-tight tabular-nums">
                {formatBaht(totalAmount)} บาท
              </p>
            </div>
            <button
              type="button"
              onClick={onProceedToMethod}
              className="px-7 py-3 rounded-2xl bg-white text-[#F96316] font-bold text-sm shadow-sm hover:bg-orange-50 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
            >
              ชำระ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function PaymentMethodScreen({ onSelectMethod }) {
  const { isDesktop } = useViewMode();

  return (
    <div
      className={
        isDesktop
          ? 'max-w-2xl mx-auto w-full space-y-5 animate-screen'
          : 'flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-5 animate-screen'
      }
    >
      <h2 className="text-xl font-bold text-slate-900 px-1">
        เลือกวิธีการชำระเงิน
      </h2>

      {/* Option 1: PromptPay QR */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1">
          QR Payment
        </p>
        <button
          type="button"
          onClick={() => onSelectMethod('PromptPay QR')}
          className="w-full bg-white rounded-2xl p-4 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] flex items-center justify-between hover:border-[#F96316] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#003D6B] text-white flex items-center justify-center shadow-xs">
              <QrCode className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">PromptPay QR</p>
              <p className="text-xs text-slate-500">
                สแกนจ่ายได้ทุกแอปธนาคาร
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* Option 2: Mobile Banking */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1">
          Mobile Banking
        </p>
        <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] divide-y divide-slate-100 overflow-hidden">
          {MOBILE_BANKS.map((bank) => (
            <button
              key={bank.id}
              type="button"
              onClick={() => onSelectMethod(`Mobile Banking (${bank.name})`)}
              className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-orange-50/40 active:bg-slate-100 transition-colors duration-150 cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs shadow-xs shrink-0"
                  style={{
                    backgroundColor: bank.color,
                    color: bank.textColor,
                  }}
                >
                  {bank.short}
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  {bank.name}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function QrPaymentScreen({
  totalAmount,
  selectedMethod,
  onConfirmPayment,
  onCopyAccount,
}) {
  const { isDesktop } = useViewMode();
  // Start at 14:59 = 899 seconds
  const [secondsLeft, setSecondsLeft] = useState(14 * 60 + 59);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  const handleCopy = () => {
    try {
      navigator.clipboard?.writeText(PROMPTPAY_INFO.accountNumber);
    } catch {
      // Ignore clipboard permission errors in restricted contexts
    }
    setCopied(true);
    onCopyAccount?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={
        isDesktop
          ? 'max-w-md mx-auto w-full py-4 flex flex-col items-center space-y-5 animate-screen'
          : 'flex-1 overflow-y-auto no-scrollbar px-5 py-5 flex flex-col items-center justify-between animate-screen'
      }
    >
      <div className="w-full text-center space-y-1">
        <h2 className="text-xl font-bold text-slate-900">Prompt Pay QR</h2>
        <p className="text-xs text-slate-500">ช่องทาง: {selectedMethod}</p>
      </div>

      {/* Large QR Code Card */}
      <div className="w-full max-w-[320px] bg-white rounded-3xl p-5 border border-slate-200 shadow-[0_8px_30px_-6px_rgba(15,23,42,0.08)] flex flex-col items-center space-y-4 my-4">
        <div className="w-full py-1.5 rounded-xl bg-[#003D6B] text-white text-center text-xs font-bold tracking-wider">
          THAI QR PAYMENT • PROMPTPAY
        </div>

        {/* Crisp SVG QR Pattern */}
        <div className="p-3 bg-white border-2 border-slate-100 rounded-2xl">
          <svg
            viewBox="0 0 120 120"
            className="w-44 h-44 text-slate-900"
            aria-label="PromptPay QR Code"
          >
            {/* Top-left finder */}
            <rect x="6" y="6" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="5" />
            <rect x="15" y="15" width="12" height="12" rx="2" fill="currentColor" />
            {/* Top-right finder */}
            <rect x="84" y="6" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="5" />
            <rect x="93" y="15" width="12" height="12" rx="2" fill="currentColor" />
            {/* Bottom-left finder */}
            <rect x="6" y="84" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="5" />
            <rect x="15" y="93" width="12" height="12" rx="2" fill="currentColor" />

            {/* Data modules */}
            <rect x="44" y="8" width="7" height="7" fill="currentColor" />
            <rect x="58" y="8" width="7" height="7" fill="currentColor" />
            <rect x="70" y="14" width="7" height="7" fill="currentColor" />
            <rect x="44" y="22" width="14" height="7" fill="currentColor" />
            <rect x="65" y="28" width="12" height="7" fill="currentColor" />

            <rect x="8" y="44" width="7" height="14" fill="currentColor" />
            <rect x="22" y="44" width="14" height="7" fill="currentColor" />
            <rect x="44" y="44" width="7" height="7" fill="currentColor" />
            <rect x="58" y="44" width="14" height="7" fill="currentColor" />
            <rect x="80" y="44" width="7" height="14" fill="currentColor" />
            <rect x="94" y="44" width="18" height="7" fill="currentColor" />

            <rect x="14" y="64" width="14" height="7" fill="currentColor" />
            <rect x="35" y="58" width="7" height="14" fill="currentColor" />
            <rect x="50" y="58" width="14" height="14" rx="2" fill="#F96316" />
            <rect x="72" y="62" width="12" height="7" fill="currentColor" />
            <rect x="94" y="58" width="7" height="14" fill="currentColor" />
            <rect x="106" y="64" width="7" height="7" fill="currentColor" />

            <rect x="44" y="84" width="7" height="14" fill="currentColor" />
            <rect x="58" y="84" width="14" height="7" fill="currentColor" />
            <rect x="80" y="84" width="7" height="7" fill="currentColor" />
            <rect x="94" y="84" width="18" height="7" fill="currentColor" />
            <rect x="58" y="98" width="7" height="14" fill="currentColor" />
            <rect x="72" y="98" width="14" height="14" fill="currentColor" />
            <rect x="94" y="98" width="7" height="14" fill="currentColor" />
            <rect x="106" y="98" width="7" height="14" fill="currentColor" />
          </svg>
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-500">ยอดที่ต้องชำระ</p>
          <p className="text-xl font-bold text-[#F96316] tabular-nums">
            {formatBaht(totalAmount)} บาท
          </p>
        </div>

        {/* Copy Account Number Box */}
        <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-3.5 py-2.5 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] text-slate-400 truncate">
              {PROMPTPAY_INFO.bankName}
            </p>
            <p className="text-xs font-bold text-slate-800 tracking-wide">
              {PROMPTPAY_INFO.accountNumber}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-[#F96316] hover:text-[#F96316] text-[11px] font-semibold text-slate-700 shadow-xs active:scale-95 transition-all duration-150 cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                <span className="text-[#22C55E]">คัดลอกแล้ว</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>คัดลอก</span>
              </>
            )}
          </button>
        </div>

        <div className="w-full py-2 px-3 rounded-2xl bg-orange-50 border border-orange-200/80 text-center">
          <p className="text-xs font-semibold text-[#F96316] tabular-nums">
            ระยะเวลาที่เหลือ : {mins}:{secs}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onConfirmPayment}
        className="w-full py-3.5 rounded-2xl bg-[#F96316] hover:bg-[#ea580c] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-white font-semibold text-base shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 cursor-pointer"
      >
        ยืนยันการชำระเงิน
      </button>
    </div>
  );
}

export function PaymentVerificationScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center animate-screen">
      <div className="w-20 h-20 rounded-full bg-orange-50 border border-orange-200/70 flex items-center justify-center mb-5 shadow-sm">
        <Loader2 className="w-10 h-10 text-[#F96316] animate-spin" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">รอตรวจสอบ</h2>
      <p className="text-xs text-slate-500 mt-2">
        ระบบกำลังตรวจสอบรายการชำระเงินของคุณ...
      </p>
    </div>
  );
}

export function PaymentSuccessScreen({ receipt, onBackHome }) {
  const { isDesktop } = useViewMode();

  return (
    <div
      className={
        isDesktop
          ? 'max-w-md mx-auto w-full py-6 flex flex-col space-y-6 animate-screen'
          : 'flex-1 overflow-y-auto no-scrollbar px-5 py-6 flex flex-col justify-between animate-screen'
      }
    >
      <div className="space-y-5 my-auto">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mb-3 shadow-xs">
            <CheckCircle2 className="w-10 h-10 text-[#22C55E]" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">ส่งรายการชำระเงินแล้ว</h2>
          <p className="text-xs text-slate-500 mt-1">
            รอผู้ดูแลหอพักตรวจสอบและอนุมัติรายการ
          </p>
        </div>

        {/* Receipt Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] space-y-4">
          <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3">
            <span className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Receipt className="w-4 h-4 text-[#F96316]" />
              ใบเสร็จรับเงิน
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#22C55E]">
              <Sparkles className="w-3.5 h-3.5" /> สำเร็จ
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Date:</span>
              <span className="font-semibold text-slate-900">{receipt.date}</span>
            </div>
            <div className="flex justify-between">
              <span>Transaction ID:</span>
              <span className="font-semibold text-slate-900">
                {receipt.transactionId}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-slate-700">
              <span>ค่าน้ำ</span>
              <span className="tabular-nums">{formatBaht(receipt.water)} บาท</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>ค่าไฟ</span>
              <span className="tabular-nums">{formatBaht(receipt.electric)} บาท</span>
            </div>
            <div className="border-t border-slate-200 pt-2.5 flex justify-between font-bold text-base text-slate-900">
              <span>รวม</span>
              <span className="text-[#F96316] tabular-nums">
                {formatBaht(receipt.total)} บาท
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onBackHome}
        className="w-full mt-5 py-3.5 rounded-2xl bg-[#F96316] hover:bg-[#ea580c] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-white font-semibold text-base shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 cursor-pointer"
      >
        กลับไปหน้าแรก
      </button>
    </div>
  );
}

export function PaymentHistoryScreen({ history }) {
  const { isDesktop } = useViewMode();

  return (
    <div
      className={
        isDesktop
          ? 'space-y-5 animate-screen'
          : 'flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-4 animate-screen'
      }
    >
      <h2 className="text-xl font-bold text-slate-900 px-1">
        ประวัติการจ่ายค่าบริการ
      </h2>

      <div
        className={
          isDesktop ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'
        }
      >
        {history.map((item) => {
          const isPending = item.status === 'รอตรวจสอบ';
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_28px_-6px_rgba(15,23,42,0.09)] hover:border-slate-300/80 transition-all duration-200 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900">{item.month}</h3>
                {isPending ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
                    {item.status}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16A34A] bg-green-50 border border-green-200/80 px-2.5 py-1 rounded-full shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    {item.status}
                  </span>
                )}
              </div>

            <div className="bg-slate-50/90 border border-slate-100 rounded-2xl p-3 space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>ค่าน้ำ</span>
                <span className="tabular-nums">{formatBaht(item.water)} บาท</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าไฟ</span>
                <span className="tabular-nums">{formatBaht(item.electric)} บาท</span>
              </div>
              <div className="border-t border-slate-200/80 pt-1.5 flex justify-between font-bold text-sm text-slate-900">
                <span>ยอดรวม</span>
                <span className="tabular-nums">{formatBaht(item.total)} บาท</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>ชำระเมื่อ: {item.paidDate}</span>
              <span>Ref: #{item.transactionId}</span>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
