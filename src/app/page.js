import CardImage from "@/components/CardImage";
import TextHeader from "@/components/TextHeader";

async function getItems() {
  try {
    const res = await fetch("http://localhost:8000/api/items", {
      method: "GET",
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
}

export default async function Home() {
  const items = await getItems();
  return (
    <>
      <section className="w-full grid grid-cols-2 gap-5">
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
