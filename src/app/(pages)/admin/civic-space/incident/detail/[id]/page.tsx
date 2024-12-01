"use client";

import { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Button from "@/app/components/UI/Button";
import { FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
import { useParams } from "next/navigation";

const IncidentDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [incident, setIncident] = useState<any>();

  useEffect(() => {
    if (id) {
      // Ensure id is treated as a string
      fetchIncident(Array.isArray(id) ? id[0] : id);
    }
  }, [id]);

  const fetchIncident = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/admin/api/civic-space/incident/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log("DATA: ", data)
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

  const handleApprove = () => {
    console.log("Incident Approved");
  };

  const handleReject = () => {
    console.log("Incident Rejected");
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Region:</h4>
            <p className="text-sm sm:text-base">{incident?.region}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base">Residence:</h4>
            <p className="text-sm sm:text-base">{incident?.respondent_residence}</p>
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

export default IncidentDetail;
