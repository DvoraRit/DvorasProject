import { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Contacts from 'expo-contacts';
import { router } from 'expo-router';

type ContactWithPhone = {
  id: string;
  name: string;
  phoneNumbers: Contacts.PhoneNumber[];
};

export default function CreateRuleScreen() {
  const [contacts, setContacts] = useState<ContactWithPhone[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadContacts();
  }, []);

  async function loadContacts() {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission required',
        'Contacts access is needed to select a sender.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
    });

    const withPhone: ContactWithPhone[] = data
      .filter(c => c.phoneNumbers && c.phoneNumbers.length > 0 && c.name)
      .map(c => ({
        id: c.id ?? c.name!,
        name: c.name!,
        phoneNumbers: c.phoneNumbers!,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    setContacts(withPhone);
    setLoading(false);
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.phoneNumbers.some(p => p.number?.includes(q))
    );
  }, [contacts, search]);

  function handleSelect(contact: ContactWithPhone) {
    if (contact.phoneNumbers.length === 1) {
      confirmSelection(contact.name, contact.phoneNumbers[0].number ?? '');
    } else {
      Alert.alert(
        contact.name,
        'Choose a phone number',
        contact.phoneNumbers.map(p => ({
          text: p.number ?? '',
          onPress: () => confirmSelection(contact.name, p.number ?? ''),
        }))
      );
    }
  }

  function confirmSelection(name: string, number: string) {
    // TODO: navigate to next step passing senderName + senderNumber
    console.log('Selected:', name, number);
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.stepLabel}>Step 1 of 3 — Choose Sender</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or number..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => handleSelect(item)}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0].toUpperCase()}</Text>
            </View>
            <View style={styles.rowText}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactNumber}>
                {item.phoneNumbers[0].number}
                {item.phoneNumbers.length > 1 ? ` +${item.phoneNumbers.length - 1} more` : ''}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No contacts found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7F9',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F7F9',
  },
  stepLabel: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    paddingVertical: 10,
  },
  searchInput: {
    marginHorizontal: 16,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  rowText: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111',
  },
  contactNumber: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 70,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontSize: 15,
  },
});
