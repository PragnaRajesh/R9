import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import App from "./App.tsx";
import AddCandidatePage from "./components/AddCandidatePage";
import AddClientPage from "./components/AddClientPage";
import AddRecruiterPage from "./components/AddRecruiterPage";
import "./index.css";

function AddCandidateRoute() {
  const navigate = useNavigate();
  return <AddCandidatePage onBack={() => navigate(-1)} />;
}
function AddClientRoute() {
  const navigate = useNavigate();
  return <AddClientPage onBack={() => navigate(-1)} />;
}
function AddRecruiterRoute() {
  const navigate = useNavigate();
  return <AddRecruiterPage onBack={() => navigate(-1)} />;
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/add-candidate" element={<AddCandidateRoute />} />
      <Route path="/add-client" element={<AddClientRoute />} />
      <Route path="/add-recruiter" element={<AddRecruiterRoute />} />
    </Routes>
  </BrowserRouter>
);
