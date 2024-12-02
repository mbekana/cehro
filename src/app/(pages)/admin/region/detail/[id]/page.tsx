'use client';

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaUsers } from "react-icons/fa";  // You can use a different icon for the Role if preferred
import { useParams } from "next/navigation"; 

const RoleDetailsPage = () => {
  const { id } = useParams(); 
  const [role, setRole] = useState<any | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    if (id) {
      const fetchRoleData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

          const response = await fetch(`${apiUrl}/roles/${id}`, { method: 'GET' }); 
          if (response.ok) {
            const data = await response.json();
            console.log("Role Data: ", data);
            setRole(data);
          } else {
            console.error("Role not found");
          }
        } catch (error) {
          console.error("Error fetching role data", error);
        } finally {
          setLoading(false); 
        }
      };

      fetchRoleData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!role) {
    return <div>Role not found</div>;
  }

  return (
    <div className="bg-white">
      <BoxWrapper
        icon={<FaUsers />}
        title="Role Details"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Role Information"
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
              <h3 className="text-lg font-semibold text-gray-700">Role ID</h3>
              <p className="text-gray-600">{role.id}</p> 
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Role Name</h3>
              <p className="text-gray-600">{role.name}</p> 
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Remark</h3>
              <p className="text-gray-600">{role.remark}</p> 
            </div>
          </div>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default RoleDetailsPage;
