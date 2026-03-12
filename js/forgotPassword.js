import { auth } from "./firebase.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { barClick, logoClick, search, cartClick, userClick } from "./base.js";

barClick();
logoClick();
search();
cartClick();
userClick();
const validator = () => {
    const required = (value) => {
        return value.trim() ? undefined : 'vui long nhap truong nay';
    }
    let input = document.querySelector('table input');
    let form = document.querySelector('.forgotPw-form');
    input.addEventListener('blur', () => {
        const message = required(input.value);
        if (message) {
            input.parentNode.querySelector('.error-message').innerText = message;
        } else {
            input.parentNode.querySelector('.error-message').innerText = '';
        }

    })


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = required(input.value);
        if (message) {
            input.parentNode.querySelector('.error-message').innerText = message;
            alert('vui long nhap du thong tin');
        }
        else {
            forgotPassword();
        }

    })
}
validator();
async function forgotPassword() {
    let email = document.querySelector('#email').value;
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Email đặt lại mật khẩu đã được gửi");
    } catch (error) {
        alert("Đã có lỗi xảy ra, vui lòng kiểm tra email");
    }
}