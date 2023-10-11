async function fetchBrandsApi() {
  try {
    const response = await fetch("http://localhost:3000/brands");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function fetchProductsApi({ name, brand }) {
  try {
    let filter = "";
    if (brand && brand !== "All") {
      filter = "?brand=" + brand;
    }
    if (name) {
      filter = "?name=" + name;
    }
    const response = await fetch("http://localhost:3000/products" + filter);
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function fetchProductApi(id) {
  try {
    const response = await fetch("http://localhost:3000/products/" + id);
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export { fetchProductsApi, fetchBrandsApi, fetchProductApi };
