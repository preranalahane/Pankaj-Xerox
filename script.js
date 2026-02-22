const WHATSAPP_NUMBER = "9765356364";

// Product list

const products = [
  "Lays Chips (All Flavours)",
  "Balaji Chips (All Flavours)",
  "Parle Biscuits (All Varieties)",
  "Britannia Biscuits (All Varieties)",
  "Sunfeast Biscuits (All Varieties)",
  "Cup Ice Creams",
  "Candy Ice Creams",
  "Cone Ice Creams",
  "Apsara Pencils",
  "Natraj Pencils",
  "Pens",
  "Xerox (Per Page)",
  "Printing",
  "Lamination"
];

// Store quantities here
const cart = {};

// Get product list div
const productListDiv = document.getElementById("productList");
const orderSummaryDiv = document.getElementById("orderSummary");

// Show products with + and − buttons
products.forEach(product => {
  cart[product] = 0;

  const row = document.createElement("div");
  row.style.marginBottom = "10px";

  const name = document.createElement("span");
  name.textContent = product + "  ";

  const minusBtn = document.createElement("button");
  minusBtn.textContent = "−";

  const qty = document.createElement("span");
  qty.textContent = " 0 ";
  qty.id = product;

  const plusBtn = document.createElement("button");
  plusBtn.textContent = "+";

  plusBtn.onclick = () => {
  cart[product]++;
  qty.textContent = " " + cart[product] + " ";
  updateOrderSummary();
};

  minusBtn.onclick = () => {
  if (cart[product] > 0) {
    cart[product]--;
    qty.textContent = " " + cart[product] + " ";
    updateOrderSummary();
  }
};

  row.appendChild(name);
  row.appendChild(minusBtn);
  row.appendChild(qty);
  row.appendChild(plusBtn);

  productListDiv.appendChild(row);
});
function updateOrderSummary() {
  orderSummaryDiv.innerHTML = "";

  let hasItems = false;

  for (let product in cart) {
    if (cart[product] > 0) {
      hasItems = true;
      const p = document.createElement("p");
      p.textContent = product + " × " + cart[product];
      orderSummaryDiv.appendChild(p);
    }
  }

  if (!hasItems) {
    orderSummaryDiv.textContent = "No items selected yet.";
  }
}

function sendToWhatsApp() {
  let message = "Hello, I want to place an order:\n\n";

  let hasItems = false;

  for (let product in cart) {
    if (cart[product] > 0) {
      hasItems = true;
      message += "- " + product + " x " + cart[product] + "\n";
    }
  }

  if (!hasItems) {
    alert("Please select at least one item.");
    return;
  }

  message += "\nPickup only. Payment at shop.\nThank you.";

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL =
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodedMessage;

  window.open(whatsappURL, "_blank");
}