"use client";
import React from "react";
import { signIn, getSession, useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  console.log("session", session, status);
  return <div>home1</div>;
};

export default DashboardPage;
