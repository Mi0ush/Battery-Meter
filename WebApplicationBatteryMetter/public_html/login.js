import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: " ",
  authDomain: "batterymetter-7ef13.firebaseapp.com",
  projectId: "batterymetter-7ef13",
  storageBucket: "batterymetter-7ef13.appspot.com",
  messagingSenderId: "1074084787551",
  appId: "1:1074084787551:web:f9314b9100e302ad88f2ea",
  measurementId: "G-K1ZRY8RTHN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        errorMessage.innerText = '';

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("Successfully logged in!");
                window.location.href = "welcome.html";
            })
            .catch((error) => {
                errorMessage.innerText = 'Incorrect password or email';
            });
    });

    const forgotPasswordLink = document.getElementById('forgot-password');
    forgotPasswordLink.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        if (!email) {
            errorMessage.innerText ='Please enter your email address to reset your password.';
            return;
        }
        
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent.');
            })
            .catch((error) => {
                errorMessage.innerText = `Error: ${error.message} (code: ${error.code})`;
            });
    });
    
    const togglePasswordButton = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    togglePasswordButton.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordButton.src = 'eyeOpen.png';
        } else {
            passwordInput.type = 'password';
            togglePasswordButton.src = 'eyeClosed.png';
        }
    });
});
