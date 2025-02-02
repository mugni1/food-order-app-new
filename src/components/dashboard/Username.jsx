"use client";
import { useEffect, useState } from "react";

export default function Username() {
  const [name, setName] = useState(null);

  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, []);

  return <h2>{name ?? "anonymous"}</h2>;
}
