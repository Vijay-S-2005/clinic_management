// Sidebar.js

import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import { Assets } from "../../public/Assets";
// import { useRouter } from "next/navigation";


const Sidebar = () => {
  // const router = useRouter();
  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center mt-10">
        <div className="text-center">
          <Image
            src={Assets.admin01}
            className="rounded-full h-12 w-12 mx-auto"
            alt="admin"
          />
          <div className="flex flex-col items-center mt-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">Admin Name</h2>
              <button className="ml-4 p-1 text-xs bg-gray-200 rounded-full hover:bg-gray-300">
                <Image 
                  src={Assets.options}
                  className="h-4 w-4" // Adjust the size of the icon
                  alt="options"
                />
              </button>
            </div>
            <p className="text-green-400 mt-2 text-center">Admin</p>
          </div>
        </div>
      </div>
      <nav className="mt-10">
        <ul>
          <li className="py-2 px-6 hover:bg-teal-500">
            <Link href="/dashboard">Dashboard</Link> 
          </li>
          <li className="py-2 px-6 hover:bg-teal-500">
            <Link href="/inventory">Inventory</Link> {/* Use Next.js Link */}
          </li>
          <li className="py-2 px-6 hover:bg-teal-500">
            <Link href="/orders">orders</Link>
          </li>
          <li className="py-2 px-6 hover:bg-teal-500">Reports</li>
          <li className="py-2 px-6 hover:bg-teal-500">Configuration</li>
          <li className="py-2 px-6 hover:bg-teal-500">Contact Management</li>
          <li className="py-2 px-6 hover:bg-teal-500">Notifications</li>
          <li className="py-2 px-6 hover:bg-teal-500">Chat with Visitors</li>
          <li className="py-2 px-6 hover:bg-teal-500">Application Settings</li>
          <li className="py-2 px-6 hover:bg-teal-500">Get Technical Help</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
