// App.jsx
import React, { useState } from "react";

function App() {
  const [fileName, setFileName] = useState("");
  const [dataCount, setDataCount] = useState(null);
  const [anomalyCount, setAnomalyCount] = useState(null);
  const [nonAnomalyCount, setNonAnomalyCount] = useState(null);
  const [anomalies, setAnomalies] = useState([]);
  const [error, setError] = useState("");

  const isValidExtension = (fileName) => {
    return /\.(csv|xls|xlsx)$/i.test(fileName);
  };

  const enviarArchivoAlBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/analizar", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al procesar archivo");

      const resultado = await response.json();
      setDataCount(resultado.total);
      setAnomalyCount(resultado.anomalías);
      setNonAnomalyCount(resultado.normales);
      setAnomalies(resultado.empleados.map(name => ({ name })));
    } catch (err) {
      console.error(err);
      setError("Hubo un error al procesar el archivo");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && isValidExtension(file.name)) {
      setFileName(file.name);
      setError("");
      enviarArchivoAlBackend(file);
    } else {
      setError("El archivo debe tener extensión .csv, .xls o .xlsx");
      setFileName("");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <input type="file" onChange={handleFileUpload} />
      {error && <div className="text-red-500">{error}</div>}
      {fileName && (
        <div className="mt-2">
          <p className="text-gray-600">Archivo cargado: {fileName}</p>
        </div>
      )}
      {dataCount !== null && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <p>Total de registros: {dataCount}</p>
          <p>Registros normales: {nonAnomalyCount}</p>
          <p>Registros anómalos: {anomalyCount}</p>
        </div>
      )}
      {anomalies.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Empleados con anomalías:</h3>
          <ul className="list-disc ml-6">
            {anomalies.map((anomaly, index) => (
              <li key={index}>{anomaly.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
