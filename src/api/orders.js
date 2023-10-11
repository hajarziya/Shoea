async function fetchOrdersApi(status) {
    try {
        const response = await fetch(`http://localhost:3000/orders?status=${status}`);
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}
async function createOrderApi(checkoutData) {
    await updateOrderApi();
    try {
        return await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:checkoutData,
        });
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

async function updateOrderApi() {
    const activeOrders=await fetchOrdersApi("In Delivery");
    for (const order of activeOrders) {
        await fetch(`http://localhost:3000/orders/${order.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status:"Completed"
            }),
        });
    }
}


export {createOrderApi, fetchOrdersApi}