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
  const { isAuthenticated } = useSelector((store) => store?.auth);
  const dispatch = useDispatch();
  const login = false;
  const currentlocation = window.location.pathname;
  useEffect(() => {
    if (
      localStorage.getItem("auth_token") &&
      localStorage.getItem("user_details")
    ) {
      dispatch(setIsAuthAction(true));
    }
  }, [currentlocation]);
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Sidebar Layout */}
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

        {/* Full Width Layout */}
        <Route
          element={
            <ProtectedRoute>
              <FullWidthLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/evalute-form" element={<EvaluteForm />} />
        </Route>

        {/* Default */}
        <Route path="*" element={<Navigate to="/forms-management" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
