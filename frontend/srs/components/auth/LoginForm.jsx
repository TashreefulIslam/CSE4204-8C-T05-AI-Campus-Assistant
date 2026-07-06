import { useState } from "react";
import Logo from "../layout/Logo";

import { Link, useLocation, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { loginUser } from "../../services/authService";


const LoginForm = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const registerSuccess = location.state?.success || "";

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    setErrors({});
    setLoading(true);

    try {

        const response = await loginUser(formData);

        localStorage.setItem("token", response.access_token);
        localStorage.setItem("user", JSON.stringify(response.user));

        switch (response.user.role) {

            case "admin":
                navigate("/admin/dashboard");
                break;

            case "teacher":
                navigate("/teacher/dashboard");
                break;

            default:
                navigate("/student/dashboard");

        }

    } catch (error) {

        if (error.response?.status === 401) {

            setErrors({
                email: "Invalid email or password.",
            });

        } else if (error.response?.status === 422) {

            setErrors(error.response.data.errors);

        }

    } finally {

        setLoading(false);

    }

};

    return (
    
    <div className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md w-full mx-auto lg:mx-0">

    <div className="mb-8">
        <Logo />
    </div>

    <h2 className="text-3xl font-bold text-[#1F2937] mb-2">
        Welcome Back
    </h2>

    <p className="text-gray-500 mb-8">
        Sign in to your account to continue
    </p>

    {
    registerSuccess && (

        <div className="mb-6 rounded-xl bg-green-100 border border-green-300 text-green-700 px-4 py-3">

            {registerSuccess}

        </div>

    )
    }

    <form onSubmit={handleSubmit} className="space-y-5">

    <InputField
        label="Email Address"
        type="email"
        name="email"
        placeholder="you@university.edu"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
    />

    <InputField
        label="Password"
        type="password"
        name="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
    />

    <div className="flex items-center justify-between">

        <label className="flex items-center gap-2 text-sm text-gray-600">

            <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="accent-[#2563EB]"
            />

            Remember me

        </label>

        <button
            type="button"
            className="text-sm text-[#2563EB] hover:underline"
        >
            Forgot Password?
        </button>

    </div>

    <button
        type="submit"
        disabled={loading}
        className={`
        w-full
        py-3
        rounded-xl
        font-semibold
        text-white
        transition

        ${
            loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-[#2563EB] hover:bg-blue-700"
        }
        `}
    >

        {loading ? "Signing In..." : "Sign In"}

    </button>

</form>

<div className="my-6 flex items-center gap-3">

    <div className="flex-1 h-px bg-gray-200"></div>

    <span className="text-xs text-gray-400">
        or continue with
    </span>

    <div className="flex-1 h-px bg-gray-200"></div>

</div>

<button
    type="button"
    className="w-full border border-gray-200 rounded-xl py-3 font-semibold hover:bg-gray-50 transition"
>
    Continue with Google
</button>

<p className="text-center mt-6 text-sm text-gray-500">

    Don't have an account?{" "}

    <Link
        to="/register"
        className="text-[#2563EB] font-semibold hover:underline"
    >
        Create one
    </Link>

</p>

    </div>

    );

};

export default LoginForm;
