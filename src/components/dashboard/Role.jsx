"use client";
import { useEffect, useState } from "react";

export default function Role() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  return <h2>{role != null ? role[0].toUpperCase() + role.slice(1) : ""}</h2>;
}
