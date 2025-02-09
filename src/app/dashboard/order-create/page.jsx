"use client";
import axios from "axios";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import router from "next/router";
import Button from "@/components/Button";
export default function OrderCreatePage() {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [carts, setCarts] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [tableNo, setTableNo] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(false);

  function handleAddCart(id) {
    const findItemInCart = carts.find((cart) => cart.id === id);
    if (findItemInCart) {
      const copyCarts = [...carts];
      const index = copyCarts.findIndex((cart) => cart.id === id);
      copyCarts[index].qty++;
      setCarts(copyCarts);
    } else {
      setCarts([...carts, { ...items.find((item) => item.id == id), qty: 1 }]);
    }
  }

  function handleRemoveCart(id) {
    const copyCarts = [...carts];
    const index = copyCarts.findIndex((cart) => cart.id === id);
    if (copyCarts[index].qty > 1) {
      copyCarts[index].qty--;
    } else {
      copyCarts.splice(index, 1);
    }
    setCarts(copyCarts);
  }

  function handleOrder() {
    setLoadingOrder(true);
    axios({
      method: "post",
      url: "http://localhost:8000/api/order",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        customer_name: customerName,
        table_no: tableNo,
        items: carts.map((cart) => ({
          id: cart.id,
          price: cart.price,
          qty: cart.qty,
        })),
      },
    })
      .then((res) => {
        setCarts([]);
        setTableNo(null);
        setCustomerName("");
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        swal({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
        });
      })
      .finally(() => {
        setLoadingOrder(false);
      });
  }

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

    axios({
      method: "get",
      url: "http://localhost:8000/api/items",
    })
      .then((res) => {
        console.log(res);
        setItems(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setTotal(carts.reduce((acc, item) => acc + item.price * item.qty, 0));
  }, [carts]);

  return (
    <main className="w-full relative">
      {/* content center  */}
      {loading ? (
        <div className="w-full">
          <span>Loading...</span>
        </div>
      ) : (
        <section className=" w-8/12 grid grid-cols-4 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className=" columns-1  bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <div className="h-40 w-full">
                <img
                  src={`http://localhost:8000/storage/images/${item.image}`}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="p-5 flex flex-col w-full gap-3">
                <b className="line-clamp-1 w-full text-lg">{item.name}</b>
                <b className="line-clamp-1 w-full">
                  Rp {item.price.toLocaleString("id-ID")}
                </b>
                <Button onClick={() => handleAddCart(item.id)}>
                  Add Chart
                </Button>
              </div>
            </div>
          ))}
        </section>
      )}
      {/* end content center */}
      {/* cart right side */}
      <section className="fixed overflow-y-scroll scrollbar-none top-20 right-0 bottom-0 w-3/12 bg-amber-500 p-5 flex flex-col text-white">
        <h1 className="font-semibold text-white text-2xl mb-2">Order List</h1>
        <input
          type="text"
          className="w-full p-2 rounded-lg shadow-md mb-2 text-slate-600"
          placeholder="Nama Customer"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          type="number"
          className="w-full p-2 rounded-lg shadow-md mb-2 text-slate-600"
          placeholder="No Table"
          value={tableNo}
          onChange={(e) => setTableNo(e.target.value)}
        />
        {carts.map((cart) => (
          <section key={cart.id} className="flex flex-col my-2">
            <div className=" w-full flex justify-between font-semibold text-lg">
              <span> {cart.name}</span>
              <span>x {cart.qty}</span>
            </div>
            <div className=" w-full flex justify-between font-semibold text-xs">
              <span>Rp {cart.price * cart.qty}</span>
              <div className="gap-2 flex items-center">
                <button
                  className="bg-red-500 p-1 active:bg-red-700 rounded-full text-white flex items-center justify-center"
                  onClick={() => handleRemoveCart(cart.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current h-4 w-4"
                  >
                    <path d="M5 11h14v2H5z"></path>
                  </svg>
                </button>
                <button
                  className="bg-emerald-500 p-1 active:bg-emerald-700 rounded-full text-white flex items-center justify-center"
                  onClick={() => handleAddCart(cart.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current h-4 w-4"
                  >
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </section>
        ))}
        <hr className="my-3" />
        <span className="font-semibold  text-2xl mb-2">
          Total : Rp {total.toLocaleString("id-ID")}
        </span>
        <Button onClick={() => handleOrder()}>
          {loadingOrder ? "Please wait.." : "Order now"}
        </Button>
      </section>
      {/* end cart right side  */}
    </main>
  );
}
