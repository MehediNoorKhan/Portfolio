import React, { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddFood = () => {
    const { user, userData } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        foodName: '',
        foodImage: '',
        foodQuantity: '',
        pickupLocation: '',
        expiredDateTime: '',
        additionalNotes: '',
    });

    // Find current logged-in user's full data from userData using email
    const currentUser = userData.find(u => String(u.email) === String(user?.email));

    const handleChange = e => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!currentUser) {
            toast.error('User data not found, please login again.');
            return;
        }

        const newFood = {
            foodName: formData.foodName,
            foodImage: formData.foodImage,
            foodQuantity: Number(formData.foodQuantity),  // <-- convert here
            pickupLocation: formData.pickupLocation,
            expiredDateTime: formData.expiredDateTime,
            additionalNotes: formData.additionalNotes,
            donorName: currentUser.name,
            donorEmail: currentUser.email,
            donorImage: currentUser.photoURL,
            foodStatus: 'available',
        };

        try {
            const res = await axios.post('http://localhost:3000/food', newFood);
            if (res.data.insertedId) {
                toast.success('Food added successfully!');
                setFormData({
                    foodName: '',
                    foodImage: '',
                    foodQuantity: '',
                    pickupLocation: '',
                    expiredDateTime: '',
                    additionalNotes: '',
                });
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to add food. Please try again.');
        }
    };


    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow rounded mt-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Add Food</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                    Food Name
                    <input
                        type="text"
                        name="foodName"
                        value={formData.foodName}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </label>

                <label className="block">
                    Food Image URL
                    <input
                        type="text"
                        name="foodImage"
                        value={formData.foodImage}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                        placeholder="Image URL"
                    />
                </label>

                <label className="block">
                    Food Quantity
                    <input
                        type="number"
                        name="foodQuantity"
                        value={formData.foodQuantity}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                        placeholder="e.g., 5"
                    />
                </label>

                <label className="block">
                    Pickup Location
                    <input
                        type="text"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </label>

                <label className="block">
                    Expired Date/Time
                    <input
                        type="datetime-local"
                        name="expiredDateTime"
                        value={formData.expiredDateTime}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </label>

                <label className="block">
                    Additional Notes
                    <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        placeholder="Any extra info (optional)"
                    />
                </label>

                <button type="submit" className="btn btn-primary w-full">
                    Add Food
                </button>
            </form>
        </div>
    );
};

export default AddFood;
