let data_id = [];
let targeted_element_index,
  targeted_element,
  data,
  all_products,
  card,
  img,
  searched_value,
  updated_ids
 
//clear the previous items from the screen
function clearItems() {
  document.querySelectorAll(".product-card").forEach((ele) => {
    ele.remove();
  });
}

//add the card on the screen
function createElement(ele) {
  card = document.createElement("div");
  card.className = "product-card";

  hot = document.createElement("div");
  hot.className = "badge";
  hot.textContent = "hot";

  product_tumb = document.createElement("div");
  product_tumb.className = " product-tumb";

  img = document.createElement("img");
  img.setAttribute("src", ele.images[0]);

  product_details = document.createElement("div");
  product_details.className = " product-details";
  product_details.innerHTML = `<span class="product-catagory">${ele.category}</span>
           <h2><a href="">${ele.title}</a></h2> <p>${ele.description}</p><div class="product-bottom-details">
           <div class="product-price">${ele.price}$</div>
           <div class="product-links">
               <a><i class="fa fa-heart"></i></a>
               <a class="add_to_cart"><i id=${ele.id} class="fa fa-shopping-cart"></i></a>
           </div>
       </div>`;

  document.querySelector(".card_container").append(card);

  if (ele.id <= 4) {
    card.append(hot);
  }

  card.append(product_tumb);
  card.append(product_details);
  product_tumb.append(img);

  document.querySelectorAll(".add_to_cart").forEach((ele) => {
    ele.addEventListener("click", addToCart);
  });
}

//onload function
function start(){
  fetch("https://dummyjson.com/products?limit=50")
    .then((response) => {
      data = response.json();

      return data;
    })
    .then((data) => {
      all_products = data.products;
      
      initial_display(all_products);
      return all_products;
    });
}

//called inside the start for initial display of all items
function initial_display(ele) {
  ele.forEach((ele) => {
    createElement(ele);
  });
}

//#2...function taht haldle display the items and calling of api
function displayItems(event) {
  targeted_element = event.target;
  targeted_element_index = event.target.getAttribute("data-catagory-index");
  targeted_element_catagory = event.target.getAttribute("catagory");

  clearItems();

  all_products.forEach((ele) => {
    if (targeted_element_catagory == ele.category) {
      createElement(ele);
    }
  });
}

//help for getting input feild value
function searchItem(event) {
  searched_value = event.target.value;
}

//help for display searched items
function displaySearchItems(event) {
  let value = 0;
  if (searched_value == undefined || searched_value == "") {
    document.querySelector(".alert").style.display = "inline-block";
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 2000);
  } else {
    clearItems();
    console.log(searched_value);
    all_products.forEach((ele) => {
      if (
        searched_value.toUpperCase() == ele.category.toUpperCase() ||
        searched_value.toUpperCase() == ele.title.toUpperCase()
      ) {
        createElement(ele);
      } else {
        value += 1;
        if (value == all_products.length) {
          document.querySelector(".not_available").style.display =
            "inline-block";
          initial_display(all_products);
          setTimeout(() => {
            document.querySelector(".not_available").style.display = "none";
          }, 2000);
        }
      }
    });
    console.log(value);

    document.querySelector(".searchTerm").value = "";
    searched_value = "";
  }
}

// function that add item to cart
function addToCart(event) {
  // event.preventDefault()
  data_id.push(event.target.getAttribute("id"));
  console.log(data_id,'data id');
  
    localStorage.setItem("CartId", data_id);
  
  document.querySelector(".green").style.display = "inline-block";
  setTimeout(() => {
    document.querySelector(".green").style.display = "none";
  }, 2000);
 
}

//handle the theme change 
function mode_click(){
  document.body.classList.toggle('dark-theme')
}

//#1 ...click event listner for event btn
document.querySelectorAll(".catogary_btn").forEach((ele) => {
  ele.addEventListener("click", displayItems);
});

document.querySelector(".searchTerm").addEventListener("change", searchItem);
document.querySelector(".searchButton").addEventListener("click", displaySearchItems);
// document.querySelector(".cart").addEventListener("click", Cart);
document.getElementById("mode").addEventListener('click',mode_click)




