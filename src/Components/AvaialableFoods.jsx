import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AvailableFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/food')
            .then(res => {
                setFoods(res.data);
            })
            .catch(err => {
                console.error('Error fetching foods:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-10 text-gray-600">Loading foods...</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-12">Available Foods</h1>

            {foods.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No available foods found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {foods.map(food => (
                        <div
                            key={food._id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col"
                        >
                            <div className="relative h-48">
                                <img
                                    src={food.foodImage}
                                    alt={food.foodName}
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                    Available
                                </span>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{food.foodName}</h2>
                                <p className="text-gray-600 mb-1"><strong>Quantity:</strong> {food.foodQuantity}</p>
                                <p className="text-gray-600 mb-1"><strong>Pickup Location:</strong> {food.pickupLocation}</p>
                                <p className="text-gray-600 mb-3">
                                    <strong>Expires:</strong>{' '}
                                    {new Date(food.expiredDateTime).toLocaleString(undefined, {
                                        dateStyle: 'medium',
                                        timeStyle: 'short',
                                    })}
                                </p>
                                {food.additionalNotes && (
                                    <p className="text-gray-500 italic mb-4 flex-grow">{food.additionalNotes}</p>
                                )}
                                <button
                                    onClick={() => navigate(`/fooddetails/${food._id}`)}
                                    className="mt-auto bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 hover:cursor-pointer transition"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AvailableFoods;
