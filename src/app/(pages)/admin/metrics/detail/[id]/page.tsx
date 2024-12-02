'use client';

import React, { useEffect, useState } from 'react';
import { FaCalendar } from 'react-icons/fa';
import BoxWrapper from '@/app/components/UI/BoxWrapper';
import Card from '@/app/components/UI/Card';
import Divider from '@/app/components/UI/Divider';

import { useParams } from 'next/navigation';
import { Metrics } from '@/app/model/Metrics';



const MetricDetail = () => {
  const { id } = useParams();  
  const [metric, setMetric] = useState<Metrics | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null);  
  
  useEffect(() => {
    if (id) {
      const fetchMetricDetails = async () => {
        setLoading(true);
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${apiUrl}/metrics/${id}`);
          if (response.ok) {
            const data = await response.json();
            setMetric(data);  
          } else {
            setError('Metric not found');
          }
        } catch (err) {
          setError(`Error fetching metric: ${err}`);
        } finally {
          setLoading(false);
        }
      };
      fetchMetricDetails();
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
      icon={<FaCalendar />}
      title="Metric Details"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <Card
        title="Metric Information"
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
        
        {metric && (
        <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Metrics ID</h3>
          <p className="text-gray-600">{metric.id}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Metrics Name</h3>
          <p className="text-gray-600">{metric.name}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Remark</h3>
          <p className="text-gray-600">{metric.remark}</p>
        </div>
      </div>
        )}
      </Card>
    </BoxWrapper>
  );
};

export default MetricDetail;
