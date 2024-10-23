import React from 'react';
import Link from 'next/link';
import Sidebar from '../../components/sidebar';
// import { useRouter, usePathname } from "next/navigation";
const inventory = () => {
return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar/>
      <h1>inventory</h1>
    </div>
);
};
export default inventory;