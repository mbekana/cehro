"use client";

import React, { useEffect, useState } from "react";
import { FaExclamationTriangle, FaPlus } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/UI/Button";
import { Source } from "@/app/model/Source";

const columns: (keyof Source)[] = ["id", "source", "remark"];

const SourceOfInformation = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
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
    fetchSources();
  }, []);

  const handlePageChange = (page: number) => {
    setPagination(prevState => ({
      ...prevState,
      page,
    }));
  };

  const handleAction = (action: string, row: Record<string, any>) => {
    console.log("AM here handle action: ", row.id);
    switch (action) {
      case "details":
        router.push(`/admin/source/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/source/update/${row.id}`);
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
      const response = await fetch(`${apiUrl}/api/v1/sources/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the region");
      }

      console.log(`Region with id ${id} deleted successfully`);
      fetchSources();
    } catch (error) {
      console.error("Error deleting the region: ", error);
    }
  };

  const fetchSources = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/api/v1/sources/all`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setSources(data.data);
        // setFilteredRegions(data);
        setPagination(data.pagination)
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
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
      <div className="flex flex-1 items-center justify-between m-2 w-full">
        <Search
          onSearch={handleSearch}
          placeholder="Search Source..."
          buttonText="Search Source"
        />

        <Link href="/admin/source/create">
          <Button
            color="primary"
            text="Create Source"
            icon={<FaPlus />}
            className="ml-auto"
            size="large"
            borderRadius={5}
          />
        </Link>
      </div>
      <div className="m-2 w-full"></div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Table columns={columns} data={sources} onAction={handleAction} />
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

export default SourceOfInformation;
