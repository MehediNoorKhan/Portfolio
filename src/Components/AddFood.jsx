import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddFood = () => {
    const { user, userData } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        foodName: "",
        foodImage: "",
        foodQuantity: "",
        pickupLocation: "",
        expiredDateTime: "",
        additionalNotes: "",
    });

    const currentUser = userData.find(
        (u) => String(u.email) === String(user?.email)
    );

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            toast.error("User data not found, please login again.");
            return;
        }

        const newFood = {
            ...formData,
            foodQuantity: Number(formData.foodQuantity),
            donorName: currentUser.name,
            donorEmail: currentUser.email,
            donorImage: currentUser.photoURL,
            foodStatus: "available",
        };

        try {
            const res = await axios.post("http://localhost:3000/food", newFood);
            if (res.data.insertedId) {
                toast.success("Food added successfully!");
                setFormData({
                    foodName: "",
                    foodImage: "",
                    foodQuantity: "",
                    pickupLocation: "",
                    expiredDateTime: "",
                    additionalNotes: "",
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add food. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-indigo-100 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-xl bg-white bg-opacity-90 shadow-2xl rounded-2xl p-8 backdrop-blur">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
                    Add Food
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Food Name</label>
                        <input
                            type="text"
                            name="foodName"
                            value={formData.foodName}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Food Image URL</label>
                        <input
                            type="text"
                            name="foodImage"
                            value={formData.foodImage}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                            placeholder="Image URL"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Food Quantity</label>
                        <input
                            type="number"
                            name="foodQuantity"
                            value={formData.foodQuantity}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                            placeholder="e.g., 5"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Pickup Location</label>
                        <input
                            type="text"
                            name="pickupLocation"
                            value={formData.pickupLocation}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Expired Date/Time</label>
                        <input
                            type="datetime-local"
                            name="expiredDateTime"
                            value={formData.expiredDateTime}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Additional Notes</label>
                        <textarea
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full"
                            placeholder="Any extra info (optional)"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-full tracking-wide font-semibold text-white"
                    >
                        Add Food
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddFood;
