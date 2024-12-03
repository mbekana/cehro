"use client";

import { FaArrowLeft, FaCheck, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Button from "@/app/components/UI/Button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Toast from "@/app/components/UI/Toast";

type LegalFrameworkData = {
  assesementCategory: string;
  affectedArea: string;
  city: string;
  region: string;
  source: string;
  file: string; 
  media: string;
  metrics: string;
  insignt: string;
  impact: string;
  status:string;
};

const LegalFrameworkDetail = () => {
    const { id } = useParams();

  const [legalFramework, setLegalFramework] = useState<LegalFrameworkData | null>(null);
  const [mediaType, setMediaType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchLegalFrameworkData = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${apiUrl}/legalFrameworks/${id}`);
        if (response.ok) {
          const data: LegalFrameworkData = await response.json();
          setLegalFramework(data);
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

  // Determine the media type (image, video, pdf)
  useEffect(() => {
    if (legalFramework?.media) {
      const mediaUrl = legalFramework.media;
      if (mediaUrl.endsWith(".jpg") || mediaUrl.endsWith(".png") || mediaUrl.endsWith(".jpeg")) {
        setMediaType("image");
      } else if (mediaUrl.includes("youtube.com") || mediaUrl.includes("youtu.be")) {
        setMediaType("video");
      } else if (mediaUrl.endsWith(".pdf")) {
        setMediaType("pdf");
      } else {
        setMediaType("none");
      }
    }
  }, [legalFramework]);

  // Handle Approve and Reject actions
  const handleApprove = async() => {
    setLoading(true);

    try {
      const updatedLegalFramework = {
        ...legalFramework,
        status: "APPROVED",
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/legalFrameworks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLegalFramework),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("DATA: ", data);
        setLegalFramework(data);
        setError(null);
        setSuccess("You have successfully approved Legal Framework.");
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      setSuccess(null);
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async() => {
    setLoading(true);

    try {
      const updatedLegalFramework = {
        ...legalFramework,
        status: "REJECTED",
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/legalFrameworks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLegalFramework),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("DATA: ", data);
        setLegalFramework(data);
        setError(null);
        setSuccess("You have successfully rejected Legal Framework.");
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      setSuccess(null);
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Display loading state while fetching data
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

  }


  return (
    <BoxWrapper
      icon={<FaArrowLeft />}
      title={`Legal Framework Detail: ${legalFramework.region}`}
      borderColor="border-primary"
      borderThickness="border-b-4"
      shouldGoBack={true}
    >
      <div className="space-y-6">
        {/* Basic Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Assessment Category:</h4>
            <p className="text-sm sm:text-base">{legalFramework.assesementCategory}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Affected Area:</h4>
            <p className="text-sm sm:text-base">{legalFramework.affectedArea}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">City:</h4>
            <p className="text-sm sm:text-base">{legalFramework.city}</p>
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
              onClick={() => window.open(legalFramework.file, "_blank")} // Opens the file in a new tab
              icon={<FaExternalLinkAlt />}
              size="large"
            />
          </div>

          <div>
            <h4 className="font-semibold text-sm sm:text-base">Media:</h4>
            {/* Render appropriate media based on mediaType */}
            {mediaType === "image" && (
              <img
                src={legalFramework.media}
                alt="Media Preview"
                className="w-full h-64 object-cover rounded-lg"
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

        <div className="mt-6 flex gap-4">
          <Button
            color="success"
            text="Approve"
            onClick={handleApprove}
            icon={<FaCheck />}
          />
          <Button
            color="danger"
            text="Reject"
            onClick={handleReject}
            icon={<FaTimes />}
          />
        </div>
      </div>
      {success && (
        <Toast
          message={success}
          type="success"
          position="top-right"
          onClose={() => setSuccess(null)}
        />
      )}

      {error && (
        <Toast
          message={error}
          type="error"
          position="top-right"
          onClose={() => setError(null)}
        />
      )}
    </BoxWrapper>
  );
};

export default LegalFrameworkDetail;
