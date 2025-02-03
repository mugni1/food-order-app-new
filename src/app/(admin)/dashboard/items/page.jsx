"use client";

import swal from "sweetalert";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import LoadingItems from "@/components/dashboard/items/Loading";
import NotFoundItems from "@/components/dashboard/items/NotFound";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [filterItem, setFilterItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  //handle delete
  const handleDelete = (id) => {
    swal({
      icon: "warning",
      title: "Warning",
      text: "Apakah Kamu yakin ingin menghapus item ini?",
      buttons: ["Batal", "Hapus"],
      dangerMode: true,
    }).then((res) => {
      if (res) {
        axios({
          method: "DELETE",
          url: `http://localhost:8000/api/items/${id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => {
            setItems(items.filter((item) => item.id !== id));
            swal({
              icon: "success",
              title: "Success",
              text: res.data.message,
            });
          })
          .catch((err) => {
            swal({
              icon: "error",
              title: "Error",
              text: err.response.data.message,
            });
          });
      }
    });
  };

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
        <div className="flex items-center relative text-slate-500 h-20">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg py-2 px-2"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-slate-500 "
          >
            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            <path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"></path>
          </svg>
        </div>
      </section>
      <section className="w-full rounded-xl shadow-lg p-5 bg-white my-5">
        <table className="w-full">
          <thead>
            <tr className=" border-b">
              <th className="w-1/12 py-5">No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th className="w-2/12" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {loading ? (
              <LoadingItems />
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
                  <td>
                    <Button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="bg-red-600 ring-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current"
                      >
                        <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path>
                      </svg>
                    </Button>
                  </td>
                  <td>
                    <Button
                      className="bg-amber-500 ring-amber-500"
                      onClick={() => router.push(`/dashboard/items/${item.id}`)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current"
                      >
                        <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
                        <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
                      </svg>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <NotFoundItems />
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
