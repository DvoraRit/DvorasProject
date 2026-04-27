import { View, StyleSheet } from 'react-native';
import { medicalFields } from '@data/appointment';
import { Appointment, AppointmentType } from '@appTypes/appointment';
import UISelectDropdown from '@component/UISelectDropdown';

type Props = {
  value: AppointmentType | null | undefined;
  onChange: (update: Partial<Appointment>) => void;
};

export default function StepField({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <UISelectDropdown
        label="Medical Field"
        options={medicalFields}
        value={value ?? null}
        onChange={v => onChange({ appointmentType: v as AppointmentType, date: undefined, time: undefined })}
        placeholder="Select a medical field..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
