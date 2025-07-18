import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosSecure from "../Hooks/axiosSecure"; // axios instance with token
import { AuthContext } from "../Provider/AuthContext";
import Loader from "./Loader";

const MyFoodRequest = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure
            .get(`/myfoodrequest?email=${user.email}`)
            .then((res) => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching food requests:", err);
                setLoading(false);
            });
    }, [user]);

    if (loading) return <Loader />;

    return (
        <motion.div
            className="p-6 max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-3xl font-extrabold text-teal-700 mb-8 text-center">
                My Food Requests
            </h2>

            {requests.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                    No food requests found.
                </p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-lg border border-teal-200">
                    <table className="min-w-full divide-y divide-gray-200 table-auto">
                        <thead className="bg-teal-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-teal-800">
                                    #
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-teal-800">
                                    Donor Name
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-teal-800">
                                    Pickup Location
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-teal-800">
                                    Expire Date
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-teal-800">
                                    Request Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {requests.map((item, index) => (
                                <tr
                                    key={item._id || index}
                                    className="hover:bg-teal-50 transition-colors duration-200 cursor-pointer"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {item.foodDonatorName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {item.pickupLocation}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {item.expireDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {item.requestDate}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </motion.div>
    );
};

export default MyFoodRequest;
