"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '../../../src/components/sidebar';
import { useRouter } from 'next/navigation';

const medicines = [
    { name: 'Augmentin 625 Duo Tablet', id: 'SIT23ID2435454', group: 'Generic Medicine', stock: 350 },
    { name: 'Azithral 500 Tablet', id: 'SIT23ID24354551', group: 'Generic Medicine', stock: 20 },
    { name: 'Ascoril LS Syrup', id: 'SIT23ID24355452', group: 'Diabetes', stock: 85 },
    { name: 'Azee 500 Tablet', id: 'SIT23ID24354540', group: 'Generic Medicine', stock: 75 },
    { name: 'Allegra 120mg Tablet', id: 'SIT23ID2435855', group: 'Diabetes', stock: 44 },
    { name: 'Alex Syrup', id: 'SIT23ID2435456', group: 'Generic Medicine', stock: 65 },
    { name: 'Amoxyclav 625 Tablet', id: 'SIT23ID24354557', group: 'Generic Medicine', stock: 150 },
    { name: 'Avil 25 Tablet', id: 'SIT23ID2435458', group: 'Generic Medicine', stock: 270 },
];

export default function Medicinelist() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(''); // New state for selected group
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 8;

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); 
    };

    // New handler for dropdown change
    const handleGroupChange = (e) => {
        setSelectedGroup(e.target.value);
        setCurrentPage(1); 
    };

    // Filter medicines based on both search term and selected group
    const filteredMedicines = medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedGroup === '' || medicine.group === selectedGroup) 
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
                <div className="flex justify-end">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={() =>router.push("/addmedicine")}
                    >
                        + Add New Item
                    </button>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold">
                        <p className="text-black-500">List of Medicines ({totalResults})</p>
                    </h2>
                    <p className="mb-4 text-gray-600">List of medicines available for sales.</p>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search Medicine Inventory.."
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
                
                <table className="min-w-full bg-white border rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="p-4 text-left">Medicine Name</th>
                            <th className="p-4 text-left">Medicine ID</th>
                            <th className="p-4 text-left">Group Name</th>
                            <th className="p-4 text-left">Stock in Qty</th>
                            <th className="p-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMedicines.map((medicine) => (
                            <tr key={medicine.id} className="border-t">
                                <td className="p-4">{medicine.name}</td>
                                <td className="p-4">{medicine.id}</td>
                                <td className="p-4">{medicine.group}</td>
                                <td className="p-4">{medicine.stock}</td>
                                <td className="p-4">
                                    <Link href={`/medicinelist/${medicine.id}`}>
                                        <button className="text-blue-500 hover:underline">
                                            View Full Detail &raquo;
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="flex justify-between items-center mt-4">
                    <span>Showing {(currentPage - 1) * resultsPerPage + 1} - {Math.min(currentPage * resultsPerPage, totalResults)} results of {totalResults}</span>
                    <div className="space-x-2">
                        <button className="p-2 border border-gray-300 rounded" onClick={handlePrevPage} disabled={currentPage === 1}>
                            {"<"}
                        </button>
                        <span>Page {String(currentPage).padStart(2, '0')}</span>
                        <button className="p-2 border border-gray-300 rounded" onClick={handleNextPage} disabled={currentPage === totalPages}>
                            {">"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
