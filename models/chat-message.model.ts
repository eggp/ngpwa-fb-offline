export class ChatMessageModel {
  $key: string;
  msg: string;
  createdUser: string;
  created: string;

  constructor(data?: ChatMessageModel) {
    if (data != null) {
      Object.assign(this, data);

      const eventPropertyDescriptor = Object.getOwnPropertyDescriptor(this, '$key');
      if (eventPropertyDescriptor !== undefined) {
        eventPropertyDescriptor.enumerable = false;
        Object.defineProperty(this, '$key', eventPropertyDescriptor);
      }
    }
  }
}
