"use client";

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft } from "react-icons/fa"; 
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

          const response = await fetch(`${apiUrl}/api/v1/educations/${id}`, {
            method: "GET",
          });
          if (response.ok) {
            const data = await response.json();
            console.log("Data: ", data);
            setEducation(data.data);
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

  if (!loading && !education) {
    return <div>Education not found</div>;
  }

  return (
    <div>
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="Education Details"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
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

          {loading ? (
            <div className="ml-2 text-red-500">Loading...</div>
          ) : (
            <>
              {" "}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    ID
                  </h3>
                  <p className="text-gray-600">{education.id}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Title
                  </h3>
                  <p className="text-gray-600">{education.education}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Remark
                  </h3>
                  <p className="text-gray-600">{education.remark}</p>
                </div>
              </div>
            </>
          )}
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default EducationDetailsPage;
