import { AppointmentType } from '@appTypes/appointment';
import { availability } from '@data/availability';

export function getAvailableDates(field: AppointmentType): Date[] {
  return availability[field].map(entry => new Date(entry.date));
}

export function getSlotsForDate(field: AppointmentType, date: string): string[] {
  return availability[field].find(entry => entry.date === date)?.slots ?? [];
}
