"use client";
import axios from "axios";
import { useState } from "react";

export default function AddItemsPage() {
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    event.preventDefault();
    setLoading(true);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/items",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        name: name,
        price: price,
        image: image,
        category: category,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <main>
      <h1 className="w-full text-center font-semibold text-2xl mb-5">
        Add Items
      </h1>
      <section className="w-5/12 mx-auto border shadow-lg p-5 rounded-lg bg-white">
        <form className="w-full flex flex-col gap-3 " onSubmit={handleSubmit}>
          <input
            type="text"
            className="p-2 border w-full rounded-lg"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            className="p-2 border w-full rounded-lg"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="file"
            className="p-2 border w-full rounded-lg"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          <select
            className="p-2 border w-full rounded-lg"
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="1">Heavy Meals</option>
            <option value="2">Seafoods</option>
            <option value="3">Appetizers</option>
            <option value="4">Drink</option>
          </select>

          <button
            disabled={loading}
            type="submit"
            className="py-2 px-5 bg-emerald-600 active:scale-95 active:ring-1 ring-offset-2 ring-emerald-600 transition-all ease-in-out duration-150 rounded-lg text-white font-semibold"
          >
            {loading ? "Loading..." : "Add Items"}
          </button>
        </form>
      </section>
    </main>
  );
}
