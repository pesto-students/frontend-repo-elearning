export interface IdefaultMsgBody {
  parts: [{ text: string }];
  role: string;
  id?: string;
}

export interface IChatHistory {
  loading: boolean;
  data: [IdefaultMsgBody];
  chatId: string;
}