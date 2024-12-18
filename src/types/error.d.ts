export interface ErrorMessage {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  properties: unknown;
}
