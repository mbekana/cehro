'use client';

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaBookOpen } from "react-icons/fa"; // Change the icon to represent education
import { useParams } from "next/navigation"; 
import { Education } from "@/app/model/EducationModel";



const EducationDetailsPage = () => {
  const { id } = useParams(); 
  const [education, setEducation] = useState<Education | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    if (id) {
      const fetchEducationData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

          const response = await fetch(`${apiUrl}/educations/${id}`, {method:'GET'});
          if (response.ok) {
            const data = await response.json();
            console.log("Data: ", data)
            setEducation(data);
          } else {
            console.error("Education not found");
          }
        } catch (error) {
          console.error("Error fetching education data", error);
        } finally {
          setLoading(false); 
        }
      };

      fetchEducationData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!education) {
    return <div>Education not found</div>;
  }

  return (
    <div className="bg-gray-100">
      <BoxWrapper
        icon={<FaBookOpen />} // Change the icon to something related to education
        title="Education Details"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Education Information"
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
              <h3 className="text-lg font-semibold text-gray-700">Course Title</h3>
              <p className="text-gray-600">{education.id}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Description</h3>
              <p className="text-gray-600">{education.name}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Instructor</h3>
              <p className="text-gray-600">{education.remark}</p>
            </div>
        
          </div>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default EducationDetailsPage;
