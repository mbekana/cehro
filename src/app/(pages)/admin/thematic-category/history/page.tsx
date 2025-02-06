"use client";

import React, { useEffect, useState } from "react";
import { FaFolder, FaPlus } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import Button from "@/app/components/UI/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThematicCategory } from "@/app/model/ThematicCategory";
import Toast from "@/app/components/UI/Toast";
import PopConfirm from "@/app/components/UI/PopConfirm";

const columns: (keyof ThematicCategory)[] = ["id", "category", "remark"];

const ThematicCategories = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [thematicCategories, setThematicCategories] = useState<
    ThematicCategory[]
  >([]);
  const [isPopConfirmOpen, setIsPopConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
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
    fetchThematicCategories(pagination.page, pagination.limit);
  }, []);

  const fetchThematicCategories = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/thematic-categories/all?page=${page}&limit=${limit}`,
        { method: "GET" }
      );
      if (response.ok) {
        const data = await response.json();
        setThematicCategories(data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchThematicCategories = async (searchQuery: string) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/thematic-categories/all?searchQuery=${searchQuery}&page=${pagination.page}&limit=${pagination.limit}`
      );
      if (response.ok) {
        const data = await response.json();
        setThematicCategories(data.data);
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
    fetchThematicCategories(page, pagination.limit);
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      const nextPage = pagination.page + 1;
      setPagination((prevState) => ({
        ...prevState,
        page: nextPage,
      }));
      fetchThematicCategories(nextPage, pagination.limit);
    }
  };

  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      const prevPage = pagination.page - 1;
      setPagination((prevState) => ({
        ...prevState,
        page: prevPage,
      }));
      fetchThematicCategories(prevPage, pagination.limit);
    }
  };

  const handleSearch = (query: string) => {
    searchThematicCategories(query);
  };

  const handleAction = (action: string, row: Record<string, any>) => {
    console.log("AM here handle action: ", row.id);
    switch (action) {
      case "details":
        router.push(`/admin/thematic-category/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/thematic-category/update/${row.id}`);
        break;
      case "delete":
        setCategoryToDelete(row.id);
        setIsPopConfirmOpen(true);
        break;
      default:
        break;
    }
  };

  const handleDelete = async () => {
    if (categoryToDelete === null) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/thematic-categories/${categoryToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the thematic category");
      }

      console.log(`Thematic Category with id ${categoryToDelete} deleted successfully`);
      fetchThematicCategories(pagination.page, pagination.limit);
      setToast({
        message: "You have successfully deleted Thematic Category.",
        type: "success",
        position: "top-right",
      });
      setIsPopConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting the thematic category: ", error);
    }
  };

  const handleClearSearch = () => {
    searchThematicCategories("");
    fetchThematicCategories(1, 10);
  };

  const handleCancel = () => {
    setIsPopConfirmOpen(false);
    setCategoryToDelete(null);
  };

  return (
    <>
      <BoxWrapper
        icon={<FaFolder />}
        title="Thematic Categories"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <div className="flex flex-1 items-center justify-between m-2 w-full">
          <div className="m-2 w-full">
            <Search
              onSearch={handleSearch}
              onClear={handleClearSearch}
              placeholder="Search..."
              buttonText="Search"
            />
          </div>
          <div className="mr-2">
            <Link href="/admin/thematic-category/create">
              <Button
                color="primary"
                text="Thematic Category"
                onClick={() => {
                  console.log("Hei");
                }}
                icon={<FaPlus />}
                className="ml-auto"
                size="large"
                borderRadius={5}
              />
            </Link>
          </div>
        </div>
        {loading ? (
          <div className="ml-2 text-red-500">Loading...</div>
        ) : (
          <>
            <Table
              columns={columns}
              data={thematicCategories}
              onAction={handleAction}
            />
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

export default ThematicCategories;
