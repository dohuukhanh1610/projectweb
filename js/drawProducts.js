import { data } from "../data/data.js"
import { pagination } from "./base.js";
export const drawProduct = (filterData = data.products) => {
    let htmls = ``;
    filterData.forEach(element => {
        htmls += `<div class="product-item" id="${element.id}">
                    <div class="item-img">
                    <img src="${element.thumbnail}" alt="img">
                    <div class="sellOff">${element.discountPercentage}%</div>
                    </div>
                    <div class="item-content">
                    <h3 class="title">${element.title}</h3>
                    <p class="price">${element.price}$</p>
                    <div class="review">
                        <span>${element.rating}</span>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="option-buy">
                    <button class="button">Buy</button>
                    <a href="#" class="cart">
                       <i class="fa-solid fa-cart-shopping"></i>
                    </a> 
                    </div>              
                </div>
                </div>`
    });

    document.querySelector(".products").innerHTML = htmls;

}
