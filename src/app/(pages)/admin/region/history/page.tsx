'use client';

import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaPlus } from 'react-icons/fa';
import BoxWrapper from '@/app/components/UI/BoxWrapper';
import Table from '@/app/components/UI/Table';
import Pagination from '@/app/components/UI/Pagination';
import Search from '@/app/components/UI/Search';
import { Region } from '@/app/model/RegionModel'; 
import Link from 'next/link';
import Button from '@/app/components/UI/Button';
import { useRouter } from 'next/navigation';

const columns: (keyof Region)[] = ['id', 'name', 'city', 'lat', 'long'];

const Regions = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [regions, setRegions] = useState<Region[]>([]);
  const [filteredRegions, setFilteredRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredRegions.length / rowsPerPage);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/admin/api/region', { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        setRegions(data);
        setFilteredRegions(data); 
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    const filtered = regions.filter((region) =>
      region.name.toLowerCase().includes(query.toLowerCase()) ||
      region.city.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRegions(filtered);
    setCurrentPage(1); 
  };

  const handleAction = (action: string, row: Record<string, any>) => {
    console.log('AM here handle action: ', row.id);
    switch (action) {
      case 'details':
        router.push(`/admin/region/detail/${row.id}`);
        break;
      case 'update':
        router.push(`/admin/region/update/${row.id}`);
        break;
      case 'delete':
        handleDelete(row.id); 
        break;
      default:
        break;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/admin/api/region/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the region');
      }

      console.log(`Region with id ${id} deleted successfully`);
      fetchRegions();
    } catch (error) {
      console.error('Error deleting the region: ', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BoxWrapper
      icon={<FaExclamationTriangle />}
      title="Regions"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="flex flex-1 items-center justify-between m-2 w-full">
        <Search onSearch={handleSearch} placeholder="Search Regions..." buttonText="Search Regions" />
        <Link href="/admin/region/create">
          <Button
            color="primary"
            text="Create Region"
            icon={<FaPlus />}
            className="ml-auto"
            size="large"
            borderRadius={5}
          />
        </Link>
      </div>
      <Table columns={columns} data={filteredRegions.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)} onAction={handleAction} />
      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </BoxWrapper>
  );
};

export default Regions;
