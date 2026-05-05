/**
 * Shared validation utilities for Ameer Civil Engineers
 */

export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  // Matches basic international and local formats: 10+ digits, allows +, -, spaces
  const re = /^[\d\s\-\+\(\)]{10,20}$/;
  return re.test(phone.trim());
};

export const isRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};
