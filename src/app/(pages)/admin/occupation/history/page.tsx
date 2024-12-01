'use client';

import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaPlus } from 'react-icons/fa';
import BoxWrapper from '@/app/components/UI/BoxWrapper';
import Table from '@/app/components/UI/Table';
import Pagination from '@/app/components/UI/Pagination';
import Search from '@/app/components/UI/Search';
import { Education } from '@/app/model/EducationModel';
import Link from 'next/link';
import Button from '@/app/components/UI/Button';
import { useRouter } from 'next/navigation';

const columns: (keyof Education)[] = ['id', 'name', 'remark'];

const Ocupation = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [occupation, setOccupation] = useState<Education[]>([]);
  const [filteredOccupation, setFilteredOccupation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const rowsPerPage = 5;

  useEffect(() => {
    fetchOccupations();
  }, []);

  const fetchOccupations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/admin/api/occupation', { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        setOccupation(data);
        setFilteredOccupation(data); // Set both to the full list initially
      } else {
        throw new Error('Failed to fetch occupations');
      }
    } catch (error: any) {
      setError('Error fetching occupations: ' + error.message);
      console.error('Error fetching occupations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Math.ceil(filteredOccupation.length / rowsPerPage)) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (query: string) => {
    const filtered = occupation.filter((occup) =>
      occup.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOccupation(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleAction = (action: string, row: Record<string, any>) => {
    console.log('AM here handle action: ', row.id);
    switch (action) {
      case 'details':
        router.push(`/admin/occupation/detail/${row.id}`);
        break;
      case 'update':
        router.push(`/admin/occupation/update/${row.id}`);
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
      const response = await fetch(`/admin/api/occupation/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the occupation');
      }

      console.log(`Occupation with id ${id} deleted successfully`);
      fetchOccupations(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting the occupation:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Calculate total pages based on filteredOccupation
  const totalPages = Math.ceil(filteredOccupation.length / rowsPerPage);

  const currentData = filteredOccupation.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <BoxWrapper
      icon={<FaExclamationTriangle />}
      title="Occupations"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="flex flex-1 items-center justify-between m-2 w-full">
        <Search onSearch={handleSearch} placeholder="Search Occupations..." buttonText="Search" />
        <Link href="/admin/occupation/create">
          <Button
            color="primary"
            text="Create Occupation"
            icon={<FaPlus />}
            className="ml-auto"
            size="large"
            borderRadius={5}
          />
        </Link>
      </div>
      <Table columns={columns} data={currentData} onAction={handleAction} />
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

export default Ocupation;
