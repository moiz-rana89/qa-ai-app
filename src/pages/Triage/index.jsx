"use client";

import { Navigate, Route, Routes } from "react-router-dom";
import Feed from "./Feed";
import EscalatedPage from "./EscalatedPage";
import GapsPage from "./GapsPage";
import SlaReferencePage from "./SlaReferencePage";
import PlaybookPage from "./PlaybookPage";

export default function TriagePage() {
  return (
    <div className="m-[25px]">
      <Routes>
        <Route index element={<Feed />} />
        <Route path="escalated" element={<EscalatedPage />} />
        <Route path="gaps" element={<GapsPage />} />
        <Route path="sla-reference" element={<SlaReferencePage />} />
        <Route path="playbook" element={<PlaybookPage />} />
        <Route path="*" element={<Navigate to="/triage" replace />} />
      </Routes>
    </div>
  );
}
