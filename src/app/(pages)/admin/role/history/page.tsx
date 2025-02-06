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
import PopConfirm from "@/app/components/UI/PopConfirm";
import Toast from "@/app/components/UI/Toast";

const columns: (keyof Role)[] = ["id", "role", "remark"];

const UserRoles = () => {
  const router = useRouter();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopConfirmOpen, setIsPopConfirmOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<number | null>(null);
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
    fetchRoles(pagination.page, pagination.limit);
  }, []);

  const handlePageChange = (page: number) => {
    setPagination((prevState) => ({
      ...prevState,
      page,
    }));
    fetchRoles(pagination.page, pagination.limit); 
  };
  
  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      const nextPage = pagination.page + 1;
      setPagination((prevState) => ({
        ...prevState,
        page: nextPage,
      }));
      fetchRoles(pagination.page, pagination.limit);  
    }
  };
  
  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      const prevPage = pagination.page - 1;
      setPagination((prevState) => ({
        ...prevState,
        page: prevPage,
      }));
      fetchRoles(pagination.page, pagination.limit);
    }
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
        setRoleToDelete(row.id);
        setIsPopConfirmOpen(true);
        break;
      default:
        break;
    }
  };

  const handleDelete = async () => {
    if (roleToDelete === null) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/roles/${roleToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the Role");
      }

      console.log(`Role with id ${roleToDelete} deleted successfully`);
      fetchRoles(pagination.page, pagination.limit);
      setToast({
        message: "You have successfully deleted Role.",
        type: "success",
        position: "top-right",
      });
      setIsPopConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting the Role: ", error);
      setToast({
        message: `${error.message}`,
        type: "error",
        position: "top-right",
      });
    }
  };

  const fetchRoles = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/api/v1/roles/all?page=${page}&limit=${limit}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setRoles(data.data);
        setPagination(data.pagination);
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

  const searchRoles = async (searchQuery: any) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/roles/all?searchQuery=${searchQuery}&page=${pagination.page}&limit=${pagination.limit}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRoles(data.data);
        setPagination(data.pagination);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsPopConfirmOpen(false);
    setRoleToDelete(null);
  };

  const handleSearch = (query: string) => {
    searchRoles(query);
  };

  const handleClearSearch = () => {
    searchRoles("");
    fetchRoles(pagination.page, pagination.limit);
  };

  return (
    <>
      <BoxWrapper
        icon={<FaExclamationTriangle />}
        title="User Role"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <div className="flex flex-1 items-center justify-between mb-2 w-full">
          <Search
            onSearch={handleSearch}
            onClear={handleClearSearch}
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
          message="Are you sure you want to delete this Role?"
          title="Delete Role"
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

export default UserRoles;
