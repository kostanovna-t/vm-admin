export const ALERT_TYPES = {
  CRITICAL: 'critical',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success',
} as const;

export type AlertType = typeof ALERT_TYPES[keyof typeof ALERT_TYPES];

export const VM_STATUS = {
  RUNNING: 'running',
  STOPPED: 'stopped',
  ERROR: 'error',
} as const;

export type VMStatus = typeof VM_STATUS[keyof typeof VM_STATUS]; 