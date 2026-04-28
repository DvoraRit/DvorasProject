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
    { date: '2026-07-18', slots: ['09:30', '12:00', '17:00'] },
  ],
  [AppointmentType.WomenHealth]: [
    { date: '2026-07-19', slots: ['08:00', '11:30', '14:30'] },
    { date: '2026-07-20', slots: ['09:00', '13:00', '16:00'] },
  ],
};
