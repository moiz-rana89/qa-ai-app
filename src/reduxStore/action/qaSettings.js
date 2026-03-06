import Api from "../lib/api";
import * as types from "./types";

export function setQASettingsList(data) {
  return {
    type: types.SET_QA_SETTINGS_LIST,
    data,
  };
}

export function setLoadingQASettings(data) {
  return {
    type: types.IS_LOADING_QA_SETTINGS,
    data,
  };
}

function setClientsFiltersList(data) {
  return {
    type: types.FETCH_CLIENTS_FILTER_DATA,
    data,
  };
}

export const getQASettingsList = (params) => {
  return (dispatch) => {
    dispatch(setLoadingQASettings(true));
    const queryParams = {};
    const addParam = (key, value) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value) && value.length === 0) return;
        queryParams[key] = value;
      }
    };
    addParam("page", params?.page);
    addParam("page_size", params?.size);
    addParam("sort_by", params?.sort_by);
    addParam("sort_order", params?.sort_order);
    addParam("client_name", params?.client_name);
    addParam("accounts", params?.accounts);
    addParam("team_lead_id", params?.team_lead_id);
    addParam("operations_manager_id", params?.operations_manager_id);
    addParam("csm_id", params?.csm_id);
    addParam("date", params?.date);

    Api.get("/api/qa-ai/clients", queryParams)
      .then((result) => {
        const data = result?.data ?? result;
        dispatch(
          setQASettingsList({
            data: data?.data,
            pagination: {
              totalRecords: data?.total,
              currentPage: data?.page,
              pageSize: data?.page_size,
            },
          })
        );
        dispatch(setLoadingQASettings(false));
      })
      .catch(() => {
        dispatch(setQASettingsList({ data: [], pagination: {} }));
        dispatch(setLoadingQASettings(false));
      });
  };
};

export const updateQASettings = (id, body, callback) => {
  return (dispatch) => {
    dispatch(setLoadingQASettings(true));
    Api.patch(`/api/qa-ai/clients/${id}`, body)
      .then(() => {
        dispatch(setLoadingQASettings(false));
        callback?.(true);
      })
      .catch(() => {
        dispatch(setLoadingQASettings(false));
        callback?.(false);
      });
  };
};

export const getClientsFilterQAList = (setIsLoading) => {
  return (dispatch) => {
    setIsLoading(true);
    Api.get(`/api/qa-ai/clients/dropdown`)
      .then((resp) => {
        dispatch(setClientsFiltersList(resp?.data));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("resp from api is error", err);
      });
  };
};
