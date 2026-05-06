import { useState } from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import Api from "../../reduxStore/lib/api";

export default function HubspotRoster() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const result = await Api.get("/workforce/reports/hubspot-roster");
      const blob = result?.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `hubspot_roster_${new Date().toISOString().slice(0, 10).replace(/-/g, "")}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      toast.error("Failed to download Hubspot Roster. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-8">
      <div className="text-[#163143] text-[24px] font-semibold">
        Hubspot Roster
      </div>

      <p className="text-[#163143] text-[14px] mt-4 mb-2">
        Download the current Hubspot roster as a CSV file.
      </p>
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className={`mt-4 flex items-center gap-2 w-fit min-h-[40px] px-6 text-[14px] font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#61BF19] focus:ring-offset-2 ${
          loading
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-[#69C920] hover:bg-[#5CB518] text-white"
        }`}
      >
        <Icon icon="material-symbols:download-rounded" className="text-[18px]" />
        {loading ? "Downloading..." : "Download CSV"}
      </button>
    </div>
  );
}
