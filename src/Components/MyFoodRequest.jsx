import { useContext, useEffect, useState } from 'react';
import axiosSecure from '../Hooks/axiosSecure'; // axios instance with token
import { AuthContext } from '../Provider/AuthContext';
// import useAuth from '../Hooks/useAuth'; // Auth context

const MyFoodRequest = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure
            .get(`/myfoodrequest?email=${user.email}`)
            .then(res => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching food requests:', err);
                setLoading(false);
            });

    }, [user]);

    if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Food Requests</h2>
            {requests.length === 0 ? (
                <p>No food requests found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th>#</th>
                                <th>Donor Name</th>
                                <th>Pickup Location</th>
                                <th>Expire Date</th>
                                <th>Request Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((item, index) => (
                                <tr key={item._id || index} className="hover:bg-gray-50">
                                    <td>{index + 1}</td>
                                    <td>{item.foodDonatorName}</td>
                                    <td>{item.pickupLocation}</td>
                                    <td>{item.expireDate}</td>
                                    <td>{item.requestDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyFoodRequest;
