import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Panel from "./Pages/Panel"; // Importar la nueva página

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="*" element={<Navigate to="/login" />} /> {/* Redirección por defecto */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
