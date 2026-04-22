import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppProvider";
import Layout from "./components/Layout";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/user" replace />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
}
