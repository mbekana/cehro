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
import { SocialMedia } from "@/app/model/SocialMedia";
import PopConfirm from "@/app/components/UI/PopConfirm";
import Toast from "@/app/components/UI/Toast";

const columns: (keyof SocialMedia)[] = [
  "id",
  "title",
  "zone_subcity",
  "region",
  "metrics",
  "status",
];

const SocialMediaList = () => {
  const router = useRouter();
  const [socialMediaPosts, setSocialMediaPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopConfirmOpen, setIsPopConfirmOpen] = useState(false);
  const [socialMediaToDelete, setSocialMediaToDelete] = useState<number | null>(
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
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/social-medias/all?page=${pagination.page}&limit=${pagination.limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSocialMediaPosts(data.data);
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
        `${apiUrl}/api/v1/social-medias/all?searchQuery=${searchQuery}&page=${pagination.page}&limit=${pagination.limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSocialMediaPosts(data.data);
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
    if (socialMediaToDelete === null) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/social-medias/${socialMediaToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the Social Media");
      }

      console.log(
        `Social Media with id ${socialMediaToDelete} deleted successfully`
      );
      fetchIncidents();
      setToast({
        message: "You have successfully deleted Social Media.",
        type: "success",
        position: "top-right",
      });
      setIsPopConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting the Social Media: ", error);
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
        router.push(`/admin/civic-space/social-media/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/civic-space/social-media/update/${row.id}`);
        break;
      case "delete":
        setSocialMediaToDelete(row.id);
        setIsPopConfirmOpen(true);
        break;
      default:
        break;
    }
  };

  const handleCancel = () => {
    setIsPopConfirmOpen(false);
    setSocialMediaToDelete(null);
  };

  const handleClearSearch = () => {
    searchIncidents("");
    fetchIncidents();
  };

  return (
    <>
      <BoxWrapper
        icon={<FaExclamationTriangle />}
        title="Legal Frameworks"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <div className="flex flex-1 items-center justify-between m-2 w-full">
          <Search
            onSearch={handleSearch}
            onClear={handleClearSearch}
            placeholder="Search Legal Frameworks..."
            buttonText="Search"
          />

          <div className="mr-2">
            <Link href="/admin/civic-space/social-media/create">
              <Button
                color="primary"
                text="Social Media"
                onClick={() => {
                  console.log("Create Legal Framework clicked");
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
              data={socialMediaPosts}
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

export default SocialMediaList;
