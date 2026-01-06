import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import EvaluateTickets from "../pages/EvaluateTickets";
import { EvaluteForm } from "../pages/EvaluateTickets/EvaluteForm";
import FormsManagement from "../pages/FormsManagement";
import MainLayout from "./MainLayout";
import FullWidthLayout from "./FullWidthLayout";
import ProtectedRoute from "./ProtectedRoute";
import { setIsAuthAction } from "../reduxStore/action/auth";

export default function AppRouter() {
  const dispatch = useDispatch();
  const { isAuthInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("user_details");

    dispatch(setIsAuthAction(!!(token && user)));
  }, [dispatch]);

  // Prevent route evaluation before auth init
  if (!isAuthInitialized) {
    return null; // or loader
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* WITH SIDEBAR */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/evaluate-tickets" element={<EvaluateTickets />} />
          <Route path="/forms-management" element={<FormsManagement />} />
          <Route path="/shadowing-form" element={<div />} />
        </Route>

        {/* WITHOUT SIDEBAR */}
        <Route
          element={
            <ProtectedRoute>
              <FullWidthLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/evalute-form" element={<EvaluteForm />} />
        </Route>

        <Route path="*" element={<Navigate to="/forms-management" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
