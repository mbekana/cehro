'use client';

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft } from "react-icons/fa"; 
import { useParams } from "next/navigation"; 
import { Occupation } from "@/app/model/Occupation";

const OccupationDetailsPage = () => {
  const { id } = useParams(); 
  const [occupation, setOccupation] = useState<Occupation | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    console.log("ID: ", id)
    if (id) {
      const fetchOccupationData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

          const response = await fetch(`${apiUrl}/api/v1/occupations/${id}`, { method: 'GET' }); 
          if (response.ok) {
            const data = await response.json();
            console.log("Occupation Data: ", data.data)
            setOccupation(data.data);
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



  return (
    <div >
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="Occupation Detail"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
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
         {occupation ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Occupation Name</h3>
                <p className="text-gray-600">{occupation.occupation}</p> 
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Description</h3>
                <p className="text-gray-600">{occupation.remark}</p>
              </div>
            </div>
          ) : (
            <div>Occupation not found</div>
          )}
       
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default OccupationDetailsPage;
