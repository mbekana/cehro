"use client";

import React, { useState, useEffect } from "react";
import { FaPlus, FaSchool } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import { Education } from "@/app/model/EducationModel";
import Link from "next/link";
import Button from "@/app/components/UI/Button";
import { useRouter } from "next/navigation";
import Toast from "@/app/components/UI/Toast";
import PopConfirm from "@/app/components/UI/PopConfirm";

const columns: (keyof Education)[] = ["id", "education", "remark"];

const Educations = () => {
  const router = useRouter();
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopConfirmOpen, setIsPopConfirmOpen] = useState(false);
  const [educationToDelete, setEducationToDelete] = useState<number | null>(null);

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
    fetchEducations(pagination.page, pagination.limit);
  }, []);


  const searchEducations = async (searchQuery:any) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/educations/all?searchQuery=${searchQuery}&page=${pagination.page}&limit=${pagination.limit}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setEducation(data.data);
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


  const handleSearch = (query: string) => {
    searchEducations(query);  
  };


  const fetchEducations = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/api/v1/educations/all?page=${page}&limit=${limit}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setEducation(data.data);
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
      fetchEducations(nextPage, pagination.limit);
    }
  };

  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      const prevPage = pagination.page - 1;
      setPagination((prevState) => ({
        ...prevState,
        page: prevPage,
      }));
      fetchEducations(prevPage, pagination.limit);
    }
  };

  const handleAction = (action: string, row: Record<string, any>) => {
    console.log("AM here handle action: ", row.id);
    switch (action) {
      case "details":
        router.push(`/admin/education/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/education/update/${row.id}`);
        break;
      case "delete":
        setEducationToDelete(row.id);
        setIsPopConfirmOpen(true);
        break;
      default:
        break;
    }
  };

  const handleDelete = async () => {
    if (educationToDelete === null) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/educations/${educationToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the education");
      }
   
      console.log(`Education with id ${educationToDelete} deleted successfully`);
      fetchEducations(pagination.page, pagination.limit);
      setToast({
        message: "You have successfully deleted Education.",
        type: "success",
        position: "top-right",
      });
      setIsPopConfirmOpen(false); 
    } catch (error) {
      console.error("Error deleting the education: ", error);
      setToast({
        message: `${error.message}`,
        type: "error",
        position: "top-right",
      });
    }
  };


  const handleCancel = () => {
    setIsPopConfirmOpen(false);
    setEducationToDelete(null);
  };

  const handleClearSearch = () => {
    searchEducations("");  
    fetchEducations(pagination.page, pagination.limit);
  };

  return (
    <>
      <BoxWrapper
        icon={<FaSchool />}
        title="Educations"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <div className="flex flex-1 items-center justify-between mb-2 w-full">
          <Search
            onSearch={handleSearch}
            onClear={handleClearSearch}
            placeholder="Search Educations..."
            buttonText="Search"
          />
          <Link href="/admin/education/create">
            <Button
              color="primary"
              text="Create Education"
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
            <Table columns={columns} data={education} onAction={handleAction} />
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

export default Educations;
