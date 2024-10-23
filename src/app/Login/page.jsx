"use client";

import { useState } from "react";
import Image from "next/image";
import { Assets } from "../../../public/Assets";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("doctor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    const validationErrors = {};
    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";
    return validationErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in both email and password!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      try {
        const result = await signIn("loginWithPassword", {
          email,
          password,
          type: selectedRole, // passing user role here
          redirect: false,
        });
        console.log("result", result);
        if (!result.error) {
          toast.success("Login successful!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          router.push("/dashboard"); // Navigate to dashboard
        } else {
          toast.error(result.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setErrors({ ...errors, password: result.error });
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred during login.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-500 to-navy-800">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <p className="text-black font-bold text-xl">ABC CLINIC MANAGEMENTS</p>
        </div>
        <div className="text-center mb-6">
          <Image
            src={Assets.clinicLogo}
            alt="Logo"
            className="mx-auto w-24 h-24"
          />
        </div>
        <div className="mb-4 flex justify-center gap-4">
          <label className="inline-flex items-center text-black">
            <input
              type="radio"
              name="role"
              value="doctor"
              checked={selectedRole === "doctor"}
              onChange={() => setSelectedRole("doctor")}
              className="text-blue-500 focus:ring-blue-500"
            />
            <span className="ml-2">Doctor</span>
          </label>
          <label className="inline-flex items-center text-black">
            <input
              type="radio"
              name="role"
              value="receptionist"
              checked={selectedRole === "receptionist"}
              onChange={() => setSelectedRole("receptionist")}
              className="text-blue-500 focus:ring-blue-500"
            />
            <span className="ml-2">Receptionist</span>
          </label>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-navy-800 text-white py-2 rounded-lg hover:bg-blue-500 transition-all duration-300"
            style={{ backgroundColor: "#1a365d" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
