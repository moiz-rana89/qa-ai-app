"use client";

import { Icon } from "@iconify/react";

// Persistent amber banner that sits at the top of every Sandbox screen.
// Makes it unmistakable that the user is NOT in the live workflow.
export default function SandboxBanner() {
  return (
    <div className="w-full bg-[#FFF3D8] border-b-2 border-[#F0B400] text-[#7A5A00] px-6 py-3 flex items-center gap-3">
      <Icon
        icon="mdi:test-tube"
        className="text-[#B86E00] text-[22px] shrink-0"
      />
      <div className="flex-1">
        <div className="font-semibold text-[14px] leading-[18px]">
          SANDBOX MODE
        </div>
        <div className="text-[12px] leading-[16px] opacity-90">
          Scores are not recorded in live data — for training and practice only.
        </div>
      </div>
    </div>
  );
}
