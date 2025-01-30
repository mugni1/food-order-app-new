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

export async function getMeals() {
  try {
    const res = await fetch("http://localhost:8000/api/items?category=1", {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
}

export async function getSeafoods() {
  try {
    const res = await fetch("http://localhost:8000/api/items?category=2", {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAppetizers() {
  try {
    const res = await fetch("http://localhost:8000/api/items?category=3", {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
}

export async function getDrinks() {
  try {
    const res = await fetch("http://localhost:8000/api/items?category=4", {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
}
