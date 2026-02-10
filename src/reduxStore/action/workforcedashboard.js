import Api from "../lib/api";
import * as types from "./types";

function setLoaderAction(data) {
  return {
    type: types.IS_LOADING,
    data,
  };
}

function setAttendanceRecords(data) {
  return {
    type: types.FETCH_ATTENDANCE_MANAGEMENT,
    data,
  };
}

function setDepartmentData(data) {
  return {
    type: types.FETCH_DEPARTMENTS,
    data,
  };
}
function setTeamLeadData(data) {
  return {
    type: types.FETCH_TEAM_LEAD,
    data,
  };
}
function setDepartmentDirectorData(data) {
  return {
    type: types.FETCH_DEPARTMENT_DIRECTOR,
    data,
  };
}
function setDepartmentManagerData(data) {
  return {
    type: types.FETCH_DEPARTMENT_MANAGER,
    data,
  };
}

function setAomData(data) {
  return {
    type: types.FETCH_AOM,
    data,
  };
}
function setSomData(data) {
  return {
    type: types.FETCH_SOM,
    data,
  };
}

function setClientNamesTMF(data) {
  return {
    type: types.FETCH_CLIENT_NAME_TMF,
    data,
  };
}

function setMemberFilterData(data) {
  return {
    type: types.FETCH_MEMBER_FILTER_DATA,
    data,
  };
}

function setAOMFiltersList(data) {
  return {
    type: types.FETCH_AOM_FILTER_DATA,
    data,
  };
}
function setOMFiltersList(data) {
  return {
    type: types.FETCH_OM_FILTER_DATA,
    data,
  };
}
function setOPSTLFiltersList(data) {
  return {
    type: types.FETCH_OPSTL_FILTER_DATA,
    data,
  };
}
function setClientsFiltersList(data) {
  return {
    type: types.FETCH_CLIENTS_FILTER_DATA,
    data,
  };
}
function setTeamFiltersList(data) {
  return {
    type: types.FETCH_TEAM_FILTER_DATA,
    data,
  };
}
function setCSMFiltersList(data) {
  return {
    type: types.FETCH_CSM_DATA,
    data,
  };
}
function setAgentFiltersList(data) {
  return {
    type: types.FETCH_AGENT_DATA,
    data,
  };
}
function setOMFiltersListRemote(data) {
  return {
    type: types.FETCH_OM_DATA,
    data,
  };
}

function setAttendanceDisputedRecords(data) {
  return {
    type: types.FETCH_DISPUTED_ATTENDANCE_MANAGEMENT,
    data,
  };
}

export const getAttendanceRecords = (params = {}, internal) => {
  return (dispatch) => {
    dispatch(setLoaderAction(true));

    const queryParams = {};

    const addParam = (key, value) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value) && value.length === 0) {
          return;
        }
        queryParams[key] = value;
      }
    };

    addParam("client_name", params.client_name);
    addParam("department", params.department);
    addParam("agent_name", params.agent_name);
    addParam("team_lead_id", params.team_lead_id);
    addParam("csm_id", params.csm_id);
    addParam("csm", params.csm);
    addParam("senior_csm_id", params.senior_csm_id);
    addParam("operations_manager_id", params.operations_manager_id);
    addParam("startdate", params.startdate);
    addParam("enddate", params.enddate);
    addParam("sort_order", params.sort_order);
    addParam("sort_by", params.sort_by);
    addParam(
      "associate_operations_manager_id",
      params.associate_operations_manager_id
    );
    addParam("om_id", params.om_id);
    addParam("aom_id", params.aom_id);
    addParam("ops_team_lead_id", params.ops_team_lead_id);
    addParam("senior_operations_manager", params.senior_operations_manager);
    addParam("size", params.pageSize);
    if (params.page !== undefined) {
      queryParams.page = Math.max(1, params.page);
    }
    if (params.size !== undefined) {
      queryParams.size = Math.min(100, Math.max(1, params.size));
    }

    addParam("csv", params.csv);

    Api.get(
      internal
        ? `/workforce/reports/attendance-management-internal-team-tl`
        : `/workforce/reports/attendance-management-tl`,
      queryParams
    )
      .then(({ data, contentType }) => {
        dispatch(setLoaderAction(false));

        if (contentType.includes("text/csv")) {
          const url = window.URL.createObjectURL(
            new Blob([data], { type: contentType })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `attendance_report_${new Date().toISOString().slice(0, 10)}.csv`
          );
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          console.log("CSV file downloaded.");
        } else {
          dispatch(setAttendanceRecords(data));
        }
      })
      .catch((err) => {
        dispatch(setAttendanceRecords([]));
        dispatch(setLoaderAction(false));
        console.error("Error fetching attendance records:", err);
      });
  };
};

