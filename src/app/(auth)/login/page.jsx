"use client";
import axios from "axios";
import swal from "sweetalert";
import Container from "@/components/Container";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [logoutAll, setLogoutAll] = useState(false);
  const [typePassword, setTypePassword] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

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
        password: password
      }
    })
      .then(res => {
        console.log(res);
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success"
        });
      })
      .catch(error => {
        console.log(error);
        swal({
          title: "Error",
          text: error.response.data.message,
          icon: "error"
        });
      })
      .finally(() => {
        setLoadingSubmit(false);
      });
  };

  return (
    <Container>
      <section className="w-full min-h-screen flex flex-col items-center justify-center">
        {/* title */}
        <h1 className="mb-5 font-semibold text-2xl bg-white shadow-md py-2 text-center w-4/12 rounded-lg border">
          Login
        </h1>
        {/* end title  */}

        {/* container form and link  */}
        <section className="p-5 rounded-lg border flex flex-col gap-3 w-4/12 mx-auto shadow-lg">
          {/* form login  */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            {/* input type email */}
            <input
              type="email"
              className="p-2 rounded-lg border"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
              required
            />
            {/* input type submit */}
            <div className="relative w-full h-full flex items-center">
              <input
                type={typePassword ? "password" : "text"}
                className="ps-2 py-2 pe-10 rounded-lg border w-full"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                className="absolute right-0 px-2"
                onClick={changeTypePassword}
              >
                {typePassword ? (
                  <img src="/bx-show.svg" alt="" />
                ) : (
                  <img src="/bx-hide.svg" alt="" />
                )}
              </button>
            </div>
            {/* logout from all device */}
            <div className=" w-full h-full flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                name="logoutall"
                id="logoutAll"
                checked={logoutAll}
                onChange={e => setLogoutAll(e.target.checked)}
              />
              <label htmlFor="logoutAll">Keluar dari semua perangkat</label>
            </div>
            {/* button submit  */}
            <button
              className="py-2 w-full bg-emerald-600 text-white active:ring-2 ring-offset-2 ring-emerald-800 rounded-lg font-semibold"
              type="submit"
              disabled={loadingSubmit}
            >
              {loadingSubmit ? "loading..." : "Submit"}
            </button>
          </form>
          {/* end form login */}

          <Link className="w-full text-center" href="/">
            Back to home
          </Link>
        </section>
        {/* edn container form and link  */}
      </section>
    </Container>
  );
}
