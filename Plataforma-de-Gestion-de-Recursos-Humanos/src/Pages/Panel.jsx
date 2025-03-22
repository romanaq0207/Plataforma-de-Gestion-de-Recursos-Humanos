import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDownload,
  FaCheckCircle,
  FaTimesCircle,
  FaFileUpload,
  FaFileExcel,
} from "react-icons/fa";
import avatar from "./Images/user-avatar.png";
import "./Panel.css";

const Panel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="panel-container">
      {/* Sidebar */}
      <aside className="panel-sidebar">
        <div className="panel-user-avatar">
          <img src={avatar} alt="User" />
        </div>
        <h2 className="panel-user-name">User</h2>

        <div className="panel-recent-list">
          <h3 className="panel-title">Análisis recientes</h3>
          <ul>
            {["18/03/2025", "12/03/2025", "03/02/2025", "02/01/2025"].map(
              (date, index) => (
                <li key={index} className="panel-recent-item">
                  <FaDownload className="panel-icon-blue" />
                  <span>{date}</span>
                  {index < 2 ? (
                    <FaCheckCircle className="panel-icon-check" />
                  ) : (
                    <FaTimesCircle className="panel-icon-error" />
                  )}
                </li>
              )
            )}
          </ul>
        </div>

        <button className="panel-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="panel-main">
        <h1 className="panel-title">Sube el archivo aquí</h1>
        <button className="panel-upload-btn">Descargar archivo de ejemplo</button>

        {/* Sección de estadísticas */}
        <div className="panel-stats">
          <div className="panel-stat-item">
            <FaFileUpload className="panel-icon-blue" />
            <span>Datos procesados (123)</span>
          </div>
          <div className="panel-stat-item">
            <FaCheckCircle className="panel-icon-green" />
            <span>Sin anomalías (88)</span>
          </div>
          <div className="panel-stat-item">
            <FaTimesCircle className="panel-icon-yellow" />
            <span>Posibles anomalías (2)</span>
          </div>
          <div className="panel-stat-item">
            <FaTimesCircle className="panel-icon-red" />
            <span>Anomalías (23)</span>
          </div>
          <button className="panel-export-btn">
            <FaFileExcel />
            <span>Exportar</span>
          </button>
        </div>

        {/* Sección de anomalías */}
        <h2 className="panel-anomalies-title">Anomalías (23)</h2>
        <div className="panel-anomalies-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="panel-anomaly-item">
              <img src={avatar} alt="User" className="panel-anomaly-img" />
              <h3 className="panel-anomaly-name">Roman Quevedo</h3>
              <span className="panel-anomaly-dept">Dto. Informática</span>
              <button className="panel-details-btn">Ver detalles</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Panel;
