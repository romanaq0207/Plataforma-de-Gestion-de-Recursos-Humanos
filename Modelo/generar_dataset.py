import pandas as pd
import random
from datetime import datetime, timedelta
import os


def generar_dataset():
    num_employees = 20
    num_days = 30
    start_date = datetime(2025, 3, 1)

    nombres = [
        "Juan Pérez", "María Gómez", "Carlos López", "Ana Rodríguez", "Luis Fernández",
        "Sofía Martínez", "Pedro Sánchez", "Laura Díaz", "Jorge Torres", "Lucía Herrera",
        "Valentina Morales", "Mateo Ruiz", "Camila Castro", "Sebastián Vega", "Martina Navarro",
        "Benjamín Ortega", "Emilia Paredes", "Tomás Aguirre", "Isabella Ríos", "Santiago Romero"
    ]

    def generar_pesos_logicos():
        presente = random.randint(40, 70)
        restante = 100 - presente
        retraso = random.randint(0, restante)
        restante -= retraso
        salida_anticipada = random.randint(0, restante)
        ausente = 100 - (presente + retraso + salida_anticipada)
        return [presente, retraso, salida_anticipada, ausente]

    data = []
    registro_id = 1

    for emp_id in range(1, num_employees + 1):
        ausencias_consecutivas = 0
        llegadas_tarde_consecutivas = 0
        salidas_tempranas_consecutivas = 0

        pesos = generar_pesos_logicos()

        for i in range(num_days):
            date = start_date + timedelta(days=i)
            asistencia = random.choices(
                population=["presente", "retraso", "salida_anticipada", "ausente"],
                weights=pesos,
                k=1
            )[0]

            entrada = ""
            salida = ""
            ausente = 0

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
            else:
                entrada = f"08:{random.choice(['00', '05', '10'])}"
                salida = "17:00"
                ausencias_consecutivas = 0
                llegadas_tarde_consecutivas = 0
                salidas_tempranas_consecutivas = 0

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

    df = pd.DataFrame(data)
    ruta = os.path.abspath("dataset_generado.csv")
    df.to_csv(ruta, index=False)
    return ruta
