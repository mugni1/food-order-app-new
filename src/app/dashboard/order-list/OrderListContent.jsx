"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { TableHead } from "./TableHead";
import { useRouter } from "next/navigation";

export default function OrderListContent() {
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
                      className=" font-semibold text-white bg-blue-500 p-2 rounded-full active:bg-blue-700 active:scale-95 transition-all ease-in-out"
                    >
                      <svg
                        viewBox="0 0 32 32"
                        className="fill-current"
                        width="24"
                        height="24"
                      >
                        <g id="SVGRepo_bgCarrier"></g>
                        <g id="SVGRepo_tracerCarrier"></g>
                        <g id="SVGRepo_iconCarrier">
                          <g>
                            <path d="M5.9,18l1.2,2.4C7.3,20.8,7.6,21,8,21h17c0.4,0,0.7-0.2,0.9-0.6l1.2-2.4H5.9z"></path>
                            <path d="M4,17h1.4h22.2H29c0.6,0,1-0.4,1-1s-0.4-1-1-1h-1c-0.2-5.3-4.1-9.7-9.1-10.8C18.9,4,19,3.8,19,3.5C19,2.1,17.9,1,16.5,1 S14,2.1,14,3.5c0,0.3,0.1,0.5,0.1,0.7C9.1,5.3,5.3,9.7,5,15H4c-0.6,0-1,0.4-1,1S3.4,17,4,17z"></path>
                          </g>
                          <path d="M24.6,22.3C24.5,22.1,24.2,22,24,22c-0.4,0-0.7,0-1.1,0.1l-1.1,1.5C20.7,25.1,18.9,26,17,26h0h-0.3H16h-1.3H14 c-0.6,0-1-0.4-1-1s0.4-1,1-1h3.5c0.3-0.3,0.5-0.8,0.5-1.3c0,0,0-0.1,0-0.1c0-0.4-0.3-0.6-0.7-0.6h-4c-2.4,0-4.3,1.1-5.4,2.8 l-1.8,2.8c-0.1,0.2-0.1,0.5,0,0.7l2,3.3c0.1,0.2,0.2,0.3,0.4,0.3c0,0,0.1,0,0.1,0c0.1,0,0.3,0,0.4-0.1c2.5-1.7,5.5-2.6,8.5-2.6 c2.2,0,4.2-1.2,5.2-3.1l1.8-3.2C24.7,22.8,24.7,22.5,24.6,22.3z"></path>{" "}
                        </g>
                      </svg>
                    </button>
                  </td>
                  <td className="border-b py-5 px-2 text-center">
                    <button
                      onClick={() => {
                        router.push(
                          "http://localhost:3000/dashboard/order-list/" +
                            order.id
                        );
                      }}
                      className=" font-semibold text-white bg-purple-500 p-2 rounded-full active:bg-purple-700 active:scale-95 transition-all ease-in-out"
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
