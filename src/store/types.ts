export interface VMState {
  id: string;
  state: string;
  server: string;
  cpu: number;
  memory: number;
  uptime: string;
  alerts: {
    type: string;
    count?: number;
  }[];
}