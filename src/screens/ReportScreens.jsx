import React, { useState } from 'react';
import {
  Plus,
  CheckCircle2,
  Star,
  Upload,
  FileCheck,
  HeartHandshake,
  AlertCircle,
  Wrench,
} from 'lucide-react';
import { useViewMode } from '../context/ViewModeContext';

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 ml-1 flex items-center gap-1.5 text-xs font-medium text-[#EF4444] animate-error">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

const inputBaseClass =
  'w-full px-4 py-3 rounded-2xl bg-slate-50 border text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white transition-all duration-200';

const getInputStateClass = (hasError) =>
  hasError
    ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-4 focus:ring-red-500/15'
    : 'border-slate-200 focus:border-[#F96316] focus:ring-4 focus:ring-[#F96316]/12';

export function ReportStatusScreen({
  reports,
  onGoReportForm,
  onGoRateReport,
}) {
  const { isDesktop } = useViewMode();

  return (
    <div
      className={
        isDesktop
          ? 'space-y-5 animate-screen'
          : 'flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-4 animate-screen'
      }
    >
      {/* Header + Prominent + รายงานปัญหา Button */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-bold text-slate-900">Your Report</h2>
        <button
          type="button"
          onClick={onGoReportForm}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#F96316] hover:bg-[#ea580c] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-white text-xs md:text-sm font-bold shadow-sm shadow-orange-500/25 hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          รายงานปัญหา
        </button>
      </div>

      {/* Report Cards */}
      <div
        className={
          isDesktop ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'
        }
      >
        {reports.map((report) => {
          const isSuccess = report.status === 'Success';
          const isInProgress = report.status === 'กำลังดำเนินการ';
          return (
            <div
              key={report.id}
              className="bg-white rounded-3xl p-4 md:p-5 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_28px_-6px_rgba(15,23,42,0.09)] hover:border-slate-300/80 transition-all duration-200 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="inline-block text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200/70 px-2.5 py-0.5 rounded-full mb-1.5">
                      {report.category}
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-slate-900 leading-snug">
                      {report.title}
                    </h3>
                  </div>

                  {/* Status Indicator */}
                  {isSuccess ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#16A34A] bg-green-50 border border-green-200/80 px-2.5 py-1 rounded-full shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                      Success
                    </span>
                  ) : isInProgress ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200/80 px-2.5 py-1 rounded-full shrink-0">
                      <Wrench className="w-3 h-3 text-sky-600" />
                      กำลังดำเนินการ
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full shrink-0">
                      <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
                      Pending
                    </span>
                  )}
                </div>

                {report.description && (
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {report.description}
                  </p>
                )}

                {isSuccess && report.rated && report.comment && (
                  <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl px-3 py-2 text-xs text-amber-900">
                    <span className="font-semibold">ความคิดเห็นของคุณ: </span>
                    <span>{report.comment}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                <span className="text-[11px] text-slate-400">
                  แจ้งเมื่อ {report.createdAt}
                </span>

                {isSuccess && !report.rated && (
                  <button
                    type="button"
                    onClick={() => onGoRateReport(report.id)}
                    className="px-4 py-1.5 rounded-xl bg-[#EAB308] hover:bg-amber-400 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-slate-950 font-bold text-xs shadow-xs transition-all duration-200 cursor-pointer"
                  >
                    ประเมิน
                  </button>
                )}

                {isSuccess && report.rated && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/70 px-2.5 py-1 rounded-xl">
                    <Star className="w-3.5 h-3.5 fill-[#EAB308] text-[#EAB308]" />
                    ประเมินแล้ว ({report.rating}/5)
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ReportFormScreen({ onSubmitReport }) {
  const { isDesktop } = useViewMode();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('ไฟฟ้า');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!title.trim()) {
      nextErrors.title = 'กรุณากรอกหัวข้อปัญหา';
    }
    if (!description.trim()) {
      nextErrors.description = 'กรุณากรอกรายละเอียดปัญหาที่พบ';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    onSubmitReport({
      title: title.trim(),
      category,
      description: description.trim(),
      fileName,
    });
  };

  return (
    <div
      className={
        isDesktop
          ? 'max-w-2xl mx-auto w-full animate-screen'
          : 'flex-1 overflow-y-auto no-scrollbar px-4 py-4 animate-screen'
      }
    >
      <h2 className="text-xl font-bold text-slate-900 px-1 mb-4">แจ้งปัญหา</h2>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)]"
      >
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">
            หัวข้อ <span className="text-[#EF4444]">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) {
                setErrors((prev) => ({ ...prev, title: '' }));
              }
            }}
            placeholder="เช่น ก๊อกน้ำรั่ว, แอร์ไม่เย็น"
            className={`${inputBaseClass} ${getInputStateClass(Boolean(errors.title))}`}
          />
          <FieldError message={errors.title} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">
            ประเภทปัญหา
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${inputBaseClass} ${getInputStateClass(false)} cursor-pointer`}
          >
            <option value="ไฟฟ้า">ไฟฟ้า</option>
            <option value="ประปา">ประปา</option>
            <option value="เครื่องปรับอากาศ">เครื่องปรับอากาศ</option>
            <option value="อื่นๆ">อื่นๆ</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">
            รายละเอียดปัญหา <span className="text-[#EF4444]">*</span>
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) {
                setErrors((prev) => ({ ...prev, description: '' }));
              }
            }}
            placeholder="อธิบายอาการหรือตำแหน่งที่พบปัญหา..."
            className={`${inputBaseClass} resize-none ${getInputStateClass(Boolean(errors.description))}`}
          />
          <FieldError message={errors.description} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">
            อัปโหลดไฟล์ (ไม่จำเป็น)
          </label>
          <label className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 text-slate-600 text-xs font-medium hover:border-[#F96316] hover:text-[#F96316] hover:bg-orange-50/30 transition-all duration-200 cursor-pointer">
            {fileName ? (
              <>
                <FileCheck className="w-4 h-4 text-[#22C55E]" />
                <span className="truncate text-slate-800 font-semibold">
                  {fileName}
                </span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>เลือกรูปภาพหรือไฟล์แนบ</span>
              </>
            )}
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-[#F96316] hover:bg-[#ea580c] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-white font-semibold text-base shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 cursor-pointer"
        >
          ยืนยัน
        </button>
      </form>
    </div>
  );
}

export function ServiceRatingScreen({ report, onSubmitRating }) {
  const { isDesktop } = useViewMode();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitRating(report?.id, rating, comment);
  };

  return (
    <div
      className={
        isDesktop
          ? 'max-w-lg mx-auto w-full py-4 flex flex-col space-y-6 animate-screen'
          : 'flex-1 overflow-y-auto no-scrollbar px-5 py-6 flex flex-col justify-between animate-screen'
      }
    >
      <div className="space-y-6 my-auto">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">Rate the service</h2>
          {report && (
            <p className="text-xs text-slate-500">
              รายการ:{' '}
              <span className="font-semibold text-slate-700">{report.title}</span>
            </p>
          )}
        </div>

        {/* Interactive 5-Star Picker */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] flex flex-col items-center space-y-3">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = star <= rating;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  aria-label={`ให้คะแนน ${star} ดาว`}
                  className="p-1 hover:scale-110 active:scale-90 transition-transform duration-150 cursor-pointer"
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      active
                        ? 'fill-[#EAB308] text-[#F96316]'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <p className="text-xs font-semibold text-[#F96316]">
            คะแนนที่เลือก: {rating} / 5 ดาว
          </p>
        </div>

        {/* Comment Box */}
        <form
          id="rating-form"
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">
              Comment
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="แสดงความคิดเห็นเพิ่มเติมเกี่ยวกับการซ่อมแซม..."
              className={`${inputBaseClass} resize-none ${getInputStateClass(false)}`}
            />
          </div>
        </form>
      </div>

      <button
        type="submit"
        form="rating-form"
        className="w-full mt-6 py-3.5 rounded-2xl bg-[#F96316] hover:bg-[#ea580c] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-white font-semibold text-base shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 cursor-pointer"
      >
        Submit
      </button>
    </div>
  );
}

export function FeedbackConfirmationScreen({ onBackHome }) {
  const { isDesktop } = useViewMode();

  return (
    <div
      className={
        isDesktop
          ? 'max-w-md mx-auto w-full py-12 flex flex-col items-center text-center space-y-6 animate-screen'
          : 'flex-1 flex flex-col items-center justify-between px-6 py-8 text-center animate-screen'
      }
    >
      <div className="my-auto space-y-4 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shadow-xs">
          <HeartHandshake className="w-10 h-10 text-[#22C55E]" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Thank you for your feedback!
        </h2>
        <p className="text-sm text-slate-500 max-w-[260px]">
          ขอบคุณสำหรับความคิดเห็น เราจะนำไปพัฒนาการบริการให้ดียิ่งขึ้น
        </p>
      </div>

      <button
        type="button"
        onClick={onBackHome}
        className="w-full py-3.5 rounded-2xl bg-[#F96316] hover:bg-[#ea580c] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-white font-semibold text-base shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 cursor-pointer"
      >
        กลับไปหน้าหลัก
      </button>
    </div>
  );
}
