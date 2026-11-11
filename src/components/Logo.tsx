import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  isArabic?: boolean;
  variant?: 'full' | 'mark-only';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = false,
  isArabic = false,
  variant = 'full',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      {/* Bespoke Logo Mark in Egyptian Forest/Emerald Green */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl bg-emerald-800 text-emerald-50 shadow-sm shrink-0 p-1.5`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Subtle architectural roof silhouette representing 'Beyti' (My Home) */}
          <path
            d="M8 22L24 8L40 22"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-300"
          />

          {/* Egyptian clay pot / cooking vessel base */}
          <path
            d="M12 26C12 35 17 39 24 39C31 39 36 35 36 26H12Z"
            fill="currentColor"
            className="text-emerald-500"
          />

          {/* Steaming dish rim & lid contour */}
          <path
            d="M10 25H38"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            className="text-emerald-200"
          />

          {/* Three gentle aromatic steam curls rising */}
          <path
            d="M20 18C19.5 15.5 21 14 20 12"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="text-emerald-100 opacity-90"
          />
          <path
            d="M24 19C23.5 16.5 25 15 24 13"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            className="text-emerald-100"
          />
          <path
            d="M28 18C27.5 15.5 29 14 28 12"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="text-emerald-100 opacity-90"
          />
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-baseline gap-2 whitespace-nowrap">
            <span
              className={`font-bold tracking-tight text-neutral-900 ${titleSizes[size]}`}
              style={{ fontFamily: "var(--font-latin)" }}
            >
              Beyti
            </span>
            <span
              className={`font-bold text-emerald-800 ${titleSizes[size]}`}
              style={{ fontFamily: "var(--font-arabic)" }}
            >
              بيتي
            </span>
          </div>

          {showSubtitle && (
            <span className="text-[11px] font-medium text-neutral-500 tracking-tight mt-0.5 whitespace-nowrap">
              {isArabic ? 'أكل بيتي مصري للشركات' : 'Homemade Egyptian Food for Businesses'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
