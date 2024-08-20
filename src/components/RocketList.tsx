import React from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetchRockets } from "../api/rocketService.ts";
import { Rocket } from "../types/rocket";

const fetcher = async () => {
  return await fetchRockets();
};

const RocketList: React.FC = () => {
  const navigate = useNavigate();
  const { data: rockets, error } = useSWR<Rocket[], Error>("/rockets", fetcher);

  if (error) return <div>Failed to fetch rockets</div>;
  if (!rockets) return <div>Loading...</div>;

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
