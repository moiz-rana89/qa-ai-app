import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import EvaluateTickets from "../pages/EvaluateTickets";
import { EvaluteForm } from "../pages/EvaluateTickets/EvaluteForm";
import FormsManagement from "../pages/FormsManagement";
import LoginPage from "../pages/LoginPage";
import { setIsAuthAction } from "../reduxStore/action/auth";
import FullWidthLayout from "./FullWidthLayout";
import MainLayout from "./MainLayout";
import ProtectedRoute from "./ProtectedRoute";
export default function AppRouter() {
  const dispatch = useDispatch();
  const { isAuthInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("user_details");

    dispatch(setIsAuthAction(!!(token && user)));
  }, [dispatch]);

  // BLOCK routing until auth is ready
  if (!isAuthInitialized) {
    return null; // or a spinner
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/evaluate-tickets" element={<EvaluateTickets />} />
          <Route path="/forms-management" element={<FormsManagement />} />
        </Route>

        <Route path="*" element={<Navigate to="/forms-management" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
