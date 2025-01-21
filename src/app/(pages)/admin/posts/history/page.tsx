'use client';

import React, { useEffect, useState } from "react";
import { FaExclamationTriangle, FaPlus } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Table from "@/app/components/UI/Table";
import Pagination from "@/app/components/UI/Pagination";
import Search from "@/app/components/UI/Search";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/UI/Button";

type Post = {
  id: number;
  title: string;
  description: string;
  images: any;
};

const columns: (keyof Post)[] = ["title", "description", "images"];

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const rowsPerPage = 5;

  const placeholderPosts: Post[] = [
    { id: 1, title: "Placeholder Post 1", description: "This is a placeholder post.", images: "" },
    { id: 2, title: "Placeholder Post 2", description: "This is another placeholder post.", images: "" },
  ];

  useEffect(() => {
    const savedPosts = localStorage.getItem("blogPosts");

    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
      setLoading(false);
    } else {
      setPosts(placeholderPosts);
      localStorage.setItem("posts", JSON.stringify(placeholderPosts));
      fetchPosts();
    }
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/posts`);

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
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

  const totalPages = Math.ceil(posts.length / rowsPerPage);

  const currentData = posts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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
        handleDelete(row.id);
        break;
      default:
        break;
    }
  };

  const handleDelete = (id: number) => {
    const updatedPosts = posts.filter((postItem) => postItem.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleSearch = () => {
    console.log("Searching posts");
  };

  return (
    <BoxWrapper
      icon={<FaExclamationTriangle />}
      title="Posts"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="flex items-center justify-between m-4">
        <div className="flex items-center space-x-4 w-full">
          <Search
            onSearch={handleSearch}
            placeholder="Search Posts..."
            buttonText="Search Posts"
          />
          <Link href="/admin/posts/create">
            <Button
              color="primary"
              text="Create Post"
              onClick={() => { console.log(""); }}
              icon={<FaPlus />}
              size="large"
              borderRadius={5}
            />
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="ml-2 text-red-500">Loading...</div>
      ) : (
        <>
          <Table
            columns={columns}
            data={currentData}
            onAction={handleAction}
          />
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

export default PostList;
