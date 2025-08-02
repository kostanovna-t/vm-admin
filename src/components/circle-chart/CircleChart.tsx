import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import './CircleChart.scss';

export interface ChartDataItem {
  state: string;
  value: number;
  color: string;
}

interface CircleChartProps {
  innerData: ChartDataItem[];
}

const CircleChart: React.FC<CircleChartProps> = ({ innerData }) => {
  const total = innerData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="circle-chart">
      <div className="chart-header">
        <span className="chart-title">State</span>
      </div>
      <div className="chart-wrapper">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={innerData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {innerData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="total-content">
            <div className="total-value">{total}</div>
            <div className="total-label">Total&nbsp;number</div>
          </div>
        </div>

        <div className="chart-legend">
          <div className="legend-items">
            {innerData.map((item, index) => (
              <div key={`legend-${index}`} className="legend-item">
                <span 
                  className="legend-color" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="legend-label">{item.state}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleChart;