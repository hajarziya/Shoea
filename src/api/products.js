async function fetchBrandsApi() {
  try {
    const response = await fetch("http://localhost:3000/brands");
    const brands = await response.json();
    return brands;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function fetchProducts(brand) {
  try {
    let filter = "";
    if (brand && brand !== "All") {
      filter = "?brand=" + brand;
    }
    const response = await fetch("http://localhost:3000/products" + filter);
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function fetchProduct(id) {
  try {
    const response = await fetch("http://localhost:3000/products/" + id);
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export { fetchProducts, fetchBrandsApi, fetchProduct };
