from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
import shutil
import sys
import os

# Agregamos ruta al directorio Modelo para importar model.py
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'Modelo')))
from model import procesar_archivo

app = FastAPI()

# CORS para permitir peticiones del frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    _, ext = os.path.splitext(file.filename)
    ext = ext.lower()

    if ext not in [".xlsx", ".xls", ".csv"]:
        return JSONResponse(status_code=400, content={"error": "Formato de archivo no soportado. Usa .xlsx, .xls o .csv"})

    file_location = f"temp_archivo{ext}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        empleados_con_anomalias, total_anomalias, total_registros = procesar_archivo(file_location)
        return {
            "nombres_con_anomalias": empleados_con_anomalias,
            "total_anomalias": total_anomalias,
            "total_registros": total_registros
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/descargar-excel/")
async def descargar_excel():
    ruta = "resultados.xlsx"
    if os.path.exists(ruta):
        return FileResponse(ruta, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename="resultados.xlsx")
    return JSONResponse(status_code=404, content={"error": "Archivo no encontrado"})

@app.get("/grafico/horarios/")
async def obtener_grafico_horarios():
    ruta = "grafico_con_normales_y_anomalias_horario.png"
    if os.path.exists(ruta):
        return FileResponse(ruta, media_type="image/png", filename="grafico_horarios.png")
    return JSONResponse(status_code=404, content={"error": "Gráfico no encontrado"})

@app.get("/grafico/ausencias/")
async def obtener_grafico_ausencias():
    ruta = "grafico_anomalias_ausencia_por_empleado.png"
    if os.path.exists(ruta):
        return FileResponse(ruta, media_type="image/png", filename="grafico_ausencias.png")
    return JSONResponse(status_code=404, content={"error": "Gráfico no encontrado"})
