'use client';

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaInfoCircle } from "react-icons/fa";
import { useParams } from "next/navigation";

const SourceDetailsPage = () => {
  const { id } = useParams(); 
  const [source, setSource] = useState<any | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    if (id) {
      const fetchSourceData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

          const response = await fetch(`${apiUrl}/sources/${id}`, { method: 'GET' }); 
          if (response.ok) {
            const data = await response.json();
            console.log("Source Data: ", data);
            setSource(data); // Set the source data to state
          } else {
            console.error("Source not found");
          }
        } catch (error) {
          console.error("Error fetching source data", error);
        } finally {
          setLoading(false); 
        }
      };

      fetchSourceData();
    }
  }, [id]); // Re-run the fetch if the ID changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!source) {
    return <div>Source not found</div>;
  }

  return (
    <div className="bg-white">
      <BoxWrapper
        icon={<FaInfoCircle />}
        title="Source of Information Details"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Source Information"
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
              <h3 className="text-lg font-semibold text-gray-700">Source ID</h3>
              <p className="text-gray-600">{source.id}</p> 
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Source Name</h3>
              <p className="text-gray-600">{source.name}</p> 
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Remark</h3>
              <p className="text-gray-600">{source.remark}</p> 
            </div>
          </div>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default SourceDetailsPage;
