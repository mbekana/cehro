'use client';


import React, {useState} from 'react'
import { FaGlobe } from 'react-icons/fa';
import BoxWrapper from '@/app/components/UI/BoxWrapper';
import Table from '@/app/components/UI/Table';
import Pagination from '@/app/components/UI/Pagination';
import { Region } from '@/app/model/RegionModel';
import Search from '@/app/components/UI/Search';

const regionsData = [
  { id: 1, name: 'Addis Ababa',city:"Addis Ababa",lat:10000,long:200 },
  { id: 2, name: 'Afar', city:"Semera",lat:1200000,long:1234 },
  { id: 3, name: 'Amhara',city:"Bahirdar",lat:12009,long:90000 },
  { id: 4, name: 'Bensahngulgumz',city:"Assossa",lat:2000,long:1000000 },
  { id: 5, name: 'Harare',city:"Harar",lat:200000,long:998877 },
  { id: 6, name: 'Oromia',city:"Adama",lat:29000,long:20000 },
  { id: 7, name: 'Somali',city:"Giggiga",lat:28899,long:10000000 },
  { id: 8, name: 'Sidama',city:"Hawasa",lat:30000900,long:889900 },
  { id: 9, name: 'SSNP',city:"Aribaminch",lat:2000998,long:887767 },
  { id: 10, name: 'Tigray',city:"Mekele",lat:2000,long:1099988 },
];

const columns: (keyof Region)[] = ['id', 'name', 'city','lat','long'];

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
