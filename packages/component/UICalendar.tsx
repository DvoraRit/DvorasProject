import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import type { StyleProp, ViewStyle } from 'react-native';

type MarkedDates = Record<string, { marked: boolean; dotColor: string; activeOpacity: number }>;

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
  const markedDates: MarkedDates = availableDates.reduce<MarkedDates>((acc, date) => {
    const key = toDateString(date);
    acc[key] = { marked: true, dotColor: '#007AFF', activeOpacity: 0.7 };
    return acc;
  }, {});

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      marked: !!markedDates[selectedDate],
      dotColor: '#007AFF',
      activeOpacity: 0.7,
    };
  }

  return (
    <Calendar
      style={[styles.calendar, style]}
      markedDates={
        selectedDate
          ? {
              ...markedDates,
              [selectedDate]: {
                ...markedDates[selectedDate],
                selected: true,
                selectedColor: '#007AFF',
              } as any,
            }
          : markedDates
      }
      onDayPress={day => onDayPress?.(day.dateString)}
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        selectedDayBackgroundColor: '#007AFF',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#007AFF',
        dayTextColor: '#111',
        textDisabledColor: '#ccc',
        dotColor: '#007AFF',
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
});
