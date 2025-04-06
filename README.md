# Plataforma de Gestión de Recursos Humanos

## Integrantes del equipo:
- Tomás Navarro  
- Facundo Gil  
- Román Quevedo  

## Profesores:
- Juan Carlos Montero  
- Evelyn Aragón

## Repositorio Github:
https://github.com/romanaq0207/Plataforma-de-Gestion-de-Recursos-Humanos.git

---

## Descripción del Proyecto

Esta plataforma permite a Recursos Humanos subir registros de asistencia en formato Excel/CSV, y automáticamente detectar comportamientos anómalos utilizando *machine learning no supervisado* (`Isolation Forest`). Se analizan ausencias consecutivas, llegadas tarde y salidas tempranas. También se generan gráficos y reportes descargables.

---

## 🔧 Requisitos Generales

Asegurate de tener instalado lo siguiente:

- [Python 3.10+](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/en/download)
- [Git](https://git-scm.com/)

---

## 📦 Clonación del Proyecto

Desde la terminal, ejecutar:

```bash
git clone https://github.com/romanaq0207/Plataforma-de-Gestion-de-Recursos-Humanos.git
cd Plataforma-de-Gestion-de-Recursos-Humanos

```
## ⚙️ Configuración del Backend
📦 Requisitos
Python 3.x

Instalar dependencias necesarias:

```bash
pip install -r requirements.txt
```
Si no hay un requirements.txt, podés instalar manualmente:

```bash
pip install pandas matplotlib seaborn scikit-learn openpyxl fastapi uvicorn
```
▶️ Ejecutar el backend
```bash
cd src/Pages
uvicorn backend:app --reload
```
El backend se ejecutará en: http://localhost:8000

## Frontend (React + Vite)
⚙️ Requisitos
Tener instalada la última versión de Node.js

▶️ Ejecutar el frontend
```bash
cd src/Vista
npm install
npm run dev
```
Generalmente se abre automáticamente en el navegador, si no, ir a http://localhost:5173

##🛠️ Funcionalidades principales
- Subida de archivos de asistencia en formato .xlsx, .xls o .csv

- Detección automática de anomalías con Isolation Forest

- Visualización de estadísticas, gráficos y resultados

- Exportación del análisis a un archivo Excel coloreado

- Generación de dataset simulado de asistencia

  ##📝 Licencia
Este proyecto fue desarrollado con fines académicos como parte de un trabajo práctico universitario.
