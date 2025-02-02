"use client";

import Button from "@/components/Button";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [filterItem, setFilterItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // search
  useEffect(() => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilterItems(filteredItems);
  }, [search, items]);

  // on mount all items
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8000/api/items",
    })
      .then((res) => {
        setItems(res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <main className="w-full">
      <section className="w-full justify-between items-center flex">
        <Link
          className="px-5 bg-emerald-600 ring-emerald-600 active:scale-95 py-2 text-white active:ring-2 ring-offset-2 rounded-lg font-semibold  transition-all ease-in-out"
          href="/dashboard/items/add"
        >
          Add Items
        </Link>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg py-2 px-2"
          placeholder="Search"
        />
      </section>
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
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-5 text-2xl">
                  Loading...
                </td>
              </tr>
            ) : filterItem.length > 0 ? (
              filterItem.map((item, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <h1 className="text-center py-5 font-semibold text-red-600 text-2xl">
                    Items Not Found
                  </h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
