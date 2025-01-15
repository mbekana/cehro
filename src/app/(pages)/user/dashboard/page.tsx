"use client";

import React, { useState, useEffect } from "react";
import Legend from "@/app/components/shared/Legend";
import legendItems from "@/app/components/shared/LegendItems";
import { regionsData } from "@/app/data/regions";
import dynamic from "next/dynamic";
import LineChart from "@/app/components/UI/LineChart";
import BarChart3D from "@/app/components/UI/BarChart3D";

const IncidentMap = dynamic(() => import("@/app/components/shared/IncidentMap"), {
  ssr: false,
});

const UserMapFeed = () => {
  const [regions, setRegions] = useState<any>(null);

  const legendItemsReverse = [...legendItems].reverse();

  useEffect(() => {
    setRegions(regionsData);
  }, [regions]);

  const dataCurrent = {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Incident register",
        data: [5, 10, 15, 20, 25],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Social media register",
        data: [80, 85, 90, 92, 95],
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "Legal framework register",
        data: [1000, 1500, 2000, 2500, 3000],
        borderColor: "rgb(53, 162, 235)",
        tension: 0.1,
      },
      {
        label: "Authority decision assessment",
        data: [70, 72, 75, 78, 80],
        borderColor: "rgb(255, 159, 64)",
        tension: 0.1,
      },
    ],
  };

  // Modified metrics data
  const metrics = [
    {
      name: "Incident register",
      incidents: [12, 25, 30, 40], 
    },
    {
      name: "Social media register",
      incidents: [80, 85, 90, 95],
    },
    {
      name: "Legal framework register",
      incidents: [20, 30, 40, 50],
    },
    {
      name: "Authority decision assessment",
      incidents: [15, 2, 12, 30],
    },
  ];

  const regionsBar = ["Monthly", "Semi-Annual", "Yearly", "Special"];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#4B5563",
        },
      },
      y: {
        ticks: {
          color: "#4B5563",
        },
      },
    },
  };

  return (
    <div className="h-full max-w-7xl mx-auto px-4">
      {regions ? (
        <div className="w-full">
          {/* Grid layout for charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {/* Current Data (LineChart) */}
            <div className="flex flex-col py-6 px-6 bg-gray-100 rounded-lg shadow-md">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">Current</h1>
              <LineChart data={dataCurrent} options={options} />
            </div>

            {/* Forecast Data (BarChart3D) */}
            <div className="flex flex-col py-6 px-6 bg-gray-100 rounded-lg shadow-md">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">Forecast</h1>
              <BarChart3D metrics={metrics} regions={regionsBar} />
            </div>
          </div>

          {/* Incident Map */}
          <div className="mt-6 py-8 px-4 bg-gray-50 rounded-lg shadow-md">
            <IncidentMap regionsData={regionsData} />
          </div>

          {/* Legend */}
          <div className="mt-6 px-4">
            <Legend legendItems={legendItemsReverse} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UserMapFeed;
