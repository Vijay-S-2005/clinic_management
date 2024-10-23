"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Header = () => {
  const router = useRouter();
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

    // Explicitly format the date as DD/MM/YYYY to avoid locale mismatches
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return `${greeting}, ${formattedDate}`;
  };

  const greetingMessage = getGreeting();

  return (
    <div>
      {" "}
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            A quick data overview of the inventory.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <p>{greetingMessage}</p>
        </div>
      </header>
    </div>
  );
};

export default Header;
