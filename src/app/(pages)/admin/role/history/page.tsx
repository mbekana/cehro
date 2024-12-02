"use client";

import React, { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import { Education } from "@/app/model/EducationModel";
import { useRouter } from "next/navigation";

const columns: (keyof Education)[] = ["id", "name", "remark"];

const UserRoles = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 5;
  const totalPages = Math.ceil(roles.length / rowsPerPage);

  const currentData = roles.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    fetchRoles();
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
      const response = await fetch(`${apiUrl}/roles/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the region");
      }

      console.log(`Region with id ${id} deleted successfully`);
      fetchRoles();
    } catch (error) {
      console.error("Error deleting the region: ", error);
    }
  };

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/regions`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setRoles(data);
        // setFilteredRegions(data);
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
      title="User Role"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="m-2 w-full">
        <Search
          onSearch={handleSearch}
          placeholder="Search Role..."
          buttonText="Search Role"
        />
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

export default UserRoles;
