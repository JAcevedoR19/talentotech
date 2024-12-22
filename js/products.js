
const addToCartButtons = document.querySelectorAll(".product-card button");

addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const productCard = button.closest(".product-card");
        
        const product = {
            name: productCard.querySelector("h2").textContent,
            category: productCard.querySelector("p:nth-of-type(1)").textContent.split(": ")[1],
            price: parseFloat(productCard.querySelector("p:nth-of-type(2)").textContent.split(": ")[1]),
            image: productCard.querySelector("img").src,
            quantity: 1
        };
        
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const productExists = cart.some((item) => item.name === product.name);

        if (productExists) {
            alert("Este producto ya está en el carrito.");
        } else {

            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Producto agregado al carrito.");
        }
    });
});
