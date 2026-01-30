import axios from "axios";
import Api from "../lib/api";
import * as types from "./types";
export function setLoaderAction(data) {
  return {
    type: types.IS_LOADING,
    data,
  };
}
export function setLoaderQuestionAction(data) {
  return {
    type: types.IS_ADDING_QUESTION,
    data,
  };
}
export function setLoaderClientsAction(data) {
  return {
    type: types.IS_LOADING_CLIENTS,
    data,
  };
}
export function setLoaderQASAction(data) {
  return {
    type: types.IS_LOADING_QAS,
    data,
  };
}
export function fetchClientsName(data) {
  return {
    type: types.FETCH_CLIENTS_NAME,
    data,
  };
}
export function setActiveForms(data) {
  return {
    type: types.ACTIVE_FORMS,
    data,
  };
}
export function setAllForms(data) {
  return {
    type: types.SET_ALL_FORMS,
    data,
  };
}
export function setCategoryByForm(data) {
  return {
    type: types.FETCH_CATEGORY_BY_FORM,
    data,
  };
}
export function setQasName(data) {
  return {
    type: types.SET_QAS_NAME,
    data,
  };
}
export function setAgentName(data) {
  return {
    type: types.SET_AGENT_NAME,
    data,
  };
}
export function setTeamLeadName(data) {
  return {
    type: types.SET_TEAMLEAD_NAME,
    data,
  };
}
export function setLoaderDeleteAction(data) {
  return {
    type: types.IS_DELETING,
    data,
  };
}
export function setFormNamesFilter(data) {
  return {
    type: types.SET_FORMS_NAMES_FILTER,
    data,
  };
}
export function setSelectedFormToEvaluate(data) {
  return {
    type: types.SELECTED_FORM_TO_EVALUATE,
    data,
  };
}
export function setClientsNameDownload(data) {
  return {
    type: types.FETCH_CLIENT_NAME_FOR_DOWNLOAD,
    data,
  };
}
export function setAgentsNameDownload(data) {
  return {
    type: types.FETCH_AGENT_NAME_FOR_DOWNLOAD,
    data,
  };
}
export function setEventsTypeDownload(data) {
  return {
    type: types.FETCH_EVENT_TYPES_FOR_DOWNLOAD,
    data,
  };
}
export const createForms = (formsBody, AntDNotification) => {
  return (dispatch) => {
    dispatch(setLoaderAction(true));
    Api.post(`/qa_ai_new/forms/create`, formsBody)
      .then((resp) => {
        dispatch(setLoaderAction(false));
        dispatch(setActiveForms({ ...resp.data, ...formsBody }));
        AntDNotification({
          status: "success",
          title: "Added Form!",
          description: "Forms added successfully",
          duration: 5,
        });
      })
      .catch((error) => {
        dispatch(setLoaderAction(false));
        AntDNotification({
          status: "error",
          title: "Error adding form",
          description: "Failed to add form, please try again",
          duration: 5,
        });
      });
  };
};

export const updateForms = (id, formsBody, AntDNotification) => {
  return (dispatch) => {
    dispatch(setLoaderAction(true));
    Api.patch(`/qa_ai_new/forms/edit/${id}`, formsBody)
      .then((resp) => {
        dispatch(setLoaderAction(false));
        dispatch(setActiveForms({ ...resp.data, ...formsBody }));
        AntDNotification({
          status: "success",
          title: "Updated Form!",
          description: "Form Updated successfully",
          duration: 5,
        });
      })
      .catch((error) => {
        dispatch(setLoaderAction(false));
        AntDNotification({
          status: "error",
          title: "Error adding form",
          description: "Failed to add form, please try again",
          duration: 5,
        });
      });
  };
};

