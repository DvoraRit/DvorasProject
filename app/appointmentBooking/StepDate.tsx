import { View, StyleSheet } from 'react-native';
import { AppointmentType } from '@appTypes/appointment';
import { getAvailableDates } from '@services/appointmentService';
import UICalendar from '@component/UICalendar';

type Props = {
  selectedField: AppointmentType;
  selectedDate: string | null;
  onDateChange: (date: string) => void;
};

export default function StepDate({ selectedField, selectedDate, onDateChange }: Props) {
  const availableDates = getAvailableDates(selectedField);

  function handleDayPress(dateString: string) {
    const isAvailable = availableDates.some(
      d => d.toISOString().split('T')[0] === dateString
    );
    if (isAvailable) onDateChange(dateString);
  }

  return (
    <View style={styles.container}>
      <UICalendar
        availableDates={availableDates}
        selectedDate={selectedDate}
        onDayPress={handleDayPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
