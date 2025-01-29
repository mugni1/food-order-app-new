export default function TextHeader() {
  return (
    <>
      <div className="flex flex-wrap flex-col my-10">
        <h1 className="text-4xl font-bold text-slate-900">
          Find Your Best Food
        </h1>
        <h1 className="text-4xl font-normal text-slate-900">Order & Eat.</h1>
      </div>

      <div className="relative mb-10">
        <input
          type="text"
          className="w-full border border-slate-400 shadow-md rounded-full py-2 ps-2 pe-10"
        />
        <div className="absolute right-3 top-0 bottom-0 flex items-center justify-center text-slate-400 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            <path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"></path>
          </svg>
        </div>
      </div>

      <div className="w-full overflow-x-scroll flex gap-5 mb-5 scrollbar-none font-semibold">
        <button className="py-2 px-3 border border-slate-400 rounded-full text-nowrap bg-emerald-600 text-white">
          All Foods
        </button>
        <button className="py-2 px-3 border border-slate-400 rounded-full text-nowrap text-slate-600">
          🍛 Heavy meals
        </button>
        <button className="py-2 px-3 border border-slate-400 rounded-full text-nowrap text-slate-600">
          🦞 Seafoods
        </button>
        <button className="py-2 px-3 border border-slate-400 rounded-full text-nowrap text-slate-600">
          🍟 Appetizers
        </button>
        <button className="py-2 px-3 border border-slate-400 rounded-full text-nowrap text-slate-600">
          ☕ Drink
        </button>
      </div>

      <h1 className="text-xl font-semibold mb-5 text-slate-900">Terbaru</h1>
    </>
  );
}
