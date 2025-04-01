// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: " ",
  authDomain: "batterymetter-7ef13.firebaseapp.com",
  projectId: "batterymetter-7ef13",
  storageBucket: "batterymetter-7ef13.appspot.com",
  messagingSenderId: "1074084787551",
  appId: "1:1074084787551:web:f9314b9100e302ad88f2ea",
  measurementId: "G-K1ZRY8RTHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const errorMessage = document.getElementById('error-message');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordHint = document.getElementById('password-hint');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        errorMessage.innerText = '';

        // Inputs
        const email = document.getElementById('e-mail').value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validate password requirements
        const passwordRequirements = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

        if (!passwordRequirements.test(password)) {
            errorMessage.innerText = 'Password must contain at least 1 special character and be at least 8 characters long.';
            return;
        }

        // Validate password confirmation
        if (password !== confirmPassword) {
            errorMessage.innerText = 'Passwords do not match.';
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                alert("Account has been created");
                window.location.href = "welcome.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessageText = error.message;
                errorMessage.innerText = `Error: ${errorCode}, Message: ${errorMessageText}`;
            });                     
    });

    const togglePasswordButton = document.getElementById('toggle-password');
    const toggleConfirmPasswordButton = document.getElementById('toggle-confirm-password');
  
    togglePasswordButton.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordButton.src = 'eyeOpen.png';
        } else {
            passwordInput.type = 'password';
            togglePasswordButton.src = 'eyeClosed.png';
        }
    });

    toggleConfirmPasswordButton.addEventListener('click', () => {
        if (confirmPasswordInput.type === 'password') {
            confirmPasswordInput.type = 'text';
            toggleConfirmPasswordButton.src = 'eyeOpen.png';
        } else {
            confirmPasswordInput.type = 'password';
            toggleConfirmPasswordButton.src = 'eyeClosed.png';
        }
    });

    const showHint = (event) => {
        const inputRect = event.target.getBoundingClientRect();
        passwordHint.style.top = `${inputRect.top - 30}px`;
        passwordHint.style.left = `${inputRect.left}px`;
        passwordHint.style.display = 'block';
    };

    const hideHint = () => {
        passwordHint.style.display = 'none';
    };

    passwordInput.addEventListener('focus', showHint);
    passwordInput.addEventListener('blur', hideHint);

    confirmPasswordInput.addEventListener('focus', showHint);
    confirmPasswordInput.addEventListener('blur', hideHint);
});
