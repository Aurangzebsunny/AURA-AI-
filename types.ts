
export enum Sender {
  User = 'user',
  AI = 'ai',
}

export interface MessageFile {
  name: string;
  type: string;
  size: number;
}

export interface Message {
  id: string;
  sender: Sender;
  text: string;
  file?: MessageFile;
}
