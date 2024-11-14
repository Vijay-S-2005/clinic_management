"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddPatient() {
  // State for form inputs
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [height, setHeight] = useState(""); // Optional
  const [weight, setWeight] = useState(""); // Optional
  const [maritalStatus, setMaritalStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState(""); // Optional

  const maritalStatuses = ["Single", "Married"];
  const router = useRouter(); // Initialize useRouter

  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !age || !address || !sex || !phoneNumber || !maritalStatus) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newPatient = {
      name: name,
      age: age,
      address: address,
      sex: sex,
      height: height,
      weight: weight,
      maritalStatus: maritalStatus,
      phoneNumber: phoneNumber,
      email: email,
    };

    try {
      const response = await axios.post("/api/managePatient", newPatient);
      console.log(response.data);

      // Clear form fields after successful submission
      setName("");
      setAge("");
      setAddress("");
      setSex("");
      setHeight("");
      setWeight("");
      setMaritalStatus("");
      setPhoneNumber("");
      setEmail("");
      toast.success("Patient details saved successfully!");

      // Redirect to managePatient page after successful save
      router.push("/managePatient?success=true");

    } catch (error) {
      console.error("There was an error saving the patient details:", error);
      toast.error("Error saving patient details. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex items-center justify-center w-full">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Add New Patient
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 0)} // Parse input as integer
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sex
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sex"
                      value="Male"
                      onChange={(e) => setSex(e.target.value)}
                      required
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sex"
                      value="Female"
                      onChange={(e) => setSex(e.target.value)}
                      required
                      className="mr-2"
                    />
                    Female
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (optional)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="cm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (optional)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marital Status
                </label>
                <select
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">- Select Status -</option>
                  {maritalStatuses.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white w-full px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Patient Details
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
