import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const FeaturedFoods = () => {
    const [featuredFoods, setFeaturedFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        // Assuming your backend supports query params for limit, status and sort
        axios
            .get('http://localhost:3000/food', {
                params: {
                    foodStatus: 'available',
                    limit: 6,
                    sortBy: 'foodQuantity',
                    sortOrder: 'desc',
                },
            })
            .then((res) => {
                setFeaturedFoods(res.data);
            })
            .catch((err) => {
                console.error('Error fetching featured foods:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-10">Loading featured foods...</p>;

    if (featuredFoods.length === 0)
        return <p className="text-center mt-10 text-gray-500">No featured foods available.</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Featured Foods</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {featuredFoods.map((food) => (
                    <div
                        key={food._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                    >
                        <img
                            src={food.foodImage}
                            alt={food.foodName}
                            className="h-48 w-full object-cover"
                            loading="lazy"
                        />
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold mb-1">{food.foodName}</h3>
                            <p className="text-gray-600 mb-1">
                                <strong>Quantity:</strong> {food.foodQuantity}
                            </p>
                            <p className="text-gray-600 mb-3">
                                <strong>Pickup Location:</strong> {food.pickupLocation}
                            </p>
                            <p className="text-gray-600 text-sm mt-auto">
                                <strong>Expires:</strong>{' '}
                                {new Date(food.expiredDateTime).toLocaleString(undefined, {
                                    dateStyle: 'medium',
                                    timeStyle: 'short',
                                })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-8">
                <button
                    onClick={() => navigate('/availablefoods')}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                    Show All
                </button>
            </div>
        </div>
    );
};

export default FeaturedFoods;
