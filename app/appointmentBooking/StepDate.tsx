import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Appointment } from '@appTypes/appointment';
import { getAvailableDates, getSlotsForDate } from '@services/appointmentService';
import UICalendar from '@component/UICalendar';

type Props = {
  draft: Partial<Appointment>;
  onChange: (update: Partial<Appointment>) => void;
};

export default function StepDate({ draft, onChange }: Props) {
  const availableDates = draft.appointmentType ? getAvailableDates(draft.appointmentType) : [];
  const slots = draft.appointmentType && draft.date
    ? getSlotsForDate(draft.appointmentType, draft.date)
    : [];

  function handleDayPress(dateString: string) {
    const isAvailable = availableDates.some(
      d => d.toISOString().split('T')[0] === dateString
    );
    if (isAvailable) onChange({ date: dateString, time: undefined });
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <UICalendar
        availableDates={availableDates}
        selectedDate={draft.date ?? null}
        onDayPress={handleDayPress}
      />

      {slots.length > 0 && (
        <>
          <Text style={styles.slotsLabel}>Available Times</Text>
          <View style={styles.slotsRow}>
            {slots.map(slot => (
              <TouchableOpacity
                key={slot}
                style={[styles.slot, draft.time === slot && styles.slotSelected]}
                onPress={() => onChange({ time: slot })}
              >
                <Text style={[styles.slotText, draft.time === slot && styles.slotTextSelected]}>
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  slotsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  slotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  slot: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  slotSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  slotText: {
    fontSize: 14,
    color: '#333',
  },
  slotTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
});
