import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import React from 'react';

type HeatmapData = {
  predictor: string;
  [key: string]: number|string; 
};

const data: HeatmapData[] = [
  { predictor: 'Arrests', 'Month+1': 0.2, 'Month+2': 0, 'Month+3': 0.6, 'Month+4': 0.4, 'Month+5': 0, 'Month+6': 0.3, 'Month+7': 0 },
  { predictor: 'Censorship', 'Month+1': 0.3, 'Month+2': 0.1, 'Month+3': 0, 'Month+4': 0.2, 'Month+5': 0, 'Month+6': 0, 'Month+7': 0.2 },
  { predictor: 'Corruption', 'Month+1': 0.5, 'Month+2': 0, 'Month+3': 0.4, 'Month+4': 0.2, 'Month+5': 0, 'Month+6': 0.1, 'Month+7': 0 },
  { predictor: 'Defamation Cases', 'Month+1': 0.7, 'Month+2': 0.5, 'Month+3': 0.3, 'Month+4': 0.6, 'Month+5': 0.2, 'Month+6': 0.4, 'Month+7': 0 },
  { predictor: 'Election Irregularities', 'Month+1': 0.9, 'Month+2': 0.6, 'Month+3': 0.7, 'Month+4': 0.5, 'Month+5': 0.3, 'Month+6': 0.2, 'Month+7': 0 },
];

const months = ['Month+1', 'Month+2', 'Month+3', 'Month+4', 'Month+5', 'Month+6', 'Month+7'];

const getColor = (value: number) => {
  if (value > 0.7) return '#FF4500'; 
  if (value > 0.5) return '#FF8C00';
  if (value > 0.3) return '#FFD700'; 
  if (value > 0.1) return '#ADFF2F';
  return '#32CD32';
};

const GradientLegend = () => (
  <div
    style={{
      height: '100%',
      width: '30px',
      background: 'linear-gradient(to top, #32CD32, #ADFF2F, #FFD700, #FF8C00, #FF4500)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <span style={{ marginTop: '5px', fontSize: '12px', color: '#333' }}>Decrease Impact</span>
    <span style={{ fontSize: '12px', color: '#333' }}>Increase Impact</span>
  </div>
);

const BarChart3D = () => {
  return (
    <div className="w-full h-[500px] bg-white p-6 rounded-lg shadow-lg flex">
      {/* Heatmap Chart */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-center mb-4">Predictors of Civic Space Index</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" hide />
            <YAxis dataKey="predictor" type="category" width={150} />
            <Tooltip cursor={{ fill: 'transparent' }} />
            {months.map((month) => (
              <Bar key={month} dataKey={month} stackId="a">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry[month] as number)} />
                ))}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gradient Legend */}
      <div style={{ flexShrink: 0, height: '400px' }}>
        <GradientLegend />
      </div>
    </div>
  );
};

export default BarChart3D;