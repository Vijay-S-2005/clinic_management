"use client";
import React from 'react';
import Sidebar from '../../components/sidebar';
import { useRouter } from 'next/navigation';


const dash = () => {
  const router = useRouter();
  const handleClick = (route) => {
        router.push(route); 
    };
  const getGreeting = () => {
    const now = new Date();
    const hours = now.getHours();
    let greeting;

    if (hours >= 5 && hours < 12) {
      greeting = "Good Morning";
    } else if (hours >= 12 && hours < 17) {
      greeting = "Good Afternoon";
    } else if (hours >= 17 && hours < 21) {
      greeting = "Good Evening";
    } else {
      greeting = "Good Night";
    }

    return `${greeting}, ${now.toLocaleDateString()}`;
  };

  const greetingMessage = getGreeting(); 
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar/>
      {/* Dashboard */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-500">A quick data overview of the inventory.</p>
          </div>
          <div className="flex items-center space-x-4">
            <p>{greetingMessage}</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Download Report
            </button>
          </div>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-gray-500">Inventory Status</h2>
            <p className="text-green-600 text-2xl">Good</p>
            <button className="text-blue-500 mt-2">View Detailed Report</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-gray-500">Revenue (Oct 2024)</h2>
            <p className="text-yellow-600 text-2xl">Rs. 8,55,875</p>
            <button className="text-blue-500 mt-2">View Detailed Report</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-gray-500">Medicines Available</h2>
            <p className="text-blue-600 text-2xl">298</p>
            <button 
                  className="text-blue-500 mt-2" 
                    onClick={() => handleClick('/inventory')} // Navigate to inventory page
            >
            Visit Inventory
            </button>

          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-gray-500">Medicine Shortage</h2>
            <p className="text-red-600 text-2xl">01</p>
            <button className="text-red-500 mt-2">Resolve Now</button>
          </div>
        </div>

        {/* Inventory and Quick Report */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-gray-500">Inventory</h2>
            <p className="text-2xl">298 Total no of Medicines</p>
            <p className="text-xl">24 Medicine Groups</p>
            <button className="text-blue-500 mt-2">Go to Configuration</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-gray-500">Quick Report</h2>
            <p className="text-2xl">70,856 Qty of Medicines Sold</p>
            <p className="text-xl">5,288 Invoices Generated</p>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-gray-500">My Pharmacy</h2>
            <p className="text-2xl">04 Total no of Suppliers</p>
            <p className="text-xl">05 Total no of Users</p>
            <button className="text-blue-500 mt-2">Go to User Management</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-gray-500">Customers</h2>
            <p className="text-2xl">845 Total no of Customers</p>
            <button className="text-blue-500 mt-2">Go to Customers Page</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-gray-500">Frequently bought Item</h2>
            <p className="text-2xl">Paracetamol</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dash;
