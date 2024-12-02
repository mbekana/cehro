'use client';

import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import BoxWrapper from '@/app/components/UI/BoxWrapper';
import Card from '@/app/components/UI/Card';
import Divider from '@/app/components/UI/Divider';
import { useParams } from 'next/navigation';

type Impact = {
  id: number;
  name: string;
  remark: string;
};

const ImpactDetailsPage = () => {
  const { id } = useParams(); 
  const [impact, setImpact] = useState<Impact | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    if (id) {
      const fetchImpactData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
          const response = await fetch(`${apiUrl}/impacts/${id}`);

          if (response.ok) {
            const data = await response.json();
            setImpact(data); 
          } else {
            console.error('Impact not found');
          }
        } catch (error) {
          console.error('Error fetching impact data', error);
        } finally {
          setLoading(false); 
        }
      };

      fetchImpactData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!impact) {
    return <div>Impact not found</div>;
  }

  return (
    <div className="bg-white">
      <BoxWrapper
        icon={<FaExclamationTriangle />}
        title="Impact Details"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <Card
          title="Impact Information"
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
              <h3 className="text-lg font-semibold text-gray-700">Impact ID</h3>
              <p className="text-gray-600">{impact.id}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Impact Name</h3>
              <p className="text-gray-600">{impact.name}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Remark</h3>
              <p className="text-gray-600">{impact.remark}</p>
            </div>
          </div>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default ImpactDetailsPage;
