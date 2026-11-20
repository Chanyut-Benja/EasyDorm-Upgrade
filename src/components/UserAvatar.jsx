import React from 'react';

export default function UserAvatar({ size = 'md', className = '' }) {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-11 h-11',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  return (
    <div
      className={`rounded-2xl bg-gradient-to-br from-orange-100 via-amber-50 to-orange-200 border border-orange-200/80 overflow-hidden flex items-center justify-center shadow-xs shrink-0 ${
        sizeClasses[size] || sizeClasses.md
      } ${className}`}
    >
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="รูปโปรไฟล์นักศึกษา"
      >
        <defs>
          <linearGradient id="avatarBg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF7ED" />
            <stop offset="100%" stopColor="#FED7AA" />
          </linearGradient>
          <linearGradient id="shirtGrad" x1="16" y1="54" x2="64" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F96316" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>
        <rect width="80" height="80" fill="url(#avatarBg)" />
        {/* Shoulders / Student Polo */}
        <path
          d="M14 80C14 63.4315 25.6406 54 40 54C54.3594 54 66 63.4315 66 80H14Z"
          fill="url(#shirtGrad)"
        />
        {/* Collar */}
        <path d="M33 54L40 62L47 54H33Z" fill="#FFFFFF" opacity="0.92" />
        {/* Neck */}
        <rect x="35" y="45" width="10" height="11" rx="4" fill="#FDBA74" />
        {/* Ears */}
        <circle cx="24" cy="34" r="4" fill="#FDBA74" />
        <circle cx="56" cy="34" r="4" fill="#FDBA74" />
        {/* Face */}
        <rect x="25" y="19" width="30" height="30" rx="14" fill="#FED7AA" />
        {/* Hair */}
        <path
          d="M24 31C24 20.5 31 14 40 14C49 14 56 20.5 56 31C56 27 52.5 23 47 22.5C43 22 39 24 33 23.5C28 23 25 27 24 31Z"
          fill="#1E293B"
        />
        {/* Eyes */}
        <circle cx="34" cy="34" r="2" fill="#1E293B" />
        <circle cx="46" cy="34" r="2" fill="#1E293B" />
        {/* Eyebrows */}
        <path d="M31 30.5C32.5 29.5 35.5 29.5 37 30.5" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M43 30.5C44.5 29.5 47.5 29.5 49 30.5" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
        {/* Warm Smile */}
        <path
          d="M35.5 40.5C37 42.5 43 42.5 44.5 40.5"
          stroke="#9A3412"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
