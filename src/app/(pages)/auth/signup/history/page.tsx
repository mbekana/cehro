"use client";

import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import { useRouter } from "next/navigation";
type User = {
  id: string;
  name: string;
  email: string;
  gender: string;
  role: string;
  status: string;
  lastLogin: string;
};

const columns: (keyof User)[] = [
  "id",
  "name",
  "email",
  "gender",
  "role",
];

const UserList = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/users`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        setError("Failed to fetch users");
      }
    } catch (err) {
      setError(`Error fetching users: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const currentData = users.slice(
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

  const handleDelete = async (id: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the incident");
      }
      console.log(`Incident with id ${id} deleted successfully`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting the incident: ", error);
    }
  };

  const handleAction = (action: string, row: Record<string, any>) => {
    console.log("AM here handle action: ", row.id);
    switch (action) {
      case "details":
        router.push(`/auth/signup/detail/${row.id}`);
        break;
      case "update":
        router.push(`/auth/signup/update/${row.id}`);
        break;
      case "delete":
        handleDelete(row.id); // Delete action
        break;
      default:
        break;
    }
  };


  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <BoxWrapper
      icon={<FaUsers />}
      title="Users"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="m-2 w-full">
        <Search
          onSearch={handleSearch}
          placeholder="Search Users..."
          buttonText="Search Users"
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

export default UserList;
