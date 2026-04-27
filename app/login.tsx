import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '@services/authService';

export default function LoginScreen() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    setError('');
    const success = login(username.trim(), password);
    if (!success) {
      setError('Invalid username or password.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <Text style={styles.title}>SMS Forward</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleLogin}
          returnKeyType="done"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 28,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111',
    marginBottom: 14,
    backgroundColor: '#fafafa',
  },
  error: {
    color: '#d00',
    fontSize: 13,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
