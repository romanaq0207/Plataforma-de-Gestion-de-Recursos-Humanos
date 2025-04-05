import React, { useRef, useState } from "react";
import styled from 'styled-components';
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

    const uniqueNames = [...new Set(namesWithAnomaly)];
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

        {/* BOTÓN MODERNO */}
        <StyledWrapper>
          <button className="animated-button" onClick={handleUploadClick}>
            <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
            <span className="text">Ingresar registro de asistencias</span>
            <span className="circle" />
            <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
          </button>
        </StyledWrapper>

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
          Empleados con Anomalías ({anomalies.length})
        </h2>
        <div className="panel-anomalies-grid">
          {anomalies.map((anomaly, i) => (
            <div key={i} className="panel-anomaly-item">
              <img src={avatar} alt={anomaly.name} className="panel-anomaly-img" />
              <h3 className="panel-anomaly-name">{anomaly.name}</h3>
              <button className="fancy-details-button">
                <span>Ver detalles</span>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const StyledWrapper = styled.div`
  margin: 20px 0;

  .animated-button {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 16px 36px;
    border: 4px solid transparent;
    font-size: 16px;
    background-color: inherit;
    border-radius: 100px;
    font-weight: 600;
    color: greenyellow;
    box-shadow: 0 0 0 2px greenyellow;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button svg {
    position: absolute;
    width: 24px;
    fill: greenyellow;
    z-index: 9;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button .arr-1 {
    right: 16px;
  }

  .animated-button .arr-2 {
    left: -25%;
  }

  .animated-button .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background-color: greenyellow;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button .text {
    position: relative;
    z-index: 1;
    transform: translateX(-12px);
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button:hover {
    box-shadow: 0 0 0 12px transparent;
    color: #212121;
    border-radius: 12px;
  }

  .animated-button:hover .arr-1 {
    right: -25%;
  }

  .animated-button:hover .arr-2 {
    left: 16px;
  }

  .animated-button:hover .text {
    transform: translateX(12px);
  }

  .animated-button:hover svg {
    fill: #212121;
  }

  .animated-button:active {
    scale: 0.95;
    box-shadow: 0 0 0 4px greenyellow;
  }

  .animated-button:hover .circle {
    width: 320px;
    height: 220px;
    opacity: 1;
  }
`;

export default Panel;
