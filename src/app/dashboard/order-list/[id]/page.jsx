"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailPage() {
  // jika menggunakan server side
  //   const { params, searchParams } = await props;
  //   const { id } = await params;
  //   const order = await getOrderDetails(id);
  //   console.log(order.data);

  // jika dengan client side
  // state
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [order, setOrder] = useState({});

  const params = useParams();

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:8000/api/order/${params.id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setOrder(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 404) {
          setNotFound(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <h1 className="w-full text-center font-semibold text-xl ">loading...</h1>
    );
  }

  if (notFound) {
    return (
      <h1 className="w-full text-center font-semibold text-xl ">
        Not found id = {params.id}
      </h1>
    );
  }
  return (
    <main className="w-full grid grid-cols-2 gap-5">
      <section className="bg-white rounded-xl shadow-lg columns-1 overflow-hidden">
        <div className="w-full py-2 bg-emerald-600 font-bold text-white px-5">
          <h2 className="text-2xl">Order is {order.status}</h2>
        </div>
        <div className="w-full p-5 font-semibold flex flex-col text-slate-700">
          <h2>Customer Name : {order.customer_name}</h2>
          <h2>Table Number : {order.table_no}</h2>
          <h2>Order Date : {order.order_date}</h2>
          <h2>Order Time : {order.order_time}</h2>
          <h2>Waiter : {order.waiter.name}</h2>
        </div>
      </section>
      <section className="bg-white rounded-xl shadow-lg py-5 columns-1">
        Tes
      </section>
    </main>
  );
}
