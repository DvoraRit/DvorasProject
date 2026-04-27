import { View, Text, StyleSheet } from 'react-native';

type Props = {
  steps: string[];
  currentStep: number; // 1-based
};

export default function UIStepIndicator({ steps, currentStep }: Props) {
  return (
    <View style={styles.container}>
      {steps.map((label, i) => {
        const num = i + 1;
        const active = num === currentStep;
        const done = num < currentStep;
        return (
          <View key={label} style={styles.stepItem}>
            <View style={[styles.dot, active && styles.dotActive, done && styles.dotDone]}>
              <Text style={[styles.dotText, (active || done) && styles.dotTextActive]}>
                {done ? '✓' : num}
              </Text>
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
            {i < steps.length - 1 && (
              <View style={[styles.line, done && styles.lineDone]} />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  stepItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotActive: {
    backgroundColor: '#007AFF',
  },
  dotDone: {
    backgroundColor: '#34C759',
  },
  dotText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
  },
  dotTextActive: {
    color: '#fff',
  },
  label: {
    fontSize: 11,
    color: '#999',
  },
  labelActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  line: {
    width: 24,
    height: 2,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 4,
  },
  lineDone: {
    backgroundColor: '#34C759',
  },
});
