"use client";

import swal from "sweetalert";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    setLoadingBtn(true);
    axios({
      method: "GET",
      url: "http://localhost:8000/api/logout",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        localStorage.clear();
        router.push("/login");
        console.log(res);
      })
      .then((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingBtn(false);
      });
  };
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8000/api/profile",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setName(res.data.data.name);
        setEmail(res.data.data.email);
        setRole(res.data.data.role.name);
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
        }).then((isTrue) => {
          if (isTrue) {
            router.push("/login");
          }
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <main className="w-full flex justify-center items-center">
      {loading ? (
        <section className="w-5/12 h-60 mx-auto border rounded-xl p-5 shadow-lg bg-slate-200 flex flex-col"></section>
      ) : (
        <section className="w-5/12 mx-auto border rounded-xl p-5 shadow-lg bg-white flex flex-col gap-5">
          <h1 className="font-semibold text-2xl w-full text-center">Profile</h1>
          <div className="w-full flex justify-between items-center">
            <img
              src="/no_image.svg"
              alt=""
              className="w-3/12  mx-auto rounded-full"
            />
            <div className="w-8/12">
              <p className="line-clamp-1">Name : {name}</p>
              <p className="line-clamp-1">Email : {email}</p>
              <p className="line-clamp-1">Role : {role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loading}
            type="submit"
            className="py-2 px-5 bg-red-600 active:scale-95 active:ring-1 ring-offset-2 ring-red-600 transition-all ease-in-out duration-150 rounded-lg text-white font-semibold"
          >
            {loadingBtn ? "Loading..." : "Logout"}
          </button>
        </section>
      )}
    </main>
  );
}
