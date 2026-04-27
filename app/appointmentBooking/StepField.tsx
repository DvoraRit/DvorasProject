import { View, StyleSheet } from 'react-native';
import { medicalFields } from '@data/appointment';
import { AppointmentType } from '@appTypes/appointment';
import UISelectDropdown from '@component/UISelectDropdown';

type Props = {
  value: AppointmentType | null;
  onChange: (field: AppointmentType) => void;
};

export default function StepField({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <UISelectDropdown
        label="Medical Field"
        options={medicalFields}
        value={value}
        onChange={v => onChange(v as AppointmentType)}
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
