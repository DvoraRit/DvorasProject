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

// Why persist middleware?
// -----------------------------------------
// Without persist, booking resets to null every time the app restarts.
// persist wraps the store and automatically saves state to AsyncStorage after
// every set() call, and rehydrates it before the first render — zero extra code
// needed in components. Manual AsyncStorage calls (getItem/setItem in useEffect)
// would risk getting out of sync with the store on every future change.
// -----------------------------------------

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment } from '@appTypes/appointment';

type AppointmentStore = {
  booking: Partial<Appointment> | null;
  confirm: (appointment: Appointment) => void;
  reset: () => void;
};

export const useAppointmentStore = create<AppointmentStore>()(
  persist(
    set => ({
      booking: null,
      confirm: (appointment: Appointment) => set({ booking: appointment }),
      reset: () => set({ booking: null }),
    }),
    {
      name: 'appointment-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    }
  )
);
