let cartCount = 0;
let totalPrice = 0;

function addToCart(price) {

    cartCount++;
    totalPrice += price;

    document.getElementById("cart").innerText =
        "🛒 Cart (" + cartCount + ")";

    document.getElementById("total").innerText =
        "💰 Total: ₹" + totalPrice;
}

async function placeOrder() {

    if (cartCount === 0) {
        alert("Please add items first!");
        return;
    }

    try {

        const response = await fetch("http://FoodCorner-backend-s47r.onrender.com/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items: cartCount,
                totalAmount: totalPrice,
                orderDate: new Date()
            })
        });

        const data = await response.json();

        if (data.success) {

            alert(
                "🎉 Order Placed Successfully!\n\nTotal Amount: ₹" +
                totalPrice
            );

            cartCount = 0;
            totalPrice = 0;

            document.getElementById("cart").innerText =
                "🛒 Cart (0)";

            document.getElementById("total").innerText =
                "💰 Total: ₹0";

        } else {
            alert("Order Failed");
        }

    } catch (error) {
        console.log(error);
        alert("Server Connection Failed");
    }
}