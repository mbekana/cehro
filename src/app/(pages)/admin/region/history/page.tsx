"use client";

import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaPlus } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import { Region } from "@/app/model/RegionModel";
import Link from "next/link";
import Button from "@/app/components/UI/Button";
import { useRouter } from "next/navigation";
import PopConfirm from "@/app/components/UI/PopConfirm";

const columns: (keyof Region)[] = [
  "id",
  "name",
  "city",
  "lattitude",
  "longitude",
];

const Regions = () => {
  const router = useRouter();
  const [regions, setRegions] = useState<Region[]>([]);
  const [filteredRegions, setFilteredRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopConfirmOpen, setIsPopConfirmOpen] = useState(false);
  const [regionToDelete, setRegionToDelete] = useState<number | null>(null);
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
    fetchRegions(pagination.page, pagination.limit);
  }, []);

  const fetchRegions = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/regions/all?page=${page}&limit=${limit}`,
        { method: "GET" }
      );

      if (response.ok) {
        const data = await response.json();
        setRegions(data.data);
        setFilteredRegions(data.data);
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

  const searchRegions = async (searchQuery: any) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      // Add searchQuery as a query parameter
      const response = await fetch(
        `${apiUrl}/api/v1/regions/all?searchQuery=${searchQuery}&page=${pagination.page}&limit=${pagination.limit}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRegions(data.data);
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

  const handlePageChange = (page: number) => {
    setPagination((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      const nextPage = pagination.page + 1;
      setPagination((prevState) => ({
        ...prevState,
        page: nextPage,
      }));
      fetchRegions(nextPage, pagination.limit);
    }
  };

  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      const prevPage = pagination.page - 1;
      setPagination((prevState) => ({
        ...prevState,
        page: prevPage,
      }));
      fetchRegions(prevPage, pagination.limit);
    }
  };

  const handleSearch = (query: string) => {
    const filtered = regions.filter(
      (region) =>
        region.name.toLowerCase().includes(query.toLowerCase()) ||
        region.city.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRegions(filtered);
    setPagination((prevState) => ({ ...prevState, page: 1 }));
  };

  const handleAction = (action: string, row: Record<string, any>) => {
    switch (action) {
      case "details":
        router.push(`/admin/region/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/region/update/${row.id}`);
        break;
      case "delete":
        setRegionToDelete(row.id);
        setIsPopConfirmOpen(true);
        break;
      default:
        break;
    }
  };

  const handleDelete = async () => {
    if (regionToDelete === null) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/regions/${regionToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the category");
      }

      console.log(`Region with id ${regionToDelete} deleted successfully`);
      fetchRegions(pagination.page, pagination.limit);
      setIsPopConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting the category: ", error);
    }
  };

  const handleCancel = () => {
    setIsPopConfirmOpen(false);
    setRegionToDelete(null);
  };

  const handleClearSearch = () => {
    searchRegions("");
    fetchRegions(pagination.page, pagination.limit);
  };

  return (
    <BoxWrapper
      icon={<FaExclamationTriangle />}
      title="Regions"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="flex flex-1 items-center justify-between mb-2 w-full">
        <Search
          onSearch={handleSearch}
          onClear={handleClearSearch}
          placeholder="Search Regions..."
          buttonText="Search Regions"
        />
        <Link href="/admin/region/create">
          <Button
            color="primary"
            text="Create Region"
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
          <Table
            columns={columns}
            data={filteredRegions}
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
        message="Are you sure you want to delete this Region?"
        title="Delete Region"
      />
    </BoxWrapper>
  );
};

export default Regions;
