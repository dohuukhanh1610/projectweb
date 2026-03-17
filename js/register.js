
import { db, auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { barClick, logoClick, search, cartClick, userClick } from "./base.js";


logoClick();
barClick();
search();
cartClick();
userClick();

const validator = () => {
    const required = (value) => {
        return value.trim() ? undefined : 'vui long nhap truong nay';
    }
    let inputs = document.querySelectorAll('table input');
    let form = document.querySelector('.register-form');
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
            handleSignUp();
        }

    })

}

validator();

const handleSignUp = async () => {
    let name = document.querySelector('#full-name').value;
    let phone = document.querySelector('#phone-number').value;
    let address = document.querySelector('#address').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "user", user.uid), {
            name: name,
            phonenumber: phone,
            address: address,
            email: email
        });
    } catch (error) {

        if (error.code === "auth/email-already-in-use") {
            alert("Email đã được đăng ký");
        }

    }

    location.href = '/index.html'
}
