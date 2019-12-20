// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
// importScripts('/__/firebase/7.6.0/firebase-app.js');
// importScripts('/__/firebase/7.6.0/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

// const messaging = firebase.messaging();

// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js");

self.addEventListener("notificationclick", event => {
  console.log("notificationclicked ");
  event.notification.close();
  console.log(event.notification);
  const { data = {} } = event.notification;
  var temp = "/";
  var urlToOpen = new URL(temp, self.location.origin).href;
  console.log("urlToOpen: ", urlToOpen);
  var promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(function(windowClients) {
      let matchingClient = null;

      for (var i = 0; i < windowClients.length; i++) {
        var windowClient = windowClients[i];
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient && "focus" in matchingClient) {
        return matchingClient.focus();
      } else if ("openWindow" in clients) {
        const openWindowPromise = clients.openWindow(urlToOpen);
        return openWindowPromise
          .then(() => {
            console.log("openned");
            return true;
          })
          .catch(err => {
            console.log(err);
          });
      }
    });

  event.waitUntil(
    promiseChain.then(() => {
      console.log("promise_ended");
    })
  );
});

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png"
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
// [END background_handler]
