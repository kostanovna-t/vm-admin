import React from 'react';
import { VMState } from '../../store/types';
import CopyIcon from '../../assets/copy.svg';
import WarningIcon from '../../assets/warning.svg';
import DangerIcon from '../../assets/danger.svg';
import CriticalIcon from '../../assets/critical.svg';
import OkIcon from '../../assets/ok.svg';
import { useAlertInfo } from '../../hooks/useAlertInfo';

interface VMTableItemProps {
  vm: VMState;
  copiedId: string | null;
  onCopy: (id: string) => void;
}

type AlertType = 'moderate' | 'critical' | 'important' | 'good';

const getAlertIcon = (type: AlertType): React.JSX.Element => {
  switch (type) {
    case 'critical':
      return <DangerIcon />;
    case 'important':
      return <CriticalIcon />;
    case 'moderate':
      return <WarningIcon />;
    case 'good':
      return <OkIcon />;
    default:
      return <OkIcon />;
  }
};

const VMTableItem: React.FC<VMTableItemProps> = ({ vm, copiedId, onCopy }) => {
  const { alertInfo, label } = useAlertInfo(vm.alerts);

  return (
    <div className="vm-table__row">
      <span className="id-cell">
        <button
          className={`copy-button ${copiedId === vm.id ? 'copied' : ''}`}
          onClick={() => onCopy(vm.id)}
          title="Copy ID"
        >
          <CopyIcon />
          <span className="tooltip">{copiedId === vm.id ? 'Copied!' : 'Copy'}</span>
        </button>
        <span className="id-text" title={vm.id}>{vm.id}</span>
      </span>
      <span className={`status ${vm.state.toLowerCase()}`}>
        {vm.state.charAt(0).toUpperCase() + vm.state.slice(1).toLowerCase()}
      </span>
      <span>{vm.server}</span>
      <span>
        {vm.cpu} CPU
        <div className="bar">
          <div className="fill" style={{ width: `${vm.cpu}%` }}></div>
        </div>
      </span>
      <span>
        {vm.memory} GiB
        <div className="bar">
          <div className="fill" style={{ width: `${vm.memory}%` }}></div>
        </div>
      </span>
      <span>{vm.uptime}</span>
      <span className="alert-cell">
        {getAlertIcon(alertInfo.type)}
        {alertInfo.type !== 'good' && <span className="alert-count">{alertInfo.count}</span>}
        <span className="alert-type">{label}</span>
      </span>
    </div>
  );
};

export default VMTableItem; 