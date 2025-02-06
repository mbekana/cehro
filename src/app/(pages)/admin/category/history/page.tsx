"use client";

import React, { useEffect, useState } from "react";
import { FaFolder, FaPlus } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import { Category } from "@/app/model/CategoryModel";
import Button from "@/app/components/UI/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PopConfirm from "@/app/components/UI/PopConfirm";
import Toast from "@/app/components/UI/Toast";

const columns: (keyof Category)[] = ["id", "category", "remark"];

const Categories = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
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
    fetchCategories(1, 10);
  }, []);

  const fetchCategories = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/categories/all?page=${page}&limit=${limit}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchCategories = async (searchQuery:any) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/categories/all?searchQuery=${searchQuery}&page=${pagination.page}&limit=${pagination.limit}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data);
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

  const handlePageChange = (page: number) => {
    setPagination((prevState) => ({
      ...prevState,
      page,
    }));
    fetchCategories(page, pagination.limit); 
  };
  
  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      const nextPage = pagination.page + 1;
      setPagination((prevState) => ({
        ...prevState,
        page: nextPage,
      }));
      fetchCategories(nextPage, pagination.limit);  
    }
  };
  
  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      const prevPage = pagination.page - 1;
      setPagination((prevState) => ({
        ...prevState,
        page: prevPage,
      }));
      fetchCategories(prevPage, pagination.limit);
    }
  };

  const handleAction = (action: string, row: Record<string, any>) => {
    console.log("AM here handle action: ", row.id);
    switch (action) {
      case "details":
        router.push(`/admin/category/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/category/update/${row.id}`);
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
        `${apiUrl}/api/v1/categories/${categoryToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the category");
      }

      console.log(`Category with id ${categoryToDelete} deleted successfully`);
      fetchCategories(1, 10);
      setToast({
        message: "You have successfully deleted category.",
        type: "success",
        position: "top-right",
      });
      setIsPopConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting the category: ", error);
      setToast({
        message: `${error.message}`,
        type: "error",
        position: "top-right",
      });
    }
  };

  const handleSearch = (query: string) => {
    searchCategories(query);
  };

  const handleCancel = () => {
    setIsPopConfirmOpen(false);
    setCategoryToDelete(null); 
  };

  const handleClearSearch = () => {
    searchCategories("");
    fetchCategories(1, 10);
  };

  return (
    <BoxWrapper
      icon={<FaFolder />}
      title="Categories"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="flex flex-1 items-center justify-between mb-2 w-full">
        <Search
          onSearch={handleSearch}
          onClear={handleClearSearch}
          placeholder="Search Categories..."
          buttonText="Search Categories"
        />

        <Link href="/admin/category/create">
          <Button
            color="primary"
            text="Create Category"
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
      {loading ? (
        <div className="ml-2 text-red-500">Loading...</div>
      ) : (
        <>
          <Table columns={columns} data={categories} onAction={handleAction} />
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
        message="Are you sure you want to delete this category?"
        title="Delete Category"
      />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          position={toast.position}
          onClose={() => setToast(null)}
        />
      )}
    </BoxWrapper>
  );
};

export default Categories;
