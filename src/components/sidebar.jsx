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
          <h2 className="mt-4 text-xl font-semibold">Admin Name</h2>
          <p className="text-green-400">Admin</p>
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
