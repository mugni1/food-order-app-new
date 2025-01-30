// export async function getAllItems() {
//   try {
//     const res = await fetch("http://localhost:8000/api/items", {
//       method: "GET",
//     });
//     return res.json();
//   } catch (error) {
//     throw new Error(error);
//   }
// }

export async function getWithCategory(name) {
  try {
    let id = 0;
    if (name == "meals") {
      id = 1;
    }
    if (name == "seafoods") {
      id = 2;
    }
    if (name == "appetizers") {
      id = 3;
    }
    if (name == "drinks") {
      id = 4;
    }
    const res = await fetch("http://localhost:8000/api/items?category=" + id, {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
}
