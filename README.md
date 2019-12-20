1. Clone the repo
2. Create your project on the [Firebase Console](https://console.firebase.google.com).
3. Open Project and go to **Project settings > Cloud Messaging** and there in section **Web configuration** click **Generate key pair** button.
4. Copy public key and in `index.html` file replace `<YOUR_PUBLIC_VAPID_KEY_HERE>` with your key.
5. Copy your Firebase Config object in `index.html` (line 108) and `firebase-messaging-sw.js` (line 65) replacing the existing object.
6. Serve the folder locally using Python Simple HTTP Server (`python -m SimpleHTTPServer 9000`)
7. Open Chrome Debugging Tools, go to more tools, remote devices.
8. Connect your Android phone and enable USB debugging.
9. Once your phone is listed in the remote devices section, enable port forwarding for port 9000.
10. Open `localhost:9000` on your phone and grant access to notifications.
11. Copy your FCM Token.
12. Obtain your server key from the project settings, cloud messaging tab.
13. Send a cURL request like this

```
curl -X POST \
  https://fcm.googleapis.com/fcm/send \
  -H 'Authorization: key=<LEGACY_SERVER_KEY_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
  "data": {
      "title": "FCM Message",
      "body": "This is a message from FCM"
  },
  "to": "<FCM_TOKEN_HERE>"
}'
```

14. Click on the notification received on your device. The notification will open up normally in Chrome.
15. Now add `localhost:9000` to your Home Screen as PWA.
16. Send the same cURL request again.
17. Click on the notification.
18. Notification won't open up