export const getAttendanceRecordsWFA = (params = {}, internal) => {
  return (dispatch) => {
    dispatch(setLoaderAction(true));

    const queryParams = {};

    const addParam = (key, value) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value) && value.length === 0) {
          return;
        }
        queryParams[key] = value;
      }
    };

    addParam("client_name", params.client_name);
    addParam("department", params.department);
    addParam("agent_name", params.agent_name);
    addParam("team_lead_id", params.team_lead_id);
    addParam("csm_id", params.csm_id);
    addParam("csm", params.csm);
    addParam("senior_csm_id", params.senior_csm_id);
    addParam("operations_manager_id", params.operations_manager_id);
    addParam("startdate", params.startdate);
    addParam("enddate", params.enddate);
    addParam("sort_order", params.sort_order);
    addParam("sort_by", params.sort_by);
    addParam(
      "associate_operations_manager_id",
      params.associate_operations_manager_id
    );
    addParam("senior_operations_manager", params.senior_operations_manager);

    addParam("om_id", params.om_id);
    addParam("aom_id", params.aom_id);
    addParam("ops_team_lead_id", params.ops_team_lead_id);

    addParam("size", params.pageSize);
    if (params.page !== undefined) {
      queryParams.page = Math.max(1, params.page);
    }
    if (params.size !== undefined) {
      queryParams.size = Math.min(100, Math.max(1, params.size));
    }

    addParam("csv", params.csv);

    Api.get(
      internal
        ? `/workforce/reports/attendance-management-internal-team`
        : `/workforce/reports/attendance-management`,
      queryParams
    )
      .then(({ data, contentType }) => {
        dispatch(setLoaderAction(false));

        if (contentType.includes("text/csv")) {
          const url = window.URL.createObjectURL(
            new Blob([data], { type: contentType })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `attendance_report_${new Date().toISOString().slice(0, 10)}.csv`
          );
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          console.log("CSV file downloaded.");
        } else {
          dispatch(setAttendanceRecords(data));
        }
      })
      .catch((err) => {
        dispatch(setAttendanceRecords([]));
        dispatch(setLoaderAction(false));
        console.error("Error fetching attendance records:", err);
      });
  };
};

export const getAttendanceReports = (params = {}, internal) => {
  return (dispatch) => {
    dispatch(setLoaderAction(true));

    const queryParams = {};

    const addParam = (key, value) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value) && value.length === 0) {
          return;
        }
        queryParams[key] = value;
      }
    };

    addParam("client_name", params.client_name);
    addParam("department", params.department);
    addParam("agent_name", params.agent_name);
    addParam("team_lead_id", params.team_lead_id);
    addParam("csm_id", params.csm_id);
    addParam("csm", params.csm);
    addParam("senior_csm_id", params.senior_csm_id);
    addParam("operations_manager_id", params.operations_manager_id);
    addParam("startdate", params.startdate);
    addParam("enddate", params.enddate);
    addParam("sort_order", params.sort_order);
    addParam("sort_by", params.sort_by);
    addParam("columns_to_drop", params.columns_to_drop);
    addParam("green_card", params.green_card);
    addParam("reason_type", params.reason_type);
    addParam("resolved_tl", params.resolved_tl);
    addParam("resolved", params.resolved);
    addParam(
      "associate_operations_manager_id",
      params.associate_operations_manager_id
    );
    addParam("senior_operations_manager", params.senior_operations_manager);
    addParam("om_id", params.om_id);
    addParam("aom_id", params.aom_id);
    addParam("ops_team_lead_id", params.ops_team_lead_id);

    addParam("size", params.pageSize);
    if (params.page !== undefined) {
      queryParams.page = Math.max(1, params.page);
    }
    if (params.size !== undefined) {
      queryParams.size = Math.min(100, Math.max(1, params.size));
    }

    addParam("csv", params.csv);

    Api.get(
      internal
        ? `/workforce/reports/attendance-management-internal-team-resolved`
        : `/workforce/reports/attendance-management-resolved`,
      queryParams
    )
      .then(({ data, contentType }) => {
        dispatch(setLoaderAction(false));

        if (contentType.includes("text/csv")) {
          const url = window.URL.createObjectURL(
            new Blob([data], { type: contentType })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `attendance_report_${new Date().toISOString().slice(0, 10)}.csv`
          );
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          console.log("CSV file downloaded.");
        } else {
          dispatch(setAttendanceRecords(data));
        }
      })
      .catch((err) => {
        dispatch(setLoaderAction(false));
        dispatch(setAttendanceRecords([]));
        console.error("Error fetching attendance records:", err);
      });
  };
};

