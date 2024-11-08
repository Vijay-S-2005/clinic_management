"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '../../../src/components/sidebar';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Medicinelist() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [medicines, setMedicines] = useState([]);  // State to hold fetched medicines
    const resultsPerPage = 8;

    // Fetch medicines data from backend
    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await axios.get('/api/managemedicine');  // Adjust endpoint as needed
                setMedicines(response.data.data);  // Assuming API response structure
            } catch (error) {
                console.error("Error fetching medicines:", error);
            }
        };
        fetchMedicines();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleGroupChange = (e) => {
        setSelectedGroup(e.target.value);
        setCurrentPage(1);
    };

    const filteredMedicines = medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedGroup === '' || medicine.groupName === selectedGroup)
    );

    const totalResults = filteredMedicines.length;
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

    const currentMedicines = filteredMedicines.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
    );

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6">
                <div className="flex justify-end mb-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={() => router.push("/addmedicine")}>
                        + Add New Item
                    </button>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold">Medicine Inventory ({totalResults})</h2>
                    <p className="mb-4 text-gray-600">Details of medicines available in stock.</p>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search Medicines..."
                        className="p-2 border border-gray-300 rounded w-1/2"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <select
                        className="p-2 border border-gray-300 rounded"
                        value={selectedGroup}
                        onChange={handleGroupChange}
                    >
                        <option value="">- Select Group -</option>
                        <option value="Generic Medicine">Generic Medicine</option>
                        <option value="Diabetes">Diabetes</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">ID</th>
                                <th className="p-4 text-left">Brand</th>
                                <th className="p-4 text-left">Group</th>
                                <th className="p-4 text-left">Form</th>
                                <th className="p-4 text-left">Strength</th>
                                <th className="p-4 text-left">Quantity</th>
                                <th className="p-4 text-left">Expiry Date</th>
                                <th className="p-4 text-left">Price (₹)</th>
                                <th className="p-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMedicines.map((medicine) => (
                                <tr key={medicine.medicine_id} className="border-t hover:bg-gray-100">
                                    <td className="p-4">{medicine.name}</td>
                                    <td className="p-4">{medicine.medicine_id}</td>
                                    <td className="p-4">{medicine.brand}</td>
                                    <td className="p-4">{medicine.groupName}</td>
                                    <td className="p-4">{medicine.dosageForm}</td>
                                    <td className="p-4">{medicine.strength}</td>
                                    <td className="p-4">{medicine.quantity}</td>
                                    <td className="p-4">{new Date(medicine.expiryDate).toLocaleDateString('en-GB')}</td>
                                    <td className="p-4">₹{parseFloat(medicine.price).toFixed(2)}</td>
                                    <td className="p-4">
                                        <Link href={`/medicinelist/${medicine.medicine_id}`}>
                                            <button className="text-blue-500 hover:underline">View Details</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <span>Showing {(currentPage - 1) * resultsPerPage + 1} - {Math.min(currentPage * resultsPerPage, totalResults)} of {totalResults} results</span>
                    <div className="space-x-2">
                        <button className="p-2 border border-gray-300 rounded" onClick={handlePrevPage} disabled={currentPage === 1}>{"<"}</button>
                        <span>Page {String(currentPage).padStart(2, '0')}</span>
                        <button className="p-2 border border-gray-300 rounded" onClick={handleNextPage} disabled={currentPage === totalPages}>{">"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
