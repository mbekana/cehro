"use client";

import {  FaPlus, FaUserShield } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import { useEffect, useState } from "react";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import Button from "@/app/components/UI/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LegalFramework } from "@/app/model/LegalFramework";
import { AuthorityDecision } from "@/app/model/AuthorityDecision";
import PopConfirm from "@/app/components/UI/PopConfirm";
import Toast from "@/app/components/UI/Toast";

const columns: (keyof AuthorityDecision)[] = [
  "id",
  "region",
  "source",
  "scope",
  "summary"
];

const AuthorityDecisionList = () => {
  const router = useRouter(); 
  const [authorityDecision, setAuthorityDecision] = useState<AuthorityDecision[]>([]);
  const [loading, setLoading] = useState(true); 
  const [isPopConfirmOpen, setIsPopConfirmOpen] = useState(false);
  const [decisionToDelete, setDecisionToDelete] = useState<number | null>(null);
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
    fetchAuthorityDecision();
  }, []);

  const fetchAuthorityDecision = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/api/v1/authorative-decisions/all`);
      if (response.ok) {
        const data = await response.json();
        console.log("Data: ", data.data)
        setAuthorityDecision(data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchAuthorityDecision = async (searchQuery: any) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/api/v1/authorative-decisions/all?searchQuery=${searchQuery}&page=${pagination.page}&limit=${pagination.limit}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Data: ", data.data)
        setAuthorityDecision(data.data);
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
  };

  const handleDelete = async () => {
    if (decisionToDelete === null) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/authorative-decisions/${decisionToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the education");
      }

      console.log(`Authority Decision with id ${decisionToDelete} deleted successfully`);
      fetchAuthorityDecision();
      setToast({
        message: "You have successfully deleted Authority Decision.",
        type: "success",
        position: "top-right",
      });
      setIsPopConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting the Authority Decision: ", error);
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
        router.push(`/admin/civic-space/authority-decision/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/civic-space/authority-decision/update/${row.id}`); 
        break;
      case "delete":
        setDecisionToDelete(row.id);
        setIsPopConfirmOpen(true);
        break;
      default:
        break;
    }
  };

  const handleClearSearch = () => {
    searchAuthorityDecision("");
    fetchAuthorityDecision();
  };

  const handleCancel = () => {
    setIsPopConfirmOpen(false);
    setDecisionToDelete(null);
  };

  return (
    <>
    <BoxWrapper
      icon={<FaUserShield />}
      title="Authority Decision "
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="flex flex-1 items-center justify-between m-2 w-full">
        <Search
          onSearch={handleSearch}
          onClear={handleClearSearch}
          placeholder="Search ..."
          buttonText="Search "
        />

        <div className="mr-2">
          <Link href="/admin/civic-space/authority-decision/create">
            <Button
              color="primary"
              text="Authority Decision"
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
          <Table columns={columns} data={authorityDecision} onAction={handleAction} />
          <div className="flex justify-end mt-4">
          <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                hasNextPage={pagination.hasNextPage}
                hasPrevPage={pagination.hasPrevPage}
                onPageChange={handlePageChange}
              />
          </div>
        </>
      )}
      <PopConfirm
          isOpen={isPopConfirmOpen}
          onConfirm={handleDelete}
          onCancel={handleCancel}
          message="Are you sure you want to delete this Authority Decision?"
          title="Delete Authority Decision"
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

export default AuthorityDecisionList;
