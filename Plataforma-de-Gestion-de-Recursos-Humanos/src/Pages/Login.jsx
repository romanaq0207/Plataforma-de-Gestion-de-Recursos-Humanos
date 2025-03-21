import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import { AuthContext } from "../Context/AuthContext";
import "./Login.css";


function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { handleLogin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    
    // Simulación de éxito sin verificar usuario
    setTimeout(() => {
      setAlertMessage("Bienvenido");
      navigate("/dashboard"); // Cambia "/dashboard" por la ruta que usarás en el futuro
      setLoading(false);
    }, 1000);
  };
  

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Ingrese un email válido",
              },
            })}
            placeholder="Ingrese su email"
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "Debe tener al menos 6 caracteres",
              },
            })}
            placeholder="Ingrese su contraseña"
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>

        <button className="button" type="submit" disabled={loading}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
            <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
          </svg>
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>

        {alertMessage && <p className="alert-message">{alertMessage}</p>}
      </form>
    </div>
  );
}

export default Login;