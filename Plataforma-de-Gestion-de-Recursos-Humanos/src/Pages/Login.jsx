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
    try {
      // Supongamos que la función `login` devuelve un objeto de usuario
      const user = await login(data.email, data.password, data.dni);

      if (user) {
        // Guardamos el DNI en localStorage
        localStorage.setItem("dniConductor", user.user.dni);

        console.log("datos de user:" + user.user.dni);
        console.log(user);

        handleLogin(); // Llamamos al método de contexto de autenticación
        setAlertMessage("Bienvenido");
        navigate("/");
      } else {
        setAlertMessage("Usuario no encontrado");
      }

      setLoading(false);
    } catch (error) {
      setAlertMessage("Error al iniciar sesión: " + error.message);
      setLoading(false);
    }
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

        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>

        {alertMessage && <p className="alert-message">{alertMessage}</p>}
      </form>
    </div>
  );
}

export default Login;