export const getClientNames = () => {
  return (dispatch) => {
    try {
      dispatch(setLoaderClientsAction(true));
      Api.get(`/qa_ai_new/forms/get_client_names`).then((resp) => {
        dispatch(fetchClientsName(resp.data.results));
        dispatch(setLoaderClientsAction(false));
      });
    } catch (error) {
      dispatch(setLoaderClientsAction(false));
    }
  };
};
export const getAllForms = (pagination, form_type) => {
  return (dispatch) => {
    try {
      dispatch(setLoaderAction(true));
      const params = new URLSearchParams();

      if (pagination?.page) params.append("page", pagination.page);
      if (pagination?.size) params.append("size", pagination.size);
      if (form_type) params.append("form_type", form_type);
      if (pagination?.form?.length > 0) {
        pagination?.form?.map((item) => params.append("form_id", item.form_id));
      }

      if (pagination?.sort_order)
        params.append(
          "sort_order",
          pagination?.sort_order == "ascend" ? "asc" : "desc"
        );
      if (pagination?.sort_by) params.append("sort_by", pagination?.sort_by);

      const queryString = params.toString();
      const url = `/qa_ai_new/forms/forms${
        queryString ? `?${queryString}` : ""
      }`;
      Api.get(url).then((resp) => {
        dispatch(setAllForms(resp.data));
        dispatch(setLoaderAction(false));
      });
    } catch (error) {
      dispatch(setLoaderAction(false));
    }
  };
};

export const createCategory = (formsBody, handle) => {
  return (dispatch) => {
    dispatch(setLoaderAction(true));
    Api.post(`/qa_ai_new/categories/add`, formsBody)
      .then((resp) => {
        dispatch(setLoaderAction(false));
        handle(resp.data);
      })
      .catch((error) => {
        handle(error?.status);
        dispatch(setLoaderAction(false));
      });
  };
};
export const updateCategory = (id, formsBody, handle) => {
  return (dispatch) => {
    dispatch(setLoaderQuestionAction(true));
    Api.patch(`/qa_ai_new/categories/categories/${id}`, formsBody)
      .then((resp) => {
        dispatch(setLoaderQuestionAction(false));
        handle(resp.data);
      })
      .catch((error) => {
        handle(error?.status);
        dispatch(setLoaderQuestionAction(false));
      });
  };
};
export const createQuestion = (formsBody, handle) => {
  return (dispatch) => {
    dispatch(setLoaderQuestionAction(true));
    Api.post(`/qa_ai_new/questions/add`, formsBody)
      .then((resp) => {
        dispatch(setLoaderQuestionAction(false));
        handle(resp.data);
      })
      .catch((error) => {
        handle(error?.status);
        dispatch(setLoaderQuestionAction(false));
      });
  };
};

export const getCategoryByForm = (formId) => {
  return (dispatch) => {
    try {
      dispatch(setLoaderAction(true));
      Api.get(`/qa_ai_new/categories/forms/${formId}/categories`).then(
        (resp) => {
          dispatch(setCategoryByForm(resp.data.categories));
          dispatch(setLoaderAction(false));
        }
      );
    } catch (error) {
      dispatch(setLoaderAction(false));
    }
  };
};

export const getQasName = () => {
  return (dispatch) => {
    try {
      dispatch(setLoaderQASAction(true));
      Api.get(`/qa_ai_new/forms/get_qas_names`).then((resp) => {
        dispatch(setQasName(resp.data));
        dispatch(setLoaderQASAction(false));
      });
    } catch (error) {
      dispatch(setLoaderQASAction(false));
    }
  };
};

export const getAgentName = (setLoader) => {
  return (dispatch) => {
    try {
      setLoader(true);
      Api.get(`/get-team-members-filter`).then((resp) => {
        dispatch(setAgentName(resp.data?.data));
        setLoader(false);
      });
    } catch (error) {
      setLoader(false);
    }
  };
};
export const getTeamLeadName = (setLoader) => {
  return (dispatch) => {
    try {
      setLoader(true);
      Api.get(`/reports/get_teamlead_names`).then((resp) => {
        dispatch(setTeamLeadName(resp.data?.results));
        setLoader(false);
      });
    } catch (error) {
      setLoader(false);
    }
  };
};
export const deleteForm = (id, handle) => {
  return (dispatch) => {
    dispatch(setLoaderDeleteAction(true));
    Api.delete(`/qa_ai_new/forms/forms/${id}/archive`, {
      is_archived: true,
    })
      .then((resp) => {
        dispatch(setLoaderDeleteAction(false));
        handle(true);
      })
      .catch((error) => {
        dispatch(setLoaderDeleteAction(false));
        handle(false);
      });
  };
};

