"use client";

import React from 'react';
import Sidebar from "../../../src/components/sidebar";

export default function MedicineDetails() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-8">
                <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
                    {/* Breadcrumb */}
                    <div className="text-gray-500 text-sm mb-4">
                        <span className="font-semibold">Inventory</span> &gt; <span>List of Medicines</span> &gt; <span className="font-semibold">Azithral 500 Tablet</span>
                    </div>

                    {/* Header */}
                    <h1 className="text-xl font-bold mb-4">Azithral 500 Tablet</h1>
                    <p className="text-gray-700 mb-6">List of medicines available for sales.</p>

                    {/* Medicine and Inventory Information */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg border">
                            <h2 className="text-lg font-semibold text-gray-700">Medicine</h2>
                            <div className="mt-2 text-gray-800">
                                <p><strong>298</strong> Medicine ID</p>
                                <p><strong>24</strong> Medicine Group</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border">
                            <h2 className="text-lg font-semibold text-gray-700">Inventory in Qty</h2>
                            <div className="mt-2 text-gray-800">
                                <p><strong>298</strong> Lifetime Supply</p>
                                <p><strong>290</strong> Lifetime Sales</p>
                                <p><strong>08</strong> Stock Left</p>
                            </div>
                            <button
                                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                                onClick={() => alert("request sent")}
                            >
                                Send Stock Request
                            </button>
                        </div>
                    </div>

                    {/* Usage Information */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-4 border">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">How to use</h3>
                        <p className="text-gray-800">
                            Take this medication by mouth with or without food as directed by your doctor, usually once daily.
                        </p>
                    </div>

                    {/* Side Effects */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-4 border">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Side Effects</h3>
                        <p className="text-gray-800">
                            Dizziness, lightheadedness, drowsiness, nausea, vomiting, tiredness, excess saliva/drooling, blurred vision, weight gain, constipation, headache, and trouble sleeping may occur. If any of these effects persist or worsen, consult your doctor.
                        </p>
                    </div>

                    {/* Delete Button */}
                    <button
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                        onClick={() => alert("Medicine deleted successfully")}
                    >
                        Delete Medicine
                    </button>
                </div>
            </div>
        </div>
    );
}
