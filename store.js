// ===============================================================
//  store.js — capa de persistencia de puntos de geolocalización
//  Usa Firebase Firestore si hay configuración válida.
//  Si no, cae automáticamente a modo memoria (con puntos semilla).
// ===============================================================

import { SEED_POINTS } from "./data.js";

// -------- 1) CONFIGURACIÓN DE FIREBASE --------
// Pegá acá la config de tu proyecto (Firebase Console → Configuración → Tus apps → SDK).
// Dejá los valores como están (REEMPLAZAR_*) para trabajar en modo memoria.
export const firebaseConfig = {
  apiKey:            "REEMPLAZAR_API_KEY",
  authDomain:        "REEMPLAZAR.firebaseapp.com",
  projectId:         "REEMPLAZAR_PROJECT_ID",
  storageBucket:     "REEMPLAZAR.appspot.com",
  messagingSenderId: "REEMPLAZAR_SENDER_ID",
  appId:             "REEMPLAZAR_APP_ID",
};

const FIREBASE_READY = !firebaseConfig.apiKey.startsWith("REEMPLAZAR");
const COLLECTION = "geo_points";

let db = null;
let fs = null; // funciones de firestore

// -------- 2) INICIALIZACIÓN --------
export async function initStore(){
  if(!FIREBASE_READY){
    return { mode:"memory" };
  }
  try{
    const appMod = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
    fs = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
    const app = appMod.initializeApp(firebaseConfig);
    db = fs.getFirestore(app);
    return { mode:"firebase" };
  }catch(err){
    console.error("Firebase no disponible, uso modo memoria:", err);
    return { mode:"memory", error:err };
  }
}

// -------- 3) API UNIFICADA --------
// subscribe(callback): llama a callback(points[]) cada vez que cambian los datos.
// En Firebase usa onSnapshot (tiempo real). En memoria emite una vez.

let memPoints = SEED_POINTS.map((p,i)=>({ id:"mem_"+(i+1), ...p }));
let memListeners = [];
let memSeq = memPoints.length;

export function subscribe(callback){
  if(db && fs){
    const col = fs.collection(db, COLLECTION);
    return fs.onSnapshot(col, (snap)=>{
      const points = snap.docs.map(d=>({ id:d.id, ...d.data() }));
      callback(points);
    }, (err)=>{
      console.error("onSnapshot error:", err);
      callback([]);
    });
  } else {
    memListeners.push(callback);
    callback([...memPoints]);
    return () => { memListeners = memListeners.filter(cb=>cb!==callback); };
  }
}

export async function addPoint(point){
  if(db && fs){
    await fs.addDoc(fs.collection(db, COLLECTION), point);
  } else {
    memPoints.push({ id:"mem_"+(++memSeq), ...point });
    memListeners.forEach(cb=>cb([...memPoints]));
  }
}

export async function deletePoint(id){
  if(db && fs){
    await fs.deleteDoc(fs.doc(db, COLLECTION, id));
  } else {
    memPoints = memPoints.filter(p=>p.id!==id);
    memListeners.forEach(cb=>cb([...memPoints]));
  }
}
