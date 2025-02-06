"use client";

import React, { useEffect, useState } from "react";
import { FaChartBar, FaExclamationTriangle, FaPlus } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import { useRouter } from "next/navigation";
import { Metrics } from "@/app/model/Metrics";
import Link from "next/link";
import Button from "@/app/components/UI/Button";
import PopConfirm from "@/app/components/UI/PopConfirm";

const columns: (keyof Metrics)[] = ["id", "metrics", "remark"];

const Metricses = () => {
  const [metrics, setMetrics] = useState<Metrics[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isPopConfirmOpen, setIsPopConfirmOpen] = useState(false);
  const [metricsToDelete, setMetricsToDelete] = useState<number | null>(null);
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
    fetchMetrics(pagination.page, pagination.limit);
  }, []);

  const fetchMetrics = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/metrics/all?page=${page}&limit=${limit}`);

      if (response.ok) {
        const data = await response.json();
        setMetrics(data.data);
        setPagination(data.pagination);
      } else {
        console.error("Failed to fetch metrics");
      }
    } catch (error) {
      console.error("Error fetching metrics:", error);
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
      fetchMetrics(nextPage, pagination.limit);
    }
  };

  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      const prevPage = pagination.page - 1;
      setPagination((prevState) => ({
        ...prevState,
        page: prevPage,
      }));
      fetchMetrics(prevPage, pagination.limit);
    }
  };


  const searchMetrics = async (searchQuery: any) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/metrics/all?searchQuery=${searchQuery}&page=${pagination.page}&limit=${pagination.limit}`
      );

      if (response.ok) {
        const data = await response.json();
        setMetrics(data.data);
        setPagination(data.pagination);
      } else {
        console.error("Failed to fetch metrics");
      }
    } catch (error) {
      console.error("Error fetching metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (action: string, row: Record<string, any>) => {
    switch (action) {
      case "details":
        router.push(`/admin/metrics/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/metrics/update/${row.id}`);
        break;
      case "delete":
        setMetricsToDelete(row.id);
        setIsPopConfirmOpen(true);
        break;
      default:
        break;
    }
  };

  const handleDelete = async () => {
    if (metricsToDelete === null) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/metrics/${metricsToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchMetrics(pagination.page, pagination.limit);
        setToast({
          message: "You have successfully deleted Metrics.",
          type: "success",
          position: "top-right",
        });
        setIsPopConfirmOpen(false)
      } else {
        console.error("Failed to delete metric");
      }
    } catch (error) {
      console.error("Error deleting metric:", error);
      setToast({
        message: `${error.message}`,
        type: "error",
        position: "top-right",
      });
    }
  };

  const handleSearch = (query: string) => {
    searchMetrics(query);
  };

  const handleCancel = () => {
    setIsPopConfirmOpen(false);
    setMetricsToDelete(null);
  };

  const handleClearSearch = () => {
    searchMetrics("");
    fetchMetrics(pagination.page, pagination.limit);
  };

  return (
    <BoxWrapper
      icon={<FaChartBar />}
      title="Metrics"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="flex flex-1 items-center justify-between mb-2 w-full">
        <Search
          onSearch={handleSearch}
          onClear={handleClearSearch}
          placeholder="Search Metrics..."
          buttonText="Search Metrics"
        />
        <Link href="/admin/metrics/create">
          <Button
            color="primary"
            text="Create Metrics"
            onClick={() => {
              console.log("");
            }}
            icon={<FaPlus />}
            size="large"
            borderRadius={5}
          />
        </Link>
      </div>

      {loading ? (
        <div className="ml-2 text-red-500">Loading...</div>
      ) : (
        <>
          <Table columns={columns} data={metrics} onAction={handleAction} />
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
        message="Are you sure you want to delete this Metrics?"
        title="Delete Metrics"
      />
    </BoxWrapper>
  );
};

export default Metricses;
