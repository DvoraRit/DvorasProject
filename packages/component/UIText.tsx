import { Text, StyleSheet } from 'react-native';
import type { TextProps, StyleProp, TextStyle } from 'react-native';

type Props = TextProps & {
  label: string;
  style?: StyleProp<TextStyle>;
};

export default function UIText({ label, style, ...rest }: Props) {
  return (
    <Text style={[styles.text, style]} {...rest}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: '#111',
  },
});
