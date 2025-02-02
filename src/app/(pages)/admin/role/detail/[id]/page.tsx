'use client';

import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaUser } from 'react-icons/fa';  
import BoxWrapper from '@/app/components/UI/BoxWrapper';
import Card from '@/app/components/UI/Card';
import Divider from '@/app/components/UI/Divider';

import { useParams } from 'next/navigation';
import { Role } from '@/app/model/Role';


const RoleDetailPage = () => {
  const { id } = useParams();  
  const [role, setRole] = useState<Role | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null);  
  
  useEffect(() => {
    if (id) {
      const fetchRoleDetails = async () => {
        setLoading(true);
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
          const response = await fetch(`${apiUrl}/api/v1/roles/${id}`);
          
          if (response.ok) {
            const data = await response.json();
            setRole(data.data);  
          } else {
            setError('Role not found');
          }
        } catch (err) {
          setError(`Error fetching role: ${err}`);
        } finally {
          setLoading(false);
        }
      };
      fetchRoleDetails();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <BoxWrapper
        icon={<FaArrowLeft />}
        title="Role Detail"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
    >
      <Card
        title="Role Information"
        borderColor="border-red-300"
        borderThickness="border-1"
        bgColor="bg-grey-100"
      >
        <Divider
          borderColor="border-gray-400"
          borderThickness="border-t-2"
          marginTop="mt-1"
          marginBottom="mb-6"
        />
        
        {role && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Role ID</h3>
              <p className="text-gray-600">{role.id}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Role Name</h3>
              <p className="text-gray-600">{role.role}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Remark</h3>
              <p className="text-gray-600">{role.remark}</p>
            </div>
          </div>
        )}
      </Card>
    </BoxWrapper>
  );
};

export default RoleDetailPage;
