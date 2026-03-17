import { data } from "/data/data.js";
import { auth, db } from "./firebase.js";
import { barClick, logoClick, search, cartClick, userClick, backToMenu, currentUser, History } from "./base.js";
import { doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

barClick();
logoClick();
search();
cartClick();
userClick();
History();
let url = new URLSearchParams(window.location.search);
let id = url.get('id');
let inforProduct = data.products.find((item) => {
    return item.id == id;
})
const productDetail = () => {

    let htmls = `
    
                <div class="item-img">
                    <img src="${inforProduct.thumbnail}" alt="img">
                </div>
                <div class="item-content">
                    <div class="item-title">
                        <h3>${inforProduct.title}</h3>
                    </div>
                    <hr>
                    <div class="item-review">
                        <div>${inforProduct.rating}</div>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <hr>
                    <div class="item-description">
                        <p>${inforProduct.description}</p>
                    </div>
                    <hr>
                    <div class="item-price">
                        <h5>${inforProduct.price}$</h5>
                    </div>
                    <hr>
                    <div class="item-quanlity">
                        <div class="down">--</div>
                        <input class="quanlity-input" placeholder="1" value="1"></input>
                        <div class="up">++</div>
                    </div>
                    <hr>
                    <div class="item-active">
                        <div class="button">Buy</div>
                        <div class="cart">
                        <i class="fa-solid fa-cart-shopping"></i>
                        </div>
                    </div>
                </div>
            
    `
    document.querySelector('.itemOrder').innerHTML = htmls;
}
backToMenu();
const quanlity = () => {
    let downBtn = document.querySelector('.down');
    let upBtn = document.querySelector('.up');
    let inputValue = parseInt(document.querySelector('.quanlity-input').value);
    let input = document.querySelector('.quanlity-input')
    downBtn.addEventListener('click', () => {
        if (inputValue > 1) {
            --inputValue;
            input.value = inputValue;
            totalPrice(inputValue);
        }
    })
    upBtn.addEventListener('click', () => {
        ++inputValue;
        input.value = inputValue;
        totalPrice(inputValue);
    })
    input.addEventListener('blur', (e) => {
        inputValue = e.target.value;
        totalPrice(inputValue);
    })
}
const totalPrice = (value) => {
    let price = document.querySelector('.item-price h5');
    let eachPrice = parseFloat(inforProduct.price);
    price.textContent = `${(eachPrice * value).toFixed(2)}$`;

}
const ProductAction = (id) => {
    document.addEventListener('click', async (e) => {
        const Btn = e.target.closest('.item-active .button');
        const cartBtn = e.target.closest('.item-active .cart');
        if (Btn) {
            if (currentUser) {
                let result = confirm('Ban co muon mua san pham nay khong?');
                if (result) {
                    await getBuyID(id);
                    alert('mua hang thanh cong!')
                }
            }
            else {
                alert('Vui long dang nhap!');
                location.href = '/login.html';
            }
        }
        if (cartBtn) {
            e.preventDefault();
            if (!currentUser) {
                alert('Vui long dang nhap!');
                location.href = '/login.html';
            }
            else {
                try {
                    await getID(id);
                    alert('Da them vao gio hang thanh cong');
                } catch (error) {
                    alert(error);
                }
            }
        }
    })

}
async function getID(id) {
    await updateDoc(doc(db, "user", currentUser.uid), {
        ids: arrayUnion(id)
    });
}
async function getBuyID(id) {
    await updateDoc(doc(db, "user", currentUser.uid), {
        idBuy: arrayUnion(id)
    });
}

backToMenu();
productDetail();
quanlity();
ProductAction(id);