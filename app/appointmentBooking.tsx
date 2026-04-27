import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { medicalFields } from '@data/appointment';
import UISelectDropdown from '@component/UISelectDropdown';

export default function AppointmentBookingScreen() {
  const [selectedField, setSelectedField] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <UISelectDropdown
        label="Medical Field"
        options={medicalFields}
        value={selectedField}
        onChange={setSelectedField}
        placeholder="Select a medical field..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7F9',
    padding: 20,
  },
});
