"use client";

import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaPlus, FaUserTie } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import { Education } from "@/app/model/EducationModel";
import Link from "next/link";
import Button from "@/app/components/UI/Button";
import { useRouter } from "next/navigation";
import { Occupation } from "@/app/model/Occupation";
import Toast from "@/app/components/UI/Toast";
import PopConfirm from "@/app/components/UI/PopConfirm";

const columns: (keyof Occupation)[] = ["id", "occupation", "remark"];

const Ocupation = () => {
  const router = useRouter();
  const [occupation, setOccupation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopConfirmOpen, setIsPopConfirmOpen] = useState(false);
  const [occupationToDelete, setOccupationToDelete] = useState<number | null>(
    null
  );

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
    fetchOccupations();
  }, []);

  const fetchOccupations = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/occupations/all`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setOccupation(data.data);
        setPagination(data.pagination);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error: any) {
      console.error("Error fetching occupations:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchOccupations = async (searchQuery: any) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/occupations/all?searchQuery=${searchQuery}&page=${pagination.page}&limit=${pagination.limit}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setOccupation(data.data);
        setPagination(data.pagination);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error: any) {
      console.error("Error fetching occupations:", error);
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

  const handleSearch = (query: string) => {
    searchOccupations(query);
  };

  const handleAction = (action: string, row: Record<string, any>) => {
    console.log("AM here handle action: ", row.id);
    switch (action) {
      case "details":
        router.push(`/admin/occupation/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/occupation/update/${row.id}`);
        break;
      case "delete":
        setOccupationToDelete(row.id);
        setIsPopConfirmOpen(true);
        break;
      default:
        break;
    }
  };

  const handleDelete = async () => {
    if (occupationToDelete === null) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/occupations/${occupationToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the occupation");
      }

      console.log(
        `Occupation with id ${occupationToDelete} deleted successfully`
      );
      fetchOccupations();
      setIsPopConfirmOpen(false); 

      setToast({
        message: "You have successfully deleted Education.",
        type: "success",
        position: "top-right",
      });
    } catch (error) {
      console.error("Error deleting the occupation:", error);
    }
  };


  const handleCancel = () => {
    setIsPopConfirmOpen(false);
    setOccupationToDelete(null);
  };

  const handleClearSearch = () => {
    searchOccupations("");
    fetchOccupations();
  };

  return (
    <>
      <BoxWrapper
        icon={<FaUserTie />}
        title="Occupations"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <div className="flex flex-1 items-center justify-between m-2 w-full">
          <Search
            onSearch={handleSearch}
            onClear={handleClearSearch}
            placeholder="Search Occupations..."
            buttonText="Search"
          />
          <Link href="/admin/occupation/create">
            <Button
              color="primary"
              text="Create Occupation"
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
              data={occupation}
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

        <PopConfirm
          isOpen={isPopConfirmOpen}
          onConfirm={handleDelete}
          onCancel={handleCancel}
          message="Are you sure you want to delete this Occupation?"
          title="Delete Occupation"
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

export default Ocupation;
