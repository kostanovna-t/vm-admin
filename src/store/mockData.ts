import { VMState } from './types';

export const mockVMs: VMState[] = [
  {
    id: '15088967-d6b8-4083-99fe-8f8fc1dbf027',
    state: 'running',
    server: 'server-1',
    cpu: 45,
    memory: 60,
    uptime: '24:12:41:09',
    alerts: [
      { type: 'moderate', count: 2 },
    ]
  },
  {
    id: '25088967-d6b8-4083-99fe-8f8fc1dbf027',
    state: 'stopped',
    server: 'server-2',
    cpu: 0,
    memory: 0,
    uptime: '4:12:41:09',
    alerts: [
      { type: 'good' },
    ]
  },
  {
    id: '35088967-d6b8-4083-99fe-8f8fc1dbf027',
    state: 'running',
    server: 'server-1',
    cpu: 75,
    memory: 80,
    uptime: '4:12:41:09',
    alerts: [
      { type: 'critical', count: 1 },
    ]
  },
  {
    id: '45088967-d6b8-4083-99fe-8f8fc1dbf027',
    state: 'running',
    server: 'server-3',
    cpu: 30,
    memory: 45,
    uptime: '4:12:41:09',
    alerts: []
  }
];