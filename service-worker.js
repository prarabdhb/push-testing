/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

importScripts("/firebase-messaging-sw.js?v=2");

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});
