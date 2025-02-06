"use client";

import React, { useEffect, useState } from "react";
import BoxWrapper from "@/app/components/UI/BoxWrapper";
import Card from "@/app/components/UI/Card";
import Divider from "@/app/components/UI/Divider";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import { useParams } from "next/navigation";

const RegionDetailsPage = () => {
  const { id } = useParams();
  const [region, setRegion] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchRegionData = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          console.log("Region ID: ", id);
          const response = await fetch(`${apiUrl}/api/v1/regions/${id}`, {
            method: "GET",
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Region Data: ", data);
            setRegion(data.data);
          } else {
            console.error("Region not found");
          }
        } catch (error) {
          console.error("Error fetching region data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchRegionData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!region) {
    return <div>Region not found</div>;
  }

  return (
    <div>
      <BoxWrapper
        icon={<FaArrowLeft />}
        title="Education Details"
        borderColor="border-primary"
        borderThickness="border-b-4"
        shouldGoBack={true}
      >
        <Card
          title="Region Information"
          borderColor="border-primary"
          borderThickness="border-1"
          bgColor="bg-white"
        >
          <Divider
            borderColor="border-gray-400"
            borderThickness="border-t-2"
            marginTop="mt-1"
            marginBottom="mb-6"
          />

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Region ID</h3>
              <p className="text-gray-600">{region.id}</p>{" "}
              {/* Display region ID */}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Region Name
              </h3>
              <p className="text-gray-600">{region.name}</p>{" "}
              {/* Display region name */}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">City</h3>
              <p className="text-gray-600">{region.city}</p>{" "}
              {/* Display city name */}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Latitude</h3>
              <p className="text-gray-600">{region.lattitude}</p>{" "}
              {/* Display latitude */}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Longitude</h3>
              <p className="text-gray-600">{region.longitude}</p>{" "}
              {/* Display longitude */}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Status</h3>
              <p className="text-gray-600">{region.status}</p>{" "}
              {/* Display region status */}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Created At
              </h3>
              <p className="text-gray-600">
                {new Date(region.createdAt).toLocaleString()}
              </p>{" "}
              {/* Display created date */}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Updated At
              </h3>
              <p className="text-gray-600">
                {new Date(region.updatedAt).toLocaleString()}
              </p>{" "}
              {/* Display updated date */}
            </div>
          </div>
        </Card>
      </BoxWrapper>
    </div>
  );
};

export default RegionDetailsPage;
