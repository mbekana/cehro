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

const columns: (keyof Education)[] = ["id", "education", "remark"];

const Educations = () => {
  const router = useRouter();
  const [education, setEducation] = useState<Education[]>([]);
  const [filteredEducation, setFilteredEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    totalDocs: 0,
    totalPages: 0,
    page: 1,
    limit: 10,
    pageCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
  });
  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredEducation.length / rowsPerPage);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/api/v1/educations/all`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setEducation(data.data);
        setFilteredEducation(data.data);
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

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    const filtered = education.filter((edu) =>
      edu.education.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEducation(filtered);
    // setCurrentPage(1);
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
        handleDelete(row.id);
        break;
      default:
        break;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/educations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the education");
      }
      setError(null);
      setSuccessMessage(`Education with id ${id} deleted successfully`);
      console.log(`Education with id ${id} deleted successfully`);
      fetchEducations();
    } catch (error) {
      setError(error);
      console.error("Error deleting the education: ", error);
    }
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
            placeholder="Search Educations..."
            buttonText="Search Educations"
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
              />
            </div>
          </>
        )}
      </BoxWrapper>
      {successMessage && (
        <Toast
          message={successMessage}
          type="success"
          position="top-right"
          onClose={() => setSuccessMessage(null)}
        />
      )}
      {error && (
        <Toast
          message={error}
          type="error"
          position="top-right"
          onClose={() => setError(null)}
        />
      )}
    </>
  );
};

export default Educations;
