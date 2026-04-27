export enum AppointmentType {
  FamilyDoctor = 'Family Doctor',
  SkinCare = 'Skin Care',
  WomenHealth = 'Women Health',
}

export interface Appointment {
  appointmentType: AppointmentType;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM"
}
