"use client";

import { Navigate, Route, Routes } from "react-router-dom";
import Overview from "./Overview";
import ClientsPage from "./ClientsPage";
import FormDetail from "./FormDetail";

export default function QAFormCoveragePage() {
  return (
    <div className="m-[25px]">
      <Routes>
        <Route index element={<Overview />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="forms/:formId" element={<FormDetail />} />
        <Route path="*" element={<Navigate to="/qa-form-coverage" replace />} />
      </Routes>
    </div>
  );
}
