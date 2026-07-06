import { useState } from "react";
import { Link } from "react-router-dom";

import InputField from "./InputField";
import SelectField from "./SelectField";
import RoleSelector from "./RoleSelector";

import departments from "../../data/departments";

import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    university_id: "",
    email: "",
    department: "",
    role: "student",
    password: "",
    password_confirmation: "",
  });


  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setSuccess("");
    setLoading(true);

    try {

    const response = await registerUser(formData);
    setSuccess("Registration successful! Redirecting to login...");

    setTimeout(() => {
    navigate("/login", {
        state: {
            success: "Registration successful. Please login."
        }
    });
    }, 1500);
    

} catch (error) {

    if (error.response?.status === 422){
      setErrors(error.response.data.errors);
    }

} finally {
   setLoading(false);
}
  };

  return (
    <div className="w-full max-w-md mx-auto">

      <h2 className="text-3xl font-bold text-gray-800">
        Create your account
      </h2>

      <p className="text-gray-500 mt-2 mb-8">
        Join the AI Campus Assistant platform today.
      </p>


      {
success && (

<div className="mb-5 p-3 rounded-lg bg-green-100 text-green-700">

{success}

</div>

)
}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <InputField
          label="Full Name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <InputField
          label="University ID"
          name="university_id"
          placeholder="e.g. 221-15-XXXX"
          value={formData.university_id}
          onChange={handleChange}
          error={errors.university_id}
          required
        />

        <InputField
          label="Email Address"
          type="email"
          name="email"
          placeholder="example@email.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <SelectField
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          options={departments}
          error={errors.department}
          required
        />

        <RoleSelector
          value={formData.role}
          onChange={handleRoleChange}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="Minimum 8 characters"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <InputField
          label="Confirm Password"
          type="password"
          name="password_confirmation"
          placeholder="Confirm password"
          value={formData.password_confirmation}
          onChange={handleChange}
          error={errors.password_confirmation}
          required
        />

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
          {loading ? "Creating Account..." : "Create Account"}
      </button>

      </form>

      <p className="mt-6 text-center text-gray-500">

        Already have an account?

        <Link
          to="/login"
          className="ml-2 font-semibold text-[#2563EB] hover:underline"
        >
          Sign In
        </Link>

      </p>

    </div>
  );
};

export default RegisterForm;
