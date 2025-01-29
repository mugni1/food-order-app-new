import Image from "next/image";

export default function CardImage({ image, name, price }) {
  return (
    <section className="border rounded-3xl overflow-hidden">
      <div className="h-40 w-full flex items-center justify-center">
        <Image
          src={`http://localhost:8000/storage/images/${image}`}
          alt=""
          className="h-full object-cover"
          height={300}
          width={500}
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full py-3 gap-1">
        <h3 className="line-clamp-1 w-full text-center text-lg font-semibold text-slate-800">
          {name}
        </h3>
        <h3 className="flex text-slate-900 font-semibold text-lg gap-1 items-center">
          <span className=" text-emerald-600">Rp</span>
          <span className="text-xl">{price.toLocaleString("id-ID")}</span>
        </h3>
      </div>
    </section>
  );
}
