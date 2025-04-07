import subprocess
from generar_dataset import generar_dataset
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from model import procesar_archivo
import os

app = Flask(__name__, static_folder="../frontend/build", static_url_path="/")

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, "index.html")
CORS(app)

@app.route('/generar-dataset', methods=['GET'])
def generar_dataset_endpoint():
    try:
        ruta_archivo = generar_dataset()
        return send_file(ruta_archivo, as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/procesar', methods=['POST'])
def procesar():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No se recibió ningún archivo.'}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'El archivo no tiene nombre.'}), 400
        filename = file.filename
        ext = os.path.splitext(filename)[-1].lower()
        file_path = f"archivo_subido{ext}"
        file.save(file_path)
        empleados, total_anomalias, total_registros, tabla = procesar_archivo(file_path)

        return jsonify({
            "nombres_con_anomalias": empleados,
            "total_anomalias": total_anomalias,
            "total_registros": total_registros,
            "excel_file_url": "http://localhost:5000/descargar-excel",
            "grafico_1_url": "http://localhost:5000/grafico/horarios",
            "grafico_2_url": "http://localhost:5000/grafico/ausencias",
            "tabla_resultados": tabla
        })

    except Exception as e:
        print("❌ Error en /procesar:")
        traceback.print_exc()
        return jsonify({"error": f"Error interno al procesar el archivo: {str(e)}"}), 500
    
@app.route('/descargar-excel', methods=['GET'])
def descargar_excel():
    return send_file("resultados.xlsx", as_attachment=True)

@app.route('/grafico/horarios', methods=['GET'])
def grafico_horarios():
    return send_file("grafico_con_normales_y_anomalias_horario.png", mimetype='image/png')

@app.route('/grafico/ausencias', methods=['GET'])
def grafico_ausencias():
    return send_file("grafico_anomalias_ausencia_por_empleado.png", mimetype='image/png')
    
if __name__ == '__main__':
    app.run()