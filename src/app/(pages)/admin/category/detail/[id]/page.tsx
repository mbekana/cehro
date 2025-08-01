"use client";

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";
import { useParams } from "next/navigation";
import { Category } from "@/app/model/CategoryModel";

const CategoryDetailsPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("ID: ", id);
    if (id) {
      const fetchCategoryData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

          const response = await fetch(`${apiUrl}/api/v1/categories/${id}`);
          if (response.ok) {
            const data = await response.json();
            setCategory(data.data);
          } else {
            console.error("Category not found");
          }
        } catch (error) {
          console.error("Error fetching category data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCategoryData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return <div>Category not found</div>;
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
          title="Category Information"
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
              <h3 className="text-lg font-semibold text-gray-700">ID</h3>
              <p className="text-gray-600">{category.id}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Category Name
              </h3>
              <p className="text-gray-600">{category.category}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Remark</h3>
              <p className="text-gray-600">{category.remark}</p>
            </div>
          </div>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default CategoryDetailsPage;