export const getAttendanceReportsTL = (params = {}, internal) => {
  return (dispatch) => {
    dispatch(setLoaderAction(true));

    const queryParams = {};

    const addParam = (key, value) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value) && value.length === 0) {
          return;
        }
        queryParams[key] = value;
      }
    };

    addParam("client_name", params.client_name);
    addParam("department", params.department);
    addParam("agent_name", params.agent_name);
    addParam("team_lead_id", params.team_lead_id);
    addParam("csm_id", params.csm_id);
    addParam("csm", params.csm);
    addParam("senior_csm_id", params.senior_csm_id);
    addParam("operations_manager_id", params.operations_manager_id);
    addParam("startdate", params.startdate);
    addParam("enddate", params.enddate);
    addParam("sort_order", params.sort_order);
    addParam("sort_by", params.sort_by);
    addParam("columns_to_drop", params.columns_to_drop);
    addParam("green_card", params.green_card);
    addParam("reason_type", params.reason_type);
    addParam("resolved_tl", params.resolved_tl);
    addParam("resolved", params.resolved);
    addParam(
      "associate_operations_manager_id",
      params.associate_operations_manager_id
    );

    addParam("om_id", params.om_id);
    addParam("aom_id", params.aom_id);
    addParam("ops_team_lead_id", params.ops_team_lead_id);

    addParam("senior_operations_manager", params.senior_operations_manager);
    addParam("size", params.pageSize);
    if (params.page !== undefined) {
      queryParams.page = Math.max(1, params.page);
    }
    if (params.size !== undefined) {
      queryParams.size = Math.min(100, Math.max(1, params.size));
    }

    addParam("csv", params.csv);

    Api.get(
      internal
        ? `/workforce/reports/attendance-management-internal-team-resolved-tl`
        : `/workforce/reports/attendance-management-resolved-tl`,
      queryParams
    )
      .then(({ data, contentType }) => {
        dispatch(setLoaderAction(false));

        if (contentType.includes("text/csv")) {
          const url = window.URL.createObjectURL(
            new Blob([data], { type: contentType })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `attendance_report_${new Date().toISOString().slice(0, 10)}.csv`
          );
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          console.log("CSV file downloaded.");
        } else {
          dispatch(setAttendanceRecords(data));
        }
      })
      .catch((err) => {
        dispatch(setLoaderAction(false));
        dispatch(setAttendanceRecords([]));
        console.error("Error fetching attendance records:", err);
      });
  };
};

export const updateAttendnceReport = (params, handleResponse) => {
  return (dispatch) => {
    // dispatch(setLoaderAction(true));
    Api.patch(`/workforce/reports/attendance-management/${params?.id}`, params)
      .then((resp) => {
        // dispatch(setLoaderAction(false));

        handleResponse(true);
      })
      .catch((err) => {
        dispatch(setLoaderAction(false));
        handleResponse(false);
        console.log("resp from api is error", err);
      });
  };
};

export const addAutomationReport = (params, toast) => {
  return (dispatch) => {
    // dispatch(setLoaderAction(true));
    Api.post(`/workforce/reports/automation`, params)
      .then((resp) => {
        // dispatch(setLoaderAction(false));

        toast.success("Automation added Successfuly");
      })
      .catch((err) => {
        dispatch(setLoaderAction(false));
        toast.error(`Error occured, Please try adding automation again`);
        console.log("resp from api is error", err);
      });
  };
};

export const addAdvanceAutomationNotice = (params, response) => {
  return (dispatch) => {
    // dispatch(setLoaderAction(true));
    Api.post(`/workforce/reports/automation`, params)
      .then((resp) => {
        // dispatch(setLoaderAction(false));

        response(true);
      })
      .catch((err) => {
        response(false);
        dispatch(setLoaderAction(false));
        console.log("resp from api is error", err);
      });
  };
};

export const updateAttendnceInternalReport = (params, handleResponse) => {
  return (dispatch) => {
    // dispatch(setLoaderAction(true));
    Api.patch(
      `/workforce/reports/attendance-management-internal-team/${params?.id}`,
      params
    )
      .then((resp) => {
        // dispatch(setLoaderAction(false));

        handleResponse(true);
      })
      .catch((err) => {
        dispatch(setLoaderAction(false));
        handleResponse(false);
        console.log("resp from api is error", err);
      });
  };
};

