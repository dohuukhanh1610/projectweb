import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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
    let inputs = document.querySelectorAll('table input');
    let form = document.querySelector('.login-form');
    inputs.forEach((input) => {
        input.addEventListener('blur', () => {
            const message = required(input.value);
            if (message) {
                input.parentNode.querySelector('.error-message').innerText = message;
            } else {
                input.parentNode.querySelector('.error-message').innerText = '';
            }

        })

    })
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        inputs.forEach((input) => {
            const message = required(input.value);
            if (message) {
                input.parentNode.querySelector('.error-message').innerText = message;
            }
        })
        let checkAll = [...inputs].every((input) => {
            return !required(input.value);
        })
        if (!checkAll) {
            alert('vui long nhap du thong tin');
        }
        else {
            signIn();
        }

    })

}

validator();
function signIn() {


    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert('dang nhap thanh cong');
            location.href = '../index.html';
        })
        .catch((error) => {
            if (error.code === 'auth/invalid-email') {
                alert('khong tim thay tai khoan, vui long dang ky');
            }
            alert('thong tin dang nhap sai, vui long dang nhap lai');
        });

}
