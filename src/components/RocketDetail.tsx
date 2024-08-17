import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rocket } from "../types/rocket";
import { fetchRockets } from "../api/rocketService.ts";

const RocketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [rocket, setRocket] = useState<Rocket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRocket = async () => {
      try {
        const rockets = await fetchRockets();
        const selectedRocket = rockets.find(
          (rocket: Rocket) => rocket.id === id
        );
        setRocket(selectedRocket || null);
      } catch (err) {
        setError("Failed to fetch rocket details");
      } finally {
        setLoading(false);
      }
    };

    getRocket();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!rocket) return <div>Rocket not found</div>;

  return (
    <div className="rocket-detail-container">
      <img
        src={rocket.flickr_images[0]}
        alt={rocket.name}
        className="rocket-detail-image"
      />
      <h1>{rocket.name}</h1>
      <p>{rocket.description}</p>
    </div>
  );
};

export default RocketDetail;
