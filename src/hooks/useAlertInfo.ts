import { useMemo } from 'react';
import { ALERT_LABEL, ALERT_TYPE } from '../constants/vm-table';

type AlertType = typeof ALERT_TYPE[keyof typeof ALERT_TYPE];

interface AlertInfo {
  type: AlertType;
  count?: number;
}

const getAlertLabel = (type: AlertType): string => {
  return ALERT_LABEL[type] || 'All good';
};

export const useAlertInfo = (alerts: { type: string; count?: number }[]): {
  alertInfo: AlertInfo;
  label: string;
} => {
  const alertInfo = useMemo((): AlertInfo => {
    if (alerts.length === 0) return { type: ALERT_TYPE.GOOD };
    
    const critical = alerts.filter(a => a.type === ALERT_TYPE.CRITICAL).length;
    const important = alerts.filter(a => a.type === ALERT_TYPE.IMPORTANT).length;
    const moderate = alerts.filter(a => a.type === ALERT_TYPE.MODERATE).length;
    
    if (critical > 0) return { type: ALERT_TYPE.CRITICAL, count: critical };
    if (important > 0) return { type: ALERT_TYPE.IMPORTANT, count: important };
    if (moderate > 0) return { type: ALERT_TYPE.MODERATE, count: moderate };
    
    return { type: ALERT_TYPE.GOOD };
  }, [alerts]);

  const label = useMemo((): string => getAlertLabel(alertInfo.type), [alertInfo.type]);

  return {
    alertInfo,
    label,
  };
}; 