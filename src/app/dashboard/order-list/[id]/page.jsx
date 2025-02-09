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
    <main className="w-full flex flex-col">
      <h1 className="font-semibold text-2xl text-center">
        Detail order for {order.customer_name}
      </h1>
      <h1 className="font-semibold text-xl text-center">
        and table no {order.table_no}
      </h1>
      <section className="w-full p-5 rounded-xl shadow-lg  bg-white">
        <table className="w-full">
          <thead className="w-full border-b ">
            <tr className="w-full ">
              <th className="py-5 w-3/12">IMAGE</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>QTY</th>
            </tr>
          </thead>
          <tbody>
            {order.order_details.map((item) => (
              <tr className=" border-b py-5" key={item.id}>
                <td className="text-center py-5 w-2/12">
                  <img
                    src={`http://localhost:8000/storage/images/${item.item.image}`}
                    alt=""
                    className=" h-40 rounded-xl shadow-md  mx-auto"
                  />
                </td>
                <td className="text-center">{item.item.name}</td>
                <td className="text-center">{item.item.category.name}</td>
                <td className="text-center">{item.price}</td>
                <td className="text-center">{item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
