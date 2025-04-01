import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Konfiguracja Firebase
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
const db = getFirestore(app);
const auth = getAuth(app);

// Funkcja do pobierania pomiarów
async function fetchMeasurements() {
    const user = auth.currentUser;
    if (!user) {
        console.error('No user logged in');
        return;
    }

    const userId = user.uid;
    const measurementsList = document.getElementById('measurements');
    measurementsList.innerHTML = '';

    try {
        const q = query(collection(db, `users/${userId}/measurements`), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const measurement = doc.data();
            const li = document.createElement('li');
            li.className = 'measurement';
            li.innerHTML = `
                <div class="measurement-info">
                    <strong>Model: </strong> ${measurement.phoneModel}<br> 
                    <strong>OS: </strong>  ${measurement.androidVersion}<br>
                    <strong>Application: </strong> ${measurement.appName}<br>
                    <strong>Measurement Date: </strong> ${new Date(measurement.timestamp).toISOString()}<br>
                    <!--  <strong>Wartości: </strong> ${measurement.values.join(', ')} -->
                </div>
            `;
            measurementsList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching measurements: ", error);
    }
}

// Dodanie nasłuchu na załadowanie dokumentu
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Document loaded');
    await fetchMeasurements();
});

// Obsługa wylogowania
document.getElementById('logout-button').addEventListener('click', async () => {
    console.log('Logging out...');
    await signOut(auth);
    window.location.href = 'login.html';
});
