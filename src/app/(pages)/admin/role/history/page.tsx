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
import { Role } from "@/app/model/Role";

const columns: (keyof Role)[] = ["id", "role", "remark"];

const UserRoles = () => {
  const router = useRouter();
  const [roles, setRoles] = useState([]);
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
    fetchRoles();
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
        router.push(`/admin/role/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/role/update/${row.id}`);
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
      const response = await fetch(`${apiUrl}/api/v1/roles/${id}`, {
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

      const response = await fetch(`${apiUrl}/api/v1/roles/all`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setRoles(data.data);
        setPagination(data.pagination)
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
      <div className="flex flex-1 items-center justify-between mb-2 w-full">
      <Search
          onSearch={handleSearch}
          placeholder="Search Role..."
          buttonText="Search Role"
        />
        <Link href="/admin/role/create">
          <Button
            color="primary"
            text="Create Role"
            icon={<FaPlus />}
            className="ml-auto"
            size="large"
            borderRadius={5}
          />
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Table columns={columns} data={roles} onAction={handleAction} />
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

export default UserRoles;
