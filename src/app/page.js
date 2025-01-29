import CardImage from "@/components/CardImage";
import TextHeader from "@/components/TextHeader";


export default function Home() {
  return (
    <main className="w-full px-5">
      <TextHeader />

      <div>
        <input
          type="text"
          className="w-full border border-slate-400 shadow-md rounded-full p-2 mb-10"
        />
      </div>

      <div className="w-full overflow-x-scroll flex gap-5 mb-5 scrollbar-none">
        <button className="py-2 px-3 border border-slate-400 rounded-full text-nowrap text-slate-900">
          All Foods
        </button>
        <button className="py-2 px-3 border border-slate-400 rounded-full text-nowrap text-slate-900">
          🍛 Heavy meals
        </button>
        <button className="py-2 px-3 border border-slate-400 rounded-full text-nowrap text-slate-900">
          🦞 Seafoods
        </button>
        <button className="py-2 px-3 border border-slate-400 rounded-full text-nowrap text-slate-900">
          🍟 Appetizers
        </button>
        <button className="py-2 px-3 border border-slate-400 rounded-full text-nowrap text-slate-900">
          ☕ Drink
        </button>
      </div>

      <h1 className="text-xl font-semibold mb-5 text-slate-900">
        Best For You
      </h1>

      <section className="w-full grid grid-cols-2 gap-5">
        <CardImage name="Dimsum Ayam" price="10.000" />
      </section>
    </main>
  );
}
