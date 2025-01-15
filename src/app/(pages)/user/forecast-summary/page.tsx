import UserLayout from "@/app/components/layout/UserLayout";
import React from "react";

const ForeCastSummary = () => {
  return (
    <div>
      <UserLayout />
      <div className="w-full h-screen flex flex-col items-center bg-white py-6">
        <div className="w-[1200px]">
        <img
          src="/r_graph.jpeg"
          alt="Descriptive Alt Text"
          className="w-full object-cover"
        />
        </div>
      </div>
    </div>
  );
};

export default ForeCastSummary;
