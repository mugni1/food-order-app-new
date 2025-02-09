import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container mx-auto px-5 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-center w-full font-semibold text-3xl md:text-4xl xl:text-5xl">
        404
      </h1>
      <span className="my-2 text-center w-full font-semibold text-xl md:text-2xl xl:text-3xl">
        Page Not Founds
      </span>
      <Link
        href={"/"}
        className="bg-black py-2 px-6 rounded-lg shadow-lg text-white active:scale-90 transition-all duration-200 mt-10"
      >
        Home
      </Link>
    </main>
  );
}
