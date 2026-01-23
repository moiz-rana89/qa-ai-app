"use client";

import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F8FB]">
      <div className="text-center">
        <Icon
          icon="tabler:lock"
          className="text-6xl text-[#FF6B6B] mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-[#163143] mb-2">
          Access Denied
        </h1>
        <p className="text-[#666] mb-6">
          You don't have permission to access this page.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-[#163143] text-white rounded-lg hover:bg-[#0f1f2a] transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
