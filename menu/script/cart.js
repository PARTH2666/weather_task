
let updated_data = localStorage.getItem("CartId");
  console.log(updated_data,"updated_data in cart")
let updated_data_arr = updated_data.split(",");
console.log(updated_data_arr,"updated_data in cart")
let arr = []
let all_products;

function startcard() {
  fetch("https://dummyjson.com/products?limit=10")
    .then((response) => {
      data = response.json();
      return data;
    })
    .then((data) => {
      all_products = data.products;
      createElementcard()
      return all_products;
    });

}

//add the card on the screen
function createElementcard() {
  all_products.forEach((ele) => {
    for (let i of updated_data_arr){
      if (i == ele.id) {
        card = document.createElement("div");
        card.className = "product-card";

        // hot = document.createElement("div");
        // hot.className = "badge";
        // hot.textContent = "hot";

        product_tumb = document.createElement("div");
        product_tumb.className = "product-tumb";

        img = document.createElement("img");
        img.setAttribute("src", ele.images[0]);

        product_details = document.createElement("div");
        product_details.className = "product-details";
        product_details.innerHTML = `<span class="product-catagory">${ele.category}</span>
                   <h2><a href="">${ele.title}</a></h2> <p>${ele.description}</p><div class="product-bottom-details">
                   <div class="product-price">${ele.price}$</div>
                   <div class="product-links">
                       <a><i class="fa fa-heart"></i></a>
                       <a class="add_to_cart"><i id=${ele.id} class="fa fa-shopping-cart"></i></a>
                   </div>
               </div>`;

        document.querySelector(".card_container").append(card);

        // if (ele.id <= 4) {
        //   card.append(hot);
        // }

        card.append(product_tumb);
        card.append(product_details);
        product_tumb.append(img);

      }
    }
   
  });

//   document.querySelectorAll(".product-card").forEach((ele)=>{
//    localStorage.setItem('id',ele)
//    })
}


