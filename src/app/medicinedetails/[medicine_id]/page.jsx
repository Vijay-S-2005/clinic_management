"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../../components/sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MedicineDetails({ params }) {
  const router = useRouter();

  const medicineId = params.medicine_id;
  console.log("medicineId", medicineId);
  const [isEditing, setIsEditing] = useState(false);
  const [medicine, setMedicine] = useState(null); // Set initial state to null

  // Fetch medicine data from the backend
  const getMedicineById = async (medicineId) => {
    try {
      const response = await axios.get(`/api/managemedicine`, {
        params: { medicine_id_auto: medicineId },
      });
      setMedicine(response.data.data);
      console.log("res", response.data.data);
    } catch (error) {
      console.error(`Error retrieving medicine with ID ${medicineId}:`, error);
      toast.error("Failed to retrieve medicine data");
    }
  };

  // Fetch medicine data on component mount
  useEffect(() => {
    getMedicineById(medicineId);
  }, [medicineId]);

  // Toggle edit mode
  const toggleEditMode = () => setIsEditing((prev) => !prev);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicine((prevMedicine) => ({
      ...prevMedicine,
      [name]: value,
    }));
  };

  // Save updated medicine data to the backend
  const handleSave = async () => {
    try {
      await axios.put(`/api/managemedicine`, {
        medicine_id_auto: medicine.medicine_id_auto,
        medicine_id: medicine.medicine_id,
        name: medicine.name,
        brand: medicine.brand,
        groupName: medicine.groupName,
        dosageForm: medicine.dosageForm,
        strength: medicine.strength,
        quantity: medicine.quantity,
        expiryDate: medicine.expiryDate,
        price: medicine.price,
        notes: medicine.notes,
      });
      toast.success("Changes saved successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating medicine:", error);
      toast.error("Failed to save changes");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    toast.info("Edit cancelled");
  };

  // Delete medicine and redirect to the list page
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/managemedicine`, {
        params: { medicine_id_auto: medicine.medicine_id_auto },
      });
      toast.success("Medicine deleted successfully");
      console.log("hit1");
      router.push("/medicinelist");
      console.log("hit2");
    } catch (error) {
      console.error("Error deleting medicine:", error);
      toast.error("Failed to delete medicine");
    }
  };

  // Render loading state while data is being fetched
  if (!medicine) {
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
            <span className="font-semibold">Inventory</span> &gt;{" "}
            <span>List of Medicines</span> &gt;{" "}
            <span className="font-semibold">{medicine.name}</span>
          </div>

          {/* Header */}
          <h1 className="text-xl font-bold mb-4">{medicine.name}</h1>

          {/* Medicine Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Medicine Information Panel */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h2 className="text-lg font-semibold mb-2">
                Medicine Information
              </h2>
              <div className="text-gray-800 space-y-3">
                <div className="border-b pb-3">
                  <p className="text-2xl font-bold">{medicine.medicine_id}</p>
                  <p className="text-sm text-gray-500">Medicine ID</p>
                </div>
                <div className="border-b pb-3">
                  {isEditing ? (
                    <input
                      type="text"
                      name="brand"
                      value={medicine.brand}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-lg">{medicine.brand}</p>
                  )}
                  <p className="text-sm text-gray-500">Brand</p>
                </div>
                <div className="border-b pb-3">
                  {isEditing ? (
                    <input
                      type="text"
                      name="groupName"
                      value={medicine.groupName}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-lg">{medicine.groupName}</p>
                  )}
                  <p className="text-sm text-gray-500">Group</p>
                </div>
                <div className="border-b pb-3">
                  {isEditing ? (
                    <input
                      type="text"
                      name="dosageForm"
                      value={medicine.dosageForm}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-lg">{medicine.dosageForm}</p>
                  )}
                  <p className="text-sm text-gray-500">Dosage Form</p>
                </div>
                <div className="border-b pb-3">
                  {isEditing ? (
                    <input
                      type="text"
                      name="strength"
                      value={medicine.strength}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-lg">{medicine.strength}</p>
                  )}
                  <p className="text-sm text-gray-500">Strength</p>
                </div>
              </div>
            </div>

            {/* Inventory Information Panel */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h2 className="text-lg font-semibold mb-2">
                Inventory & Pricing
              </h2>
              <div className="text-gray-800 space-y-3">
                <div className="border-b pb-3">
                  {isEditing ? (
                    <input
                      type="number"
                      name="quantity"
                      value={medicine.quantity}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-2xl font-bold">{medicine.quantity}</p>
                  )}
                  <p className="text-sm text-gray-500">Quantity in Stock</p>
                </div>
                <div className="border-b pb-3">
                  {isEditing ? (
                    <input
                      type="date"
                      name="expiryDate"
                      value={medicine.expiryDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-lg">{medicine.expiryDate}</p>
                  )}
                  <p className="text-sm text-gray-500">Expiry Date</p>
                </div>
                <div className="border-b pb-3">
                  {isEditing ? (
                    <input
                      type="number"
                      name="price"
                      value={medicine.price}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-lg">₹{medicine.price}</p>
                  )}
                  <p className="text-sm text-gray-500">Price</p>
                </div>
                {medicine.notes && (
                  <div className="border-b pb-3">
                    {isEditing ? (
                      <textarea
                        name="notes"
                        value={medicine.notes}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      <p className="text-lg">{medicine.notes}</p>
                    )}
                    <p className="text-sm text-gray-500">Notes</p>
                  </div>
                )}
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
                Edit Medicine
              </button>
            )}
          </div>

          {/* Delete Button */}
          <button
            className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
            onClick={handleDelete}
          >
            Delete Medicine
          </button>
        </div>
      </div>
    </div>
  );
}
