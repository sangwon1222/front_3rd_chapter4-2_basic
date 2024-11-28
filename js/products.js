async function loadProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json();
    displayProducts(products);
  } catch (e) {
    console.error("Failed to fetch Product", e);
  }
}

function displayProducts(products) {
  // Find the container where products will be displayed
  const container = document.querySelector("#all-products .container");

  // Iterate over each product and create the HTML structure safely
  products.forEach((product) => {
    // Create the main product div
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    // Create the product picture div
    const pictureDiv = document.createElement("div");
    pictureDiv.classList.add("product-picture");
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = `product: ${product.title}`;
    img.width = 250;
    img.loading = "lazy";
    pictureDiv.appendChild(img);

    // Create the product info div
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("product-info");

    const category = document.createElement("h5");
    category.classList.add("categories");
    category.textContent = product.category;

    const title = document.createElement("h4");
    title.classList.add("title");
    title.textContent = product.title;

    const price = document.createElement("h3");
    price.classList.add("price");
    const priceSpan = document.createElement("span");
    priceSpan.textContent = `US$ ${product.price}`;
    price.appendChild(priceSpan);

    const button = document.createElement("button");
    button.textContent = "Add to bag";

    // Append elements to the product info div
    infoDiv.appendChild(category);
    infoDiv.appendChild(title);
    infoDiv.appendChild(price);
    infoDiv.appendChild(button);

    // Append picture and info divs to the main product element
    productElement.appendChild(pictureDiv);
    productElement.appendChild(infoDiv);

    // Append the new product element to the container
    container.appendChild(productElement);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    root: null, // 뷰포트를 기준으로 설정
    rootMargin: "0px", // 뷰포트의 마진은 0px
    threshold: 0.1, // 타겟 요소가 10% 보이면 콜백 함수 실행
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 제품 로드 함수 실행
        loadProducts();
        // 이후 제품이 추가적으로 로드될 필요가 없다면 observer를 해제
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 관찰할 요소 지정
  const loader = document.getElementById("product-loader");
  observer.observe(loader);
});

// Simulate heavy operation. It could be a complex price calculation.
if (window.Worker) {
  const myWorker = new Worker("worker.js");
  myWorker.postMessage("start");

  myWorker.onmessage = function (e) {
    console.log("received from worker:", e.data);
  };

  myWorker.onerror = function (e) {
    console.error("Error from worker:", e);
  };
}
