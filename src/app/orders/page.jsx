import React from 'react';
import Link from 'next/link';
import Sidebar from '../../components/sidebar';
// import { useRouter, usePathname } from "next/navigation";
const orders = () => {
return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar/>
      <h1>orders</h1>
    </div>
);
};
export default orders;