"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { TableHead } from "./TableHead";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function OrderListPage() {
  // state
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // router
  const router = useRouter();

  // get order list from api
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8000/api/orders/ready",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(res);
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <main className="w-full flex flex-col">
      <section className=" w-full bg-white rounded-xl shadow-lg p-5">
        {loading ? (
          <h1 className="w-full text-center font-semibold text-xl ">
            Loading...
          </h1>
        ) : (
          <table className="w-full">
            <TableHead />
            <tbody className="w-full">
              {orders.map((order) => (
                <tr key={order.id} className="w-full">
                  <td className="border-b py-5 text-center">
                    {order.customer_name}
                  </td>
                  <td className="border-b py-5 text-center">
                    {order.table_no}
                  </td>
                  <td className="border-b py-5 text-center">
                    <span
                      className={`py-1 px-3 rounded-lg text-white ${
                        order.status == "ordered" && "bg-red-500"
                      } ${order.status == "ready" && "bg-amber-500"} ${
                        order.status == "paid" && "bg-emerald-500"
                      } ${order.status == "delivered" && "bg-sky-500"}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="border-b py-5 text-center font-semibold">
                    Rp {order.total.toLocaleString("id-ID")}
                  </td>
                  <td className="border-b py-5 text-center">
                    {order.order_date}
                  </td>
                  <td className="border-b py-5 text-center">
                    {order.order_time}
                  </td>
                  <td className="border-b py-5 px-2 text-center">
                    <button
                      onClick={() => {
                        router.push(
                          "http://localhost:3000/dashboard/order-list/" +
                            order.id
                        );
                      }}
                      className=" font-semibold text-white bg-sky-500 p-2 rounded-full active:bg-sky-700 active:scale-95 transition-all ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current"
                      >
                        <path d="M14 12c-1.095 0-2-.905-2-2 0-.354.103-.683.268-.973C12.178 9.02 12.092 9 12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-.092-.02-.178-.027-.268-.29.165-.619.268-.973.268z"></path>
                        <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
