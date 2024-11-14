"use client";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Addmedicine() {
  // State for form inputs
  const [medicineName, setMedicineName] = useState("");
  const [medicineID, setMedicineID] = useState("");
  const [brandName, setBrandName] = useState("");
  const [medicineGroup, setMedicineGroup] = useState("");
  const [dosageForm, setDosageForm] = useState("");
  const [strength, setStrength] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");

  // Options for the Medicine Group dropdown
  const medicineGroups = [
    "Generic Medicine",
    "Diabetes",
    "Pain Relief",
    "Vitamins",
    "Antibiotics",
  ];
  const dosageForms = ["Tablet", "Capsule", "Syrup", "Injection"];

  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !medicineName ||
      !medicineID ||
      !brandName ||
      !medicineGroup ||
      !dosageForm ||
      !strength ||
      !quantity ||
      !expiryDate ||
      !price
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newMedicine = {
      name: medicineName,
      medicine_id: medicineID,
      brand: brandName,
      group: medicineGroup,
      dosageForm: dosageForm,
      strength: strength,
      quantity: quantity,
      expiryDate: expiryDate,
      price: price,
      notes: notes,
    };

    try {
      const response = await axios.post("/api/managemedicine", newMedicine);
      console.log(response.data);

      // Clear form fields after successful submission
      setMedicineName("");
      setMedicineID("");
      setBrandName("");
      setMedicineGroup("");
      setDosageForm("");
      setStrength("");
      setQuantity("");
      setExpiryDate("");
      setPrice("");
      setNotes("");
      toast.success("Medicine saved successfully!");
    } catch (error) {
      console.error("There was an error saving the medicine:", error);
      toast.error("Error saving medicine. Please try again.");
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex items-center justify-center w-full">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Add New Medicine
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medicine Name
                </label>
                <input
                  type="text"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medicine ID
                </label>
                <input
                  type="text"
                  value={medicineID}
                  onChange={(e) => setMedicineID(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medicine Group
                </label>
                <select
                  value={medicineGroup}
                  onChange={(e) => setMedicineGroup(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">- Select Group -</option>
                  {medicineGroups.map((group, index) => (
                    <option key={index} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage Form
                </label>
                <select
                  value={dosageForm}
                  onChange={(e) => setDosageForm(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">- Select Form -</option>
                  {dosageForms.map((form, index) => (
                    <option key={index} value={form}>
                      {form}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Strength (e.g., 500 mg)
                </label>
                <input
                  type="text"
                  value={strength}
                  onChange={(e) => setStrength(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity in Number
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (per unit)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Any additional remarks (optional)"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-red-500 text-white w-full px-4 py-2 rounded hover:bg-red-600"
            >
              Save Details
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
