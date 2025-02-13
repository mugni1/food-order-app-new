"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SideBar() {
  const [role, setRole] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);
  return (
    <section
      className="w-2/12 min-h-screen fixed flex flex-col bg-white"
      style={{
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 className="text-2xl font-semibold  p-5 w-full text-center mb-2">
        GoMeals.
      </h1>
      <ul className="w-full flex flex-col gap-2">
        <li className="w-full px-5">
          <Link
            className={` rounded-xl py-2 px-4 w-full flex items-center gap-1 font-semibold hover:ring-1 ring-amber-400 transition-all ease-in-out ${
              pathname == "/dashboard" && "bg-amber-400 text-white shadow-md "
            }`}
            href="/dashboard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z"></path>
            </svg>
            Home
          </Link>
        </li>
        <li className="w-full px-5">
          <Link
            className={` rounded-xl py-2 px-4 w-full flex items-center gap-1 font-semibold hover:ring-1 ring-amber-400 transition-all ease-in-out ${
              pathname == "/dashboard/profile" &&
              "bg-amber-400 text-white shadow-md "
            }`}
            href="/dashboard/profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
            </svg>
            Profile
          </Link>
        </li>
        {role == "manager" && (
          <li className="w-full px-5">
            <Link
              className={` rounded-xl py-2 px-4 w-full flex items-center gap-1 font-semibold hover:ring-1 ring-amber-400 transition-all ease-in-out ${
                pathname == "/dashboard/items" &&
                "bg-amber-400 text-white shadow-md"
              }`}
              href="/dashboard/items"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M21 10a3.58 3.58 0 0 0-1.8-3 3.66 3.66 0 0 0-3.63-3.13 3.86 3.86 0 0 0-1 .13 3.7 3.7 0 0 0-5.11 0 3.86 3.86 0 0 0-1-.13A3.66 3.66 0 0 0 4.81 7 3.58 3.58 0 0 0 3 10a1 1 0 0 0-1 1 10 10 0 0 0 5 8.66V21a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1.34A10 10 0 0 0 22 11a1 1 0 0 0-1-1zM5 10a1.59 1.59 0 0 1 1.11-1.39l.83-.26-.16-.85a1.64 1.64 0 0 1 1.66-1.62 1.78 1.78 0 0 1 .83.2l.81.45.5-.77a1.71 1.71 0 0 1 2.84 0l.5.77.81-.45a1.78 1.78 0 0 1 .83-.2 1.65 1.65 0 0 1 1.67 1.6l-.16.85.82.28A1.59 1.59 0 0 1 19 10z"></path>
              </svg>{" "}
              Items
            </Link>
          </li>
        )}
        {role == "waiter" && (
          <li className="w-full px-5">
            <Link
              className={` rounded-xl py-2 px-4 w-full flex items-center gap-1 font-semibold hover:ring-1 ring-amber-400 transition-all ease-in-out ${
                pathname == "/dashboard/order-create" &&
                "bg-amber-400 text-white shadow-md"
              }`}
              href="/dashboard/order-create"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm8.707-5.707L19 14.586V10c0-3.217-2.185-5.926-5.145-6.743C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A.997.997 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.997.997 0 0 0-.293-.707zM16 12h-3v3h-2v-3H8v-2h3V7h2v3h3v2z"></path>
              </svg>
              Order Create
            </Link>
          </li>
        )}
        {role == "waiter" && (
          <li className="w-full px-5">
            <Link
              className={` rounded-xl py-2 px-4 w-full flex items-center gap-1 font-semibold hover:ring-1 ring-amber-400 transition-all ease-in-out ${
                pathname == "/dashboard/order-list" &&
                "bg-amber-400 text-white shadow-md "
              }`}
              href="/dashboard/order-list"
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
              For Delivered
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}
