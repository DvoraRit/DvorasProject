import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { AppointmentType } from '@appTypes/appointment';
import { useAppointmentStore } from '@store/appointmentStore';
import UIStepIndicator from '@component/UIStepIndicator';
import StepField from './StepField';
import StepDate from './StepDate';
// import StepConfirm from './StepConfirm';

const STEPS = ['Medical Field', 'Date', 'Confirm'];
const TOTAL_STEPS = STEPS.length;

// Draft state lives here while the user fills in the wizard.
// The Zustand store is only written on final confirm — so the store
// always holds a complete, committed booking (never a partial one).
type DraftBooking = {
  selectedField: AppointmentType | null;
  selectedDate: string | null;
  selectedSlot: string | null;
};

export default function AppointmentBookingScreen() {
  const { setField, setDate, setSlot } = useAppointmentStore();

  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<DraftBooking>({
    selectedField: null,
    selectedDate: null,
    selectedSlot: null,
  });

  function canAdvance(): boolean {
    if (step === 1) return draft.selectedField !== null;
    if (step === 2) return draft.selectedDate !== null;
    return true;
  }

  function handleNext() {
    if (step < TOTAL_STEPS) setStep(s => s + 1);
    else handleDone();
  }

  function handleBack() {
    if (step > 1) setStep(s => s - 1);
  }

  function handleDone() {
    if (!draft.selectedField || !draft.selectedDate) return;
    setField(draft.selectedField);
    setDate(draft.selectedDate);
    if (draft.selectedSlot) setSlot(draft.selectedSlot);
  }

  const isLastStep = step === TOTAL_STEPS;

  return (
    <SafeAreaView style={styles.container}>

      {/* Step indicator at the top */}
      <UIStepIndicator steps={STEPS} currentStep={step} />

      {/* Step content */}
      <View style={styles.content}>
        {step === 1 && (
          <StepField
            value={draft.selectedField}
            onChange={field => setDraft(d => ({ ...d, selectedField: field, selectedDate: null, selectedSlot: null }))}
          />
        )}
        {step === 2 && draft.selectedField && (
          <StepDate
            selectedField={draft.selectedField}
            selectedDate={draft.selectedDate}
            onDateChange={date => setDraft(d => ({ ...d, selectedDate: date, selectedSlot: null }))}
          />
        )}
        {step === 3 && <Text style={styles.placeholder}>Step 3 — Confirm</Text>}
      </View>

      {/* Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.btnBack, step === 1 && styles.btnDisabled]}
          onPress={handleBack}
          disabled={step === 1}
        >
          <Text style={styles.btnBackText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnNext, !canAdvance() && styles.btnDisabled]}
          onPress={handleNext}
          disabled={!canAdvance()}
        >
          <Text style={styles.btnNextText}>{isLastStep ? 'Done' : 'Next'}</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7F9',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  placeholder: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 40,
    fontSize: 15,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  btnBack: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  btnBackText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  btnNext: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  btnNextText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  btnDisabled: {
    opacity: 0.4,
  },
});
