"use client";

import React, { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";

import { useRouter } from "next/navigation";

export class Metrics {
  id: number;
  name: string;
  remark: string;
}

const columns: (keyof Metrics)[] = ["id", "name", "remark"];

const Metricses = () => {
  const [metrics, setMetrics] = useState<Metrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const rowsPerPage = 5;

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/metrics`);

        if (response.ok) {
          const data = await response.json();
          setMetrics(data);
        } else {
          console.error("Failed to fetch metrics");
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const totalPages = Math.ceil(metrics.length / rowsPerPage);

  const currentData = metrics.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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
        handleDelete(row.id);
        break;
      default:
        break;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/metrics/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMetrics((prevMetrics) =>
          prevMetrics.filter((metric) => metric.id !== id)
        );
      } else {
        console.error("Failed to delete metric");
      }
    } catch (error) {
      console.error("Error deleting metric:", error);
    }
  };

  const handleSearch = () => {
    console.log("Searching");
  };

  return (
    <BoxWrapper
      icon={<FaExclamationTriangle />}
      title="Metrics"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="flex flex-1 items-center justify-between m-2 w-full">
        <div className="m-2 w-full">
          <Search
            onSearch={handleSearch}
            placeholder="Search Metrics..."
            buttonText="Search Metrics"
          />
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Table
              columns={columns}
              data={currentData}
              onAction={handleAction}
            />
            <div className="flex justify-end mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </BoxWrapper>
  );
};

export default Metricses;
