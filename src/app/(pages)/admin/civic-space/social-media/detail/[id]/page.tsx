"use client";

import { FaArrowLeft, FaCheck, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Button from "@/app/components/UI/Button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Toast from "@/app/components/UI/Toast";
import Image from "next/image";
import { SocialMedia } from "@/app/model/SocialMedia";
import Cookies from "js-cookie";

const SocialMediaPostDetail = () => {
  const { id } = useParams();

  const [socialMediaPost, setSocialMediaPost] = useState<SocialMedia | null>(null);
  const [mediaType, setMediaType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchSocialMediaPostData = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${apiUrl}/api/v1/social-medias/${id}`, {method:'GET'});
        if (response.ok) {
          const data: any = await response.json();
          setSocialMediaPost(data.data);
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

    useEffect(() => {
      console.log("HI: ", Cookies.get("userData"));
      const user = Cookies.get("userData")
        ? JSON.parse(Cookies.get("userData")!)
        : null;
      setUserData(user);
    }, []);
  

  useEffect(() => {
    if (socialMediaPost?.video) {
      const mediaUrl = socialMediaPost.video;
      if (mediaUrl.name.endsWith(".jpg") || mediaUrl.name.endsWith(".png") || mediaUrl.name.endsWith(".jpeg")) {
        setMediaType("image");
      } else if (mediaUrl.name.includes("youtube.com") || mediaUrl.name.includes("youtu.be")) {
        setMediaType("video");
      } else if (mediaUrl.name.endsWith(".pdf")) {
        setMediaType("pdf");
      } else {
        setMediaType("none");
      }
    }
  }, [socialMediaPost]);


  const handleApprove = async () => {
    setLoading(true);

    try {
      const updatedIncident = {
        ...socialMediaPost,
        status: "APPROVED",
        approvedById:userData?.id
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/socialMediaPosts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedIncident),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("DATA: ", data);
        setSocialMediaPost(data);
        setError(null);
        setSuccess("You have successfully approved Social Media Post.");
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
        ...socialMediaPost,
        status: "REJECTED",
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/socialMediaPosts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedIncident),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("DATA: ", data);
        setSocialMediaPost(data);
        setError(null);
        setSuccess("You have successfully rejected Social Media Post.");
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
        tagText = "Unknown";
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

  if (!socialMediaPost) {
    return <div>No data found.</div>;
  }

  return (
    <BoxWrapper
      icon={<FaArrowLeft />}
      title={`Social Media Post Detail: ${socialMediaPost.region}`}
      borderColor="border-primary"
      borderThickness="border-b-4"
      shouldGoBack={true}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Id:</h4>
            <p className="text-sm sm:text-base">{socialMediaPost?.id}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Title:</h4>
            <p className="text-sm sm:text-base">{socialMediaPost.title}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">City:</h4>
            <p className="text-sm sm:text-base">{socialMediaPost.zone_subcity}</p>
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

      
        <div className="space-y-2">
          <h4 className="font-semibold text-sm sm:text-base">Cehros Insight:</h4>
          <p className="text-sm sm:text-base">{socialMediaPost.cehro_insights}</p>
        </div>
        <h4 className="font-semibold text-sm sm:text-base">
            Status: {renderStatusTag(socialMediaPost?.status)}
          </h4>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">File:</h4>
            <Button
              color="primary"
              text="Open File"
              onClick={() => window.open(socialMediaPost.file.name, "_blank")} // Opens the file in a new tab
              icon={<FaExternalLinkAlt />}
              size="large"
            />
          </div>

          <div>
            <h4 className="font-semibold text-sm sm:text-base">Media:</h4>
            {/* Render appropriate media based on mediaType */}
            {mediaType === "image" && (
              <Image
                src={socialMediaPost.video.name}
                alt="Media Preview"
                className="w-full h-64 object-cover rounded-lg"
                height="100"
                width="100"
              />
            )}

            {mediaType === "video" && (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  width="100%"
                  height="100%"
                  src={socialMediaPost.video.name}
                  title="Video Preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {mediaType === "pdf" && (
              <iframe
                src={socialMediaPost.file.name}
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

export default SocialMediaPostDetail;
