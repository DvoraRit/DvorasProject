import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import type { StyleProp, ViewStyle } from 'react-native';

type CustomMarking = {
  customStyles: {
    container: object;
    text: object;
  };
};

type Props = {
  availableDates: Date[];
  selectedDate?: string | null;
  onDayPress?: (dateString: string) => void;
  style?: StyleProp<ViewStyle>;
};

function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export default function UICalendar({ availableDates, selectedDate, onDayPress, style }: Props) {
  const sortedDates = [...availableDates].sort((a, b) => a.getTime() - b.getTime());
  const initialDate = sortedDates.length > 0 ? toDateString(sortedDates[0]) : undefined;// default to first available date or let calendar decide if none

  const markedDates: Record<string, CustomMarking> = {};

  sortedDates.forEach(date => {
    const key = toDateString(date);
    const isSelected = key === selectedDate;
    markedDates[key] = {
      customStyles: {
        container: isSelected ? styles.selectedContainer : styles.availableContainer,
        text: isSelected ? styles.selectedText : styles.availableText,
      },
    };
  });

  // If selectedDate is not in availableDates, still mark it as selected
  if (selectedDate && !markedDates[selectedDate]) {
    markedDates[selectedDate] = {
      customStyles: {
        container: styles.selectedContainer,
        text: styles.selectedText,
      },
    };
  }

  return (
    <Calendar
      style={[styles.calendar, style]}
      markingType="custom"
      markedDates={markedDates}
      initialDate={initialDate}
      onDayPress={day => onDayPress?.(day.dateString)}
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        todayTextColor: '#007AFF',
        dayTextColor: '#111',
        textDisabledColor: '#ccc',
        arrowColor: '#007AFF',
        monthTextColor: '#111',
        textMonthFontWeight: '600',
        textDayFontSize: 14,
        textMonthFontSize: 15,
      }}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  availableContainer: {
    borderWidth: 1.5,
    borderColor: '#007AFF',
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  availableText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  selectedContainer: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
  },
  selectedText: {
    color: '#fff',
    fontWeight: '600',
  },
});
