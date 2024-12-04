import React from "react";

interface TagProps {
  status: "APPROVED" | "REJECTED" | "PENDING" | "WARNING"; 
  customText?: string; 
  customColor?: string;
}

const Tag: React.FC<TagProps> = ({ status, customText, customColor }) => {
  let tagColor = "";
  let tagText = "";

  switch (status) {
    case "APPROVED":
      tagColor = "bg-green-500 text-white"; 
      tagText = customText || "Approved"; 
      break;
    case "REJECTED":
      tagColor = "bg-red-500 text-white"; 
      tagText = customText || "Rejected"; 
      break;
    case "PENDING":
      tagColor = "bg-blue-500 text-white"; 
      tagText = customText || "Pending"; 
      break;
    case "WARNING":
      tagColor = "bg-yellow-500 text-white"; 
      tagText = customText || "Warning"; 
      break;
    default:
      tagColor = customColor || "bg-gray-500 text-white"; 
      tagText = customText || "Unknown"; 
      break;
  }

  return (
    <span className={`inline px-4 py-2 rounded-md ${tagColor}`}>
      {tagText}
    </span>
  );
};

export default Tag;
