"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();
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
      </ul>
    </section>
  );
}
