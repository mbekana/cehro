"use client";

import { FaExclamationTriangle, FaPlus } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import { LegalFramework } from "@/app/model/LegalFramework"; 
import { useEffect, useState } from "react";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import Button from "@/app/components/UI/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toast from "@/app/components/UI/Toast";
import PopConfirm from "@/app/components/UI/PopConfirm";

const columns: (keyof LegalFramework)[] = [
  "title",
  "source",
  "zone_subcity",
  "region",
  "metrics",
  "impact",
];

const LegalFrameworksList = () => {
  const router = useRouter(); 
  const [legalFrameworks, setLegalFrameworks] = useState<LegalFramework[]>([]);
  const [loading, setLoading] = useState(true); 
  const [isPopConfirmOpen, setIsPopConfirmOpen] = useState(false);
  const [frameworkToDelete, setFrameWorkToDelete] = useState<number | null>(null);
    const [pagination, setPagination] = useState({
      totalDocs: 0,
      totalPages: 0,
      page: 1, 
      limit: 10,
      pageCounter: 0,
      hasPrevPage: false,
      hasNextPage: false,
    });
  
    const [toast, setToast] = useState<{
      message: string;
      type: "success" | "error";
      position: "top-right";
    } | null>(null);

  useEffect(() => {
    fetchLegalFrameworks()
  }, []);


  const fetchLegalFrameworks = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/legal-frameworks/all`);
      if (response.ok) {
        const data = await response.json();
        setLegalFrameworks(data.data);
        setPagination(data.pagination)
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchLegalFrameworks = async (searchQuery: any) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/legal-frameworks/all?searchQuery=${searchQuery}&page=${pagination.page}&limit=${pagination.limit}`);
      if (response.ok) {
        const data = await response.json();
        setLegalFrameworks(data.data);
        setPagination(data.pagination)
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


  const handleSearch = (query: string) => {
    searchLegalFrameworks(query);
  };

  const handleDelete = async () => {
    if (frameworkToDelete === null) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/legal-frameworks/${frameworkToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the education");
      }

      console.log(`Legal Framework with id ${frameworkToDelete} deleted successfully`);
      fetchLegalFrameworks();
      setToast({
        message: "You have successfully deleted Legal Framework.",
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
  

  const handleAction = (action: string, row: Record<string, any>) => {
    console.log("Handle action:", row.id);
    switch (action) {
      case "details":
        router.push(`/admin/civic-space/legal-framework/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/civic-space/legal-framework/update/${row.id}`);
        break;
      case "delete":
        setFrameWorkToDelete(row.id);
        setIsPopConfirmOpen(true);
        break;
      default:
        break;
    }
  };

  const handleClearSearch = () => {
    searchLegalFrameworks("");
    fetchLegalFrameworks();
  };

  const handleCancel = () => {
    setIsPopConfirmOpen(false);
    setFrameWorkToDelete(null);
  };

  return (
    <>
    <BoxWrapper
      icon={<FaExclamationTriangle />}
      title="Legal Frameworks"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="flex flex-1 items-center justify-between mb-2 w-full">
        <Search
          onSearch={handleSearch}
          onClear={handleClearSearch}
          placeholder="Search Legal Frameworks..."
          buttonText="Search"
        />

        <div className="mr-2">
          <Link href="/admin/civic-space/legal-framework/create">
            <Button
              color="primary"
              text="Legal Framework"
              onClick={() => { console.log("Create Legal Framework clicked") }}
              icon={<FaPlus />}
              className="ml-auto"
              size="large"
              borderRadius={5}
            />
          </Link>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div> 
      ) : (
        <>
          <Table columns={columns} data={legalFrameworks} onAction={handleAction} />
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
          message="Are you sure you want to delete this Legal Framework?"
          title="Legal Framework"
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

export default LegalFrameworksList;
