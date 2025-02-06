"use client";

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";
import { useParams } from "next/navigation";
import { ThematicCategory } from "@/app/model/ThematicCategory";

const ThematicCategoryDetailsPage = () => {
  const { id } = useParams();
  const [thematicCategory, setThematicCategory] =
    useState<ThematicCategory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("ID: ", id);
    if (id) {
      const fetchThematicCategoryData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

          const response = await fetch(
            `${apiUrl}/api/v1/thematic-categories/${id}`
          );
          if (response.ok) {
            const data = await response.json();
            setThematicCategory(data.data);
          } else {
            console.error("Thematic Category not found");
          }
        } catch (error) {
          console.error("Error fetching thematic category data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchThematicCategoryData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!thematicCategory) {
    return <div>Thematic Category not found</div>;
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
          title="Thematic Category Information"
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
              <h3 className="text-lg font-semibold text-gray-700">
                Thematic Category Name
              </h3>
              <p className="text-gray-600">{thematicCategory.category}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Remark</h3>
              <p className="text-gray-600">{thematicCategory.remark}</p>
            </div>
          </div>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default ThematicCategoryDetailsPage;
