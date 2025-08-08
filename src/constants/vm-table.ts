export const SORT_DIRECTION = {
    ASC: 'asc',
    DESC: 'desc',
} as const;

export const SORT_FIELD = {
    STATE: 'state',
    CPU: 'cpu',
    MEMORY: 'memory',
    UPTIME: 'uptime',
} as const;

export const VM_STATUS = {
    RUNNING: 'running',
    STOPPED: 'stopped',
} as const;

export const ALERT_TYPE = {
    CRITICAL: 'critical',
    IMPORTANT: 'important',
    MODERATE: 'moderate',
    GOOD: 'good',
} as const;

export const ALERT_LABEL = {
    [ALERT_TYPE.CRITICAL]: 'Critical',
    [ALERT_TYPE.IMPORTANT]: 'Important',
    [ALERT_TYPE.MODERATE]: 'Moderate',
    [ALERT_TYPE.GOOD]: 'All good',
} as const;

export const NOTIFICATION_TYPE = {
    CRITICAL: 'critical',
    WARNING: 'warning',
    INFO: 'info',
    SUCCESS: 'success',
} as const;