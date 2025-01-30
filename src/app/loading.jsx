export default function Loading() {
  const dataDumy = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12,
  ];
  return (
    <>
      <section className="w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6  2xl:grid-cols-7  gap-5 container mx-auto px-5">
        {dataDumy.map((items, index) => (
          <section
            key={index}
            className="rounded-3xl overflow-hidden bg-slate-400"
          >
            <div className="h-40 bg-slate-400"></div>
            <div className=" h-14"></div>
          </section>
        ))}
      </section>
    </>
  );
}
