'use client';

import React, { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import BoxWrapper from '@/app/components/UI/BoxWrapper';
import Table from '@/app/components/UI/Table';
import Pagination from '@/app/components/UI/Pagination';
import Search from '@/app/components/UI/Search';
import { Education } from '@/app/model/EducationModel';

const sourceData = [
    { id: 1, name: "I observed the incident my self", remark: "I observed the incidence my self." },
    { id: 2, name: "Social Media", remark: "I get the information from social media" },
    { id: 3, name: "Victims of the incidence", remark: "Victims Report the incidence." },
    { id: 4, name: "Police Report", remark: "The police reports the incidence." },
    { id: 5, name: "Community Residents", remark: "Community Residents" },
    { id: 6, name: "New Website", remark: "News Media like BBC,CNN website" },
    { id: 7, name: "Television Program", remark: "On Television Program." },
    { id: 8, name: "Others", remark: "Other sources." }
  ];
  
const columns: (keyof Education)[] = ['id','name', 'remark'];

const SourceOfInformation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(sourceData.length / rowsPerPage);

  const currentData = sourceData.slice(
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
      icon={<FaExclamationTriangle />}  
      title="Source Of Information"  
      borderColor="border-primary"  
      borderThickness="border-b-4"  
    >
      <div className="m-2 w-full">
        <Search onSearch={handleSearch} placeholder="Search Source..." buttonText="Search Source" />
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

export default SourceOfInformation;
