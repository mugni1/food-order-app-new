import CardImage from "@/components/CardImage";
import { getAllItems } from "@/services";

export default async function Home() {
  const items = await getAllItems();
  return (
    <>
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
    </>
  );
}
