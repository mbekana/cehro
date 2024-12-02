'use client';

import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import BoxWrapper from '@/app/components/UI/BoxWrapper';
import Table from '@/app/components/UI/Table';
import Pagination from '@/app/components/UI/Pagination';
import Search from '@/app/components/UI/Search';
import { useRouter } from "next/navigation";


export class Impact{
  id?:string;
  name?:string;
  remark?:string
}

const columns: (keyof Impact)[] = ['id', 'name', 'remark'];

const Impacts = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [impacts, setImpacts] = useState<Impact[]>([]);

  const rowsPerPage = 5;

  useEffect(() => {
    fetchImpacts();
  }, []);

  const fetchImpacts = async (searchQuery: string = '') => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Assuming impacts API URL
      const response = await fetch(`${apiUrl}/impacts?search=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setImpacts(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(impacts.length / rowsPerPage);

  const currentData = impacts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAction = (action: string, row: Record<string, any>) => {
    switch (action) {
      case 'details':
        router.push(`/admin/impact/detail/${row.id}`);
        break;
      case 'update':
        router.push(`/admin/impact/update/${row.id}`);
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/impacts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the impact');
      }

      console.log(`Impact with id ${id} deleted successfully`);
      fetchImpacts(); 
    } catch (error) {
      console.error("Error deleting the impact: ", error);
    }
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    fetchImpacts(query); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BoxWrapper
      icon={<FaExclamationTriangle />}
      title="Impacts"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="flex flex-1 items-center justify-between m-2 w-full">
        <div className="m-2 w-full">
          <Search
            onSearch={handleSearch}
            placeholder="Search Impacts..."
            buttonText="Search Impacts"
          />
        </div>
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

export default Impacts;
