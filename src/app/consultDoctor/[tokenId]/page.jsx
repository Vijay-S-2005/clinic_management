"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ConsultDoctor() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
    </div>
  );
}
