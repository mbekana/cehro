'use client';

import React, { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import BoxWrapper from '@/app/components/UI/BoxWrapper';
import Table from '@/app/components/UI/Table';
import Pagination from '@/app/components/UI/Pagination';
import Search from '@/app/components/UI/Search';
import { Education } from '@/app/model/EducationModel';

const occupationData = [
    { id: 1, name: "Civil sociaety worker", remark: "Civil Society Worker." },
    { id: 2, name: "Informal Worker", remark: "Informal worker." },
    { id: 3, name: "Civl Servant", remark: "Civil Servant" },
    { id: 4, name: "NGO", remark: "Non-Gevernemental Worker." },
    { id: 5, name: "Private Company", remark: "Private Company" },
    { id: 6, name: "Student,Private", remark: "Student Private" },
    { id: 7, name: "Trader", remark: "Trader." },
    { id: 8, name: "Others", remark: "Others " }
  ];
  
const columns: (keyof Education)[] = ['id','name', 'remark'];

const Ocupation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(occupationData.length / rowsPerPage);

  const currentData = occupationData.slice(
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
      title="Occupations"  
      borderColor="border-primary"  
      borderThickness="border-b-4"  
    >
      <div className="m-2 w-full">
        <Search onSearch={handleSearch} placeholder="Search Occupations..." buttonText="Search" />
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

export default Ocupation;
