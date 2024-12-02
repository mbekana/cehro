'use client';

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaCalendar } from "react-icons/fa";
import { useParams } from "next/navigation"; 


type CategoryDetails = {
  name: string;
  remark: string;
};

const CategoryDetailsPage = () => {
  const { id } = useParams(); 
  const [category, setCategory] = useState<CategoryDetails | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    console.log("ID: ", id)
    if (id) {
      const fetchCategoryData = async () => {
        try {
          const response = await fetch(`/admin/api/category/${id}`);
          if (response.ok) {
            const data = await response.json();
            setCategory(data);
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
    <div className="bg-gray-100">
      <BoxWrapper
        icon={<FaCalendar />}
        title="Category Details"
        borderColor="border-primary"
        borderThickness="border-b-4"
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
              <h3 className="text-lg font-semibold text-gray-700">Category Name</h3>
              <p className="text-gray-600">{category.name}</p>
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
