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

// export const getAttendanceRecords = (params = {}) => {
//   return (dispatch) => {
//     dispatch(setLoaderAction(true));

//     const queryParams = {};

//     const addParam = (key, value) => {
//       if (value !== undefined && value !== null && value !== "") {
//         // For arrays, ensure it's not an empty array
//         if (Array.isArray(value) && value.length === 0) {
//           return;
//         }
//         queryParams[key] = value;
//       }
//     };

//     addParam("client_name", params.client_name);
//     addParam("agent_name", params.agent_name);
//     addParam("team_lead_id", params.team_lead_id);
//     addParam("csm_id", params.csm_id);
//     addParam("senior_csm_id", params.senior_csm_id);
//     addParam("operations_manager_id", params.operations_manager_id);
//     addParam("start_date", params.start_date);
//     addParam("end_date", params.end_date);
//     addParam("sort_order", params.sort_order);
//     addParam("sort_by", params.sort_by);

//     if (params.page !== undefined) {
//       queryParams.page = Math.max(1, params.page);
//     }
//     if (params.size !== undefined) {
//       queryParams.size = Math.min(100, Math.max(1, params.size));
//     }

//     addParam("csv", params.csv);

//     Api.get(`/workforce/reports/attendance-management`, queryParams)
//       .then((resp) => {
//         dispatch(setLoaderAction(false));
//         dispatch(setAttendanceRecords(resp));
//       })
//       .catch((err) => {
//         dispatch(setLoaderAction(false));
//         console.error("Error fetching attendance records:", err);
//       });
//   };
// };

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
