import serviceAccount from './serviceAccount.json' assert {type: "json"};
import admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export default admin