import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRockets } from "../api/rocketService.ts";
import { Rocket } from "../types/rocket";

const RocketList: React.FC = () => {
  const [rockets, setRockets] = useState<Rocket[]>([]); // Ensure initial state is an empty array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getRockets = async () => {
      try {
        const rocketData = await fetchRockets();
        console.log("Fetched rocket data:", rocketData);
        setRockets(rocketData || []); // Set rockets to an empty array if rocketData is null/undefined
      } catch (err) {
        console.error("Error fetching rockets:", err);
        setError("Failed to fetch rockets");
      } finally {
        setLoading(false);
      }
    };

    getRockets();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Check to ensure rockets is an array before mapping
  return (
    <div className="rockets-container">
      {Array.isArray(rockets) &&
        rockets.map((rocket) => (
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
