import React, { useEffect, useState } from 'react';
import { fetchRockets } from '../api/spacexApi';
import { Rocket } from '../types/rocket';

const RocketList: React.FC = () => {
    const [rockets, setRockets] = useState<Rocket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getRockets = async () => {
            try {
                const rocketData = await fetchRockets();
                setRockets(rocketData);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch rockets');
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
                <div key={rocket.id} className="rocket-card">
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
