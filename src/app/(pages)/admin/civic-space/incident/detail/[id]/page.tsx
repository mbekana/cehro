"use client";

import { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Button from "@/app/components/UI/Button";
import { FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
import { useParams } from "next/navigation";
import Toast from "@/app/components/UI/Toast";

const IncidentDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [incident, setIncident] = useState<any>();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    if (id) {
      fetchIncident(Array.isArray(id) ? id[0] : id);
    }
  }, [id]);

  const fetchIncident = async (id: string) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/incidents/${id}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("DATA: ", data);
        setIncident(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    setLoading(true);

    try {
      const updatedIncident = {
        ...incident,
        status: "APPROVED",
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/incidents/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedIncident),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("DATA: ", data);
        setIncident(data);
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
        ...incident,
        status: "REJECTED",
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/incidents/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedIncident),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("DATA: ", data);
        setIncident(data);
        setError(null);
        setSuccess("You have successfully rejected incident.");
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

  return (
    <BoxWrapper
      icon={<FaArrowLeft />}
      title={`Incident Details: ${incident?.region}`}
      borderColor="border-primary"
      borderThickness="border-b-4"
    >
      <div className="space-y-4">
        {/* Incident Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Region:</h4>
            <p className="text-sm sm:text-base">{incident?.region}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Residence:</h4>
            <p className="text-sm sm:text-base">
              {incident?.respondent_residence}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Gender:</h4>
            <p className="text-sm sm:text-base">{incident?.gender}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Age Group:</h4>
            <p className="text-sm sm:text-base">{incident?.age_group}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Education:</h4>
            <p className="text-sm sm:text-base">{incident?.education}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Occupation:</h4>
            <p className="text-sm sm:text-base">{incident?.occupation}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">
              Date of Incident:
            </h4>
            <p className="text-sm sm:text-base">{incident?.date}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Location:</h4>
            <p className="text-sm sm:text-base">{incident?.location}</p>
          </div>
        </div>

        {/* Incident Details */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm sm:text-base">
            Incident Details:
          </h4>
          <p className="text-sm sm:text-base">
            <strong>Woreda:</strong> {incident?.incident_happened?.woreda}
          </p>
          <p className="text-sm sm:text-base">
            <strong>Zone:</strong> {incident?.incident_happened?.zone}
          </p>
          <p className="text-sm sm:text-base">
            <strong>Source of Information:</strong>{" "}
            {incident?.source_of_information}
          </p>
        </div>

        <div className="mt-10">
          <h4 className="font-semibold text-sm sm:text-base">
            Status: {renderStatusTag(incident?.status)}
          </h4>
        </div>

        <div className="mt-10 pt-5 flex gap-4 ">
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

export default IncidentDetail;
