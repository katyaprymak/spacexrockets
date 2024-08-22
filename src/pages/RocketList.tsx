import React from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../utils.ts";
/*import { fetchRockets } from "../services/endpoints.tsx";*/
import { Rocket } from "../types/rocket";

const RocketList: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: rockets,
    error,
    isLoading,
  } = useSWR<Rocket[], Error>(import.meta.env.VITE_BASE_URL, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch rockets</div>;
  if (!rockets || rockets.length === 0)
    return <div>ERROR: no rockets found</div>;

  return (
    <div className="rockets-container">
      {rockets.map((rocket) => (
        <div
          key={rocket.id}
          className="rocket-card"
          onClick={() => navigate(`/rocket/${rocket.id}`)}
        >
          {rocket.flickr_images && rocket.flickr_images.length > 0 && (
            <img src={rocket.flickr_images[0]} alt={rocket.name} />
          )}
          <div className="rocket-details">
            <h2>{rocket.name}</h2>
            <p>{rocket.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RocketList;
