import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, getDocs, query, where, orderBy,
  serverTimestamp, onSnapshot
} from 'firebase/firestore';
import { auth, db } from './config';

// ── AUTH ──────────────────────────────────────────────────────
export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);

export const onAuthChange = (cb) => onAuthStateChanged(auth, cb);

// ── INVOICES ──────────────────────────────────────────────────
export const addInvoice = (uid, data) =>
  addDoc(collection(db, 'users', uid, 'invoices'), {
    ...data, createdAt: serverTimestamp()
  });

export const updateInvoice = (uid, id, data) =>
  updateDoc(doc(db, 'users', uid, 'invoices', id), {
    ...data, updatedAt: serverTimestamp()
  });

export const deleteInvoice = (uid, id) =>
  deleteDoc(doc(db, 'users', uid, 'invoices', id));

export const subscribeInvoices = (uid, cb) => {
  const q = query(
    collection(db, 'users', uid, 'invoices'),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, snap => {
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    cb(docs);
  });
};

// ── CUSTOMERS ─────────────────────────────────────────────────
export const addCustomer = (uid, data) =>
  addDoc(collection(db, 'users', uid, 'customers'), {
    ...data, createdAt: serverTimestamp()
  });

export const updateCustomer = (uid, id, data) =>
  updateDoc(doc(db, 'users', uid, 'customers', id), data);

export const deleteCustomer = (uid, id) =>
  deleteDoc(doc(db, 'users', uid, 'customers', id));

export const subscribeCustomers = (uid, cb) => {
  const q = query(
    collection(db, 'users', uid, 'customers'),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, snap => {
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    cb(docs);
  });
};

// ── SETTINGS ─────────────────────────────────────────────────
export const getSettings = async (uid) => {
  const snap = await getDocs(collection(db, 'users', uid, 'settings'));
  if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };
  return null;
};

export const saveSettings = async (uid, data) => {
  const snap = await getDocs(collection(db, 'users', uid, 'settings'));
  if (!snap.empty) {
    await updateDoc(doc(db, 'users', uid, 'settings', snap.docs[0].id), data);
  } else {
    await addDoc(collection(db, 'users', uid, 'settings'), data);
  }
};
