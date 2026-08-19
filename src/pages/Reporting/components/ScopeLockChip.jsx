import { Icon } from "@iconify/react";

// A locked, non-removable filter chip — shown in place of the normal
// UnifiedDropdown for whichever field a Team Lead/OM/CSM is scoped to.
// There is no "disabled" variant of UnifiedDropdown to reuse (confirmed via
// research), so this is deliberately a separate, simpler component rather
// than a dropdown someone could still try to click.
export default function ScopeLockChip({ label, name }) {
  return (
    <div className="h-9 px-4 rounded-full border border-[#D7E6E7] bg-[#F1F5F5] flex items-center gap-2 text-[14px]">
      <Icon icon="mdi:lock-outline" className="text-[#7F8A92]" fontSize={16} />
      <span className="text-[#7F8A92]">{label}:</span>
      <span className="font-medium text-[#163143]">{name || "—"}</span>
    </div>
  );
}
