'use client';

import React, { useEffect, useState } from "react";
import { FaExclamationTriangle, FaPlus } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import { useRouter } from "next/navigation";
import { Metrics } from "@/app/model/Metrics";
import Link from "next/link";
import Button from "@/app/components/UI/Button";

const columns: (keyof Metrics)[] = ["id","metrics", "remark"];

const Metricses = () => {
  const [metrics, setMetrics] = useState<Metrics[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/api/v1/metrics/all`);

        if (response.ok) {
          const data = await response.json();
          setMetrics(data.data);
          setPagination(data.pagination)
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

  const handlePageChange = (page: number) => {
    setPagination(prevState => ({
      ...prevState,
      page,
    }));
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
      const response = await fetch(`${apiUrl}/api/v1/metrics/${id}`, {
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
        <div className="flex flex-1 items-center justify-between mb-2 w-full">
    
          <Search
            onSearch={handleSearch}
            placeholder="Search Metrics..."
            buttonText="Search Metrics"
          />
          <Link href="/admin/metrics/create">
            <Button
              color="primary"
              text="Create Metrics"
              onClick={() => { console.log(""); }}
              icon={<FaPlus />}
              size="large"
              borderRadius={5}
            />
          </Link>
        </div>

      {loading ? (
        <div className='ml-2 text-red-500'>Loading...</div>
      ) : (
        <>
          <Table
            columns={columns}
            data={metrics}
            onAction={handleAction}
          />
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

export default Metricses;
