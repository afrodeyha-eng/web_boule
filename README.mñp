# Boulé · Panel Proceso Productivo Minero

Aplicación web (HTML + CSS + JavaScript modular, sin build step) con:

- **Panel de fases** del proceso productivo minero (6 fases → procesos + participantes y roles).
- **Módulo de Geolocalización** funcional con Leaflet + OpenStreetMap: mapa interactivo, GPS del dispositivo, alta/baja de puntos, filtros por categoría, KPIs y **persistencia en Firebase Firestore**.

Identidad de marca Boulé: navy `#0F1E36`, teal `#00A896`, orange `#FF6B35`, tipografía Montserrat.

---

## Estructura

```
boule-app/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js       ← bootstrap + navegación del sidebar
│   ├── data.js      ← fases, categorías geo y puntos semilla
│   ├── phases.js    ← render de procesos y participantes
│   ├── geo.js       ← módulo de geolocalización (Leaflet)
│   └── store.js     ← capa de persistencia (Firebase / memoria)
└── README.md
```

---

## Cómo correrlo

El proyecto usa **ES Modules**, así que **no funciona abriendo el archivo con `file://`** — necesita un servidor local.

**Opción rápida (Python):**
```bash
cd boule-app
python3 -m http.server 5500
# abrir http://localhost:5500
```

**Opción Node:**
```bash
npx serve boule-app
```

En VS Code / Claude Code también sirve la extensión **Live Server**.

---

## Persistencia con Firebase (para que los puntos queden guardados)

Por defecto arranca en **modo memoria** (los puntos viven mientras la pestaña esté abierta). Para guardarlos:

1. Entrá a [Firebase Console](https://console.firebase.google.com/) → creá un proyecto (o usá uno existente).
2. **Firestore Database** → *Crear base de datos* → modo producción.
3. **Configuración del proyecto** → *Tus apps* → app Web → copiá el objeto `firebaseConfig`.
4. Pegá esos valores en `js/store.js`, reemplazando los `REEMPLAZAR_*`:

```js
export const firebaseConfig = {
  apiKey:            "AIza...",
  authDomain:        "tu-proyecto.firebaseapp.com",
  projectId:         "tu-proyecto",
  storageBucket:     "tu-proyecto.appspot.com",
  messagingSenderId: "0000000000",
  appId:             "1:0000:web:abcdef",
};
```

Apenas la config es válida, la app cambia sola a **modo Firebase** (el badge arriba del mapa lo indica) y usa `onSnapshot`, así que los cambios se ven en tiempo real entre dispositivos.

### Reglas de Firestore sugeridas (desarrollo)

Colección: `geo_points`. Para pruebas rápidas:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /geo_points/{doc} {
      allow read, write: if true;   // ⚠️ solo desarrollo
    }
  }
}
```

> Para producción, restringí con Firebase Authentication (`allow read, write: if request.auth != null;`) o reglas por rol.

Modelo de cada documento:
```json
{ "name": "string", "cat": "exploracion|produccion|ambiental|comunidad|infraestructura", "lat": -34.65, "lng": -68.34, "desc": "string" }
```

---

## Deploy

- **Firebase Hosting:** `firebase init hosting` (carpeta pública = `boule-app`) → `firebase deploy`.
- **Hostinger:** subí el contenido de `boule-app/` por FTP/File Manager. Al servirse por HTTPS, los módulos y el GPS funcionan sin problema.

> El GPS del navegador (`navigator.geolocation`) requiere **HTTPS** (o `localhost`).

---

## Ideas para seguir con Claude Code

- Autenticación (Firebase Auth) y roles por fase/área.
- Editar puntos existentes (hoy es alta y baja).
- Trazar rutas entre puntos / capas por fase del proceso.
- Exportar puntos a GeoJSON / KML.
- Conectar los puntos con las tablas de casos por área (reclamos, mantenimiento, sensores).
