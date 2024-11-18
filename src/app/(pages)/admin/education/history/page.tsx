'use client';

import React, { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import BoxWrapper from '@/app/components/UI/BoxWrapper';
import Table from '@/app/components/UI/Table';
import Pagination from '@/app/components/UI/Pagination';
import Search from '@/app/components/UI/Search';
import { Education } from '@/app/model/EducationModel';

const educationData = [
    { id: 1, name: "Read and Write", remark: "I Can Read and write." },
    { id: 2, name: "First Degree", remark: "I have First Degree." },
    { id: 3, name: "Deploma", remark: "I have Deploma" },
    { id: 4, name: "Post-graduate Education(MSC,above)", remark: "Post-graduate and above." },
    { id: 5, name: "Second Degree", remark: "Second Degree" },
    { id: 6, name: "Secondary Education", remark: "Secondary Education" },
    { id: 7, name: "Primary Education", remark: "Primary Education." }
  ];
  
const columns: (keyof Education)[] = ['id','name', 'remark'];

const Educations = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(educationData.length / rowsPerPage);

  const currentData = educationData.slice(
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
      title="Educations"  
      borderColor="border-primary"  
      borderThickness="border-b-4"  
    >
      <div className="m-2 w-full">
        <Search onSearch={handleSearch} placeholder="Search Categories..." buttonText="Search Categories" />
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

export default Educations;
