"use client";

import { FaExclamationTriangle, FaPlus } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import { LegalFramework } from "@/app/model/LegalFramework"; 
import { useEffect, useState } from "react";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import Button from "@/app/components/UI/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const columns: (keyof LegalFramework)[] = [
  "assesementCategory",
  "affectedArea",
  "city",
  "region",
  "metrics",
  "impact",
];

const LegalFrameworksList = () => {
  const router = useRouter(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [legalFrameworksData, setLegalFrameworksData] = useState<LegalFramework[]>([]);
  const [loading, setLoading] = useState(true); 
  const rowsPerPage = 5;

  useEffect(() => {
    fetchLegalFrameworks()
  }, []);


  const fetchLegalFrameworks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/admin/api/civic-space/legal-framework`);
      if (response.ok) {
        const data = await response.json();
        setLegalFrameworksData(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  const totalPages = Math.ceil(legalFrameworksData.length / rowsPerPage);

  const currentData = legalFrameworksData.slice(
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

  const handleDelete = async(id: number) => {
    try{
      const response = await fetch(`/admin/api/civic-space/legal-framework/${id}`, {
        method: 'DELETE',
      });      if (response.ok) {
        fetchLegalFrameworks()
      } 
    }catch(error:any){
      console.log(`Error: ${error}`)
    }
  };

  const handleAction = (action: string, row: Record<string, any>) => {
    console.log("Handle action:", row.id);
    switch (action) {
      case "details":
        router.push(`/admin/civic-space/legal-framework/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/civic-space/legal-framework/update/${row.id}`);
        break;
      case "delete":
        handleDelete(row.id);
        break;
      default:
        break;
    }
  };

  return (
    <BoxWrapper
      icon={<FaExclamationTriangle />}
      title="Legal Frameworks"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="flex flex-1 items-center justify-between m-2 w-full">
        <Search
          onSearch={handleSearch}
          placeholder="Search Legal Frameworks..."
          buttonText="Search"
        />

        <div className="mr-2">
          <Link href="/admin/civic-space/legal-framework/create">
            <Button
              color="primary"
              text="Legal Framework"
              onClick={() => { console.log("Create Legal Framework clicked") }}
              icon={<FaPlus />}
              className="ml-auto"
              size="large"
              borderRadius={5}
            />
          </Link>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div> 
      ) : (
        <>
          <Table columns={columns} data={currentData} onAction={handleAction} />
          <div className="flex justify-end mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </BoxWrapper>
  );
};

export default LegalFrameworksList;
