export type VMStateDTO = 'running' | 'stopped' | 'error';

export type AlertTypeDTO = 'good' | 'moderate' | 'critical' | 'warning';

export interface AlertDTO {
  type: AlertTypeDTO;
  count?: number;
}

export interface VMResponseDTO {
  id: string;
  state: VMStateDTO;
  server: string;
  cpu: number;
  memory: number;
  uptime: string;
  alerts: AlertDTO[];
}

export interface VMCreateRequestDTO {
  server: string;
  cpu: number;
  memory: number;
}

export interface APIResponseDTO<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
