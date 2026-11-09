// Store calendar days as strings. Date objects are local-noon adapters for DayPicker only.
export function fromCivil(value: string): Date {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day, 12);
}
export function toCivil(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
export function addCivilDays(value: string, days: number): string {
  const date = fromCivil(value);
  date.setDate(date.getDate() + days);
  return toCivil(date);
}
// UTC is used only for day arithmetic from numeric components, never string parsing.
export function civilNights(start: string, end: string): number {
  const ordinal = (value: string) => {
    const [y,m,d] = value.split('-').map(Number);
    return Date.UTC(y,m-1,d) / 86400000;
  };
  return ordinal(end) - ordinal(start);
}
