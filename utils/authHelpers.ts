export const normalizePhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) return '380' + digits.slice(1);
  if (digits.startsWith('380')) return digits;
  return '380' + digits;
};