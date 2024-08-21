import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../utils.ts";
import { fetchRockets } from "../services/endpoints.tsx";
import { Rocket } from "../types/rocket";

const RocketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const URL = `https://api.spacexdata.com/v4/rockets/${id}`;
  const { data: rocket, error } = useSWR<Rocket | null, Error>(URL, fetcher);

  if (error) return <div>Failed to fetch rocket details</div>;
  if (!rocket) return <div>Loading...</div>;

  return (
    <div className="rocket-detail-container">
      {rocket.flickr_images && rocket.flickr_images.length > 0 && (
        <img
          src={rocket.flickr_images[0]}
          alt={rocket.name}
          className="rocket-detail-image"
        />
      )}
      <h1>{rocket.name}</h1>
      <p>{rocket.description}</p>
    </div>
  );
};

export default RocketDetail;
