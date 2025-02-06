"use client";

import React, { useEffect, useState } from "react";
import { FaPlus, FaUsers } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/UI/Button";
import { User } from "@/app/model/user";
import PopConfirm from "@/app/components/UI/PopConfirm";
import Toast from "@/app/components/UI/Toast";

const columns: (keyof User)[] = [
  "id",
  "firstName",
  "lastName",
  "middleName",
  "userName",
  "email",
];

const UserList = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [isPopConfirmOpen, setIsPopConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    position: "top-right";
  } | null>(null);

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
    fetchUsers(1, 10);
  }, []);

  const fetchUsers = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/users/all?page=${page}&limit=${limit}`
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data.data);
        setPagination(data.pagination);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (searchQuery: string) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/users/all?searchQuery=${searchQuery}&page=${pagination.page}&limit=${pagination.limit}`
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data.data);
        setPagination(data.pagination);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setPagination((prevState) => ({
      ...prevState,
      page,
    }));
    fetchUsers(page, pagination.limit);
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      const nextPage = pagination.page + 1;
      setPagination((prevState) => ({
        ...prevState,
        page: nextPage,
      }));
      fetchUsers(nextPage, pagination.limit);
    }
  };

  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      const prevPage = pagination.page - 1;
      setPagination((prevState) => ({
        ...prevState,
        page: prevPage,
      }));
      fetchUsers(prevPage, pagination.limit);
    }
  };

  const handleSearch = (query: string) => {
    searchUsers(query);
  };

  const handleDelete = async () => {
    if (userToDelete === null) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/api/v1/users/${userToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the incident");
      }
      console.log(`Incident with id ${userToDelete} deleted successfully`);
      fetchUsers(1, 10);
      setToast({
        message: "You have successfully deleted user.",
        type: "success",
        position: "top-right",
      });
      setIsPopConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting the incident: ", error);
    }
  };

  const handleAction = (action: string, row: Record<string, any>) => {
    console.log("ROW: ", row);
    console.log("AM here handle action: ", row.id);
    switch (action) {
      case "details":
        router.push(`/admin/users/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/users/update/${row.id}`);
        break;
      case "delete":
        setUserToDelete(row.id);
        setIsPopConfirmOpen(true);
        break;
      default:
        break;
    }
  };

  const handleCancel = () => {
    setIsPopConfirmOpen(false);
    setUserToDelete(null);
  };

  const handleClearSearch = () => {
    searchUsers("");
    fetchUsers(1, 10);
  };

  return (
    <>
      <BoxWrapper
        icon={<FaUsers />}
        title="Users"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <div className="flex flex-1 items-center justify-between m-2 w-full">
          <Search
            onSearch={handleSearch}
            onClear={handleClearSearch}
            placeholder="Search User..."
            buttonText="Search User"
          />
          <Link href="/admin/users/create">
            <Button
              color="primary"
              text="Create User"
              icon={<FaPlus />}
              className="ml-auto mr-2"
              size="large"
              borderRadius={5}
            />
          </Link>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Table columns={columns} data={users} onAction={handleAction} />
            <div className="flex justify-end mt-4">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                hasNextPage={pagination.hasNextPage}
                hasPrevPage={pagination.hasPrevPage}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
              />
            </div>
          </>
        )}
        <PopConfirm
          isOpen={isPopConfirmOpen}
          onConfirm={handleDelete}
          onCancel={handleCancel}
          message="Are you sure you want to delete this User?"
          title="Delete User"
        />
      </BoxWrapper>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          position={toast.position}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default UserList;
