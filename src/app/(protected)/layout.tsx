"use client";
import { getToken } from "@/api/config";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getToken();

  if (!token) {
    redirect("/login");
  }


  return <div className='w-screen h-screen flex justify-center items-center bg-gray-500'>{children}</div>;
}