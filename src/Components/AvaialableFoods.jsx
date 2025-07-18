import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Loader from "./Loader";

const AvailableFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isThreeCol, setIsThreeCol] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setLoading(true);
            axios
                .get("http://localhost:3000/food", {
                    params: { search: searchTerm },
                })
                .then((res) => setFoods(res.data))
                .catch((err) => console.error("Error fetching foods:", err))
                .finally(() => setLoading(false));
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const toggleLayout = () => setIsThreeCol((prev) => !prev);

    const gridColsClass = isThreeCol
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2";

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight">
                    Available Foods
                </h1>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search food by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-bordered w-full sm:w-64"
                    />
                    <button
                        onClick={toggleLayout}
                        className="bg-cyan-400 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
                    >
                        {isThreeCol ? "2 Columns" : "3 Columns"}
                    </button>
                </div>
            </div>

            {loading ? (
                <Loader />
            ) : foods.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                    No available foods found.
                </p>
            ) : (
                <div className={`grid ${gridColsClass} gap-8`}>
                    {foods.map((food) => (
                        <div
                            key={food._id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.03] hover:shadow-2xl flex flex-col"
                        >
                            <div className="relative h-48">
                                <img
                                    src={food.foodImage}
                                    alt={food.foodName}
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                                    Available
                                </span>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">
                                    {food.foodName}
                                </h2>
                                <p className="text-gray-600 mb-1">
                                    <strong>Quantity:</strong> {food.foodQuantity}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <strong>Pickup Location:</strong> {food.pickupLocation}
                                </p>
                                <p className="text-gray-600 mb-3">
                                    <strong>Expires:</strong>{" "}
                                    {new Date(food.expiredDateTime).toLocaleString(undefined, {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </p>
                                {food.additionalNotes && (
                                    <p className="text-gray-500 italic mb-4 flex-grow">
                                        {food.additionalNotes}
                                    </p>
                                )}
                                <button
                                    onClick={() => navigate(`/fooddetails/${food._id}`)}
                                    className="mt-auto bg-indigo-600 text-white cursor-pointer font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
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
