"use client";

import { useId, useState } from 'react';
import { Check, ChevronDown, Minus, Plus, X } from 'lucide-react';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import styles from './guest-picker.module.css';

type GuestPickerProps = {
  value: number;
  onChange: (value: number) => void;
};

export function GuestPicker({ value, onChange }: GuestPickerProps) {
  const headingId = useId();
  const descriptionId = useId();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);

  function changeOpen(next: boolean) {
    if (next) setDraft(value);
    setOpen(next);
  }

  function apply() {
    onChange(draft);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={changeOpen}>
      <PopoverTrigger asChild>
        <button type="button" className={`select ${styles.trigger}`} aria-label={`인원 선택, 성인 ${value}명`}>
          <span>성인 {value}명</span>
          <ChevronDown size={16} aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        className={styles.panel}
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
      >
        <div className={styles.heading}>
          <h3 id={headingId}>인원 선택</h3>
          <PopoverClose asChild>
            <button type="button" className={styles.close} aria-label="인원 선택 닫기">
              <X size={20} aria-hidden="true" />
            </button>
          </PopoverClose>
        </div>
        <p id={descriptionId} className={styles.description}>
          기준 2명 · 최대 4명<br />
          추가 인원은 1인 1박 30,000원입니다.
        </p>
        <div className={styles.row}>
          <span>성인</span>
          <div className={styles.counter}>
            <button type="button" disabled={draft <= 1} aria-label="인원 줄이기" onClick={() => setDraft(draft - 1)}>
              <Minus size={18} aria-hidden="true" />
            </button>
            <output aria-live="polite" aria-label="선택 인원">{draft}</output>
            <button type="button" disabled={draft >= 4} aria-label="인원 늘리기" onClick={() => setDraft(draft + 1)}>
              <Plus size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
        <button type="button" className={styles.apply} onClick={apply}>
          성인 {draft}명 선택 <Check size={18} aria-hidden="true" />
        </button>
      </PopoverContent>
    </Popover>
  );
}
