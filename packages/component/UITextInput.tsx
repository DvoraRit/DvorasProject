import { TextInput, StyleSheet } from 'react-native';
import type { TextInputProps, StyleProp, TextStyle } from 'react-native';

type Props = TextInputProps & {
  style?: StyleProp<TextStyle>;
};

export default function UITextInput({ style, ...rest }: Props) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#999"
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111',
    backgroundColor: '#fafafa',
  },
});
