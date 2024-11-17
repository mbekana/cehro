'use client';

import React, { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import BoxWrapper from '@/app/components/UI/BoxWrapper';
import Table from '@/app/components/UI/Table';
import Pagination from '@/app/components/UI/Pagination';
import Search from '@/app/components/UI/Search';
import { Category } from '@/app/model/CategoryModel';

const categoriesData = [
    { id: 1, name: "Civic Feedoms", remark: "Incidents involving vehicles or traffic collisions." },
    { id: 2, name: "Unlawfull Government Actions", remark: "Violent acts occurring within the home, often involving family members." },
    { id: 3, name: "Social Descrrimination", remark: "Dishonest or illegal behavior by public officials or authorities." },
    { id: 4, name: "Media and Digital Writes", remark: "Incidents involving medical errors, negligence, or accidents in healthcare settings." },
    { id: 5, name: "Civic Feedom,Civic participation,Unlaw government actions", remark: "Disputes or violent incidents that occur on university or school campuses." },
    { id: 6, name: "Media and degital rights,unlawful goverment actions", remark: "Incidents where property is stolen or taken without permission." },
    { id: 7, name: "Unlawfull gevernment actions,civic freedoms,social descrimination", remark: "Incidents related to farming activities, crop production, or livestock management." },
    { id: 8, name: "Civic freedom,civicparticiapation,media adn digital rights,social descrimination,unlawful goverment actions", remark: "Cases of cheating, plagiarism, or other dishonest practices in academic settings." },
    { id: 9, name: "Social descrimination,unlawfull governmet actions", remark: "Any form of abuse or mistreatment of older individuals." },
    { id: 10, name: "civic feedom,civicparticipation,cso-enabling", remark: "Incidents that lead to harm or destruction of the environment, such as pollution or deforestation." }
  ];
  
const columns: (keyof Category)[] = ['id','name', 'remark'];

const Categories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(categoriesData.length / rowsPerPage);

  const currentData = categoriesData.slice(
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
      title="Categories"  
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

export default Categories;
