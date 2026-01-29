import { initializeApp, getApps, cert, App } from "firebase-admin/app"
import { getFirestore, Firestore } from "firebase-admin/firestore"
import { getAuth, Auth } from "firebase-admin/auth"

let app: App | null = null
let adminDb: Firestore | null = null
let adminAuth: Auth | null = null

// Check if Firebase Admin credentials are available
const hasAdminCredentials = 
  process.env.FIREBASE_PROJECT_ID && 
  process.env.FIREBASE_CLIENT_EMAIL && 
  process.env.FIREBASE_PRIVATE_KEY

if (hasAdminCredentials) {
  try {
    if (!getApps().length) {
      app = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      })
    } else {
      app = getApps()[0]
    }
    adminDb = getFirestore(app)
    adminAuth = getAuth(app)
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error)
  }
}

export { adminDb, adminAuth }
export const isAdminInitialized = !!adminDb
