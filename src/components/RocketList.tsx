import React, { useEffect, useState } from "react";
import { fetchRockets } from "../api/spacexApi";
import { Rocket } from "../types/rocket";
import { useNavigate } from "react-router-dom";

const RocketList: React.FC = () => {
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getRockets = async () => {
      try {
        const rocketData = await fetchRockets();
        setRockets(rocketData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch rockets");
        setLoading(false);
      }
    };

    getRockets();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="rockets-container">
      {rockets.map((rocket) => (
        <div
          key={rocket.id}
          className="rocket-card"
          onClick={() => navigate(`/rocket/${rocket.id}`)} // Navigate to detail page
          style={{ cursor: "pointer" }} // Indicate clickable area
        >
          <img src={rocket.flickr_images[0]} alt={`${rocket.name}`} />
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
