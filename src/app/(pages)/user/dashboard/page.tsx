"use client";

import React, { useState, useEffect } from "react";
import Legend from "@/app/components/shared/Legend";
import legendItems from "@/app/components/shared/LegendItems";
import { regionsData } from "@/app/data/regions";
import dynamic from "next/dynamic";
import LineChart from "@/app/components/UI/LineChart";

const IncidentMap = dynamic(() => import("@/app/components/shared/Map"), {
  ssr: false,
});

const UserMapFeed = () => {
  const [regions, setRegions] = useState<any>(null);

  const legendItemsReverse = [...legendItems].reverse();

  useEffect(() => {
    setRegions(regionsData);
  }, [regions]);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
        fill: true,
      },
    ],
  };

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
    <div className="h-full border max-w-7xl mx-auto ">
      {regions ? (
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2  h-[320px] mb-20 border ">
            <div className="flex flex-col py-4 px-4 bg-gray-100 ">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                Chart 1
              </h1>
              <LineChart data={data} options={options} />
            </div>
            <div className="flex flex-col py-4 px-4 bg-gray-100">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                Chart 2
              </h1>
              <LineChart data={data} options={options} />
            </div>
          </div>
          <div className="mt-6 py-8">
            <IncidentMap regionsData={regions} />
          </div>
          <div className="mt-6">
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
