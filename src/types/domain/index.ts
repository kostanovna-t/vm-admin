export type VMState = 'running' | 'stopped' | 'error';

export type AlertType = 'good' | 'moderate' | 'critical' | 'warning';

export interface Alert {
  type: AlertType;
  count?: number;
}

export interface VM {
  id: string;
  state: VMState;
  server: string;
  cpu: number;
  memory: number;
  uptime: string;
  alerts: Alert[];
}

export interface VMCreateData {
  server: string;
  cpu: number;
  memory: number;
} 