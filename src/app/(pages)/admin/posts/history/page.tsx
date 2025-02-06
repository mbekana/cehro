"use client";

import React, { useEffect, useState } from "react";
import { FaExclamationTriangle, FaPlus } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/UI/Button";
import PopConfirm from "@/app/components/UI/PopConfirm";
import Toast from "@/app/components/UI/Toast";

type Post = {
  id: number;
  title: string;
  body: string;
  tag?: string;
  images: any;
};

const columns: (keyof Post)[] = ["title", "body", "tag"];

const PostList = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopConfirmOpen, setIsPopConfirmOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
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
    fetchPosts(pagination.page, pagination.limit);
  }, []);

  const fetchPosts = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(
        `${apiUrl}/api/v1/posts/all?page=${page}&limit=${limit}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setPosts(data.data);
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

  const searchPosts = async (searchQuery: any) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/v1/posts/all?searchQuery=${searchQuery}&page=${pagination.page}&limit=${pagination.limit}`
      );

      if (response.ok) {
        const data = await response.json();
        setPosts(data.data);
        setPagination(data.pagination);
        localStorage.setItem("posts", JSON.stringify(data));
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
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
      fetchPosts(nextPage, pagination.limit);
    }
  };

  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      const prevPage = pagination.page - 1;
      setPagination((prevState) => ({
        ...prevState,
        page: prevPage,
      }));
      fetchPosts(prevPage, pagination.limit);
    }
  };

  const handleAction = (action: string, row: Record<string, any>) => {
    switch (action) {
      case "details":
        router.push(`/admin/posts/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/posts/update/${row.id}`);
        break;
      case "delete":
        setPostToDelete(row.id);
        setIsPopConfirmOpen(true);
        break;
      default:
        break;
    }
  };

  const handleDelete = async () => {
    if (postToDelete === null) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/posts/${postToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the education");
      }

      console.log(`Post with id ${postToDelete} deleted successfully`);
      fetchPosts(pagination.page, pagination.limit);
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

  const handleSearch = (query: string) => {
    searchPosts(query);
  };

  const handleClearSearch = () => {
    searchPosts("");
    fetchPosts(pagination.page, pagination.limit);
  };

  const handleCancel = () => {
    setIsPopConfirmOpen(false);
    setPostToDelete(null);
  };

  return (
    <>
      <BoxWrapper
        icon={<FaExclamationTriangle />}
        title="Posts"
        borderColor="border-primary"
        borderThickness="border-b-4"
      >
        <div className="flex items-center justify-between mb-4">
          <Search
            onSearch={handleSearch}
            onClear={handleClearSearch}
            placeholder="Search Posts..."
            buttonText="Search Posts"
          />
          <Link href="/admin/posts/create">
            <Button
              color="primary"
              text="Create Post"
              onClick={() => {
                console.log("");
              }}
              icon={<FaPlus />}
              size="large"
              borderRadius={5}
            />
          </Link>
        </div>

        {loading ? (
          <div className="ml-2 text-red-500">Loading...</div>
        ) : (
          <>
            <Table columns={columns} data={posts} onAction={handleAction} />
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

export default PostList;
