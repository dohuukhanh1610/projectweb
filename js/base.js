import { data } from "/data/data.js";
import { drawProduct } from "./drawProducts.js";
import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";



let currentUser = null;
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
    } else {
        currentUser = null;
    }
});
export { currentUser };
export function userClick() {

    let user = document.querySelector('.header .all-action .user i');
    let dropdown = document.querySelector('.header .all-action .user .drop-down');
    user.addEventListener('click', () => {
        if (currentUser)
            dropdown.classList.toggle('active');
        else
            location.href = '/login.html';
    })
}
export function logoClick() {
    let logo = document.querySelector(".logo");
    logo.addEventListener('click', () => {
        location.href = '/index.html';
    })
}
export function Logout() {
    let logout = document.querySelector('.header .user .logout');
    logout.addEventListener('click', () => {
        signOut(auth).then(() => {
            alert('dang xuat thanh cong');
            location.href = '/index.html';
        })
            .catch((error) => {
                alert('dang xuat khong thanh cong');
            });
    })
}
export function History() {
    let history = document.querySelector('.drop-down .history');
    history.addEventListener('click', () => {
        location.href = '/history.html';
    })
}

export function search() {
    const input = document.querySelector(".search input");

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const value = input.value.trim();

            if (!value) return;

            location.href = `/index.html?search=${value}`;
        }
    });
}
export function cartClick() {
    let cart = document.querySelector(".header .actions .cart");
    cart.addEventListener('click', () => {
        location.href = '/cart.html';
    })
}
export function barClick() {
    let bar = document.querySelector(".header .bars");
    let actions = document.querySelector(".header .all-action");
    bar.addEventListener('click', () => {
        actions.classList.toggle("active");
    })
}





export function pagination(filterData = data.products) {
    let prev = document.querySelector(".pagination .prev");
    let next = document.querySelector(".pagination .next");
    let currentPage = document.querySelector(".pagination .active");
    const limit = 10;
    let totalPages = Math.ceil(filterData.length / limit);

    function renderPage(page) {
        const start = (page - 1) * limit;
        const pageData = filterData.slice(start, start + limit);

        drawProduct(pageData);
    }
    currentPage.textContent = 1;
    renderPage(1);
    prev.onclick = () => {
        let pageNumber = parseInt(currentPage.textContent);
        if (pageNumber > 1) {
            currentPage.textContent = pageNumber - 1;
            renderPage(pageNumber - 1);
        }
    }
    next.onclick = () => {
        let pageNumber = parseInt(currentPage.textContent);
        if (pageNumber < totalPages) {
            currentPage.textContent = pageNumber + 1;
            renderPage(pageNumber + 1);
        }
    }
}
export const backToMenu = () => {
    let backBtn = document.querySelector('.back');
    backBtn.addEventListener('click', () => {
        location.href = '/index.html';
    })
}

