'use client';

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

const columns: (keyof ThematicCategory)[] = ["id", "name", "remark"]; 

const ThematicCategories = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [thematicCategories, setThematicCategories] = useState<ThematicCategory[]>([]);

  const rowsPerPage = 5;

  useEffect(() => {
    fetchThematicCategories();
  }, []);

  const fetchThematicCategories = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/thematicCategories`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setThematicCategories(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(thematicCategories.length / rowsPerPage);

  const currentData = thematicCategories.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
        handleDelete(row.id); 
        break;
      default:
        break;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/thematicCategories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the thematic category");
      }

      console.log(`Thematic Category with id ${id} deleted successfully`);
      fetchThematicCategories();
    } catch (error) {
      console.error("Error deleting the thematic category: ", error);
    }
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  return (
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

export default ThematicCategories;
