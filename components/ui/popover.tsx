"use client";
import * as React from 'react';
import { Popover as Primitive } from 'radix-ui';
import styles from './date-picker.module.css';
import { cn } from '@/lib/utils';
export const Popover = Primitive.Root;
export const PopoverTrigger = Primitive.Trigger;
export const PopoverClose = Primitive.Close;
export function PopoverContent({className,...props}: React.ComponentProps<typeof Primitive.Content>) {
  return <Primitive.Portal><Primitive.Content sideOffset={8} collisionPadding={12}
    className={cn('date-popover',styles.panel,className)} {...props}/></Primitive.Portal>;
}

