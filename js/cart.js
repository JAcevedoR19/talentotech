document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-container");
    const emptyCartMessage = document.getElementById("empty-cart-message");
    const cartTotalElement = document.getElementById("cart-total");
    const clearCartButton = document.getElementById("clear-cart-button");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const renderCart = () => {
        cartContainer.innerHTML = "";
        if (cart.length === 0) {
            emptyCartMessage.style.display = "block";
            clearCartButton.style.display = "none";
            cartTotalElement.textContent = "Total: $0";
            return;
        }

        emptyCartMessage.style.display = "none";
        clearCartButton.style.display = "inline-block";

        let total = 0;

        cart.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("cart-card");

            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;

            const info = document.createElement("div");
            info.classList.add("cart-card-info");
            info.innerHTML = `<h2>${item.name}</h2>
                                <p>Categoría: ${item.category}</p>
                                <p>Precio unitario: $${item.price}</p>`;

            const quantityContainer = document.createElement("div");
            quantityContainer.classList.add("cart-card-quantity");
            quantityContainer.innerHTML = "<span>Cantidad:</span>";

            const minusButton = document.createElement("button");
            minusButton.textContent = "-";
            minusButton.addEventListener("click", () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    updateCart();
                }
            });

            const quantityDisplay = document.createElement("span");
            quantityDisplay.textContent = item.quantity;
            quantityDisplay.style.fontWeight = "bold";

            const plusButton = document.createElement("button");
            plusButton.textContent = "+";
            plusButton.addEventListener("click", () => {
                item.quantity++;
                updateCart();
            });

            quantityContainer.appendChild(minusButton);
            quantityContainer.appendChild(quantityDisplay);
            quantityContainer.appendChild(plusButton);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener("click", () => {
                cart.splice(index, 1);
                updateCart();
            });

            const actions = document.createElement("div");
            actions.classList.add("cart-card-actions");
            actions.appendChild(quantityContainer);
            actions.appendChild(deleteButton);

            card.appendChild(img);
            card.appendChild(info);
            card.appendChild(actions);

            cartContainer.appendChild(card);

            const price = parseFloat(item.price) || 0;
            total += price * item.quantity;
        });

        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    };

    const updateCart = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    };

    clearCartButton.addEventListener("click", () => {
        if (confirm("¿Seguro que deseas vaciar el carrito?")) {
            cart = [];
            updateCart();
        }
    });

    renderCart();
});
