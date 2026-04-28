import { View, Text, Modal, StyleSheet } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAppointmentStore } from '@store/appointmentStore';
import UIButton from '@component/UIButton';
import { useAuth } from '@services/authService';

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export default function HomeScreen() {
  const { booking, reset } = useAppointmentStore();
  const { username } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleCancelConfirmed() {
    reset();
    setShowConfirm(false);
    setShowSuccess(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {username}</Text>

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
              onPress={() => setShowConfirm(true)}
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

      {/* Are you sure? modal */}
      <Modal visible={showConfirm} transparent animationType="fade" onRequestClose={() => setShowConfirm(false)}>
        <View style={styles.backdrop}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Cancel Appointment</Text>
            <Text style={styles.modalMessage}>Are you sure you want to cancel your appointment?</Text>
            <View style={styles.modalActions}>
              <UIButton
                label="No, Keep It"
                onPress={() => setShowConfirm(false)}
                style={styles.btnKeep}
                labelStyle={styles.btnKeepText}
              />
              <UIButton
                label="Yes, Cancel"
                onPress={handleCancelConfirmed}
                style={styles.btnConfirmCancel}
                labelStyle={styles.btnConfirmCancelText}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Success modal */}
      <Modal visible={showSuccess} transparent animationType="fade" onRequestClose={() => setShowSuccess(false)}>
        <View style={styles.backdrop}>
          <View style={styles.modal}>
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.modalTitle}>Appointment Cancelled</Text>
            <Text style={styles.modalMessage}>Your appointment has been successfully cancelled.</Text>
            <UIButton
              label="OK"
              onPress={() => setShowSuccess(false)}
              style={styles.btnOk}
            />
          </View>
        </View>
      </Modal>
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
  // Modals
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  modal: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
    width: '100%',
  },
  btnKeep: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  btnKeepText: {
    color: '#333',
  },
  btnConfirmCancel: {
    flex: 1,
    backgroundColor: '#dc2626',
  },
  btnConfirmCancelText: {
    color: '#fff',
  },
  successIcon: {
    fontSize: 40,
    color: '#34C759',
  },
  btnOk: {
    width: '100%',
    marginTop: 8,
  },
});
