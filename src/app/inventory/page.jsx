import React from 'react';
import Link from 'next/link';
import Sidebar from '../../components/sidebar';
// import { useRouter } from "next/navigation";

const inventory = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar/>
    <div className="flex-1 p-6">
    <div className="flex justify-end">
        <button className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600">
          + Add New Item
        </button>
        </div>
    
      <div className="text-3xl font-bold mb-4">Inventory</div>
      <p className="text-gray-600 mb-8">List of medicines available for sales.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Medicines Available Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
          <div className="text-blue-500 text-2xl mb-2">298</div>
          <p className="text-lg font-bold">Medicines Available</p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            View Full List &raquo;
          </button>
        </div>

        {/* Medicine Groups Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
          <div className="text-green-500 text-2xl mb-2">02</div>
          <p className="text-lg font-bold">Medicine Groups</p>
          <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            View Groups &raquo;
          </button>
        </div>

        {/* Medicine Shortage Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500">
          <div className="text-red-500 text-2xl mb-2">01</div>
          <p className="text-lg font-bold">Medicine Shortage</p>
          <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Resolve Now &raquo;
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default inventory;
