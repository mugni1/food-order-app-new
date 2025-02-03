"use client";
import swal from "sweetalert";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditItemsPage() {
  // ambil params id
  const { id } = useParams();

  // state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImageFromDb, setPreviewImageFromDb] = useState(null);
  const [category, setCategory] = useState(1);
  const [loading, setLoading] = useState(false);

  // router
  const router = useRouter();

  function handleFileChange(e) {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  }

  function handleSubmit() {
    event.preventDefault();
    setLoading(true);
    axios({
      method: "POST",
      url: `http://localhost:8000/api/items/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
      data: {
        name: name,
        price: price,
        image: image,
        category_id: category,
        _method: "PATCH",
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
      });
  }

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:8000/api/items/${id}`,
    })
      .then((res) => {
        console.log(res.data.data.category.id);
        setName(res.data.data.name);
        setPrice(res.data.data.price);
        setPreviewImageFromDb(res.data.data.image);
        setCategory(res.data.data.category.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <main>
      <h1 className="w-full text-center font-semibold text-2xl mb-5">
        Edit Items
      </h1>
      <section className="w-5/12 mx-auto border shadow-lg p-5 rounded-lg bg-white">
        <form
          className="w-full flex flex-col gap-3 "
          onSubmit={() => handleSubmit()}
        >
          <input
            type="text"
            className="p-2 border w-full rounded-lg"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            className="p-2 border w-full rounded-lg"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="file"
            className="p-2 border w-full rounded-lg"
            accept=".jpeg, .png, .jpg, .jfif, .webp"
            onChange={(e) => handleFileChange(e)}
          />
          {previewImage != null ? (
            <img
              src={previewImage}
              className="w-1/2 mx-auto rounded-lg"
              alt=""
            />
          ) : (
            <img
              src={`http://localhost:8000/storage/images/${previewImageFromDb}`}
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
            {loading ? "Loading..." : "Update Items"}
          </button>
        </form>
      </section>
    </main>
  );
}
