export enum AppointmentType {
  FamilyDoctor = 'Family Doctor',
  SkinCare = 'Skin Care',
  WomenHealth = 'Women Health',
}

export interface Appointment {
  appointmentType: AppointmentType;
  date: Date;
  time: Date;
}
