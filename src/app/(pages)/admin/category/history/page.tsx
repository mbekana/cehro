"use client";

import React, { useEffect, useState } from "react";
import {  FaFolder, FaPlus } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import { Category } from "@/app/model/CategoryModel";
import Button from "@/app/components/UI/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const columns: (keyof Category)[] = ["id", "category", "remark"];

const Categories = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
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
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/categories/all`, { method: "GET" });
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
        router.push(`/admin/category/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/category/update/${row.id}`);
        break;
      case "delete":
        handleDelete(row.id); // Delete action
        break;
      default:
        break;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the incident");
      }

      console.log(`Incident with id ${id} deleted successfully`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting the incident: ", error);
    }
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
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
            />
          </div>
        </>
      )}
    </BoxWrapper>
  );
};

export default Categories;
