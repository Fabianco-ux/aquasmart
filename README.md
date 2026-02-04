# AquaSmart Manager (Vite + React + TS)

SPA responsive con UI Material-UI, rutas con React Router y datos mock. Personalización simulada con `localStorage`. Listo para desplegar en GitHub Pages.

## Requisitos
- Node.js 18+ y npm

## Instalación y ejecución local
```bash
npm install
npm run dev
```
Abre el navegador en http://localhost:5173

## Estructura
- public/
- src/
  - assets/
  - components/
    - DashboardCard.tsx
    - FormIntelligent.tsx
    - Sidebar.tsx
  - pages/
    - Dashboard.tsx
    - Biblioteca.tsx
    - Insumos.tsx
    - Plagas.tsx
    - Soporte.tsx
    - Produccion.tsx
    - Alimentacion.tsx
    - Cosecha.tsx
    - Gestion.tsx
  - mocks/
    - data.json
    - especies.ts
  - App.tsx
  - main.tsx
  - vite-env.d.ts
- vite.config.ts
- package.json

## Deploy en GitHub Pages
Asegúrate de que tu repositorio en GitHub se llame `aquasmart` y que tu usuario sea `Fabianco-ux` (ajusta si es diferente).

1. Configuración importante en `vite.config.ts`:
```ts
export default defineConfig({
  plugins: [react()],
  base: '/aquasmart/', // Debe coincidir con el nombre del repo
})
```
2. `package.json` incluye:
```json
{
  "homepage": "https://Fabianco-ux.github.io/aquasmart",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```
3. Publicación:
```bash
git init
git add .
git commit -m "Initial commit: AquaSmart"
git remote add origin https://github.com/Fabianco-ux/aquasmart.git
git branch -M main
git push -u origin main
npm run build
npm run deploy
```
Esto crea/actualiza la rama `gh-pages`. En GitHub > Settings > Pages, configura `Branch: gh-pages / root`.

## Incrustar en otra web
```html
<iframe src="https://Fabianco-ux.github.io/aquasmart/" width="100%" height="600"></iframe>
```
