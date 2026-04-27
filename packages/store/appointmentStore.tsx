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
import { AppointmentType } from '@appTypes/appointment';

type AppointmentState = {
  selectedField: AppointmentType | null;
  selectedDate: string | null;
  selectedSlot: string | null;
  setField: (field: AppointmentType) => void;
  setDate: (date: string) => void;
  setSlot: (slot: string) => void;
  reset: () => void;
};

export const useAppointmentStore = create<AppointmentState>(set => ({
  selectedField: null,
  selectedDate: null,
  selectedSlot: null,

  setField: field =>
    set({ selectedField: field, selectedDate: null, selectedSlot: null }),

  setDate: date =>
    set({ selectedDate: date, selectedSlot: null }),

  setSlot: slot =>
    set({ selectedSlot: slot }),

  reset: () =>
    set({ selectedField: null, selectedDate: null, selectedSlot: null }),
}));
