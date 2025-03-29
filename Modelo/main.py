import os
import subprocess
import sys


def instalar_requirements():
    print("\n\033[93m[ Instalando dependencias... ]\033[0m\n")
    subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])


def ejecutar_generar_dataset():
    print("\n\033[96m[ Generando dataset... ]\033[0m\n")
    subprocess.run([sys.executable, "generar_dataset.py"])


def ejecutar_modelo():
    print("\n\033[95m[ Ejecutando modelo de anomalías... ]\033[0m\n")
    subprocess.run([sys.executable, "model.py"])


def menu():
    while True:
        print("\n\033[1m=== Sistema de Análisis de Asistencias ===\033[0m")
        print("0 - Instalar dependencias")
        print("1 - Generar dataset")
        print("2 - Ejecutar Modelo")
        print("3 - Salir")

        opcion = input("\nSelecciona una opción: ")

        if opcion == "0":
            instalar_requirements()
        elif opcion == "1":
            ejecutar_generar_dataset()
        elif opcion == "2":
            ejecutar_modelo()
        elif opcion == "3":
            print("\n🚩 Saliendo del sistema.\n")
            break
        else:
            print("\n\033[91mOpción no válida. Intenta de nuevo.\033[0m")


if __name__ == "__main__":
    menu()
