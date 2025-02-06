"use client";
import axios from "axios";
import swal from "sweetalert";
import { useEffect } from "react";
import router from "next/router";
export default function OrderCreatePage() {
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      router.push("/login");
    }
    if (localStorage.getItem("token") != null) {
      axios({
        method: "get",
        url: "http://localhost:8000/api/profile",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          localStorage.setItem("name", res.data.data.name);
          localStorage.setItem("email", res.data.data.email);
          localStorage.setItem("role", res.data.data.role.name);
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
          });
          localStorage.clear();
          router.push("/login");
        });
    }
  }, []);
  return <h1> Creaet Order</h1>;
}
