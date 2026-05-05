'use client';

import Image from 'next/image';
import Link from 'next/link';

type BrandLogoProps = {
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
};

export function BrandLogo({ href, size = 'md', className = '', showText = true }: BrandLogoProps) {
  const dims = {
    sm: { px: 24, imgCls: 'h-6 w-6',  textCls: 'text-xs'  },
    md: { px: 32, imgCls: 'h-8 w-8',  textCls: 'text-sm'  },
    lg: { px: 44, imgCls: 'h-11 w-11', textCls: 'text-xl' },
  }[size];

  const inner = (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon — white pill keeps the PNG white bg looking intentional in dark mode */}
      <span className="flex shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-sm ring-1 ring-black/8 dark:bg-zinc-900 dark:ring-white/10">
        <Image
          src="/logo.png"
          alt="CortexPath logo"
          width={dims.px}
          height={dims.px}
          className={`${dims.imgCls} object-contain`}
          priority
        />
      </span>

      {showText && (
        <span
          className={`font-mono font-bold tracking-tight ${dims.textCls} bg-gradient-to-r from-cx-teal to-cx-lime bg-clip-text text-transparent`}
        >
          CortexPath
        </span>
      )}
    </span>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }
  return inner;
}
