"use client";

import { FaExclamationTriangle, FaPlus } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import { useEffect, useState } from "react";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import Button from "@/app/components/UI/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Incident } from "@/app/model/Incident";
import Toast from "@/app/components/UI/Toast";
import PopConfirm from "@/app/components/UI/PopConfirm";

const columns: (keyof Incident)[] = [
  "region",
  // "residence",
  "gender",
  "age",
  "education",
  "date",
  "occupation",
  "metrics",
];

const IncidentsList = () => {
  const router = useRouter();
  const [incidentsData, setIncidentData] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopConfirmOpen, setIsPopConfirmOpen] = useState(false);
  const [incidentToDelete, setIncidentToDelete] = useState<number | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    position: "top-right";
  } | null>(null);

  const [pagination, setPagination] = useState({
    totalDocs: 0,
    totalPages: 0,
    page: 0,
    limit: 0,
    pageCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
  });

  useEffect(() => {
    fetchIncidents(pagination.page, pagination.limit);
  }, []);

  const fetchIncidents = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/incidents/all?page=${page}&limit=${limit}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("INCIDENTS: ", data.data);
        setIncidentData(data.data);
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

  const searchIncidents = async (searchQuery: any) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/incidents/all?searchQuery=${searchQuery}&page=${pagination.page}&limit=${pagination.limit}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("INCIDENTS: ", data.data);
        setIncidentData(data.data);
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
    searchIncidents(query);
  };

  const handleDelete = async () => {
    if (incidentToDelete === null) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/incidents/${incidentToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the education");
      }

      console.log(`Incident with id ${incidentToDelete} deleted successfully`);
      fetchIncidents(pagination.page, pagination.limit);
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
  
  const handleAction = (action: string, row: Record<string, any>) => {
    console.log("AM here handle action: ", row.id);
    switch (action) {
      case "details":
        router.push(`/admin/civic-space/incident/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/civic-space/incident/update/${row.id}`);
        break;
      case "delete":
        setIncidentToDelete(row.id);
        setIsPopConfirmOpen(true);
        break;
      default:
        break;
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      const nextPage = pagination.page + 1;
      setPagination((prevState) => ({
        ...prevState,
        page: nextPage,
      }));
      fetchIncidents(nextPage, pagination.limit);
    }
  };

  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      const prevPage = pagination.page - 1;
      setPagination((prevState) => ({
        ...prevState,
        page: prevPage,
      }));
      fetchIncidents(prevPage, pagination.limit);
    }
  };


  const handleClearSearch = () => {
    searchIncidents("");
    fetchIncidents(pagination.page, pagination.limit);
  };

  const handleCancel = () => {
    setIsPopConfirmOpen(false);
    setIncidentToDelete(null);
  };

  return (
    <>
      <BoxWrapper
        icon={<FaExclamationTriangle />}
        title="Incidents Managemenet"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <div className="flex flex-1 items-center justify-between mb-2 w-full">
          <Search
            onSearch={handleSearch}
            onClear={handleClearSearch}
            placeholder="Search Incidents..."
            buttonText="Search Incidents"
          />

          <div className="mr-2">
            <Link href="/admin/civic-space/incident/create">
              <Button
                color="primary"
                text="Create Incident"
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
          <div>Loading...</div>
        ) : (
          <>
            <Table
              columns={columns}
              data={incidentsData}
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

export default IncidentsList;