export const updateInternalAttendnceReport = (params, handleResponse) => {
  return (dispatch) => {
    // dispatch(setLoaderAction(true));
    Api.patch(
      `/workforce/reports/attendance-management-internal-team/${params?.id}`,
      params
    )
      .then((resp) => {
        // dispatch(setLoaderAction(false));

        handleResponse(true);
      })
      .catch((err) => {
        dispatch(setLoaderAction(false));
        handleResponse(false);
        console.log("resp from api is error", err);
      });
  };
};

export const getDepartmentList = (setIsLoadingDepartment) => {
  return (dispatch) => {
    setIsLoadingDepartment(true);
    Api.get(`/workforce/reports/get-departments-filter`)
      .then((resp) => {
        dispatch(setDepartmentData(resp?.data?.data));
        setIsLoadingDepartment(false);
      })
      .catch((err) => {
        setIsLoadingDepartment(false);
        console.log("resp from api is error", err);
      });
  };
};

export const getTeamLeadList = (setIsLoadingDepartment) => {
  return (dispatch) => {
    setIsLoadingDepartment(true);
    Api.get(`/workforce/reports/get-team-lead-filter`)
      .then((resp) => {
        dispatch(setTeamLeadData(resp?.data?.data));
        setIsLoadingDepartment(false);
      })
      .catch((err) => {
        setIsLoadingDepartment(false);
        console.log("resp from api is error", err);
      });
  };
};

export const getDepartmentManagerList = (setIsLoadingDepartment) => {
  return (dispatch) => {
    setIsLoadingDepartment(true);
    Api.get(`/workforce/reports/get-department-manager-filter`)
      .then((resp) => {
        dispatch(setDepartmentManagerData(resp?.data?.data));
        setIsLoadingDepartment(false);
      })
      .catch((err) => {
        setIsLoadingDepartment(false);
        console.log("resp from api is error", err);
      });
  };
};

export const getDepartmentDirectorList = (setIsLoadingDepartment) => {
  return (dispatch) => {
    setIsLoadingDepartment(true);
    Api.get(`/workforce/reports/get-department-director-filter`)
      .then((resp) => {
        dispatch(setDepartmentDirectorData(resp?.data?.data));
        setIsLoadingDepartment(false);
      })
      .catch((err) => {
        setIsLoadingDepartment(false);
        console.log("resp from api is error", err);
      });
  };
};

export const getAomList = (setIsLoadingDepartment) => {
  return (dispatch) => {
    setIsLoadingDepartment(true);
    Api.get(`/workforce/reports/aom-filter`)
      .then((resp) => {
        dispatch(setAomData(resp?.data?.data));
        setIsLoadingDepartment(false);
      })
      .catch((err) => {
        setIsLoadingDepartment(false);
        console.log("resp from api is error", err);
      });
  };
};
export const getSomList = (setIsLoadingDepartment) => {
  return (dispatch) => {
    setIsLoadingDepartment(true);
    Api.get(`/workforce/reports/som-filter`)
      .then((resp) => {
        dispatch(setSomData(resp?.data?.data));
        setIsLoadingDepartment(false);
      })
      .catch((err) => {
        setIsLoadingDepartment(false);
        console.log("resp from api is error", err);
      });
  };
};

export const getClientNamesTMF = (setIsLoading) => {
  return (dispatch) => {
    setIsLoading(true);
    Api.get(`/workforce/reports/get_client_names_ticket_monitoring_form`)
      .then((resp) => {
        dispatch(setClientNamesTMF(resp?.data?.results));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("resp from api is error", err);
      });
  };
};
export const getMemberFilterData = (setIsLoading) => {
  return (dispatch) => {
    setIsLoading(true);
    Api.get(`/workforce/reports/get_internal_team_member_filter`)
      .then((resp) => {
        dispatch(setMemberFilterData(resp?.data?.data));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("resp from api is error", err);
      });
  };
};

export const getOMFiltersList = (setIsLoading) => {
  return (dispatch) => {
    setIsLoading(true);
    Api.get(`/workforce/reports/get-operations-manager-filter`)
      .then((resp) => {
        dispatch(setOMFiltersList(resp?.data?.data));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("resp from api is error", err);
      });
  };
};

export const getAOMFiltersList = (setIsLoading) => {
  return (dispatch) => {
    setIsLoading(true);
    Api.get(`/workforce/reports/get-associate-operations-manager-filter`)
      .then((resp) => {
        dispatch(setAOMFiltersList(resp?.data?.data));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("resp from api is error", err);
      });
  };
};

export const getOPSTLFiltersList = (setIsLoading) => {
  return (dispatch) => {
    setIsLoading(true);
    Api.get(`/workforce/reports/get-ops-team-lead-filter`)
      .then((resp) => {
        dispatch(setOPSTLFiltersList(resp?.data?.data));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("resp from api is error", err);
      });
  };
};

