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

type News = {
  id:number,
  title: string;
  description: string;
  images: any;
};

const columns: (keyof News)[] = ["title", "description", "images"];  

const NewsList = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const rowsPerPage = 5;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/news`);

        if (response.ok) {
          const data = await response.json();
          setNews(data);
        } else {
          console.error("Failed to fetch news");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const totalPages = Math.ceil(news.length / rowsPerPage);

  const currentData = news.slice(
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
        router.push(`/admin/news/detail/${row.id}`);
        break;
      case "update":
        router.push(`/admin/news/update/${row.id}`);
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
      const response = await fetch(`${apiUrl}/news/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNews((prevNews) =>
          prevNews.filter((newsItem) => newsItem.id !== id)
        );
      } else {
        console.error("Failed to delete news");
      }
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const handleSearch = () => {
    console.log("Searching news");
  };

  return (
    <BoxWrapper
      icon={<FaExclamationTriangle />}
      title="News"
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="flex items-center justify-between m-4">
        <div className="flex items-center space-x-4 w-full">
          <Search
            onSearch={handleSearch}
            placeholder="Search News..."
            buttonText="Search News"
          />
          <Link href="/admin/news/create">
            <Button
              color="primary"
              text="Create News"
              onClick={() => { console.log(""); }}
              icon={<FaPlus />}
              size="large"
              borderRadius={5}
            />
          </Link>
        </div>
      </div>

      {loading ? (
        <div className='ml-2 text-red-500'>Loading...</div>
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

export default NewsList;
