import AntDTable from "../../../components/AntDTable";
import { humanizeMetric } from "../helpers";

// Renders any value generically and recursively — a plain object
// becomes a key/value block, an array of objects becomes a table, an
// array of primitives becomes a comma list, and a nested object at any
// depth renders as its own nested key/value block instead of
// stringifying to "[object Object]" (what a single non-recursive pass
// did before). Shared by the Gaps and SLA Reference pages, since
// neither endpoint's exact row/field shapes are pinned down by the
// spec — this degrades gracefully instead of assuming a shape that
// might not match what the backend actually sends.
export default function renderGenericValue(value, depth = 0) {
  if (value == null || value === "") {
    return <span className="text-[#7F8A92]">—</span>;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-[#7F8A92]">None.</span>;
    if (typeof value[0] === "object" && value[0] !== null) {
      const columns = Object.keys(value[0]).map((key) => ({
        title: humanizeMetric(key),
        dataIndex: key,
        key,
        disableSort: true,
        render: (v) => renderGenericValue(v, depth + 1),
      }));
      return (
        <AntDTable
          columns={columns}
          data={value}
          rowKey={columns[0]?.dataIndex}
          pagination={false}
        />
      );
    }
    return <span>{value.join(", ")}</span>;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value);
    return (
      <div className={depth > 0 ? "space-y-1" : "grid grid-cols-2 gap-2"}>
        {entries.map(([k, v]) => (
          <div
            key={k}
            className={
              depth > 0
                ? "flex items-start justify-between gap-3 text-[12px]"
                : "bg-[#F8FAFA] rounded-[10px] p-2"
            }
          >
            <div className={depth > 0 ? "text-[#7F8A92]" : "text-[11px] text-[#7F8A92]"}>
              {humanizeMetric(k)}
            </div>
            <div
              className={
                depth > 0
                  ? "text-[#163143] font-medium text-right"
                  : "text-[13px] text-[#163143]"
              }
            >
              {renderGenericValue(v, depth + 1)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <span>{String(value)}</span>;
}
