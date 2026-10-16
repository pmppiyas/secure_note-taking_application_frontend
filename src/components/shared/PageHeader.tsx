'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface PageHeaderProps {
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  badge?: string;
  badgeColor?: 'indigo' | 'rose' | 'emerald' | 'amber' | 'cyan' | 'purple';
  children?: React.ReactNode; // For action buttons
}

const badgeColorMap: Record<string, string> = {
  indigo: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  purple: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
};

const iconColorMap: Record<string, string> = {
  indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
  rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
};

export default function PageHeader({
  icon: Icon,
  title,
  description,
  badge,
  badgeColor = 'indigo',
  children,
}: PageHeaderProps) {
  const badgeClasses = badgeColorMap[badgeColor] || badgeColorMap.indigo;
  const iconClasses = iconColorMap[badgeColor] || iconColorMap.indigo;

  return (
    <div className="min-h-[72px] sm:h-[72px] px-4 sm:px-6 py-3 sm:py-0 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-lg shadow-black/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-in fade-in duration-200">
      {/* Left: Icon + Title + Description */}
      <div className="flex items-center gap-3 min-w-0">
        {Icon && (
          <div
            className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 shadow-sm ${iconClasses}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
              {title}
            </h1>
            {badge && (
              <span
                className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full border ${badgeClasses}`}
              >
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-slate-400 truncate max-w-md sm:max-w-xl lg:max-w-3xl 2xl:max-w-5xl mt-0.5">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Right: Action Buttons */}
      {children && (
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0 flex-wrap">
          {children}
        </div>
      )}
    </div>
  );
}
