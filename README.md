# An monorepo to show how to record and replay the crash

## Code Structure
- crash-repalyer-customer 
  customer portal to do some action and trigger the crash
- crash-replayer-dashboard
  dashboard to display and replay the crash
- crash-replayer-server
  backend service to save the crash
- crash-replayer-constants
  some shred constants
- use-crash-replayer
  hooks for customer to easy integrate to crash replayer

## Tech stack
- UMI4
- Nest.js
- Firebase Firestore

## Deploy
You can deploy the three apps wherever you want 
Please remember to register a firebase account and use the Firestore service, you also need to create a server account and copy the server-account.json as json string, then set the string to to environment variable  `FIREBASE_SERVICE_ACCOUNT_JSON`

## TODO
- [x] extract the backend url as global configuration in root folder
- [x] extract server-account as `BUILD_VARIABLE`
- [x] extract npm package use-crash-replayer