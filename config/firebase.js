import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

// Your Firebase web app's configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAsbjp1xQujuaKwdtCga1kkU8moHW6ZyY",
  authDomain: "fir-push-notification-901dd.firebaseapp.com",
  projectId: "fir-push-notification-901dd",
  storageBucket: "fir-push-notification-901dd.appspot.com",
  messagingSenderId: "361371800254",
  appId: "1:361371800254:web:826b3f54eacdfa82f744ef",
  measurementId: "G-01SPRJPBQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission and get FCM token
// Notification.requestPermission().then((permission) => {
//   if (permission === "granted") {
//     getToken(messaging, { vapidKey: 'BHkcbURxiyHg3SQX6AgNYzAi8TYgD1WcqFpH3Vogv73tk3OZprmWR6tHizXs2V0cj5eHTjCdqaQgbJnPDOBCsP0' }).then((currentToken) => {
//       if (currentToken) {
//         console.log("FCM Token:", currentToken);
//         // Send the token to your server
//       } else {
//         console.log("No registration token available. Request permission to generate one.");
//       }
//     }).catch((err) => {
//       console.log("An error occurred while retrieving token. ", err);
//     });
//   } else {
//     console.log("Unable to get permission to notify.");
//   }
// });

