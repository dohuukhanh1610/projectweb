import { data } from "../data/data.js";
import { drawProduct } from "./drawProducts.js";


import { logoClick, search, cartClick, pagination, barClick, userClick, Logout } from "./base.js";

function typeOfProducts() {
    let string = new Set();
    data.products.forEach(element => {
        string.add(`<div class="item">${element.category}</div>`);
    });
    string.add(`<div class="item">All</div>`);
    document.querySelector(".typeOfProducts .container .all-item").innerHTML = Array.from(string).join('');

    let items = document.querySelectorAll(".typeOfProducts .container .item");
    items.forEach(item => {
        item.addEventListener('click', () => {
            let category = item.textContent;
            if (category === "All") {
                pagination();
            } else {
                let filterCategogy = data.products.filter(product => product.category === category);
                pagination(filterCategogy);
            }
        })
    })
}
function bannerBigSell() {
    let button = document.querySelector(".bannerSellOff .button");
    button.addEventListener('click', () => {
        let sortedProducts = [...data.products].sort((a, b) => b.discountPercentage - a.discountPercentage);
        let filterBigSell = sortedProducts.slice(0, 10);
        pagination(filterBigSell);
    })
}
function sortBy() {
    let select = document.querySelector("#SortBy");
    select.addEventListener('change', () => {
        let value = select.value;
        let sortedProducts = [...data.products];
        switch (value) {
            case "SortBy":
                pagination();
                break;
            case "LtH":
                sortedProducts.sort((a, b) => a.price - b.price);
                pagination(sortedProducts);
                break;
            case "HtL":
                sortedProducts.sort((a, b) => b.price - a.price);
                pagination(sortedProducts);
                break;
            case "BestRated":
                sortedProducts.sort((a, b) => b.rating - a.rating);
                pagination(sortedProducts);
                break;
            default:
                pagination();
        }
    })
}
search();

let products = data.products;

const params = new URLSearchParams(window.location.search);
const keyword = params.get("search");

if (keyword) {
    products = products.filter(product =>
        product.title.toLowerCase().includes(keyword.toLowerCase())
    );
}

pagination(products);
logoClick();
Logout();
cartClick();
typeOfProducts();
bannerBigSell();
sortBy();
barClick();
userClick();
