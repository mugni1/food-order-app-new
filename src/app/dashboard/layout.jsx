import Role from "@/components/dashboard/Role";
import SideBar from "@/components/dashboard/SideBar";
import Username from "@/components/dashboard/Username";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <main className=" w-full flex flex-wrap bg-slate-100">
      <SideBar />
      <section className=" ms-auto w-10/12 flex flex-col bg-slate-100 min-h-screen">
        <header className="w-full flex justify-between items-center h-20 px-5 sticky top-0 bg-white z-50">
          <div className="text-2xl font-semibold flex gap-3">
            <h2>Dashboard </h2> <Role />
          </div>
          <div>
            <Username />
          </div>
        </header>
        <main className="p-5 bg-slate-100">{children}</main>
      </section>
    </main>
  );
}
