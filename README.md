# Plataforma de Gestión de Recursos Humanos

## 🧠 Sistema de Detección de Anomalías en Asistencia

Este proyecto utiliza un modelo de *machine learning no supervisado* (`Isolation Forest`) para detectar comportamientos anómalos en la asistencia de empleados. El sistema analiza patrones como **ausencias consecutivas**, **llegadas tarde** y **salidas tempranas**. Todo el proceso puede visualizarse desde un **panel web interactivo**.

---

## 👨‍💻 Integrantes del equipo:
- Tomás Navarro  
- Facundo Gil  
- Román Quevedo  

## 👩‍🏫 Profesores:
- Montero Juan Carlos  
- Aragón Evelyn

## 📁 Repositorio Github:
[https://github.com/romanaq0207/Plataforma-de-Gestion-de-Recursos-Humanos](https://github.com/romanaq0207/Plataforma-de-Gestion-de-Recursos-Humanos)

---

## 🚀 Instrucciones para ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/romanaq0207/Plataforma-de-Gestion-de-Recursos-Humanos.git
cd Plataforma-de-Gestion-de-Recursos-Humanos
### 2. Backend (API en FastAPI + modelo de ML)
📦 Requisitos
Python 3.x

Instalar dependencias necesarias:

bash
Copiar
Editar
pip install -r requirements.txt
Si no hay un requirements.txt, podés instalar manualmente:

bash
Copiar
Editar
pip install pandas matplotlib seaborn scikit-learn openpyxl fastapi uvicorn
▶️ Ejecutar el backend
bash
Copiar
Editar
cd src/Pages
uvicorn backend:app --reload
El backend se ejecutará en: http://localhost:8000

### 3. Frontend (React + Vite)
⚙️ Requisitos
Tener instalada la última versión de Node.js

▶️ Ejecutar el frontend
bash
Copiar
Editar
cd src/Vista
npm install
npm run dev
Generalmente se abre automáticamente en el navegador, si no, ir a http://localhost:5173

🛠️ Funcionalidades principales
Subida de archivos de asistencia en formato .xlsx, .xls o .csv

Detección automática de anomalías con Isolation Forest

Visualización de estadísticas, gráficos y resultados

Exportación del análisis a un archivo Excel coloreado

Generación de dataset simulado de asistencia

📊 Archivos generados
resultados.xlsx: archivo Excel con anomalías resaltadas

grafico_con_normales_y_anomalias_horario.png: gráfico de dispersión entrada vs salida

grafico_anomalias_ausencia_por_empleado.png: gráfico de barras por ausencias

📝 Licencia
Este proyecto fue desarrollado con fines académicos como parte de un trabajo práctico universitario.
