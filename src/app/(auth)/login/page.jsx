"use client";
import axios from "axios";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logoutAll, setLogoutAll] = useState(false);
  const [typePassword, setTypePassword] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const router = useRouter();
  const changeTypePassword = () => {
    event.preventDefault();
    setTypePassword(!typePassword);
  };

  const handleSubmit = () => {
    event.preventDefault();
    // cek apakah logout dari semua perangkat tercentang
    let loginUrl = "http://localhost:8000/api/login";
    if (logoutAll) {
      loginUrl = "http://localhost:8000/api/login-logout-all";
    }
    setLoadingSubmit(true);
    axios({
      method: "post",
      url: loginUrl,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.data.name);
        localStorage.setItem("email", res.data.data.email);
        localStorage.setItem("role", res.data.data.role.name);
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
        }).then((isTrue) => {
          if (isTrue) {
            router.push("/dashboard");
          }
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 403) {
          swal({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
          });
        }
        if (error.response.status == 500) {
          swal({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
          });
        }
      })
      .finally(() => {
        setLoadingSubmit(false);
      });
  };

  useEffect(() => {
    localStorage.getItem("token") != null && router.push("/dashboard");
  }, []);

  return (
    <main className=" w-full flex">
      <section
        style={{
          backgroundImage: `url("/bgmakananlogin.jpeg")`,
        }}
        className="w-7/12  min-h-screen bg-cover bg-center"
      >
        <div className="w-full h-full backdrop-blur-md backdrop-brightness-75">
          <div className="w-8/12 mx-auto text-white flex flex-col justify-center h-full">
            <h1 className="font-semibold text-4xl">Welcome Back</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
              atque assumenda consectetur itaque repellat modi magnam magni
              soluta pariatur dolor officiis ipsum rem est inventore, nobis,
              odit minima doloribus corporis?
            </p>
          </div>
        </div>
      </section>
      <section className="w-5/12 min-h-screen bg-white flex flex-col justify-center items-center">
        <h1 className="font-semibold text-4xl w-8/12 mx-auto mb-5">Sign In</h1>
        <form
          onSubmit={handleSubmit}
          className="w-8/12 flex flex-col gap-5"
          action=""
        >
          {/* input email  */}
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-0 flex items-center px-3 text-slate-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full border rounded-full pe-5 ps-10 py-2 shadow-md outline-amber-600 outline-1"
              placeholder="Email"
            />
          </div>
          {/* end input email  */}
          {/* input password  */}
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-0 flex items-center px-3 text-slate-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <button
              onClick={changeTypePassword}
              className="absolute top-0 bottom-0 right-0 flex items-center px-3 text-slate-500"
            >
              {!typePassword && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {typePassword && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                  <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                </svg>
              )}
            </button>
            <input
              type={typePassword ? "password" : "text"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full border rounded-full pe-5 ps-10 py-2 shadow-md outline-amber-600 outline-1"
              placeholder="Password"
            />
          </div>
          {/* end input password  */}
          {/* checkbox  */}
          <div className=" flex gap-1 items-center px-1">
            <input
              id="logoutall"
              type="checkbox"
              onChange={(e) => setLogoutAll(e.target.checked)}
              checked={logoutAll}
            />
            <label htmlFor="logoutall" className=" text-sm">
              Logout from all devices
            </label>
          </div>
          {/* end checkbox  */}
          {/* btn sign in  */}
          <button
            type="submit"
            className="py-2 px-5 bg-gradient-to-r from-amber-600 to-red-500 font-semibold text-white rounded-full shadow-lg active:scale-90 transition-all ease-in-out"
          >
            Sign In
          </button>
          {/* end btn sign in  */}
          <Link className="w-full text-center" href="/">
            Back to menu
          </Link>
        </form>
      </section>
    </main>
  );
}
