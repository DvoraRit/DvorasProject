import { View, Text, StyleSheet } from 'react-native';

export default function SMSForwardScreen() {
  return (
    <View style={styles.container}>
      <Text>SMS Forward</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
