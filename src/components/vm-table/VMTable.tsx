import { useEffect, useMemo, useState } from 'react';
import SortIconDown from '../../assets/arrow-down.svg';
import SortIconUp from '../../assets/arrow-up.svg';
import { SORT_DIRECTION, SORT_FIELD } from '../../constants/vm-table.ts';
import { VMState } from '../../store/types';
import './VMTable.scss';
import VMTableItem from './VMTableItem.tsx';

type SortField = typeof SORT_FIELD[keyof typeof SORT_FIELD];
type SortDirection = typeof SORT_DIRECTION[keyof typeof SORT_DIRECTION];

interface VMTableProps {
  items: VMState[];
}

export default function VMTable({ items }: VMTableProps): React.JSX.Element {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(SORT_DIRECTION.DESC);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSort = (field: SortField): void => {
    if (sortField === field) {
      setSortDirection(sortDirection === SORT_DIRECTION.DESC ? SORT_DIRECTION.ASC : SORT_DIRECTION.DESC);
    } else {
      setSortField(field);
      setSortDirection(SORT_DIRECTION.DESC);
    }
  };

  const handleCopy = async (id: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  useEffect(() => {
    return (): void => {
      if (copiedId) {
        setCopiedId(null);
      }
    };
  }, [copiedId]);

  const sortedItems = useMemo((): VMState[] => {
    if (!sortField) return items;

    return [...items].sort((a, b) => {
      const direction = sortDirection === SORT_DIRECTION.DESC ? 1 : -1;

      switch (sortField) {
        case SORT_FIELD.STATE:
        case SORT_FIELD.UPTIME:
          return direction * String(a[sortField as keyof VMState]).localeCompare(String(b[sortField as keyof VMState]));
        case SORT_FIELD.CPU:
        case SORT_FIELD.MEMORY:
          return direction * (Number(a[sortField as keyof VMState]) - Number(b[sortField as keyof VMState]));
        default:
          return 0;
      }
    });
  }, [items, sortField, sortDirection]);

  const getSortIcon = (): React.JSX.Element =>  sortDirection === SORT_DIRECTION.ASC ? <SortIconUp /> : <SortIconDown />;

  return (
    <div className="vm-table-wrapper">
      <div className="vm-table">
        <div className="vm-table__header">
          <span
          >
            ID
          </span>
          <span
            onClick={() => handleSort(SORT_FIELD.STATE)}
            className={`sortable ${sortField === SORT_FIELD.STATE ? `sort-${sortDirection}` : ''}`}
          >
            State {getSortIcon()}
          </span>
          <span
          >
            Host server
          </span>
          <span
            onClick={() => handleSort(SORT_FIELD.CPU)}
            className={`sortable ${sortField === SORT_FIELD.CPU ? `sort-${sortDirection}` : ''}`}
          >
            CPU {getSortIcon()}
          </span>
          <span
            onClick={() => handleSort(SORT_FIELD.MEMORY)}
            className={`sortable ${sortField === SORT_FIELD.MEMORY ? `sort-${sortDirection}` : ''}`}
          >
            Memory {getSortIcon()}
          </span>
          <span
            onClick={() => handleSort(SORT_FIELD.UPTIME)}
            className={`sortable ${sortField === SORT_FIELD.UPTIME ? `sort-${sortDirection}` : ''}`}
          >
            Uptime {getSortIcon()}
          </span>
          <span
          >
            Alerts 
          </span>
        </div>

        <div className="vm-table__body">
          {sortedItems.map((vm) => (
            <VMTableItem
              key={vm.id}
              vm={vm}
              copiedId={copiedId}
              onCopy={handleCopy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
