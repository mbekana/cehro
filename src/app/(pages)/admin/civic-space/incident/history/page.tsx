"use client";

import { FaExclamationTriangle, FaPlus } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import { Incident } from "@/app/model/IncidentModel";
import { useEffect, useState } from "react";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import Button from "@/app/components/UI/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const columns: (keyof Incident)[] = [
  "region",
  // "residence",
  "gender",
  "age_group",
  "education",
  "date",
  "occupation",
  "category",
];

const IncidentsList = () => {
  const router = useRouter(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [incidentsData, setIncidentData] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true); 
  const rowsPerPage = 5;

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/admin/api/civic-space/incident`);
      if (response.ok) {
        const data = await response.json();
        setIncidentData(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(incidentsData.length / rowsPerPage);

  const currentData = incidentsData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleDelete = async (id: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/incidents/${id}`, {method:'DELETE'});

      if (!response.ok) {
        throw new Error("Failed to delete the incident");
      }

      console.log(`Incident with id ${id} deleted successfully`);
      fetchIncidents(); 
    } catch (error) {
      console.error("Error deleting the incident: ", error);
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
        handleDelete(row.id); // Delete action
        break;
      default:
        break;
    }
  };

  return (
    <BoxWrapper
      icon={<FaExclamationTriangle />}
      title="Incidents"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="flex flex-1 items-center justify-between m-2 w-full">
        <Search
          onSearch={handleSearch}
          placeholder="Search Incidents..."
          buttonText="Search Incidents"
        />

        <div className="mr-2">
          <Link href="/admin/civic-space/incident/create">
            <Button
              color="primary"
              text="Create Incident"
              onClick={() => { console.log("Hei"); }}
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
          <Table columns={columns} data={currentData} onAction={handleAction} />
          <div className="flex justify-end mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </BoxWrapper>
  );
};

export default IncidentsList;
