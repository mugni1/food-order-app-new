"use client";

import Button from "@/components/Button";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8000/api/items",
    }).then((res) => {
      setItems(res.data.data);
      console.log(res.data.data);
    });
  }, []);
  return (
    <main className="w-full">
      <Link
        className="px-5 bg-emerald-600 ring-emerald-600 active:scale-95 py-2 text-white active:ring-2 ring-offset-2 rounded-lg font-semibold  transition-all ease-in-out"
        href="/items/add"
      >
        Add Items
      </Link>
      <section className="w-full rounded-xl shadow-lg p-5 bg-white my-5">
        <table className="w-full">
          <thead>
            <tr className=" border-b">
              <th className="w-1/12 py-5">No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {items.map((item, index) => (
              <tr className="w-full  border-b" key={item.id}>
                <td className="w-1/12 text-center">{index + 1}</td>
                <td className="w-3/12 p-5 h-40">
                  <img
                    src={`http://localhost:8000/storage/images/${item.image}`}
                    alt=""
                    className="rounded-xl shadow-lg h-full mx-auto border"
                  />
                </td>
                <td className="text-center">{item.name}</td>
                <td className="text-center">
                  Rp {item.price.toLocaleString("id-ID")}
                </td>
                <td>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
