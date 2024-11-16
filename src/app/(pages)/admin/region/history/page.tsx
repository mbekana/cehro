'use client';


import React, {useState} from 'react'
import { FaGlobe } from 'react-icons/fa';
import BoxWrapper from '@/app/components/UI/BoxWrapper';
import Table from '@/app/components/UI/Table';
import Pagination from '@/app/components/UI/Pagination';
import { Region } from '@/app/model/RegionModel';
import Search from '@/app/components/UI/Search';

const regionsData = [
  { id: 1, name: 'Region 1', population: 2000000 },
  { id: 2, name: 'Region 2', population: 1500000 },
  { id: 3, name: 'Region 3', population: 3000000 },
  { id: 4, name: 'Region 4', population: 2500000 },
  { id: 5, name: 'Region 5', population: 4000000 },
  { id: 6, name: 'Region 6', population: 1800000 },
  { id: 7, name: 'Region 7', population: 2100000 },
  { id: 8, name: 'Region 8', population: 3300000 },
  { id: 9, name: 'Region 9', population: 2200000 },
  { id: 10, name: 'Region 10', population: 3500000 },
];

const columns: (keyof Region)[] = ['id', 'name', 'population'];

const Regions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; 
  const totalPages = Math.ceil(regionsData.length / rowsPerPage);

  const currentData = regionsData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); 
    }
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  return (
    <BoxWrapper
      icon={<FaGlobe />}  
      title="Regions"  
      borderColor="border-primary"  
      borderThickness="border-b-4"  
    >
      <div className="m-2 w-full">
      <Search onSearch={handleSearch} placeholder="Search Incidents..." buttonText="Search Incidents" />
      </div>
      <Table columns={columns} data={currentData} sortKey="name" /> 
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
