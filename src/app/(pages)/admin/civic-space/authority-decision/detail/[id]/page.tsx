"use client";

import { FaArrowLeft, FaCheck, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Button from "@/app/components/UI/Button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Toast from "@/app/components/UI/Toast";

type AuthorityDecisionData = {
  affectedArea: string;
  city: string;
  region: string;
  source: string;
  file: string; 
  media: string; 
  metrics: string;
  insight: string;
  impact: string;
  decision: string; 
  status?:string;
};

const AuthorityDecisionDetail = () => {
    const { id } = useParams();

  const [authorityDecision, setAuthorityDecision] = useState<AuthorityDecisionData | null>(null);
  const [mediaType, setMediaType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchAuthorityDecisionData = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/authorityDecisions/${id}`, {method:'GET'});
        if (response.ok) {
          const data: AuthorityDecisionData = await response.json();
          setAuthorityDecision(data);
        } else {
          console.error("Failed to fetch authority decision data");
        }
      } catch (error) {
        console.error("Error fetching authority decision data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorityDecisionData();
  }, [id]);

  useEffect(() => {
    if (authorityDecision?.media) {
      const mediaUrl = authorityDecision.media;
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
  }, [authorityDecision]);

  const handleApprove = async () => {
    setLoading(true);

    try {
      const updatedIncident = {
        ...authorityDecision,
        status: "APPROVED",
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/authorityDecisions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedIncident),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("DATA: ", data);
        setAuthorityDecision(data);
        setError(null);
        setSuccess("You have successfully approved incident.");
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

  const handleReject = async () => {
    setLoading(true);
    try {
      const updatedIncident = {
        ...authorityDecision,
        status: "REJECTED",
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/authorityDecisions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedIncident),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("DATA: ", data);
        setAuthorityDecision(data);
        setError(null);
        setSuccess("You have successfully rejected authority decision.");
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      setError(error);
      setSuccess(null);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

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
        tagText = "PENDING";
    }

    return (
      <span className={`inline px-4 py-2 rounded-md ${tagColor}`}>
        {tagText}
      </span>
    );
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authorityDecision) {
    return <div>No data found.</div>;
  }

  return (
    <BoxWrapper
      icon={<FaArrowLeft />}
      title={`Authority Decision Detail: ${authorityDecision.region}`}
      borderColor="border-primary"
      borderThickness="border-b-4"
      shouldGoBack={true}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Affected Area:</h4>
            <p className="text-sm sm:text-base">{authorityDecision.affectedArea}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">City:</h4>
            <p className="text-sm sm:text-base">{authorityDecision.city}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Region:</h4>
            <p className="text-sm sm:text-base">{authorityDecision.region}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Source:</h4>
            <p className="text-sm sm:text-base">{authorityDecision.source}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Metrics:</h4>
            <p className="text-sm sm:text-base">{authorityDecision.metrics}</p>
          </div>
          <div>
          <h4 className="font-semibold text-sm sm:text-base">
            Status: {renderStatusTag(authorityDecision?.status)}
          </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Impact:</h4>
            <p className="text-sm sm:text-base">{authorityDecision.impact}</p>
          </div>
        </div>

        <div className="space-y-2">
        <h4 className="font-semibold text-sm sm:text-base">CEHRO&apos;s Insight:</h4>
        <p className="text-sm sm:text-base">{authorityDecision.insight}</p>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm sm:text-base">Decision:</h4>
          <p className="text-sm sm:text-base">{authorityDecision.decision}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">File:</h4>
            <Button
              color="primary"
              text="Open File"
              onClick={() => window.open(authorityDecision.file, "_blank")} 
              icon={<FaExternalLinkAlt />}
              size="large"
            />
          </div>

          <div>
            <h4 className="font-semibold text-sm sm:text-base">Media:</h4>
            {mediaType === "image" && (
              <Image
                src={authorityDecision.media}
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
                  src={authorityDecision.media}
                  title="Video Preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {mediaType === "pdf" && (
              <iframe
                src={authorityDecision.media}
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

export default AuthorityDecisionDetail;
