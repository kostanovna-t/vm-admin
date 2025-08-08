import React, { useCallback, useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './LinearChart.scss';

export interface DataPoint {
  date: string; 
  value: number;
}

interface LinearChartProps {
  data: DataPoint[];
  data7Days?: DataPoint[];
  data14Days?: DataPoint[];
}

const LinearChart: React.FC<LinearChartProps> = ({ data, data7Days, data14Days }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7' | '14'>('7');

  const formatYAxis = (value: number): string => {
    if (value === 0) return '0TB';
    return `${value}TB`;
  };

  interface TooltipProps {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps): React.JSX.Element | null => {
    if (active && payload && payload.length && payload[0]) {
      return (
        <div className="chart-tooltip">
          <p className="date">{label}</p>
          <p className="value">{`${payload[0].value} TB`}</p>
        </div>
      );
    }
    return null;
  };

  const chartData = useMemo(() => {
    const getChartData = (): DataPoint[] => {
      if (selectedPeriod === '7' && data7Days) {
        return data7Days;
      } 
      if (selectedPeriod === '14' && data14Days) {
        return data14Days;
      }
      return data.slice(-parseInt(selectedPeriod));
    };
    return getChartData();
  }, [selectedPeriod, data, data7Days, data14Days]);

  const handlePeriodChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value as '7' | '14');
  }, []);

  return (
    <div className="linear-chart">
      <div className="chart-header">
        <span className="chart-title">Trend</span>
        <div className="chart-controls">
          <select 
            value={selectedPeriod} 
            onChange={handlePeriodChange}
            className="period-select"
          >
            <option value="7">Last 7 days</option>
            <option value="14">Last 14 days</option>
          </select>
        </div>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="0" 
              stroke="#E5E7EB"
            />
            <XAxis 
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dx={-10}
              domain={[0, 2000]}
              ticks={[0, 500, 1000, 1500, 2000]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LinearChart;