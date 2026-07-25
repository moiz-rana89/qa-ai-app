"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import dayjs from "dayjs";

import AntDTable from "../../components/AntDTable";
import Skeleton from "../../components/Skeleton";
import UnifiedDropdown from "../../components/Dropdown/UnifiedDropdown";
import DownloadCSVButton from "../../components/Buttons/DownloadCSVButton";
import {
  getRosterClients,
  getRosterAgents,
  getRosterCsms,
  getRosterOms,
  getRosterTeamLeads,
  getRemoteMembersRoster,
  downloadRemoteMembersRosterCsv,
} from "../../reduxStore/action/hubspotRoster";

export default function HubspotRoster() {
  const dispatch = useDispatch();

  // ── Dropdown source data ────────────────────────────────────────────────
  const [clientOpts, setClientOpts] = useState([]);
  const [agentOpts, setAgentOpts] = useState([]);
  const [csmOpts, setCsmOpts] = useState([]);
  const [omOpts, setOmOpts] = useState([]);
  const [tlOpts, setTlOpts] = useState([]);

  const [loadingClients, setLoadingClients] = useState(false);
  const [loadingAgents, setLoadingAgents] = useState(false);
  const [loadingCsms, setLoadingCsms] = useState(false);
  const [loadingOms, setLoadingOms] = useState(false);
  const [loadingTls, setLoadingTls] = useState(false);

  // ── Filter selections (live — no Apply button, matches attendance pattern) ─
  const [clientsFilter, setClientsFilter] = useState();
  const [agentsFilter, setAgentsFilter] = useState();
  const [csmsFilter, setCsmsFilter] = useState();
  const [omsFilter, setOmsFilter] = useState();
  const [tlsFilter, setTlsFilter] = useState();

  // ── Table state ─────────────────────────────────────────────────────────
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [sorting, setSorting] = useState({
    sort_by: "user_name",
    sort_order: "ascend",
  });

  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // ── Load all dropdowns once on mount ────────────────────────────────────
  useEffect(() => {
    setLoadingClients(true);
    setLoadingAgents(true);
    setLoadingCsms(true);
    setLoadingOms(true);
    setLoadingTls(true);

    dispatch(
      getRosterClients((ok, d) => {
        if (ok) setClientOpts(d || []);
        setLoadingClients(false);
      })
    );
    dispatch(
      getRosterAgents((ok, d) => {
        if (ok) setAgentOpts(d || []);
        setLoadingAgents(false);
      })
    );
    dispatch(
      getRosterCsms((ok, d) => {
        if (ok) setCsmOpts(d || []);
        setLoadingCsms(false);
      })
    );
    dispatch(
      getRosterOms((ok, d) => {
        if (ok) setOmOpts(d || []);
        setLoadingOms(false);
      })
    );
    dispatch(
      getRosterTeamLeads((ok, d) => {
        if (ok) setTlOpts(d || []);
        setLoadingTls(false);
      })
    );
  }, [dispatch]);

  // ── Build common API params from current filter selections ─────────────
  // Field names match the attendance dropdown response shapes:
  //   clients   → { client, client_id }              from /reports/get_client_names
  //   agents    → { user_id, user_name }             from /get-team-members-filter
  //   TLs       → { teamleads, teamlead_id }         from /reports/get_teamlead_names
  //   CSMs      → { csm, csm_id }                    from /reports/get_csm_names
  //   OMs       → { operations_manager, operations_manager_id }
  //                                                   from /reports/get_om_names
  //   Sr CSMs   → { senior_csm, senior_csm_id }      from /workforce/reports/awd-filter-senior-csm
  const buildBaseParams = () => ({
    client_id: clientsFilter?.map((c) => c.client_id),
    agent_id: agentsFilter?.map((a) => a.user_id),
    csm_id: csmsFilter?.map((c) => c.csm_id),
    om_id: omsFilter?.map((o) => o.operations_manager_id),
    tl_id: tlsFilter?.map((t) => t.teamlead_id),
  });

  // ── Fetch (live — fires on any filter / pagination / sort change) ──────
  const fetchData = () => {
    const apiParams = {
      ...buildBaseParams(),
      page,
      size,
      sort_by: sorting.sort_by,
      sort_order: sorting.sort_order === "ascend" ? "asc" : "desc",
    };
    setLoading(true);
    dispatch(
      getRemoteMembersRoster(apiParams, (success, data) => {
        if (success) {
          setRows(data?.data || []);
          setTotal(data?.pagination?.total_records || 0);
        } else {
          setRows([]);
          setTotal(0);
          toast.error(
            data?.data?.detail ||
              data?.message ||
              "Failed to load remote members roster."
          );
        }
        setLoading(false);
      })
    );
  };

  // Reset to page 1 whenever any filter changes (so user doesn't land on
  // an empty page after a filter narrows the result set).
  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsFilter, agentsFilter, csmsFilter, omsFilter, tlsFilter]);

  // Live fetch on filter / pagination / sort changes (and initial mount)
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    clientsFilter,
    agentsFilter,
    csmsFilter,
    omsFilter,
    tlsFilter,
    page,
    size,
    sorting.sort_by,
    sorting.sort_order,
  ]);

  // ── CSV download ────────────────────────────────────────────────────────
  const handleCSVDownload = () => {
    if (downloading) return;
    setDownloading(true);
    dispatch(
      downloadRemoteMembersRosterCsv(buildBaseParams(), (success) => {
        if (success) {
          toast.success("CSV downloaded");
        } else {
          toast.error("Failed to download CSV. Please try again.");
        }
        setDownloading(false);
      })
    );
  };

  // ── Table columns ───────────────────────────────────────────────────────
  const renderText = (val) => (val ? val : "—");

  const columns = [
    {
      title: "Ticket Create Date",
      dataIndex: "ticket_create_date",
      key: "ticket_create_date",
      width: 160,
      render: (_, r) => {
        const d = r["Ticket Create Date"];
        return d ? dayjs(d).format("MMM D, YYYY") : "—";
      },
    },
    {
      title: "Hubstaff ID",
      dataIndex: "hubstaff_user_id",
      key: "hubstaff_user_id",
      width: 130,
      disableSort: true,
      render: (_, r) => renderText(r["Hubstaff User ID"]),
    },
    {
      title: "Name",
      dataIndex: "user_name",
      key: "user_name",
      width: 180,
      render: (_, r) => renderText(r["Name"]),
    },
    {
      title: "Project",
      dataIndex: "hubstaff_client_name",
      key: "hubstaff_client_name",
      width: 180,
      render: (_, r) => renderText(r["Project"]),
    },
    {
      title: "Ticket Status",
      dataIndex: "ticket_status",
      key: "ticket_status",
      // Status values can be long descriptive labels (e.g.
      // "4 - Agent Close to Exceeding Client Expectations"), so this
      // column needs more room than the others to avoid awkward wrapping.
      width: 240,
      disableSort: true,
      render: (_, r) => {
        const s = r["Ticket Status"];
        if (!s) return <span>—</span>;
        return (
          <span className="text-[13px] text-[#163143] leading-[18px] whitespace-normal break-words">
            {s}
          </span>
        );
      },
    },
    {
      title: "Department",
      dataIndex: "operations_manager",
      key: "operations_manager",
      width: 160,
      disableSort: true,
      // Department column displays the Operations Manager value from the API
      render: (_, r) => renderText(r["Operations Manager"]),
    },
    {
      title: "Team Lead",
      dataIndex: "team_lead",
      key: "team_lead",
      width: 160,
      render: (_, r) => renderText(r["Team Lead"]),
    },
    {
      title: "Customer Success Manager",
      dataIndex: "csm",
      key: "csm",
      width: 200,
      render: (_, r) => renderText(r["Customer Success Manager"]),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header — title only (matches attendance page pattern) */}
      <div className="pt-7 flex items-center pl-8">
        <span className="text-2xl font-semibold">Hubspot Roster</span>
      </div>

      {/* Inline "Filters:" row (matches attendance page pattern — no card,
          no Apply/Clear buttons, fires on any change) */}
      <div className="flex items-center pb-3 gap-1 pt-5 pl-8">
        <div className="flex w-[75vw]">
          <div className="h-9 gap-1 flex items-center pt-[1px]">
            <div className="font-semibold pr-2">Filters:</div>
          </div>
          <div className="flex space-x-0 flex-wrap gap-3 pl-3">
            <UnifiedDropdown
              name="Clients"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={clientOpts}
              isLoading={loadingClients}
              selectedList={clientsFilter}
              setselectedList={setClientsFilter}
              multiSelect={true}
              displayKey="client"
              valueKey="client_id"
              searchKeys={["client"]}
            />
            <UnifiedDropdown
              name="Agents"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={agentOpts}
              isLoading={loadingAgents}
              selectedList={agentsFilter}
              setselectedList={setAgentsFilter}
              multiSelect={true}
              displayKey="user_name"
              valueKey="user_id"
              searchKeys={["user_name"]}
            />
            <UnifiedDropdown
              name="Team Leads"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={tlOpts}
              isLoading={loadingTls}
              selectedList={tlsFilter}
              setselectedList={setTlsFilter}
              multiSelect={true}
              displayKey="teamleads"
              valueKey="teamlead_id"
              searchKeys={["teamleads"]}
            />
            <UnifiedDropdown
              name="CSM"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={csmOpts}
              isLoading={loadingCsms}
              selectedList={csmsFilter}
              setselectedList={setCsmsFilter}
              multiSelect={true}
              displayKey="csm"
              valueKey="csm_id"
              searchKeys={["csm"]}
            />
            <UnifiedDropdown
              name="OM"
              className="border-[#d9d9d9] bg-white flex items-center justify-between px-3"
              data={omOpts}
              isLoading={loadingOms}
              selectedList={omsFilter}
              setselectedList={setOmsFilter}
              multiSelect={true}
              displayKey="operations_manager"
              valueKey="operations_manager_id"
              searchKeys={["operations_manager"]}
            />
          </div>
        </div>
      </div>

      {/* Section title + Download button row, then table — matches attendance */}
      <div className="w-full overflow-y-scroll pb-[50px] pt-2 space-y-9 scrollbar-hide pl-8">
        <div className="flex items-center w-[100%] mb-[20px]">
          <span className="text-xl font-semibold">Remote Members Roster</span>
          <div className="ml-auto mr-[15px]">
            <DownloadCSVButton onClick={handleCSVDownload} />
          </div>
        </div>

        {loading ? (
          <Skeleton className="w-full h-[75vh]" />
        ) : (
          <AntDTable
            columns={columns}
            data={rows}
            rowKey={(r) =>
              `${r["Hubstaff User ID"] ?? r["Name"]}-${r["Project"] ?? "x"}`
            }
            bordered
            total={total}
            current={page}
            pageSize={size}
            onPageChange={setPage}
            onPageSizeChange={(s) => {
              setSize(s);
              setPage(1);
            }}
            pagination={true}
            sorting={sorting}
            onSortChange={(field, order) => {
              if (!field || !order) {
                setSorting({ sort_by: "user_name", sort_order: "ascend" });
              } else {
                setSorting({ sort_by: field, sort_order: order });
              }
              setPage(1);
            }}
          />
        )}
      </div>
    </div>
  );
}
