"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function ManagePatient() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const router = useRouter();
  useEffect(() => {
    // Show success toast if redirected from AddPatient page
    if (success === "true") {
      toast.success("Patient details saved successfully!");

      // Remove the 'success' query parameter from the URL after showing the toast
      router.replace("/managePatient");
    }
  }, [success, router]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="text-3xl font-bold mb-4">Manage Patient</div>
        <p className="text-gray-600 mb-8">Add or Manage the patients</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* Medicines Available Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
            <div className="text-blue-500 text-2xl mb-2">Logo</div>
            <p className="text-lg font-bold">Add New Patient</p>
            <button
              onClick={() => router.push("/addPatient")}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              ADD &raquo;
            </button>
          </div>

          {/* Medicine Shortage Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500">
            <div className="text-red-500 text-2xl mb-2">Logo</div>
            <p className="text-lg font-bold">Manage Existing Patient</p>
            <button
              onClick={() => router.push("/patientList")}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              View List &raquo;
            </button>
          </div>
          {/* today patient */}
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500">
            <div className="text-red-500 text-2xl mb-2">Logo</div>
            <p className="text-lg font-bold">Todays Token </p>
            <button
              onClick={() => router.push("/tokenList")}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              View List &raquo;
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
