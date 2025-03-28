import pandas as pd
import random
from datetime import datetime, timedelta

# Configuración
num_employees = 10
num_days = 30
start_date = datetime(2025, 3, 1)

nombres = [
    "Juan Pérez", "María Gómez", "Carlos López", "Ana Rodríguez", "Luis Fernández",
    "Sofía Martínez", "Pedro Sánchez", "Laura Díaz", "Jorge Torres", "Lucía Herrera"
]

data = []
registro_id = 1

for emp_id in range(1, num_employees + 1):
    ausencias_consecutivas = 0
    llegadas_tarde_consecutivas = 0
    salidas_tempranas_consecutivas = 0

    for i in range(num_days):
        date = start_date + timedelta(days=i)

        asistencia = random.choices(
            population=["presente", "retraso", "salida_anticipada", "ausente"],
            weights=[65, 15, 10, 10],
            k=1
        )[0]

        # Por defecto todo en cero
        entrada = ""
        salida = ""
        ausente = 0

        # Reset de contadores según el tipo
        if asistencia == "ausente":
            ausente = 1
            ausencias_consecutivas += 1
            llegadas_tarde_consecutivas = 0
            salidas_tempranas_consecutivas = 0
        elif asistencia == "retraso":
            entrada = f"{random.randint(8, 10):02}:{random.choice(['15', '30', '45'])}"
            salida = "17:00"
            ausencias_consecutivas = 0
            llegadas_tarde_consecutivas += 1
            salidas_tempranas_consecutivas = 0
        elif asistencia == "salida_anticipada":
            entrada = f"08:{random.choice(['00', '10'])}"
            salida = f"{random.randint(14, 16):02}:{random.choice(['00', '15', '30'])}"
            ausencias_consecutivas = 0
            llegadas_tarde_consecutivas = 0
            salidas_tempranas_consecutivas += 1
        else:  # presente
            entrada = f"08:{random.choice(['00', '05', '10'])}"
            salida = "17:00"
            ausencias_consecutivas = 0
            llegadas_tarde_consecutivas = 0
            salidas_tempranas_consecutivas = 0

        # Conversión de horas a minutos
        def hora_a_minutos(hora):
            if not hora:
                return 0
            h, m = map(int, hora.split(":"))
            return h * 60 + m

        entrada_min = hora_a_minutos(entrada)
        salida_min = hora_a_minutos(salida)

        data.append({
            "id_registro_asistencia": registro_id,
            "id_empleado": emp_id,
            "nombre_y_apellido_empleado": nombres[emp_id - 1],
            "fecha": date.strftime("%Y-%m-%d"),
            "hora_entrada": entrada,
            "hora_salida": salida,
            "entrada_minutos": entrada_min,
            "salida_minutos": salida_min,
            "ausente": ausente,
            "ausencias_consecutivas": ausencias_consecutivas,
            "llegadas_tarde_consecutivas": llegadas_tarde_consecutivas,
            "salidas_tempranas_consecutivas": salidas_tempranas_consecutivas
        })

        registro_id += 1

# Exportar
df = pd.DataFrame(data)
df.to_csv("dataset_script.csv", index=False)
print("✅ Dataset actualizado con nuevas columnas de comportamiento consecutivo.")
