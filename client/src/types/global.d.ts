export {};

declare global {
  interface Message {
    message: string;
    username: string;
    date_created: string | Date;
    _id: string;
  }
}
