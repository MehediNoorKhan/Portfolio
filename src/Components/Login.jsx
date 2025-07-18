import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import SocialLogin from "./SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
    const { login } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || "/";

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

                toast.success("Login successful!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                });

                navigate(from);
            })
            .catch((error) => {
                let message = "Login failed. Please try again.";

                // More user-friendly error messages based on Firebase error codes
                if (error.code) {
                    switch (error.code) {
                        case "auth/user-not-found":
                            message = "No account found with this email.";
                            break;
                        case "auth/wrong-password":
                            message = "Incorrect password. Please try again.";
                            break;
                        case "auth/invalid-email":
                            message = "Please enter a valid email address.";
                            break;
                        case "auth/user-disabled":
                            message = "This user account has been disabled.";
                            break;
                        default:
                            message = error.message || message;
                    }
                }

                toast.error(message, {
                    position: "top-right",
                    autoClose: 3000,
                });
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-4">
                    <h1 className="text-5xl font-bold text-center">Login Now!</h1>
                    <div className="card-body py-4">
                        <div className="text-sm mt-2 mb-2">
                            Not have an account?{" "}
                            <Link to="/register" className="text-blue-600 hover:underline">
                                Register
                            </Link>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label className="label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="input"
                                placeholder="Email"
                                required
                            />
                            <label className="label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="input"
                                placeholder="Password"
                                required
                            />
                            <button className="btn btn-neutral mt-4">Login</button>
                        </form>
                        <SocialLogin from={from}></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
