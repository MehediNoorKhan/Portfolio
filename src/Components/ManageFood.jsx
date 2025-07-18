import React, { useContext, useEffect, useState } from 'react';
import axiosSecure from '../Hooks/axiosSecure'; // Axios with Firebase token interceptor
import { AuthContext } from '../Provider/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ManageFood = () => {
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    // For update modal
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentFood, setCurrentFood] = useState(null);
    const [updateForm, setUpdateForm] = useState({
        foodName: '',
        foodImage: '',
        foodQuantity: '',
        pickupLocation: '',
        expiredDateTime: '',
        additionalNotes: '',
    });

    // Fetch foods for logged-in user securely
    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/manage-food?email=${user.email}`)
                .then((res) => setFoods(res.data))
                .catch(() => toast.error('Failed to fetch your foods'))
                .finally(() => setLoading(false));
        }
    }, [user]);

    // Handle delete with confirmation
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will lose this food data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/food/${id}`)
                    .then(() => {
                        toast.success('Food deleted successfully');
                        setFoods((prev) => prev.filter((food) => food._id !== id));
                    })
                    .catch(() => toast.error('Failed to delete food'));
            }
        });
    };

    // Open update modal and fill form
    const openUpdateModal = (food) => {
        setCurrentFood(food);
        setUpdateForm({
            foodName: food.foodName,
            foodImage: food.foodImage,
            foodQuantity: food.foodQuantity,
            pickupLocation: food.pickupLocation,
            expiredDateTime: food.expiredDateTime,
            additionalNotes: food.additionalNotes || '',
        });
        setShowUpdateModal(true);
    };

    // Handle form input changes
    const handleUpdateChange = (e) => {
        setUpdateForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Submit update form
    const handleUpdateSubmit = (e) => {
        e.preventDefault();

        axiosSecure
            .put(`/food/${currentFood._id}`, updateForm)
            .then(() => {
                toast.success('Food updated successfully');
                setFoods((prev) =>
                    prev.map((food) =>
                        food._id === currentFood._id ? { ...food, ...updateForm } : food
                    )
                );
                setShowUpdateModal(false);
            })
            .catch(() => toast.error('Failed to update food'));
    };

    if (loading) {
        return <p className="text-center mt-10">Loading your foods...</p>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Manage Your Foods</h1>

            {foods.length === 0 ? (
                <p className="text-center text-gray-500">You haven't added any foods yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full table-zebra">
                        <thead>
                            <tr>
                                <th>Food Name</th>
                                <th>Quantity</th>
                                <th>Pickup Location</th>
                                <th>Expire Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods.map((food) => (
                                <tr key={food._id}>
                                    <td>{food.foodName}</td>
                                    <td>{food.foodQuantity}</td>
                                    <td>{food.pickupLocation}</td>
                                    <td>{new Date(food.expiredDateTime).toLocaleString()}</td>
                                    <td className="space-x-2">
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => openUpdateModal(food)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => handleDelete(food._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Update Modal */}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Update Food</h2>
                        <form onSubmit={handleUpdateSubmit} className="space-y-4">
                            <label className="block">
                                Food Name
                                <input
                                    type="text"
                                    name="foodName"
                                    value={updateForm.foodName}
                                    onChange={handleUpdateChange}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </label>

                            <label className="block">
                                Food Image URL
                                <input
                                    type="text"
                                    name="foodImage"
                                    value={updateForm.foodImage}
                                    onChange={handleUpdateChange}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </label>

                            <label className="block">
                                Food Quantity
                                <input
                                    type="number"
                                    name="foodQuantity"
                                    value={updateForm.foodQuantity}
                                    onChange={handleUpdateChange}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </label>

                            <label className="block">
                                Pickup Location
                                <input
                                    type="text"
                                    name="pickupLocation"
                                    value={updateForm.pickupLocation}
                                    onChange={handleUpdateChange}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </label>

                            <label className="block">
                                Expired Date/Time
                                <input
                                    type="datetime-local"
                                    name="expiredDateTime"
                                    value={new Date(updateForm.expiredDateTime).toISOString().slice(0, 16)}
                                    onChange={handleUpdateChange}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </label>

                            <label className="block">
                                Additional Notes
                                <textarea
                                    name="additionalNotes"
                                    value={updateForm.additionalNotes}
                                    onChange={handleUpdateChange}
                                    className="textarea textarea-bordered w-full"
                                />
                            </label>

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowUpdateModal(false)}
                                    className="btn btn-outline"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageFood;
