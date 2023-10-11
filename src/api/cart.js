async function fetchCartApi() {
  try {
    const response = await fetch("http://localhost:3000/cart");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function addToCartApi(
  productId,
  image,
  name,
  price,
  quantity,
  color,
  size
) {
  try {
    return await fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        name,
        image,
        price,
        quantity,
        color,
        size,
      }),
    });
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function updateCartQuantityApi(id, quantity) {
  try {
    return await fetch("http://localhost:3000/cart/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        quantity,
      }),
    });
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
async function deleteCartApi(id) {
  try {
    return await fetch("http://localhost:3000/cart/" + id, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function clearCartApi() {
  try {
    const cart=await fetchCartApi();
    for (const item of cart) {
      await deleteCartApi(item.id)
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
export { addToCartApi, fetchCartApi, updateCartQuantityApi, deleteCartApi, clearCartApi };
