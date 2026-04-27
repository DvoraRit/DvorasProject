import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAppointmentStore } from '@store/appointmentStore';
import UIButton from '@component/UIButton';

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export default function HomeScreen() {
  const { booking, reset } = useAppointmentStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      {booking ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Appointment</Text>

          <Row label="Medical Field" value={booking.appointmentType ?? '—'} />
          <View style={styles.divider} />
          <Row label="Date" value={booking.date ? formatDate(booking.date) : '—'} />
          <View style={styles.divider} />
          <Row label="Time" value={booking.time ?? '—'} />

          <View style={styles.actions}>
            <UIButton
              label="Cancel"
              onPress={reset}
              style={styles.btnCancel}
              labelStyle={styles.btnCancelText}
            />
            <UIButton
              label="Update"
              onPress={() => router.push('/appointmentBooking?mode=edit')}
              style={styles.btnUpdate}
            />
          </View>
        </View>
      ) : (
        <UIButton
          label="Book an Appointment"
          onPress={() => router.push('/appointmentBooking')}
          style={styles.btnBook}
        />
      )}
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F7F9',
    padding: 24,
    gap: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  rowLabel: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 15,
    color: '#111',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  btnCancel: {
    flex: 1,
    backgroundColor: '#fee2e2',
  },
  btnCancelText: {
    color: '#dc2626',
  },
  btnUpdate: {
    flex: 1,
  },
  btnBook: {
    paddingHorizontal: 32,
  },
});
