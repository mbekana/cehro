"use client";

import { FaArrowLeft, FaCheck, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Button from "@/app/components/UI/Button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Define the structure of the fetched data (you can modify this to match your API response structure)
type SocialMediaPostData = {
  postCategory: string;
  affectedArea: string;
  city: string;
  region: string;
  source: string;
  file: string; // File URL (PDF)
  media: string; // Media URL (image, video, etc.)
  metrics: string;
  remark: string;
  impact: string;
};

const SocialMediaPostDetail = () => {
  const { id } = useParams();

  const [socialMediaPost, setSocialMediaPost] = useState<SocialMediaPostData | null>(null);
  const [mediaType, setMediaType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchSocialMediaPostData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/admin/api/civic-space/social-media/${id}`, {method:'GET'});
        if (response.ok) {
          const data: SocialMediaPostData = await response.json();
          setSocialMediaPost(data);
        } else {
          console.error("Failed to fetch social media post data");
        }
      } catch (error) {
        console.error("Error fetching social media post data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialMediaPostData();
  }, [id]);

  // Determine the media type (image, video, pdf)
  useEffect(() => {
    if (socialMediaPost?.media) {
      const mediaUrl = socialMediaPost.media;
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
  }, [socialMediaPost]);

  // Handle Approve and Reject actions
  const handleApprove = () => {
    console.log("Post Approved");
    // Add approval logic here
  };

  const handleReject = () => {
    console.log("Post Rejected");
    // Add rejection logic here
  };

  // Display loading state while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!socialMediaPost) {
    return <div>No data found.</div>;
  }

  return (
    <BoxWrapper
      icon={<FaArrowLeft />}
      title={`Social Media Post Detail: ${socialMediaPost.region}`}
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="space-y-6">
        {/* Basic Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Post Category:</h4>
            <p className="text-sm sm:text-base">{socialMediaPost.postCategory}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Affected Area:</h4>
            <p className="text-sm sm:text-base">{socialMediaPost.affectedArea}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">City:</h4>
            <p className="text-sm sm:text-base">{socialMediaPost.city}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Region:</h4>
            <p className="text-sm sm:text-base">{socialMediaPost.region}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Source:</h4>
            <p className="text-sm sm:text-base">{socialMediaPost.source}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Metrics:</h4>
            <p className="text-sm sm:text-base">{socialMediaPost.metrics}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Impact:</h4>
            <p className="text-sm sm:text-base">{socialMediaPost.impact}</p>
          </div>
        </div>

        {/* Remarks */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm sm:text-base">Remarks:</h4>
          <p className="text-sm sm:text-base">{socialMediaPost.remark}</p>
        </div>

        {/* File and Media Section */}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">File:</h4>
            <Button
              color="primary"
              text="Open File"
              onClick={() => window.open(socialMediaPost.file, "_blank")} // Opens the file in a new tab
              icon={<FaExternalLinkAlt />}
              size="large"
            />
          </div>

          <div>
            <h4 className="font-semibold text-sm sm:text-base">Media:</h4>
            {/* Render appropriate media based on mediaType */}
            {mediaType === "image" && (
              <img
                src={socialMediaPost.media}
                alt="Media Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            )}

            {mediaType === "video" && (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  width="100%"
                  height="100%"
                  src={socialMediaPost.media}
                  title="Video Preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {mediaType === "pdf" && (
              <iframe
                src={socialMediaPost.media}
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

export default SocialMediaPostDetail;
