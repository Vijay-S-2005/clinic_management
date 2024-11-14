"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../../components/sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PatientDetail({ params }) {
  const router = useRouter();
  console.log("params", params);
  const patientId = params.patient_id;
  console.log("patientId", patientId);
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState(null); // Set initial state to null

  // Fetch patient data from the backend
  const getPatientById = async (patientId) => {
    try {
      const response = await axios.get(`/api/managePatient`, {
        params: { patientId: patientId },
      });
      setPatient(response.data);
      console.log("res", response.data);
    } catch (error) {
      console.error(`Error retrieving Patient with ID ${patientId}:`, error);
      toast.error("Failed to retrieve Patient data");
    }
  };

  // Fetch patient data on component mount
  useEffect(() => {
    getPatientById(patientId);
  }, [patientId]);

  // Toggle edit mode
  const toggleEditMode = () => setIsEditing((prev) => !prev);

  // Helper function to handle null or empty values
  const displayValue = (value) => value || "-";

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  // Save updated patient data to the backend
  const handleSave = async () => {
    try {
      await axios.put(`/api/managePatient`, {
        patientId: patient.patientId,
        name: patient.name,
        age: patient.age,
        address: patient.address,
        sex: patient.sex,
        height: patient.height,
        weight: patient.weight,
        martialStatus: patient.martialStatus,
        phoneNumber: patient.phoneNumber,
        email: patient.email,
      });
      toast.success("Changes saved successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating patient:", error);
      toast.error("Failed to save changes");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    toast.info("Edit cancelled");
  };

  // Delete patient and redirect to the list page
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/managePatient`, {
        params: { patientId: patient.patientId },
      });
      toast.success("Patient deleted successfully");
      router.push("/patientList");
    } catch (error) {
      console.error("Error deleting patient:", error);
      toast.error("Failed to delete patient");
    }
  };

  // Render loading state while data is being fetched
  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
          {/* Toastify Container */}
          <ToastContainer />

          {/* Breadcrumb */}
          <div className="text-gray-500 text-sm mb-4">
            <span className="font-semibold">Manage Patient</span> &gt;{" "}
            <span>List of Patient</span> &gt;{" "}
            <span className="font-semibold">{displayValue(patient.name)}</span>
          </div>

          {/* Header */}
          <h1 className="text-xl font-bold mb-4">
            {displayValue(patient.name)}
          </h1>

          {/* Patient Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Patient Information Panel */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h2 className="text-lg font-semibold mb-2">
                Patient Information
              </h2>
              <div className="text-gray-800 space-y-3">
                <div className="border-b pb-3">
                  <p className="text-2xl font-bold">
                    {displayValue(patient.patientId)}
                  </p>
                  <p className="text-sm text-gray-500">Patient ID</p>
                </div>
                <div className="border-b pb-3">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={patient.name || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-lg">{displayValue(patient.name)}</p>
                  )}
                  <p className="text-sm text-gray-500">Patient Name</p>
                </div>
                <div className="border-b pb-3">
                  {isEditing ? (
                    <input
                      type="text"
                      name="age"
                      value={patient.age || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-lg">{displayValue(patient.age)}</p>
                  )}
                  <p className="text-sm text-gray-500">Age</p>
                </div>
                <div className="border-b pb-3">
                  {isEditing ? (
                    <input
                      type="text"
                      name="sex"
                      value={patient.sex || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-lg">{displayValue(patient.sex)}</p>
                  )}
                  <p className="text-sm text-gray-500">Sex</p>
                </div>
                <div className="border-b pb-3">
                  {isEditing ? (
                    <input
                      type="text"
                      name="martialStatus"
                      value={patient.martialStatus || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-lg">
                      {displayValue(patient.martialStatus)}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">Martial Status</p>
                </div>
              </div>
            </div>

            {/* Contact Detail & Others Panel */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h2 className="text-lg font-semibold mb-2">
                Contact Detail & Others
              </h2>
              <div className="text-gray-800 space-y-3">
                <div className="border-b pb-3">
                  {isEditing ? (
                    <input
                      type="number"
                      name="phoneNumber"
                      value={patient.phoneNumber || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-2xl font-bold">
                      {displayValue(patient.phoneNumber)}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">Phone Number</p>
                </div>
                <div className="border-b pb-3">
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={patient.email || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-lg">{displayValue(patient.email)}</p>
                  )}
                  <p className="text-sm text-gray-500">Email ID</p>
                </div>
                <div className="border-b pb-3">
                  {isEditing ? (
                    <input
                      type="number"
                      name="height"
                      value={patient.height || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-lg">{displayValue(patient.height)}</p>
                  )}
                  <p className="text-sm text-gray-500">Height</p>
                </div>

                <div className="border-b pb-3">
                  {isEditing ? (
                    <input
                      type="number"
                      name="weight"
                      value={patient.weight || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-lg">{displayValue(patient.weight)}</p>
                  )}
                  <p className="text-sm text-gray-500">Weight</p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit/Save/Cancel Buttons */}
          <div className="flex gap-4">
            {isEditing ? (
              <>
                <button
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
                <button
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={toggleEditMode}
              >
                Edit patient
              </button>
            )}
          </div>

          {/* Delete Button */}
          <button
            className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
            onClick={handleDelete}
          >
            Delete patient
          </button>
        </div>
      </div>
    </div>
  );
}
