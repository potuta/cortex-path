import type { SVGProps } from 'react';

interface CortexIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Cortex AI assistant icon — hexagonal neural-network node pattern.
 * Uses currentColor so it inherits text color from parent.
 */
export function CortexIcon({ size = 24, className, ...props }: CortexIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Outer hint ring — dashed orbital */}
      <circle
        cx="16" cy="16" r="13"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeDasharray="2 3"
        opacity="0.22"
      />

      {/* 6 satellite nodes at hexagon vertices (orbit radius 12) */}
      <circle cx="16"   cy="4"   r="1.8" fill="currentColor" opacity="0.62" />
      <circle cx="26.4" cy="10"  r="1.8" fill="currentColor" opacity="0.62" />
      <circle cx="26.4" cy="22"  r="1.8" fill="currentColor" opacity="0.62" />
      <circle cx="16"   cy="28"  r="1.8" fill="currentColor" opacity="0.62" />
      <circle cx="5.6"  cy="22"  r="1.8" fill="currentColor" opacity="0.62" />
      <circle cx="5.6"  cy="10"  r="1.8" fill="currentColor" opacity="0.62" />

      {/* Spoke lines: from center-node edge to near each satellite */}
      <line x1="16"   y1="11.6" x2="16"   y2="5.8"  stroke="currentColor" strokeWidth="0.9" opacity="0.38" />
      <line x1="19.6" y1="13.8" x2="24.8" y2="10.8" stroke="currentColor" strokeWidth="0.9" opacity="0.38" />
      <line x1="19.6" y1="18.2" x2="24.8" y2="21.2" stroke="currentColor" strokeWidth="0.9" opacity="0.38" />
      <line x1="16"   y1="20.4" x2="16"   y2="26.2" stroke="currentColor" strokeWidth="0.9" opacity="0.38" />
      <line x1="12.4" y1="18.2" x2="7.2"  y2="21.2" stroke="currentColor" strokeWidth="0.9" opacity="0.38" />
      <line x1="12.4" y1="13.8" x2="7.2"  y2="10.8" stroke="currentColor" strokeWidth="0.9" opacity="0.38" />

      {/* Center core — outer glow halo + solid fill */}
      <circle cx="16" cy="16" r="5.8" fill="currentColor" opacity="0.12" />
      <circle cx="16" cy="16" r="4.2" fill="currentColor" />
    </svg>
  );
}
