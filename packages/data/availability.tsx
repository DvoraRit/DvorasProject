import { AppointmentType } from '@appTypes/appointment';

export type DayAvailability = {
  date: string; // "YYYY-MM-DD"
  slots: string[]; // "HH:MM"
};

export type AvailabilityMap = Record<AppointmentType, DayAvailability[]>;

export const availability: AvailabilityMap = {
  [AppointmentType.FamilyDoctor]: [
    { date: '2026-07-15', slots: ['09:00', '10:30', '14:00'] },
    { date: '2026-07-16', slots: ['08:30', '11:00', '15:30'] },
  ],
  [AppointmentType.SkinCare]: [
    { date: '2026-07-17', slots: ['10:00', '13:30', '16:00'] },
  ],
  [AppointmentType.WomenHealth]: [],
};
