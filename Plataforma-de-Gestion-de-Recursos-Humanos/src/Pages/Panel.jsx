import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDownload,
  FaCheckCircle,
  FaTimesCircle,
  FaFileUpload,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import avatar from "./Images/user-avatar.png";
import "./Panel.css";

const Panel = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [dataCount, setDataCount] = useState(0);
  const [anomalyCount, setAnomalyCount] = useState(0);
  const [nonAnomalyCount, setNonAnomalyCount] = useState(0);
  const [anomalies, setAnomalies] = useState([]);
  const [error, setError] = useState("");

  const handleLogout = () => navigate("/login");

  const handleUploadClick = () => fileInputRef.current.click();

  const isValidExtension = (fileName) => {
    const allowedExtensions = [".csv", ".xls", ".xlsx"];
    return allowedExtensions.some((ext) => fileName.endsWith(ext));
  };

  const processData = (jsonData) => {
    const total = jsonData.length;
    const filtered = jsonData.filter(
      (row) =>
        row.anomalia &&
        typeof row.anomalia === "string" &&
        row.anomalia.toLowerCase().includes("anomalía")
    );

    const namesWithAnomaly = filtered.map(
      (row) => row.nombre_y_apellido_empleado || row.Nombre || "Nombre no disponible"
    );

    // Filtrar nombres únicos
    const uniqueNames = [...new Set(namesWithAnomaly)];

    // Convertimos a objetos para mostrar
    const uniqueAnomalies = uniqueNames.map((name) => ({ name }));

    setDataCount(total);
    setAnomalyCount(filtered.length);
    setNonAnomalyCount(total - filtered.length);
    setAnomalies(uniqueAnomalies);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && isValidExtension(file.name)) {
      setFileName(file.name);
      setError("");

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        processData(jsonData);
      };

      reader.readAsArrayBuffer(file);
    } else {
      setError("El archivo debe tener extensión .csv, .xls o .xlsx");
      setFileName("");
    }
  };

  const handleStart = () => {
    if (!fileName) {
      setError("Por favor, selecciona un archivo antes de comenzar.");
      return;
    }
    // Procesamiento ya realizado al cargar el archivo
  };

  return (
    <div className="panel-container">
      {/* Sidebar */}
      <aside className="panel-sidebar">
        <div className="panel-user-avatar">
          <img src={avatar} alt="Usuario" />
        </div>
        <h2 className="panel-user-name">Cristian Ciarallo</h2>

        <button className="panel-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="panel-main">
        <h1 className="panel-title">Control de Asistencias</h1>

        {/* Subir archivo */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".csv, .xls, .xlsx"
          onChange={handleFileUpload}
        />
        <button className="panel-upload-btn" onClick={handleUploadClick}>
          Ingresar registro de asistencias
        </button>
        {fileName && (
          <p className="panel-file-name">Archivo seleccionado: {fileName}</p>
        )}
        {error && <p className="panel-error">{error}</p>}

        {/* Estadísticas */}
        <div className="panel-stats">
          <div className="panel-stat-item">
            <FaFileUpload className="panel-icon-blue" />
            <span>Datos procesados ({dataCount})</span>
          </div>
          <div className="panel-stat-item">
            <FaCheckCircle className="panel-icon-green" />
            <span>Sin anomalías ({nonAnomalyCount})</span>
          </div>
          <div className="panel-stat-item">
            <FaTimesCircle className="panel-icon-red" />
            <span>Anomalías ({anomalyCount})</span>
          </div>
        </div>

        {/* Lista de anomalías */}
        <h2 className="panel-anomalies-title">
          Empleados con Anomalías  ({anomalies.length})
        </h2>
        <div className="panel-anomalies-grid">
          {anomalies.map((anomaly, i) => (
            <div key={i} className="panel-anomaly-item">
              <img
                src={avatar}
                alt={anomaly.name}
                className="panel-anomaly-img"
              />
              <h3 className="panel-anomaly-name">{anomaly.name}</h3>
              <button className="panel-details-btn">Ver detalles</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Panel;
