// Panel.js
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  FaDownload,
  FaCheckCircle,
  FaTimesCircle,
  FaFileUpload,
  FaChartLine,
  FaUserClock,
} from "react-icons/fa";
import avatar from "./Images/user-avatar.png";
import femaleAvatar from "./Images/female-avatar.webp";
import "./Panel.css";

const Panel = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [dataCount, setDataCount] = useState(0);
  const [anomalyCount, setAnomalyCount] = useState(0);
  const [nonAnomalyCount, setNonAnomalyCount] = useState(0);
  const [anomalies, setAnomalies] = useState([]);
  const [tablaResultados, setTablaResultados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const resultadosPorPagina = 5;

  const [error, setError] = useState("");
  const [excelUrl, setExcelUrl] = useState(null);
  const [grafico1, setGrafico1] = useState(null);
  const [grafico2, setGrafico2] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPaginas = Math.ceil(tablaResultados.length / resultadosPorPagina);
  const indiceInicio = (paginaActual - 1) * resultadosPorPagina;
  const indiceFin = indiceInicio + resultadosPorPagina;
  const resultadosPaginados = tablaResultados.slice(indiceInicio, indiceFin);


  const headers = {
    anomalia: ".",
    anomaly_legenda: "Tipo de Anomalía",
    ausente: "¿Ausente?",
    fecha: "Fecha",
    hora_entrada: "Entrada",
    hora_salida: "Salida",
    id_empleado: "ID Empleado",
    id_registro_asistencia: "ID Registro",
    motivo_anomalia: "Motivo",
    nombre_y_apellido_empleado: "Empleado"
  };

  const handleLogout = () => navigate("/login");
  const handleOpenModal = (imageUrl) => {
    setModalImage(imageUrl);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage("");
  };

  const handleUploadClick = () => fileInputRef.current.click();

  const isValidExtension = (fileName) => {
    const allowedExtensions = [".csv", ".xls", ".xlsx"];
    return allowedExtensions.some((ext) => fileName.endsWith(ext));
  };

  const isFemale = (name) => {
    const femaleNames = ["María", "Ana", "Sofía", "Laura", "Lucía", "Camila", "Valentina", "Martina", "Emilia", "Isabella"];
    return femaleNames.some((f) => name.toLowerCase().includes(f.toLowerCase()));
  };

  const generarArchivoAsistencias = async () => {
    try {
      const response = await fetch("http://localhost:5000/generar-dataset");
      if (!response.ok) throw new Error("No se pudo generar el archivo");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "dataset_generado.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar el archivo:", error);
      alert("Error al generar el archivo de asistencias.");
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file && isValidExtension(file.name)) {
      setFileName(file.name);
      setError("");
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:5000/procesar", {
          method: "POST",
          body: formData,
        });

        const text = await response.text();
        console.log("📦 Respuesta del backend:", text);

        if (!response.ok) {
          throw new Error(JSON.parse(text).error || "Error del servidor");
        }

        const result = JSON.parse(text);

        const names = result.nombres_con_anomalias || [];
        const uniqueAnomalies = [...new Set(names)].map((name) => ({ name }));

        setDataCount(result.total_registros || 0);
        setAnomalyCount(result.total_anomalias || names.length);
        setNonAnomalyCount(
          result.total_registros - (result.total_anomalias || 0)
        );
        setAnomalies(uniqueAnomalies);
        const soloAnomalias = (result.tabla_resultados || []).filter(
          (r) => r.anomalia === "Anomalía"
        );
        setTablaResultados(soloAnomalias);
        setExcelUrl(result.excel_file_url);
        setGrafico1(result.grafico_1_url);
        setGrafico2(result.grafico_2_url);
      } catch (err) {
        console.error("❌ Error al procesar:", err);

        if (err.message.includes("Failed to fetch")) {
          setError("No se pudo conectar con el servidor. ¿Está encendido?");
        } else if (err.message.includes("Formato de archivo no soportado")) {
          setError("El archivo no tiene un formato válido. Solo .csv o .xlsx.");
        } else {
          setError(err.message || "Error inesperado al procesar el archivo.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setError("Formato inválido. Solo se aceptan archivos .csv, .xls, .xlsx");
      setFileName("");
    }
  };

  return (
    <div className="panel-container">
      <aside className="panel-sidebar">
        <div className="panel-user-avatar">
          <img src={avatar} alt="Usuario" />
        </div>
        <h2 className="panel-user-name">Cristian Ciarallo</h2>
        <button className="panel-logout" onClick={handleLogout}>Cerrar sesión</button>
      </aside>

      <main className="panel-main">
        <h1 className="panel-title">Control de Asistencias</h1>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".csv, .xls, .xlsx"
          onChange={handleFileUpload}
        />

        <StyledWrapper>
          <button className="animated-button" onClick={handleUploadClick}>
            <span className="text">Ingresar registro de asistencias</span>
            <span className="circle" />
          </button>
        </StyledWrapper>

        <div className="panel-downloads">
          <button className="panel-start-btn" onClick={generarArchivoAsistencias}>
            <FaDownload /> Generar archivo de asistencias
          </button>
        </div>

        {fileName && <p className="panel-file-name">Archivo seleccionado: {fileName}</p>}
        {error && <p className="panel-error">{error}</p>}

        {loading && (
          <div className="loader-overlay">
            <div className="loader" />
            <p>Procesando el modelo, por favor espera...</p>
          </div>
        )}

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

        {tablaResultados.length === 0 && !loading && (
          <p style={{ marginTop: 20, color: "#ccc" }}>
            No se detectaron anomalías en el archivo cargado.
          </p>
        )}

        {tablaResultados.length > 0 && (
          <>
            <h2 className="panel-anomalies-title">Anomalías detectadas</h2>

            <div className="tabla-actions">
              {excelUrl && (
                <button className="panel-start-btn" onClick={() => window.open(excelUrl, "_blank")}>
                  <FaDownload /> Descargar resultados Excel
                </button>
              )}
              {grafico1 && (
                <button className="panel-start-btn" onClick={() => handleOpenModal(grafico1)}>
                  <FaChartLine /> Ver gráfico de horarios
                </button>
              )}
              {grafico2 && (
                <button className="panel-start-btn" onClick={() => handleOpenModal(grafico2)}>
                  <FaUserClock /> Ver gráfico de ausencias
                </button>
              )}
            </div>

            <div className="table-container">
              <table className="result-table">
                <thead>
                  <tr>
                    {Object.keys(tablaResultados[0]).map((key, i) => (
                      <th key={i}>{headers[key] || key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {resultadosPaginados.map((fila, i) => (
                    <tr key={i}>
                      {Object.keys(fila).map((key, j) => (
                        <td key={j}>{fila[key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination">
                {Array.from({ length: totalPaginas }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPaginaActual(i + 1)}
                    className={paginaActual === i + 1 ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <h2 className="panel-anomalies-title">
          Empleados con Anomalías ({anomalies.length})
        </h2>
        <div className="panel-anomalies-grid">
          {anomalies.map((anomaly, i) => (
            <div key={i} className="panel-anomaly-item">
              <img
                src={isFemale(anomaly.name) ? femaleAvatar : avatar}
                alt={anomaly.name}
                className="panel-anomaly-img"
              />
              <h3 className="panel-anomaly-name">{anomaly.name}</h3>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img src={modalImage} alt="Gráfico" className="modal-image" />
              <div className="modal-actions">
                <button onClick={() => window.open(modalImage, "_blank")}>Abrir en nueva pestaña</button>
                <button onClick={handleCloseModal}>Cerrar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const StyledWrapper = styled.div`
  margin: 20px 0;
  .animated-button {
    position: relative;
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
  .animated-button:hover {
    box-shadow: 0 0 0 12px transparent;
    color: #212121;
    border-radius: 12px;
    background-color: greenyellow;
  }
  .animated-button:active {
    transform: scale(0.95);
  }
`;

export default Panel;