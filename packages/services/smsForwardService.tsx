import firestore from '@react-native-firebase/firestore';
import { SmsRule, SmsRuleDoc } from '@appTypes/smsRule';

export { ForwardPlatform } from '@appTypes/smsRule';
export type { SmsRule, SmsRuleDoc };

const COLLECTION = 'smsRules';

export async function addRule(rule: SmsRule): Promise<string> {
  const ref = await firestore().collection(COLLECTION).add({
    id: rule.id,
    active: rule.active,
    senderNumber: rule.senderNumber,
    senderName: rule.senderName ?? null,
    forwardPlatform: rule.forwardPlatform,
    email: rule.email ?? null,
    whatsappNumber: rule.whatsappNumber ?? null,
    telegramChatId: rule.telegramChatId ?? null,
  });
  return ref.id;
}

export async function getRules(): Promise<SmsRuleDoc[]> {
  const snapshot = await firestore().collection(COLLECTION).orderBy('id').get();
  return snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() } as SmsRuleDoc));
}

export async function updateRule(docId: string, updates: Partial<SmsRule>): Promise<void> {
  await firestore().collection(COLLECTION).doc(docId).update(updates);
}

export async function deleteRule(docId: string): Promise<void> {
  await firestore().collection(COLLECTION).doc(docId).delete();
}
