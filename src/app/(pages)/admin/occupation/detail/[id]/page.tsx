'use client';

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaBriefcase } from "react-icons/fa"; 
import { useParams } from "next/navigation"; 
import { Education } from "@/app/model/EducationModel"; 

const OccupationDetailsPage = () => {
  const { id } = useParams(); 
  const [occupation, setOccupation] = useState<Education | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    if (id) {
      const fetchOccupationData = async () => {
        try {
          const response = await fetch(`/admin/api/occupation/${id}`, { method: 'GET' }); 
          if (response.ok) {
            const data = await response.json();
            console.log("Occupation Data: ", data)
            setOccupation(data);
          } else {
            console.error("Occupation not found");
          }
        } catch (error) {
          console.error("Error fetching occupation data", error);
        } finally {
          setLoading(false); 
        }
      };

      fetchOccupationData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!occupation) {
    return <div>Occupation not found</div>;
  }

  return (
    <div className="bg-gray-100">
      <BoxWrapper
        icon={<FaBriefcase />} 
        title="Occupation Details"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Occupation Information"
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
              <h3 className="text-lg font-semibold text-gray-700">Occupation Name</h3>
              <p className="text-gray-600">{occupation.name}</p> 
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Description</h3>
              <p className="text-gray-600">{occupation.remark}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Remark</h3>
              <p className="text-gray-600">{occupation.remark}</p> 
            </div>
        
          </div>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default OccupationDetailsPage;
