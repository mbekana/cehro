"use client";

import React, { useEffect, useState } from "react";
import { FaExclamationTriangle, FaFire, FaPlus } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import { useRouter } from "next/navigation";
import { Impact } from "@/app/model/Impact";
import Link from "next/link";
import Button from "@/app/components/UI/Button";
import Toast from "@/app/components/UI/Toast";
import PopConfirm from "@/app/components/UI/PopConfirm";

const columns: (keyof Impact)[] = ["id", "impact", "remark"];

const Impacts = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [isPopConfirmOpen, setIsPopConfirmOpen] = useState(false);
  const [impactToDelete, setImpactToDelete] = useState<number | null>(null);

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
    fetchImpacts(pagination.page, pagination.limit);
  }, []);

  const fetchImpacts = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/impacts/all?page=${page}&limit=${limit}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setImpacts(data.data);
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

  const searchImpacts = async (searchQuery: any) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/impacts/all?searchQuery=${searchQuery}&page=${pagination.page}&limit=${pagination.limit}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setImpacts(data.data);
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

  const handleAction = (action: string, row: Record<string, any>) => {
    switch (action) {
      case "details":
        router.push(`/admin/impact/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/impact/update/${row.id}`);
        break;
      case "delete":
        setImpactToDelete(row.id);
        setIsPopConfirmOpen(true);
        break;
      default:
        break;
    }
  };

  const handleDelete = async () => {
    if (impactToDelete === null) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/impacts/${impactToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the impact");
      }
      fetchImpacts(pagination.page, pagination.limit);
      setToast({
        message: "You have successfully deleted Education.",
        type: "success",
        position: "top-right",
      });
      setIsPopConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting the impact: ", error);
      setToast({
        message: `${error.message}`,
        type: "error",
        position: "top-right",
      });
    }
  };

  const handleSearch = (query: string) => {
    searchImpacts(query);
  };

  const handlePageChange = (page: number) => {
    setPagination((prevState) => ({
      ...prevState,
      page,
    }));
    fetchImpacts(page, pagination.limit);
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      const nextPage = pagination.page + 1;
      setPagination((prevState) => ({
        ...prevState,
        page: nextPage,
      }));
      fetchImpacts(nextPage, pagination.limit);
    }
  };

  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      const prevPage = pagination.page - 1;
      setPagination((prevState) => ({
        ...prevState,
        page: prevPage,
      }));
      fetchImpacts(prevPage, pagination.limit);
    }
  };
  const handleCancel = () => {
    setIsPopConfirmOpen(false);
    setImpactToDelete(null);
  };

  const handleClearSearch = () => {
    searchImpacts("");
    fetchImpacts(pagination.page, pagination.limit);
  };

  return (
    <>
      <BoxWrapper
        icon={<FaFire />}
        title="Impacts"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <div className="flex flex-1 items-center justify-between mb-2 w-full">
          <Search
            onSearch={handleSearch}
            onClear={handleClearSearch}
            placeholder="Search Impacts..."
            buttonText="Search Impacts"
          />
          <Link href="/admin/impact/create">
            <Button
              color="primary"
              text="Create Impacts"
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
            <Table columns={columns} data={impacts} onAction={handleAction} />
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
          message="Are you sure you want to delete this Impact?"
          title="Delete Impact"
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

export default Impacts;
