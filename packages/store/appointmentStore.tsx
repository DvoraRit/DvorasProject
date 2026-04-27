// Why Zustand?
// -----------------------------------------
// This app has a single booking flow with 3 fields (field, date, slot).
// Redux Toolkit would require a store config, a slice, typed actions, selectors,
// and a <Provider> wrapping the root layout — a lot of infrastructure for simple state.
// Zustand achieves the same result in one file with no Provider, no boilerplate,
// and a much smaller bundle (~1kb vs ~16kb for RTK).
// If the app grows to many unrelated features sharing global state, revisiting
// Redux would make sense — but for now Zustand is the right tool.
// -----------------------------------------

import { create } from 'zustand';
import { Appointment } from '@appTypes/appointment';

type AppointmentStore = {
  booking: Partial<Appointment> | null;
  confirm: (appointment: Appointment) => void;
  reset: () => void;
};

export const useAppointmentStore = create<AppointmentStore>(set => ({
  booking: null,

  confirm: (appointment: Appointment) =>
    set({ booking: appointment }),

  reset: () =>
    set({ booking: null }),
}));
