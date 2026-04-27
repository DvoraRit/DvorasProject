import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import { Appointment } from '@appTypes/appointment';
import { useAppointmentStore } from '@store/appointmentStore';
import UIStepIndicator from '@component/UIStepIndicator';
import UIButton from '@component/UIButton';
import StepField from '@component/appointmentBooking/StepField';
import StepDate from '@component/appointmentBooking/StepDate';
import StepConfirm from '@component/appointmentBooking/StepConfirm';

const STEPS = ['Medical Field', 'Date', 'Confirm'];
const TOTAL_STEPS = STEPS.length;

// Draft holds in-progress input as Partial<Appointment>.
// The Zustand store is only written on final confirm — so the store
// always holds a complete, committed booking (never a partial one).

export default function AppointmentBookingScreen() {
  const { confirm, booking } = useAppointmentStore();
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const isEditMode = mode === 'edit';

  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Partial<Appointment>>({});

  // useFocusEffect instead of useEffect:
  // The Drawer navigator keeps screens mounted, so useEffect([mode]) won't re-run
  // when the user navigates back to this screen with the same mode param —
  // the component is already mounted and the dep hasn't changed.
  // useFocusEffect fires every time the screen comes into focus, guaranteeing
  // step and draft always reset correctly on each visit.
  useFocusEffect(
    useCallback(() => {
      if (isEditMode && booking) {
        setStep(2);
        setDraft({ appointmentType: booking.appointmentType });
      } else {
        setStep(1);
        setDraft({});
      }
    }, [mode])
  );

  function updateDraft(update: Partial<Appointment>) {
    setDraft(prev => ({ ...prev, ...update }));
  }

  function canAdvance(): boolean {
    if (step === 1) return !!draft.appointmentType;
    if (step === 2) return !!draft.date && !!draft.time;
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
    if (!draft.appointmentType || !draft.date || !draft.time) return;
    confirm(draft as Appointment);
    router.replace('/');
  }

  const isLastStep = step === TOTAL_STEPS;

  return (
    <SafeAreaView style={styles.container}>

      <UIStepIndicator steps={STEPS} currentStep={step} />

      <View style={styles.content}>
        {step === 1 && (
          <StepField
            value={draft.appointmentType}
            onChange={update => setDraft({ appointmentType: update.appointmentType })}
          />
        )}
        {step === 2 && (
          <StepDate
            draft={draft}
            onChange={updateDraft}
          />
        )}
        {step === 3 && <StepConfirm draft={draft} />}
      </View>

      <View style={styles.footer}>
        <UIButton
          label="Back"
          onPress={handleBack}
          disabled={step === 1 || (isEditMode && step === 2)}
          style={styles.btnBack}
          labelStyle={styles.btnBackText}
        />
        <UIButton
          label={isLastStep ? 'Done' : 'Next'}
          onPress={handleNext}
          disabled={!canAdvance()}
          style={styles.btnNext}
        />
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  btnBackText: {
    color: '#333',
    fontWeight: '500',
  },
  btnNext: {
    flex: 2,
  },
});
