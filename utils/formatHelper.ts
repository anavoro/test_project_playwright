export const normalizePhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) return '380' + digits.slice(1);
  if (digits.startsWith('380')) return digits;
  return '380' + digits;
};

export function formatDateValue(rawValue: string): string {
  const [datePart, timePart] = rawValue.split(', ');
  const day = parseInt(datePart.split('.')[0], 10);
  return `${day} ${timePart}`;
}

export function extractDay(dateRange: string): [number, number] {
  const [startDate, endDate] = dateRange.split(' - ');
  const startDay = parseInt(startDate.split('.')[0], 10);
  const endDay = parseInt(endDate.split('.')[0], 10);
  return [startDay, endDay];
}

export const getNormalizedText = (text: string | null | undefined): string =>
  text?.replace(/\s+/g, ' ').trim() || '';