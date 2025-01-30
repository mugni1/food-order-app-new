import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <main className=" w-full flex flex-wrap">
      <section
        className="w-2/12 min-h-screen fixed flex flex-col"
        style={{
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 className="text-2xl font-semibold text-emerald-600 p-5 w-full text-center mb-5">
          Food Ordering
        </h1>
        <ul className="w-full">
          <li className="ps-5">
            <Link
              className=" w-full hover:bg-emerald-600  hover:text-white py-2"
              href="/dashboard"
            >
              Home
            </Link>
          </li>
          <li className="ps-5">
            <Link
              className=" w-full hover:bg-emerald-600  hover:text-white py-2"
              href="/dashboard"
            >
              Items
            </Link>
          </li>
          <li className="ps-5">
            <Link
              className=" w-full hover:bg-emerald-600  hover:text-white py-2"
              href="/dashboard"
            >
              Orders
            </Link>
          </li>
        </ul>
      </section>
      <section className=" ms-auto p-5 w-10/12">{children}</section>
    </main>
  );
}
