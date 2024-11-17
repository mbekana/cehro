'use client';

import React, { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import BoxWrapper from '@/app/components/UI/BoxWrapper';
import Table from '@/app/components/UI/Table';
import Pagination from '@/app/components/UI/Pagination';
import Search from '@/app/components/UI/Search';
import { Education } from '@/app/model/EducationModel';

const roleData = [
    { id: 1, name: "Supper Admin", remark: "Incidents involving vehicles or traffic collisions." },
    { id: 2, name: "Moderator", remark: "Violent acts occurring within the home, often involving family members." },
    { id: 3, name: "Editor", remark: "Dishonest or illegal behavior by public officials or authorities." },
    { id: 4, name: "Publisher", remark: "Incidents involving medical errors, negligence, or accidents in healthcare settings." },
    { id: 5, name: "Maintainer", remark: "Disputes or violent incidents that occur on university or school campuses." },
  ];
  
const columns: (keyof Education)[] = ['id','name', 'remark'];

const UserRoles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(roleData.length / rowsPerPage);

  const currentData = roleData.slice(
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
      title="User Role"  
      borderColor="border-primary"  
      borderThickness="border-b-4"  
    >
      <div className="m-2 w-full">
        <Search onSearch={handleSearch} placeholder="Search Role..." buttonText="Search Role" />
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

export default UserRoles;
