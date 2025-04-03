
document.addEventListener("DOMContentLoaded", function () {
    let addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            let productCard = this.closest(".book-card"); 
            let name = this.getAttribute("data-name"); 
            let imgElement = productCard.querySelector("img"); 
            let img = this.getAttribute("data-img") || (imgElement ? imgElement.src : "");
            
            let priceElement = productCard.querySelector(".price");
            let priceText = priceElement.textContent.trim().replace("$", "").split(" ")[0]; 
            let price = parseFloat(priceText);

            if (isNaN(price)) {
                alert("Error getting product price!");
                return;
            }

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, img, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Added to cart!");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        let cartContainer = document.getElementById("cart-item");
        let totalPrice = 0;
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Giỏ hàng trống.</p>";
            document.getElementById("totalPrice").innerText = "0VND";
            return;
        }

        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity * 1000; 
            totalPrice += itemTotal;

            cartContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" style="width: 80px;">
                    <div>
                        <p><strong>${item.name}</strong></p>
                        <p>${(item.price * 1000).toLocaleString()} VND</p>
                        <p>
                            Số lượng: 
                            <button class="decrease" data-index="${index}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase" data-index="${index}">+</button>
                        </p>
                    </div>
                    <p><strong>${itemTotal.toLocaleString()} VND</strong></p>
                    <button class="remove" data-index="${index}">🗑 Xóa</button>
                </div>
            `;
        });

        document.getElementById("totalPrice").innerText = totalPrice.toLocaleString() + " VND";

        document.querySelectorAll(".increase").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart[index].quantity++;
                updateCart();
            });
        });

        document.querySelectorAll(".decrease").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1); 
                }
                updateCart();
            });
        });

        document.querySelectorAll(".remove").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    document.getElementById("clearCartBtn").addEventListener("click", () => {
        cart = [];
        localStorage.removeItem("cart");
        renderCart();
    });

    renderCart();
});
