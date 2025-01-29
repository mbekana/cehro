"use client";

import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaPlus } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import { Education } from "@/app/model/EducationModel";
import Link from "next/link";
import Button from "@/app/components/UI/Button";
import { useRouter } from "next/navigation";
import { Occupation } from "@/app/model/Occupation";

const columns: (keyof Occupation)[] = ["id", "occupation", "remark"];

const Ocupation = () => {
  const router = useRouter();
  const [occupation, setOccupation] = useState<Education[]>([]);
  const [filteredOccupation, setFilteredOccupation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    totalDocs: 0,
    totalPages: 0,
    page: 1, 
    limit: 10,
    pageCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
  });


  useEffect(() => {
    fetchOccupations();
  }, []);

  const fetchOccupations = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/occupations/all`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setOccupation(data.data);
        setFilteredOccupation(data.data);
        setPagination(data.pagination)
      } else {
        throw new Error("Failed to fetch occupations");
      }
    } catch (error: any) {
      setError("Error fetching occupations: " + error.message);
      console.error("Error fetching occupations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setPagination(prevState => ({
      ...prevState,
      page,
    }));
  };

  const handleSearch = (query: string) => {
    // const filtered = occupation.filter((occup) =>
    //   occup.name.toLowerCase().includes(query.toLowerCase())
    // );
    // setFilteredOccupation(filtered);
    // setCurrentPage(1);
  };

  const handleAction = (action: string, row: Record<string, any>) => {
    console.log("AM here handle action: ", row.id);
    switch (action) {
      case "details":
        router.push(`/admin/occupation/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/occupation/update/${row.id}`);
        break;
      case "delete":
        handleDelete(row.id);
        break;
      default:
        break;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/occupations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the occupation");
      }

      console.log(`Occupation with id ${id} deleted successfully`);
      fetchOccupations();
    } catch (error) {
      console.error("Error deleting the occupation:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <BoxWrapper
      icon={<FaExclamationTriangle />}
      title="Occupations"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="flex flex-1 items-center justify-between m-2 w-full">
        <Search
          onSearch={handleSearch}
          placeholder="Search Occupations..."
          buttonText="Search"
        />
        <Link href="/admin/occupation/create">
          <Button
            color="primary"
            text="Create Occupation"
            icon={<FaPlus />}
            className="ml-auto"
            size="large"
            borderRadius={5}
          />
        </Link>
      </div>
      {loading ? (
        <div className='ml-2 text-red-500'>Loading...</div>
      ) : (
        <>
          <Table columns={columns} data={occupation} onAction={handleAction} />
          <div className="flex justify-end mt-4">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              hasNextPage={pagination.hasNextPage}
              hasPrevPage={pagination.hasPrevPage}
            />
          </div>
        </>
      )}
    </BoxWrapper>
  );
};

export default Ocupation;
