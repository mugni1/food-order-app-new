"use client";
import { ButtonLink } from "@/components/Button";
import CardImage from "@/components/CardImage";
import Container from "@/components/Container";
import axios from "axios";
import { useState, useEffect } from "react";

export default function HomeContent() {
  const [results, setResults] = useState([]);
  const [items, setItems] = useState([]);
  const [cloneItems, setCloneItems] = useState([]);
  const [category, setCategory] = useState("all");
  const [keyword, setKeyword] = useState("");

  // render jika keyword berubah
  useEffect(() => {
    setItems(
      items.filter((item) => {
        const name = item.name.toLowerCase();
        const keywoards = keyword.toLowerCase();
        return name.includes(keywoards);
      })
    );
    if (keyword == "") {
      setItems(cloneItems);
    }
  }, [keyword]);

  // render jika kategori berubah
  useEffect(() => {
    if (category === "all") {
      setItems(results);
      setCloneItems(results);
    }
    if (category === "heavymeals") {
      setItems(results.filter((item) => item.category.id == 1));
      setCloneItems(results.filter((item) => item.category.id == 1));
    }
    if (category === "seafoods") {
      setItems(results.filter((item) => item.category.id == 2));
      setCloneItems(results.filter((item) => item.category.id == 2));
    }
    if (category === "drinks") {
      setItems(results.filter((item) => item.category.id === 4));
      setCloneItems(results.filter((item) => item.category.id === 4));
    }
    if (category === "appetizers") {
      setItems(results.filter((item) => item.category.id === 3));
      setCloneItems(results.filter((item) => item.category.id === 3));
    }
  }, [category]);

  // unmount component
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8000/api/items",
    })
      .then((res) => {
        console.log(res.data.data);
        setResults(res.data.data);
        if (category === "all") {
          setItems(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container>
      {/* header */}
      <header className="flex flex-wrap flex-col my-10">
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-slate-900">
          Find Your Best Food
        </h1>
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-normal text-slate-900 mb-5">
          Order & Eat.
        </h1>

        {/* serach keywords  */}
        <section className="w-full mb-5 relative md:w-1/2">
          <div className="absolute bottom-0 top-0 right-0 px-5 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="border py-2 px-5 rounded-full w-full border-slate-500"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
        </section>
        {/* end search leywords  */}

        {/* navigate menu */}
        <nav className="flex overflow-x-auto w-full gap-5">
          <ButtonLink
            className={`${category == "all" && "bg-amber-500 text-white"}`}
            onClick={() => setCategory("all")}
          >
            All
          </ButtonLink>
          <ButtonLink
            className={`${
              category == "heavymeals" && "bg-amber-500 text-white"
            }`}
            onClick={() => setCategory("heavymeals")}
          >
            🍛 Heavy meals
          </ButtonLink>
          <ButtonLink
            className={`${category == "seafoods" && "bg-amber-500 text-white"}`}
            onClick={() => setCategory("seafoods")}
          >
            🍛 Seafoods
          </ButtonLink>
          <ButtonLink
            className={`${category == "drinks" && "bg-amber-500 text-white"}`}
            onClick={() => setCategory("drinks")}
          >
            🍛 Drinks
          </ButtonLink>
          <ButtonLink
            className={`${
              category == "appetizers" && "bg-amber-500 text-white"
            }`}
            onClick={() => setCategory("appetizers")}
          >
            🍛 Appetizers
          </ButtonLink>
        </nav>
        {/* end navigate menu  */}
      </header>
      {/* end header  */}

      {/* list items  */}
      {items.length > 0 ? (
        <section className="w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6  2xl:grid-cols-7  gap-5">
          {items.map((item) => (
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
          Not found this products
        </h1>
      )}
      {/* end list items  */}
    </Container>
  );
}
