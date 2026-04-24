"use client";

import { Icon } from "@iconify/react";

const SHARE_URL = "https://forms.gle/JoKyJoQMyEXGnaSc6";

export default function GoogleFormEmbed() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="pt-7 pl-8 pb-5 flex items-center">
        <span className="text-2xl font-semibold text-[#163143]">
          Client Bonus Request Form
        </span>
        <a
          href={SHARE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto mr-8 inline-flex items-center gap-2 px-4 py-[8px] rounded-full text-[13px] font-semibold text-white bg-[#69C920] hover:bg-[#5ab61c] transition-all"
        >
          <Icon icon="mdi:open-in-new" className="text-[16px]" />
          Open in new tab
        </a>
      </div>
      <div className="flex-1 px-8 pb-8">
        <div className="w-full h-full bg-white rounded-[16px] border border-[#D7E6E7] overflow-hidden">
          <iframe
            src={SHARE_URL}
            title="Client Bonus Request Form"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            style={{ minHeight: "calc(100vh - 180px)", border: "none" }}
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
}