export const duplicateForm = (id, handle) => {
  return (dispatch) => {
    dispatch(setLoaderDeleteAction(true));
    Api.post(`/qa_ai_new/forms/duplicate/${id}`)
      .then((resp) => {
        dispatch(setLoaderDeleteAction(false));
        handle(true);
      })
      .catch((error) => {
        dispatch(setLoaderDeleteAction(false));
        handle(false);
      });
  };
};

export const enableForm = (id, status, handle) => {
  return (dispatch) => {
    dispatch(setLoaderDeleteAction(true));
    Api.patch(`/qa_ai_new/forms/forms/${id}/status`, {
      is_enabled: status,
    })
      .then((resp) => {
        dispatch(setLoaderDeleteAction(false));
        handle(true);
      })
      .catch((error) => {
        dispatch(setLoaderDeleteAction(false));
        handle(false);
      });
  };
};

export const deleteCategory = (id, handle) => {
  return (dispatch) => {
    dispatch(setLoaderDeleteAction(true));
    Api.delete(
      `/qa_ai_new/categories/categories/${id}/archive?is_archived=true`
    )
      .then((resp) => {
        dispatch(setLoaderDeleteAction(false));
        handle(true);
      })
      .catch((error) => {
        dispatch(setLoaderDeleteAction(false));
        handle(false);
      });
  };
};

export const deleteQuestionAction = (id, handle) => {
  return (dispatch) => {
    dispatch(setLoaderDeleteAction(true));
    Api.delete(`/qa_ai_new/questions/questions/${id}/archive?is_archived=true`)
      .then((resp) => {
        dispatch(setLoaderDeleteAction(false));
        handle(true);
      })
      .catch((error) => {
        dispatch(setLoaderDeleteAction(false));
        handle(false);
      });
  };
};

export const getFormNamesFilter = (setLoader) => {
  return (dispatch) => {
    try {
      setLoader(true);
      Api.get("/qa_ai_new/forms/get_form_names_filter").then((resp) => {
        dispatch(setFormNamesFilter(resp.data?.results));
        setLoader(false);
      });
    } catch (error) {
      setLoader(false);
    }
  };
};

export const getClientsNameForDownload = (setLoader) => {
  return (dispatch) => {
    try {
      setLoader(true);
      Api.get("/openai/client-names").then((resp) => {
        dispatch(setClientsNameDownload(resp.data));
        setLoader(false);
      });
    } catch (error) {
      setLoader(false);
    }
  };
};

export const getAgentsNameForDownload = (setLoader, user) => {
  return (dispatch) => {
    try {
      setLoader(true);
      Api.get(`/openai/agent-names?updated_by_tl=${user}`).then((resp) => {
        dispatch(setAgentsNameDownload(resp.data));
        setLoader(false);
      });
    } catch (error) {
      setLoader(false);
    }
  };
};
export const getEventTypesForDownload = (setLoader) => {
  return (dispatch) => {
    try {
      setLoader(true);
      Api.get("/openai/event-types").then((resp) => {
        dispatch(setEventsTypeDownload(resp.data));
        setLoader(false);
      });
    } catch (error) {
      setLoader(false);
    }
  };
};

export const getDownloadReport = (setLoader, toast, params = {}) => {
  return (dispatch) => {
    try {
      setLoader(true);
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
      addParam("agent_name", params.agent_name);
      addParam("end_date", params.date[1]);
      addParam("start_date", params.date[0]);
      addParam("raw", params.selectedReportFormat == "raw" ? true : false);
      addParam("form_name", params.selectedReportCat);
      addParam("event_type", params.event_type);
      addParam("updated_by_tl", params.updated_by_tl);

      Api.get("/openai/forms-download", queryParams)
        .then((resp) => {
          const blob = new Blob([resp.data], { type: "text/csv" });

          const link = document.createElement("a");

          link.href = URL.createObjectURL(blob);

          link.download = `forms_reports.csv`;

          link.click();

          URL.revokeObjectURL(link.href);
          setLoader(false);
          toast.success("File Downloaded Successfuly");
        })
        .catch((error) => {
          setLoader(false);
          toast.error("No data found for selected filters");
        });
    } catch (error) {
      setLoader(false);
      toast.error("No data found for selected filters");
    }
  };
};
