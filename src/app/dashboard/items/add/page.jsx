"use client";
import swal from "sweetalert";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddItemsPage() {
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [category, setCategory] = useState(1);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    event.preventDefault();
    setLoading(true);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/items",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
      data: {
        name: name,
        price: price,
        image: image,
        category_id: category,
      },
    })
      .then((res) => {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
        }).then((isTrue) => {
          if (isTrue) {
            router.push("/dashboard/items");
          }
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
        setLoading(false);
      });
  };

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
            accept=".jpeg, .png, .jpg, .jfif, .webp"
            onChange={handleFileChange}
          />
          {previewImage != null && (
            <img
              src={previewImage}
              className="w-1/2 mx-auto rounded-lg"
              alt=""
            />
          )}
          <select
            className="p-2 border w-full rounded-lg"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
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
