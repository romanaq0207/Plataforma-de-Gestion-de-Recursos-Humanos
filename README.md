# DOCUMENTACIÓN DE LA INVESTIGACIÓN PARA EL TP INICIAL

## Integrantes del equipo:
- Tomas Navarro 
- Facundo Gil
- Román Quevedo 


## Profesores:
- Montero Juan Carlos
- Aragón Evelyn

## Repositorio Github:
https://github.com/romanaq0207/Plataforma-de-Gestion-de-Recursos-Humanos.git

### Ejecutar el Frontend

Para correr el servidor de la aplicación web, deben situarse con la consola de comandos dentro de la carpeta
del proyecto y colocar los siguientes comandos:
> IMPORTANTE: Asumimos que su máquina tiene instalada la última versión de NODE, en caso de no ser así descargarla
  e instalarla en su computadora, [click aqui](https://nodejs.org/en/download)

#### Instalar dependencias


npm install


#### Correr el servidor en localhost


npm run dev


Una vez hecho esto, ir al link que figura en su consola. Por lo general, el servidor se ejecuta en http://localhost:5173/

# Sistema de Detección de Anomalías en Asistencia

Este proyecto utiliza un modelo de *machine learning no supervisado* (`Isolation Forest`) para detectar comportamientos anómalos en la asistencia de empleados. Genera un dataset simulado y luego analiza patrones como ausencias consecutivas, llegadas tarde y salidas tempranas.

## Requisitos

- Python 3.x  
- Paquetes: `pandas`, `matplotlib`, `seaborn`, `scikit-learn`, `openpyxl`

## Para utilizarlo

 Debemos ejecutar el siguiente comando en la consola estando en la carpeta en el directorio Plataforma-de-Gestion-de-Recursos-Humanos\Modelo
```bash
python main.py
```
 Luego seguir los pasos generados en la consola.
