import CardImage from "@/components/CardImage";
import NotFound from "@/components/NotFound";
import { getWithCategory } from "@/services";

export default async function Page({ params }) {
  const { name } = await params;
  if (["meals", "seafoods", "appetizers", "drinks"].includes(name) == false) {
    return <NotFound />;
  }
  const items = await getWithCategory(name);
  return (
    <main className="container mx-auto px-5">
      {items.data.length > 0 ? (
        <section className="w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
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
    </main>
  );
}
