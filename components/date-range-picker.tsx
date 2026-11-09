"use client";
import styles from './ui/date-picker.module.css';
import { useId, useState, type ReactNode } from 'react';
import { CalendarDays, ChevronDown, X, Check } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from '@/components/ui/popover';
import { fromCivil, toCivil, civilNights } from '@/lib/civil-date';

type CivilRange = { from: string; to?: string };
type Props = { start: string; end: string; today: string; onChange: (start: string,end: string)=>void; className?: string; children?: ReactNode };
export function DateRangePicker({start,end,today,onChange,className='select',children}: Props) {
  const id=useId();
  const [open,setOpen]=useState(false);
  const [draft,setDraft]=useState<CivilRange>({from:start,to:end});
  const valid=!!draft.to && civilNights(draft.from,draft.to)>=1;
  const nights=valid?civilNights(draft.from,draft.to!):0;
  function toggle(next:boolean){if(next)setDraft({from:start,to:end});setOpen(next)}
  return <Popover open={open} onOpenChange={toggle}>
    <PopoverTrigger asChild><button type="button" className={`${className} ${styles.trigger}`} aria-label={`숙박 일정 변경, ${start}부터 ${end}까지`}>
      {children || <><CalendarDays size={18}/><span>{start.replaceAll('-','.')} — {end.replaceAll('-','.')}</span><ChevronDown size={16}/></>}
    </button></PopoverTrigger>
    <PopoverContent align="start" aria-labelledby={id}>
      <div className="date-picker-head"><h3 id={id}>체크인·체크아웃 선택</h3><PopoverClose asChild><button type="button" className="icon-button" aria-label="일정 선택 닫기"><X size={20}/></button></PopoverClose></div>
      <div className="date-picker-values"><div><small>체크인</small><strong>{draft.from.replaceAll('-','.')}</strong></div><span>—</span><div><small>체크아웃</small><strong>{draft.to?.replaceAll('-','.') || '날짜 선택'}</strong></div></div>
      <Calendar mode="range" min={1} required autoFocus defaultMonth={fromCivil(start)}
        disabled={{before:fromCivil(today)}}
        selected={{from:fromCivil(draft.from),to:draft.to?fromCivil(draft.to):undefined}}
        onSelect={range=>{if(range?.from)setDraft({from:toCivil(range.from),to:range.to?toCivil(range.to):undefined})}}
        formatters={{formatCaption:date=>`${date.getFullYear()}년 ${date.getMonth()+1}월`,formatWeekdayName:date=>['일','월','화','수','목','금','토'][date.getDay()]}}
      />
      <p className="date-picker-hint" aria-live="polite">{valid?`${nights}박 · 선택한 일정을 적용해 주세요.`:'체크아웃 날짜를 선택해 주세요. (최소 1박)'}</p>
      <button type="button" className="btn primary full" disabled={!valid} onClick={()=>{if(valid){onChange(draft.from,draft.to!);setOpen(false)}}}>이 일정으로 선택<Check size={18}/></button>
    </PopoverContent>
  </Popover>;
}

