"use client";
import 'react-day-picker/style.css';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';
import { cn } from '@/lib/utils';

export function Calendar({className, ...props}: React.ComponentProps<typeof DayPicker>) {
  return <DayPicker locale={ko} showOutsideDays fixedWeeks
    className={cn('pum-calendar', className)} {...props} />;
}

