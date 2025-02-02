import SideBar from "@/components/dashboard/SideBar";
import Username from "@/components/dashboard/Username";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <main className=" w-full flex flex-wrap">
      <SideBar />
      <section className=" ms-auto w-10/12 flex flex-col">
        <header className="w-full flex justify-between items-center h-20 px-5 sticky top-0 bg-slate-100">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div>
            <Username />
          </div>
        </header>
        <main className="p-5 bg-slate-100">{children}</main>
      </section>
    </main>
  );
}
