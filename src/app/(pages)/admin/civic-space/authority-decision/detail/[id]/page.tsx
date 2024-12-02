"use client";

import { FaArrowLeft, FaCheck, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Button from "@/app/components/UI/Button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Define the structure of the fetched data (you can modify this to match your API response structure)
type AuthorityDecisionData = {
  assesementCategory: string;
  affectedArea: string;
  city: string;
  region: string;
  source: string;
  file: string; // File URL (PDF)
  media: string; // Media URL (image, video, etc.)
  metrics: string;
  remark: string;
  impact: string;
  decision: string; // New field for decision
};

const AuthorityDecisionDetail = () => {
    const { id } = useParams();

  const [authorityDecision, setAuthorityDecision] = useState<AuthorityDecisionData | null>(null);
  const [mediaType, setMediaType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the data when the component mounts
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

  // Determine the media type (image, video, pdf)
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

  // Handle Approve and Reject actions
  const handleApprove = () => {
    console.log("Approved");
    // Add approval logic here
  };

  const handleReject = () => {
    console.log("Rejected");
    // Add rejection logic here
  };

  // Display loading state while fetching data
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
    >
      <div className="space-y-6">
        {/* Basic Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Assessment Category:</h4>
            <p className="text-sm sm:text-base">{authorityDecision.assesementCategory}</p>
          </div>
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Impact:</h4>
            <p className="text-sm sm:text-base">{authorityDecision.impact}</p>
          </div>
        </div>

        {/* Remarks */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm sm:text-base">Remarks:</h4>
          <p className="text-sm sm:text-base">{authorityDecision.remark}</p>
        </div>

        {/* Decision */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm sm:text-base">Decision:</h4>
          <p className="text-sm sm:text-base">{authorityDecision.decision}</p>
        </div>

        {/* File and Media Section */}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">File:</h4>
            <Button
              color="primary"
              text="Open File"
              onClick={() => window.open(authorityDecision.file, "_blank")} // Opens the file in a new tab
              icon={<FaExternalLinkAlt />}
              size="large"
            />
          </div>

          <div>
            <h4 className="font-semibold text-sm sm:text-base">Media:</h4>
            {/* Render appropriate media based on mediaType */}
            {mediaType === "image" && (
              <img
                src={authorityDecision.media}
                alt="Media Preview"
                className="w-full h-64 object-cover rounded-lg"
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
    </BoxWrapper>
  );
};

export default AuthorityDecisionDetail;
