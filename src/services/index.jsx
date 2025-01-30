export async function getAllItems() {
  try {
    const res = await fetch("http://localhost:8000/api/items", {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
}

export async function getWithCategory(id) {
  try {
    const res = await fetch("http://localhost:8000/api/items?category=" + id, {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
}
