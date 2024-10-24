import React from "react";
export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {children}
    </div>
  );
}