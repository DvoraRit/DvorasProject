export enum ForwardPlatform {
  EMAIL = 'email',
  WHATSAPP = 'whatsapp',
  TELEGRAM = 'telegram',
}

export interface SmsRule {
  id: number;
  active: boolean;
  senderNumber: string;
  senderName?: string;
  forwardPlatform: ForwardPlatform;
  email?: string | null;
  whatsappNumber?: string | null;
  telegramChatId?: string | null;
}

export interface SmsRuleDoc extends SmsRule {
  docId: string;
}
