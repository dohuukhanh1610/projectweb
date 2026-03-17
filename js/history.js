import { doc, getDoc, arrayRemove, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { barClick, logoClick, search, cartClick, userClick, backToMenu, History } from "./base.js";
import { db, auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { data } from "/data/data.js";


logoClick();
barClick();
search();
cartClick();
userClick();
backToMenu();
History();
let currentUser = null;
onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        const docRef = doc(db, "user", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const idBuy = docSnap.data().idBuy;

        let listProducts = data.products.filter(product =>
            idBuy.includes(product.id.toString()))
        let htmls = ``;
        listProducts.map(item => {
            htmls += `<div class="item" id="${item.id}">
                <div class="item-img">
                    <img src="${item.thumbnail}" alt="img">
                </div>
                <div class="item-content">
                    <div class="title">
                        ${item.title}
                    </div>
                    <hr>
                    <div class="price">
                       ${item.price}$
                    </div>
                    <hr>
                    <div class="button">
                        Buy
                    </div>
                    <div class="deleteItem">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
                </div>`
        })
        document.querySelector('.CartProducts').innerHTML = htmls;
        deleteItem();
        buyItem();
    }
});

const deleteItem = () => {
    let removeBtns = document.querySelectorAll('.deleteItem');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            let product = btn.closest('.item');
            let id = product.getAttribute('id');
            await updateDoc(doc(db, "user", currentUser.uid), {
                idBuy: arrayRemove(id)
            });
            product.remove();
        })
    })

}
const buyItem = () => {
    let buyBtns = document.querySelectorAll('.button');
    buyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let product = btn.closest('.item');
            let id = product.getAttribute('id');
            location.href = `/html/order.html?id=${id}`
        })
    })
}



