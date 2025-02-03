"use client";

import {
  FaArrowLeft,
  FaCheck,
  FaExternalLinkAlt,
  FaTimes,
} from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Button from "@/app/components/UI/Button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Toast from "@/app/components/UI/Toast";
import Image from "next/image";

const LegalFrameworkDetail = () => {
  const { id } = useParams();

  const [legalFramework, setLegalFramework] = useState<any | null>(null);
  const [mediaType, setMediaType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    position: "top-right";
  } | null>(null);

  useEffect(() => {
    const fetchLegalFrameworkData = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${apiUrl}/api/v1/legal-frameworks/${id}`);
        if (response.ok) {
          const data: any = await response.json();
          setLegalFramework(data.data);
        } else {
          console.error("Failed to fetch legal framework data");
        }
      } catch (error) {
        console.error("Error fetching legal framework data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLegalFrameworkData();
  }, [id]);

  useEffect(() => {
    if (legalFramework?.video) {
      const mediaUrl = legalFramework.video;
      if (
        mediaUrl.endsWith(".jpg") ||
        mediaUrl.endsWith(".png") ||
        mediaUrl.endsWith(".jpeg")
      ) {
        setMediaType("image");
      } else if (
        mediaUrl.includes("youtube.com") ||
        mediaUrl.includes("youtu.be")
      ) {
        setMediaType("video");
      } else if (mediaUrl.endsWith(".pdf")) {
        setMediaType("pdf");
      } else {
        setMediaType("none");
      }
    } else {
      setMediaType("none");
    }
  }, [legalFramework]);

  const handleApprove = async () => {
    setLoading(true);

    try {
      const updatedLegalFramework = {
        ...legalFramework,
        status: "APPROVED",
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/legal-frameworks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLegalFramework),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("DATA: ", data);
        setLegalFramework(data.data);
        setToast({
          message: "You have successfully approved Legal Framework.",
          type: "success",
          position: "top-right",
        });
      } else {
        setToast({
          message: "Failed to approve the legal framework.",
          type: "error",
          position: "top-right",
        });
      }
    } catch (error) {
      setToast({
        message: `${error.message}`,
        type: "error",
        position: "top-right",
      });
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);

    try {
      const { deletedAt, ...updatedLegalFramework } = legalFramework;
      updatedLegalFramework.status = "REJECTED";
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/legal-frameworks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLegalFramework),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("DATA: ", data);
        setLegalFramework(data);
        setToast({
          message: "You have successfully rejected Legal Framework.",
          type: "success",
          position: "top-right",
        });
      } else {
        console.error("Failed to fetch data");
        setToast({
          message: "Failed to rejected Legal Framework.",
          type: "error",
          position: "top-right",
        });
      }
    } catch (error) {
      setToast({
        message: `${error.message}`,
        type: "error",
        position: "top-right",
      });
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!legalFramework) {
    return <div>No data found.</div>;
  }

  const renderStatusTag = (status: string) => {
    let tagColor = "";
    let tagText = "";

    switch (status) {
      case "PENDING":
        tagColor = "bg-yellow-500 text-white";
        tagText = "Pending";
        break;
      case "APPROVED":
        tagColor = "bg-green-500 text-white";
        tagText = "Approved";
        break;
      case "REJECTED":
        tagColor = "bg-red-500 text-white";
        tagText = "Rejected";
        break;
      default:
        tagColor = "bg-gray-500 text-white";
        tagText = "Unknown";
    }

    return (
      <span className={`inline px-4 py-2 rounded-md ${tagColor}`}>
        {tagText}
      </span>
    );
  };

  return (
    <BoxWrapper
      icon={<FaArrowLeft />}
      title={`Legal Framework Detail: ${legalFramework.region}`}
      borderColor="border-primary"
      borderThickness="border-b-4"
      shouldGoBack={true}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* <div>
            <h4 className="font-semibold text-sm sm:text-base">Assessment Category:</h4>
            <p className="text-sm sm:text-base">{legalFramework.assesementCategory}</p>
          </div> */}
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Title:</h4>
            <p className="text-sm sm:text-base">{legalFramework.title}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">City:</h4>
            <p className="text-sm sm:text-base">{legalFramework.zone_subcity}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Region:</h4>
            <p className="text-sm sm:text-base">{legalFramework.region}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Source:</h4>
            <p className="text-sm sm:text-base">{legalFramework.source}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Metrics:</h4>
            <p className="text-sm sm:text-base">{legalFramework.metrics}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base">
              Status: {renderStatusTag(legalFramework?.status)}
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Impact:</h4>
            <p className="text-sm sm:text-base">{legalFramework.impact}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm sm:text-base">CEHRO Insignt:</h4>
          <p className="text-sm sm:text-base">{legalFramework.insignt}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">File:</h4>
            <Button
              color="primary"
              text="Open File"
              onClick={() => window.open(legalFramework.file, "_blank")}
              icon={<FaExternalLinkAlt />}
              size="large"
            />
          </div>

          <div>
            <h4 className="font-semibold text-sm sm:text-base">Media:</h4>
            {mediaType === "image" && (
              <Image
                src={
                  legalFramework.video.startsWith("/")
                    ? legalFramework.video
                    : `/${legalFramework.video}`
                }
                alt="Media Preview"
                className="w-full h-64 object-cover rounded-lg"
                height={100}
                width={100}
              />
            )}

            {mediaType === "video" && (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  width="100%"
                  height="100%"
                  src={legalFramework.media}
                  title="Video Preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {mediaType === "pdf" && (
              <iframe
                src={legalFramework.media}
                width="100%"
                height="500px"
                title="PDF Preview"
              />
            )}

            {mediaType === "none" && <p>No media available.</p>}
          </div>
        </div>
        <div className="mt-10 pt-5 flex gap-4 ">
          {legalFramework.status !== "APPROVED" && legalFramework.status !== "REJECTED" && (
            <>
              <Button
                color="success"
                text={loading ? "Approving..." : "Approve"}
                onClick={handleApprove}
                icon={<FaCheck />}
              />
              <Button
                color="danger"
                text={loading ? "Rejecting..." : "Reject"}
                onClick={handleReject}
                icon={<FaTimes />}
              />
            </>
          )}
        </div>
   
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          position={toast.position}
          onClose={() => setToast(null)} 
        />
      )}
    </BoxWrapper>
  );
};

export default LegalFrameworkDetail;
