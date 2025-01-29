export async function getAllItems() {
  try {
    const res = await fetch("http://localhost:8000/api/items", {
      method: "GET",
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
      },
    });
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
}
