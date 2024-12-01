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

const Educations = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [education, setEducation] = useState<Education[]>([]);
  const [filteredEducation, setFilteredEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredEducation.length / rowsPerPage);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/admin/api/education', { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        setEducation(data);
        setFilteredEducation(data); // Set the filtered data initially
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
    const filtered = education.filter((edu) =>
      edu.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEducation(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleAction = (action: string, row: Record<string, any>) => {
    console.log('AM here handle action: ', row.id);
    switch (action) {
      case 'details':
        router.push(`/admin/education/detail/${row.id}`);
        break;
      case 'update':
        router.push(`/admin/education/update/${row.id}`);
        break;
      case 'delete':
        handleDelete(row.id); // Delete action
        break;
      default:
        break;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/admin/api/education/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the education');
      }

      console.log(`Education with id ${id} deleted successfully`);
      fetchEducations(); // Refetch after deletion
    } catch (error) {
      console.error('Error deleting the education: ', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BoxWrapper
      icon={<FaExclamationTriangle />}
      title="Educations"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="flex flex-1 items-center justify-between m-2 w-full">
        <Search onSearch={handleSearch} placeholder="Search Educations..." buttonText="Search Educations" />
        <Link href="/admin/education/create">
          <Button
            color="primary"
            text="Create Education"
            icon={<FaPlus />}
            className="ml-auto"
            size="large"
            borderRadius={5}
          />
        </Link>
      </div>
      <Table columns={columns} data={filteredEducation.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)} onAction={handleAction} />
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

export default Educations;
