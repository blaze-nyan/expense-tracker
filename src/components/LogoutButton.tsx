/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.error("logout failed");
      }
      router.push("/login");
      router.refresh();
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
