import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { AppointmentType } from '@appTypes/appointment';
import { medicalFields } from '@data/appointment';
import { getAvailableDates, getSlotsForDate } from '@services/appointmentService';
import UISelectDropdown from '@component/UISelectDropdown';
import UICalendar from '@component/UICalendar';

export default function AppointmentBookingScreen() {
  const [selectedField, setSelectedField] = useState<AppointmentType | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  function handleFieldChange(field: string) {
    setSelectedField(field as AppointmentType);
    setSelectedDate(null);
    setSelectedSlot(null);
  }

  function handleDatePress(dateString: string) {
    if (!selectedField) return;
    const slots = getSlotsForDate(selectedField, dateString);
    if (slots.length === 0) return; // not an available date
    setSelectedDate(dateString);
    setSelectedSlot(null);
  }

  const availableDates = selectedField ? getAvailableDates(selectedField) : [];
  const slots = selectedField && selectedDate ? getSlotsForDate(selectedField, selectedDate) : [];

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <UISelectDropdown
        label="Medical Field"
        options={medicalFields}
        value={selectedField}
        onChange={handleFieldChange}
        placeholder="Select a medical field..."
      />

      {selectedField && (
        <>
          <Text style={styles.sectionLabel}>Available Dates</Text>
          <UICalendar
            availableDates={availableDates}
            selectedDate={selectedDate}
            onDayPress={handleDatePress}
          />
        </>
      )}

      {slots.length > 0 && (
        <>
          <Text style={styles.sectionLabel}>Available Times</Text>
          <View style={styles.slotsRow}>
            {slots.map(slot => (
              <TouchableOpacity
                key={slot}
                style={[styles.slot, selectedSlot === slot && styles.slotSelected]}
                onPress={() => setSelectedSlot(slot)}
              >
                <Text style={[styles.slotText, selectedSlot === slot && styles.slotTextSelected]}>
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {selectedField && selectedDate && slots.length === 0 && (
        <Text style={styles.unavailable}>No available slots for this date.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0F7F9',
    flexGrow: 1,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginTop: 16,
    marginBottom: 6,
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
  unavailable: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
  },
});
