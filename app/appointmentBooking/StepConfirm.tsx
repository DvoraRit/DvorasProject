import { View, Text, StyleSheet } from 'react-native';
import { Appointment } from '@appTypes/appointment';
import { useAuth } from '@services/authService';

type Props = {
  draft: Partial<Appointment>;
};

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export default function StepConfirm({ draft }: Props) {
  const { username } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Your Appointment</Text>

      <View style={styles.card}>
        <Row label="Name" value={username ?? '—'} />
        <Divider />
        <Row label="Medical Field" value={draft.appointmentType ?? '—'} />
        <Divider />
        <Row label="Date" value={draft.date ? formatDate(draft.date) : '—'} />
        <Divider />
        <Row label="Time" value={draft.time ?? '—'} />
      </View>
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

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
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
});
