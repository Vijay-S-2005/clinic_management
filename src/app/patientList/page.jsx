"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PatientList() {
  const router = useRouter();
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState([]);
  const resultsPerPage = 8;

  const handleAssignToken = async (patientId) => {
    try {
      console.log("patientId:", patientId);
      const response = await axios.post("/api/manageToken", {
        patientId: patientId,
      });
      if (response.status === 201) {
        toast.success("Token assigned successfully!");
      }
    } catch (error) {
      console.error("Error assigning token:", error);
      toast.error("Failed to assign token.");
    }
  };

  // Fetch dynamic patient data
  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await axios.get("/api/managePatient");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    }
    fetchPatients();
  }, []);

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchPhoneChange = (e) => {
    setSearchPhone(e.target.value);
    setCurrentPage(1);
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchName.toLowerCase()) &&
      patient.phoneNumber.includes(searchPhone)
  );

  const totalResults = filteredPatients.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentPatients = filteredPatients.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <ToastContainer />
        <div className="flex justify-end mb-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={() => router.push("/addPatient")}
          >
            + Add New Patient
          </button>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Patient List ({totalResults})</h2>
          <p className="mb-4 text-gray-600">Details of registered patients.</p>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search by Name..."
            className="p-2 border border-gray-300 rounded w-1/2"
            value={searchName}
            onChange={handleSearchNameChange}
          />
          <input
            type="text"
            placeholder="Search by Phone Number..."
            className="p-2 border border-gray-300 rounded w-1/2"
            value={searchPhone}
            onChange={handleSearchPhoneChange}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Age</th>
                <th className="p-4 text-left">Phone Number</th>
                <th className="p-4 text-left">Sex</th>
                <th className="p-4 text-left">Marital Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient) => (
                <tr
                  key={patient.patient_id}
                  className="border-t hover:bg-gray-100"
                >
                  <td className="p-4">{patient.name}</td>
                  <td className="p-4">{patient.age}</td>
                  <td className="p-4">{patient.phoneNumber}</td>
                  <td className="p-4">{patient.sex}</td>
                  <td className="p-4">{patient.maritalStatus}</td>
                  <td className="p-4 space-x-2">
                    <Link href={`/patientDetails/${patient.patientId}`}>
                      <button className="text-blue-500 hover:underline">
                        View Details
                      </button>
                    </Link>
                    <button
                      className="text-green-500 hover:underline"
                      onClick={() => handleAssignToken(patient.patientId)}
                    >
                      Assign Token
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span>
            Showing {(currentPage - 1) * resultsPerPage + 1} -{" "}
            {Math.min(currentPage * resultsPerPage, totalResults)} of{" "}
            {totalResults} results
          </span>
          <div className="space-x-2">
            <button
              className="p-2 border border-gray-300 rounded"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            <span>Page {String(currentPage).padStart(2, "0")}</span>
            <button
              className="p-2 border border-gray-300 rounded"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
