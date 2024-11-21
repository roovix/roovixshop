import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9_Xtlduo-sI6CwwpnRDBTEA-13i0aQI",
    authDomain: "ec-affiliate.firebaseapp.com",
    projectId: "ec-affiliate",
    storageBucket: "ec-affiliate.appspot.com",
    messagingSenderId: "166080127246",
    appId: "1:166080127246:web:a21b27512218783db3775f",
    measurementId: "G-BEW9MPV4SC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Get the form element
const form = document.getElementById("contact_form");

// Form submission event listener
form.addEventListener("submit", (event) => {
    // Prevent the form from reloading the page
    event.preventDefault();

    // Get form input values
    const name = document.getElementById("name_input").value;
    const email = document.getElementById("email_input").value;
    const sub = document.getElementById("sub_input").value;
    const msg = document.getElementById("msg_input").value;

    // Check if the user is authenticated
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Add a new help request to the database
            const helpRef = push(ref(db, `help_request/`)); // Push creates a unique ID for each entry
            set(helpRef, {
                name: name,
                email: email,
                subject: sub,
                message: msg,
                timestamp: Date.now(),
                uid: user.uid
            })
                .then(() => {
                    alert("Help request sent successfully!");
                    form.reset(); // Clear the form
                })
                .catch((error) => {
                    console.error("Error sending help request:", error);
                    alert("Failed to send help request. Please try again.");
                });
        } else {
            window.location.href = "https://roovix.com/login";
        }
    });
});


// Get references to the search input and form
const searchForm = document.getElementById("search_form");
const searchInput = document.getElementById("search");

// Add event listener for form submission
searchForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

    // Get the current value of the search input
    const search = searchInput.value.trim();

    // Redirect to the search results page with the query
    if (search) {
        window.location.href = `https://roovix.com/search_result?search=${encodeURIComponent(search)}`;
    } else {
        alert("Please enter a search query."); // Optional: Handle empty input
    }
});