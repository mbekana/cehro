'use client';

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "next/navigation"; 
import { Region } from "@/app/model/RegionModel"; 

const RegionDetailsPage = () => {
  const { id } = useParams(); 
  const [region, setRegion] = useState<Region | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    if (id) {
      const fetchRegionData = async () => {
        try {
          const response = await fetch(`/admin/api/region/${id}`, { method: 'GET' }); 
          if (response.ok) {
            const data = await response.json();
            console.log("Region Data: ", data);
            setRegion(data);
          } else {
            console.error("Region not found");
          }
        } catch (error) {
          console.error("Error fetching region data", error);
        } finally {
          setLoading(false); 
        }
      };

      fetchRegionData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!region) {
    return <div>Region not found</div>;
  }

  return (
    <div className="bg-white">
      <BoxWrapper
        icon={<FaMapMarkerAlt />}
        title="Region Details"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Region Information"
          borderColor="border-primary"
          borderThickness="border-1"
          bgColor="bg-white"
        >
          <Divider
            borderColor="border-gray-400"
            borderThickness="border-t-2"
            marginTop="mt-1"
            marginBottom="mb-6"
          />
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Region Name</h3>
              <p className="text-gray-600">{region.name}</p> 
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">City</h3>
              <p className="text-gray-600">{region.city}</p> 
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Latitude</h3>
              <p className="text-gray-600">{region.lat}</p> 
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Longitude</h3>
              <p className="text-gray-600">{region.long}</p> 
            </div>
          </div>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default RegionDetailsPage;