export const getClientsFilterList = (setIsLoading) => {
  return (dispatch) => {
    setIsLoading(true);
    Api.get(`/reports/get_client_names`)
      .then((resp) => {
        dispatch(setClientsFiltersList(resp?.data?.results));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("resp from api is error", err);
      });
  };
};

export const getTeamListFilterData = (setIsLoading) => {
  return (dispatch) => {
    setIsLoading(true);
    Api.get(`/reports/get_teamlead_names`)
      .then((resp) => {
        dispatch(setTeamFiltersList(resp?.data?.results));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("resp from api is error", err);
      });
  };
};

export const getCSMFilterData = (setIsLoading) => {
  return (dispatch) => {
    setIsLoading(true);
    Api.get(`/reports/get_csm_names`)
      .then((resp) => {
        dispatch(setCSMFiltersList(resp?.data?.results));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("resp from api is error", err);
      });
  };
};

export const getAgentFilterData = (setIsLoading) => {
  return (dispatch) => {
    setIsLoading(true);
    Api.get(`/get-team-members-filter`)
      .then((resp) => {
        dispatch(setAgentFiltersList(resp?.data?.data));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("resp from api is error", err);
      });
  };
};

export const getOMFilterData = (setIsLoading) => {
  return (dispatch) => {
    setIsLoading(true);
    Api.get(`/reports/get_om_names`)
      .then((resp) => {
        dispatch(setOMFiltersListRemote(resp?.data?.results));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("resp from api is error", err);
      });
  };
};

export const disputeAttendnceReportbyWFA = (params, handleResponse) => {
  return (dispatch) => {
    // dispatch(setLoaderAction(true));
    Api.post(
      `/workforce/reports/attendance/dispute?table_type=${params?.table_type}&id=${params?.id}&notes_wfa=${params?.notes_wfa}`
    )
      .then((resp) => {
        // dispatch(setLoaderAction(false));

        handleResponse(true);
      })
      .catch((err) => {
        dispatch(setLoaderAction(false));
        handleResponse(false);
        console.log("resp from api is error", err);
      });
  };
};

export const getDisputedAttendanceRecords = (params = {}) => {
  return (dispatch) => {
    dispatch(setLoaderAction(true));

    const queryParams = {};

    const addParam = (key, value) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value) && value.length === 0) {
          return;
        }
        queryParams[key] = value;
      }
    };

    addParam("client_name", params.client_name);
    addParam("department", params.department);
    addParam("agent_name", params.agent_name);
    addParam("team_lead_id", params.team_lead_id);
    addParam("csm_id", params.csm_id);
    addParam("department_director_id", params.csm);
    addParam("senior_csm_id", params.senior_csm_id);
    addParam("operations_manager_id", params.om_id);
    addParam("startdate", params.startdate);
    addParam("enddate", params.enddate);
    addParam("sort_order", params.sort_order);
    addParam("sort_by", params.sort_by);
    addParam("associate_operations_manager_id", params.aom_id);

    addParam("ops_team_lead_id", params.ops_team_lead_id);
    addParam("senior_operations_manager", params.senior_operations_manager);
    addParam("size", params.pageSize);
    addParam("role", params.role);
    // addParam("role", "wfa");
    addParam("tl_name", params.tl_name);
    if (params.page !== undefined) {
      queryParams.page = Math.max(1, params.page);
    }
    if (params.size !== undefined) {
      queryParams.size = Math.min(100, Math.max(1, params.size));
    }

    addParam("csv", params.csv);

    Api.get(`/workforce/reports/attendance/dispute`, queryParams)
      .then(({ data, contentType }) => {
        dispatch(setLoaderAction(false));

        if (contentType.includes("text/csv")) {
          const url = window.URL.createObjectURL(
            new Blob([data], { type: contentType })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `attendance_report_${new Date().toISOString().slice(0, 10)}.csv`
          );
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          console.log("CSV file downloaded.");
        } else {
          dispatch(setAttendanceDisputedRecords(data));
        }
      })
      .catch((err) => {
        dispatch(setAttendanceDisputedRecords([]));
        dispatch(setLoaderAction(false));
        console.error("Error fetching attendance records:", err);
      });
  };
};

export const resolveAttendanceDispute = (params, handleResponse) => {
  return (dispatch) => {
    Api.patch(`/workforce/reports/attendance/dispute/${params?.id}`, params)
      .then((resp) => {
        handleResponse(true);
      })
      .catch((err) => {
        handleResponse(false);
        dispatch(setLoaderAction(false));
        console.log("resp from api is error", err);
      });
  };
};
