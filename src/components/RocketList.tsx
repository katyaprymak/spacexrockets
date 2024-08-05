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
        <div>
            <h1>SpaceX Rockets</h1>
            <ul>
                {rockets.map((rocket) => (
                    <li key={rocket.id}>
                        <h2>{rocket.name}</h2>
                        <p>{rocket.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RocketList;
