# COMPLETE SETUP GUIDE – DL Enterprises Invoice System

## STEP 1: FIREBASE SETUP (Free)

1. Go to console.firebase.google.com → Add project → Name: dl-enterprises
2. Authentication → Get Started → Email/Password → Enable → Add Users (your login emails)
3. Firestore Database → Create database → Production mode → Region: asia-south1
4. Firestore → Rules tab → Paste:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}

5. Project Settings → Web App → Copy firebaseConfig values
6. Open src/firebase/config.js → Paste your values

## STEP 2: RUN LOCALLY

  npm install
  npm start
  Open: http://localhost:3000

## STEP 3: DEPLOY TO VERCEL (Free)

  npm install -g vercel
  vercel login
  vercel --prod

OR upload to GitHub → import at vercel.com → Deploy

## STEP 4: EMAIL SETUP (Optional – Free)

1. emailjs.com → Sign up → Add Gmail service → Create template
2. Template variables: {{to_name}}, {{inv_no}}, {{total}}, {{inv_due}}, {{company}}
3. In app → Settings → Paste EmailJS Service ID, Template ID, Public Key

## STEP 5: USE THE APP

- Settings → Add business name, GSTIN, address, bank details
- Customers → Add your customers
- Create Invoice → Select customer → Add items → Save → Download PDF / WhatsApp / Email
