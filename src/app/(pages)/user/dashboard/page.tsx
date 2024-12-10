"use client"

import React, { useState, useEffect } from "react";
import Legend from "@/app/components/shared/Legend";
import legendItems from "@/app/components/shared/LegendItems";
import { regionsData } from "@/app/data/regions";
import dynamic from "next/dynamic";

const IncidentMap = dynamic(() => import('@/app/components/shared/Map'), {
  ssr: false, 
});


const UserMapFeed = () => {
  const [regions, setRegions] = useState<any>(null);

  const legendItemsReverse = [...legendItems].reverse();

  useEffect(() => {
    setRegions(regionsData);
    console.log("REGIONS: ", regions)
  }, [regions]); 


  return (
    <div>
      {regions ? (
        <div>
          <IncidentMap regionsData={regions} /> 
          <Legend legendItems={legendItemsReverse} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UserMapFeed;
