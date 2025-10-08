// src/components/ui/Tabs.tsx
'use client';

import type { LucideIcon } from 'lucide-react';
import React from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

type TabIcon = LucideIcon | React.ComponentType<{ className?: string }>;

export interface Tab<T extends string = string> {
  id: T;
  label: string;
  icon: TabIcon;
}

export interface TabsProps<T extends string = string> {
  tabs: Tab<T>[];
  activeTab: T;
  onTabChange: React.Dispatch<React.SetStateAction<T>>;
  variant?: 'glass' | 'solid' | 'minimal';
  color?: 'purple' | 'blue' | 'emerald' | 'rose' | 'amber';
  className?: string;
}

export default function Tabs<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  variant = 'glass',
  color = 'purple',
  className,
}: TabsProps<T>) {
  return (
    <div className={clsx('relative', className)}>
      <div className="flex justify-center gap-2 relative z-10">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id as string}
              onClick={() => onTabChange(tab.id)}
              type="button"
              className={clsx(
                'px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition',
                isActive ? 'text-white' : 'text-purple-200'
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* sliding highlight */}
      <div className="absolute left-0 right-0 top-full mt-2 flex justify-center">
        <div className="relative w-full max-w-3xl h-2 px-4">
          <AnimatePresence>
            {tabs.map(tab => {
              if (activeTab !== tab.id) return null;
              return (
                <motion.div
                  key={String(tab.id)}
                  layoutId="tab-slider"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-400 shadow-md"
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
