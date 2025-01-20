'use client';

import React, { useEffect, useState } from 'react';
import { FaCalendar } from 'react-icons/fa';
import BoxWrapper from '@/app/components/UI/BoxWrapper';
import Card from '@/app/components/UI/Card';
import Divider from '@/app/components/UI/Divider';

import { useParams } from 'next/navigation';

type News = {
  id:number,
  title: string;
  description: string;
  images: any;
};

const NewsDetail = () => {
  const { id } = useParams();  
  const [news, setNews] = useState<News | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null);  
  
  useEffect(() => {
    if (id) {
      const fetchNewsDetails = async () => {
        setLoading(true);
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${apiUrl}/news/${id}`); 
          if (response.ok) {
            const data = await response.json();
            setNews(data);  // Store news data
          } else {
            setError('News not found');
          }
        } catch (err) {
          setError(`Error fetching news: ${err}`);
        } finally {
          setLoading(false);
        }
      };
      fetchNewsDetails();
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
      title="News Details"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <Card
        title="News Information"
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
        
        {news && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">News ID</h3>
              <p className="text-gray-600">{news.id}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">News Title</h3>
              <p className="text-gray-600">{news.title}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Description</h3>
              <p className="text-gray-600">{news.description}</p>
            </div>
            {news.images && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Media</h3>
                <img
                  src={news.images} // Assuming 'images' contains a URL or path
                  alt={news.title}
                  className="w-full max-w-md"
                />
              </div>
            )}
          </div>
        )}
      </Card>
    </BoxWrapper>
  );
};

export default NewsDetail;
