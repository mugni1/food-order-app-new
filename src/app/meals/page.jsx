import CardImage from "@/components/CardImage";
import { getMeals } from "@/services";

export default async function MealsPage() {
  const items = await getMeals();
  return (
    <>
      {items.data.length > 0 ? (
        <section className="w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-5">
          {items.data.map((item) => (
            <CardImage
              key={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </section>
      ) : (
        <h1 className="my-20 text-center w-full text-slate-600 text-xl md:text-2xl xl:text-3xl">
          Belum ada products
        </h1>
      )}
    </>
  );
}
