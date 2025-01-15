import React, { useEffect } from "react";
import * as anychart from "anychart";

type Metric = {
  name: string;
  incidents: any[]; 
};

type ChartProps = {
  metrics: any[];
  regions: any[]; 
};

const BarChart3D: React.FC<ChartProps> = ({ metrics, regions }) => {
  useEffect(() => {
    const chartData = {
      header: ['#', 'Incident register', 'Social media register', 'Legal framework register', 'Authority decision assessment'],
      rows: [
        ['Monthly', 6229, 4376, 4054, 2381],
        ['Semi-Annual', 9332, 8987, 5067, 1401],
        ['Yearly', 9256, 7376, 5054, 981],
        ['Special', 4256, 6376, 1054, 181]
      ]
    };
    const chart = anychart.column3d();
    const data: any[] = [];
    metrics.forEach((metric: Metric) => {
      const row = [metric.name];
      row.push(...metric.incidents); 
      data.push(row);
    });

    chart.zDistribution(true);
    chart.data(chartData);
    chart.legend().enabled(true).fontSize(13).padding([0, 0, 20, 0]);
    chart.container("container");
    chart.zAngle(20);
    chart.draw();
  }, [metrics, regions]);

  return (
    <div
      id="container"
      style={{ width: "100%", height: "400px", margin: "0 auto" }}
    ></div>
  );
};

export default BarChart3D;
